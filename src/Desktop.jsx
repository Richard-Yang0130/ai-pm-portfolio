import { useEffect, useRef, useState } from 'react';
import { ListMusic, Music2, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import './desktop.css';

// Keep the approved artwork intact; each sprite remains a separate live control.
function CollageArt({ name }) {
  return <span className={`collage-art art-${name}`} aria-hidden="true" />;
}

function sceneScale(element) {
  const scene = element.closest('.desktop-scene');
  return scene?.offsetWidth ? scene.getBoundingClientRect().width / scene.offsetWidth : 1;
}

function DraggableObject({ id, label, onOpen, children, group = false }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const gesture = useRef(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const reset = () => {
      gesture.current = null;
      suppressClick.current = false;
      setDragging(false);
      setPosition({ x: 0, y: 0 });
    };
    window.addEventListener('resize', reset);
    return () => window.removeEventListener('resize', reset);
  }, []);

  function startDrag(event) {
    if (event.button !== 0) return;
    suppressClick.current = false;
    if (event.target.closest('[data-desktop-control]')) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const bounds = event.currentTarget.closest('.desktop').getBoundingClientRect();
    gesture.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      position,
      rect,
      bounds,
      scale: sceneScale(event.currentTarget),
      moved: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function moveDrag(event) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    let x = event.clientX - current.startX;
    let y = event.clientY - current.startY;
    if (!current.moved && Math.hypot(x, y) <= 4) return;
    current.moved = true;
    if (current.bounds.width && current.bounds.height) {
      x = Math.max(current.bounds.left + 8 - current.rect.left, Math.min(current.bounds.right - 8 - current.rect.right, x));
      y = Math.max(current.bounds.top + 34 - current.rect.top, Math.min(current.bounds.bottom - 82 - current.rect.bottom, y));
    }
    setDragging(true);
    setPosition({ x: current.position.x + x / current.scale, y: current.position.y + y / current.scale });
  }

  function endDrag(event) {
    if (!gesture.current || gesture.current.pointerId !== event.pointerId) return;
    suppressClick.current = gesture.current.moved;
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function open(event) {
    if (event.target.closest('[data-desktop-control]')) return;
    onOpen?.();
  }

  function keyDown(event) {
    if (event.target !== event.currentTarget) return;
    const distance = event.shiftKey ? 20 : 10;
    const direction = { ArrowLeft: [-distance, 0], ArrowRight: [distance, 0], ArrowUp: [0, -distance], ArrowDown: [0, distance] }[event.key];
    if (direction) {
      event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();
      const bounds = event.currentTarget.closest('.desktop').getBoundingClientRect();
      let [x, y] = direction;
      if (bounds.width && bounds.height) {
        x = Math.max(bounds.left + 8 - rect.left, Math.min(bounds.right - 8 - rect.right, x));
        y = Math.max(bounds.top + 34 - rect.top, Math.min(bounds.bottom - 82 - rect.bottom, y));
      }
      const scale = sceneScale(event.currentTarget);
      setPosition((previous) => ({ x: previous.x + x / scale, y: previous.y + y / scale }));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen?.();
    }
  }

  return (
    <div className={`desktop-object-slot slot-${id}`}>
      <div
        className={`desktop-object object-${id}${dragging ? ' is-dragging' : ''}`}
        data-decor-id={id}
        data-moved={position.x !== 0 || position.y !== 0}
        aria-label={label}
        aria-description="Drag or use the arrow keys to move; press Enter to open."
        role={group ? 'group' : 'button'}
        tabIndex={0}
        draggable={false}
        style={{ '--move-x': `${position.x}px`, '--move-y': `${position.y}px` }}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={(event) => { endDrag(event); suppressClick.current = true; }}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }}
        onClick={open}
        onKeyDown={keyDown}
      >
        {children}
      </div>
    </div>
  );
}

function timeLabel(seconds) {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}

function IPod({ music, onOpen }) {
  const { playing = false, elapsed = 0, duration = 0, track, onToggle, onNext, onPrevious } = music ?? {};
  const progress = duration > 0 ? Math.min(100, Math.max(0, elapsed / duration * 100)) : 0;
  return (
    <DraggableObject id="ipod" label="Move and open music player" onOpen={onOpen} group>
      <CollageArt name="ipod" />
      <div className="ipod-body">
        <button data-desktop-control type="button" className="ipod-screen" aria-label="Open Music" onClick={onOpen}>
          <span className="ipod-status">
            <strong>Now playing</strong>
            <span data-testid="ipod-playback-status" data-playback-state={playing ? 'playing' : 'paused'}>{playing ? <Pause size={7} fill="currentColor" /> : <Play size={7} fill="currentColor" />}</span>
            <i className="ipod-battery" aria-hidden="true" />
          </span>
          <span className="ipod-album">
            {track?.cover ? <img src={track.cover} alt={track.title ? `${track.title} cover` : 'Album cover'} draggable={false} /> : <span className="ipod-cover-placeholder"><Music2 size={40} /></span>}
            <span className="ipod-track">
              <strong>{track?.title || 'Music'}</strong>
              <span>{track?.artist || '选择一首歌'}</span>
              <span className="ipod-progress"><i style={{ width: `${progress}%` }} /></span>
              <small><span>{timeLabel(elapsed)}</span><span>{timeLabel(duration)}</span></small>
            </span>
          </span>
        </button>
        <div className="ipod-wheel">
          <button data-desktop-control type="button" className="wheel-menu" aria-label="Menu" onClick={onOpen}><ListMusic size={9} /></button>
          <button data-desktop-control type="button" className="wheel-previous" aria-label="Previous track" onClick={onPrevious} disabled={!onPrevious}><SkipBack size={9} fill="currentColor" /></button>
          <button data-desktop-control type="button" className="wheel-next" aria-label="Next track" onClick={onNext} disabled={!onNext}><SkipForward size={9} fill="currentColor" /></button>
          <button data-desktop-control type="button" className="wheel-play" aria-label={playing ? 'Pause' : 'Play'} onClick={onToggle} disabled={!onToggle}>{playing ? <Pause size={9} fill="currentColor" /> : <Play size={9} fill="currentColor" />}</button>
          <button data-desktop-control type="button" className="wheel-select" aria-label="Select" onClick={onOpen} />
        </div>
      </div>
    </DraggableObject>
  );
}

const dockApps = [
  { label: 'Music', theme: 'music', open: 'music' },
  { label: 'Mail', theme: 'mail', href: 'mailto:lisongyang0130@gmail.com' },
  { label: 'Messages', theme: 'messages', open: 'messages' },
  { label: 'Notes', theme: 'notes', open: 'notes' },
  { label: 'Photos', theme: 'photos', open: 'photos' },
  { label: 'Terminal', theme: 'terminal', open: 'terminal' },
  { label: 'Blog', theme: 'blog', open: 'reading' },
  { label: 'Projects', theme: 'projects', open: 'projects' },
  { label: 'GitHub', theme: 'github', href: 'https://github.com/Richard-Yang0130' },
  { label: '公众号', theme: 'wechat', open: 'profile' },
  { label: '小红书', theme: 'xiaohongshu', open: 'profile' },
];

function Dock({ onOpen }) {
  const [hovered, setHovered] = useState(null);
  const [bouncing, setBouncing] = useState(null);
  return (
    <nav className="desktop-dock" data-testid="dock" aria-label="Desktop applications" onMouseLeave={() => setHovered(null)}>
      <span className="dock-paper" aria-hidden="true" />
      {dockApps.map((app, index) => {
        const Control = app.href ? 'a' : 'button';
        const scale = hovered === index ? 1.2 : hovered !== null && Math.abs(index - hovered) === 1 ? 1.08 : 1;
        return (
          <div key={app.label} className={`dock-slot${hovered === index ? ' is-hovered' : ''}`} style={{ '--dock-scale': scale }}>
            <Control
              className={`dock-control${bouncing === app.label ? ' is-bouncing' : ''}`}
              aria-label={app.label}
              href={app.href}
              type={app.href ? undefined : 'button'}
              target={app.label === 'GitHub' ? '_blank' : undefined}
              rel={app.label === 'GitHub' ? 'noreferrer' : undefined}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              onAnimationEnd={() => setBouncing(null)}
              onClick={() => { setBouncing(app.label); if (app.open) onOpen?.(app.open); }}
            >
              <span className={`dock-art dock-${app.theme}`} aria-hidden="true" />
            </Control>
            <span className="dock-tooltip" aria-hidden="true">{app.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

export default function Desktop({ onOpen, onNavigate, music }) {
  const open = (name) => () => onOpen?.(name);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const resize = () => {
      const compact = window.innerWidth <= 900;
      const portrait = window.innerHeight >= window.innerWidth;
      setScale(compact && portrait ? 1 : Math.min(window.innerWidth / 1774, (window.innerHeight - (compact ? 16 : 0)) / 887));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return (
    <section className="desktop" data-testid="desktop" aria-label="李松洋的桌面" style={{ '--scene-scale': scale }}>
      <div className="desktop-scene">
      <div className="desktop-wallpaper" aria-hidden="true"><CollageArt name="corner-left" /><CollageArt name="corner-right" /><CollageArt name="build-note" /><CollageArt name="folder-arrow" /></div>
      <div className="desktop-introduction" aria-label="Introduction">
        <p className="desktop-greeting"><CollageArt name="greeting" /><span className="desktop-sr-only">Hi, I’m</span></p>
        <div className="desktop-name">
          <i className="name-handle top-left" /><i className="name-handle top-middle" /><i className="name-handle top-right" /><i className="name-handle bottom-left" /><i className="name-handle bottom-middle" /><i className="name-handle bottom-right" />
          <h1><button type="button" aria-label="About Songyang Li" onClick={() => onNavigate?.('about')}><CollageArt name="name" /><span className="desktop-sr-only">Songyang Li</span></button></h1>
        </div>
        <button type="button" className="desktop-identity identity-product" aria-label="AI Product Manager" onClick={open('profile')}><CollageArt name="product" /></button>
        <button type="button" className="desktop-identity identity-agents" aria-label="Agents & Product" onClick={() => onNavigate?.('projects')}><CollageArt name="agents" /></button>
      </div>
      <div className="desktop-objects" data-testid="desktop-decor">
        <DraggableObject id="evaluation" label="Move and open evaluation lens" onOpen={open('project:modellens')}><CollageArt name="evaluation" /><span className="object-caption">ModelLens</span></DraggableObject>
        <DraggableObject id="laptop" label="Move and open laptop" onOpen={open('terminal')}><CollageArt name="laptop" /><span className="object-caption">Terminal</span></DraggableObject>
        <DraggableObject id="chip" label="Move and open embedded chip" onOpen={open('project:embedded')}><CollageArt name="chip" /><span className="object-caption">Embedded systems</span></DraggableObject>
        <DraggableObject id="health" label="Move and open Aevis health orb" onOpen={open('project:aevis')}><CollageArt name="health" /><span className="object-caption">Aevis · AI Health</span></DraggableObject>
        <DraggableObject id="draft" label="Move and open article draft" onOpen={open('reading')}><CollageArt name="draft" /><span className="object-caption">文章与思考</span></DraggableObject>
        <DraggableObject id="note" label="Move and open PRD note" onOpen={open('notes')}><CollageArt name="note" /><span className="object-caption">产品便笺</span></DraggableObject>
        <DraggableObject id="folder" label="Move and open project folder" onOpen={open('projects')}><CollageArt name="folder" /><span className="object-caption">项目</span></DraggableObject>
        <IPod music={music} onOpen={open('music')} />
      </div>
      <Dock onOpen={onOpen} />
      </div>
    </section>
  );
}
