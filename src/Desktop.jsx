import { useEffect, useRef, useState } from 'react';
import { BookOpen, Brain, Check, CodeXml, FileText, FolderKanban, Github, HeartPulse, Images, ListMusic, Mail, MessageCircle, MessagesSquare, Music2, NotebookPen, Paperclip, Pause, Play, SkipBack, SkipForward, SquareTerminal } from 'lucide-react';
import './desktop.css';

const asset = (path) => `${import.meta.env.BASE_URL}desktop/original/${path}`;

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
    setPosition({ x: current.position.x + x, y: current.position.y + y });
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
      setPosition((previous) => ({ x: previous.x + x, y: previous.y + y }));
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

function IdentityTag({ className, Icon, children, onClick }) {
  return (
    <button type="button" className={`desktop-identity ${className}`} onClick={onClick}>
      <span className="identity-paper">{children}</span>
      <span className="identity-badge"><Icon size={23} strokeWidth={1.5} /></span>
      <Paperclip className="identity-paperclip" size={22} strokeWidth={1.5} aria-hidden="true" />
    </button>
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
  { label: 'Music', Icon: Music2, theme: 'music', open: 'music' },
  { label: 'Mail', Icon: Mail, theme: 'mail', href: 'mailto:lisongyang0130@gmail.com' },
  { label: 'Messages', Icon: MessageCircle, theme: 'messages', open: 'messages' },
  { label: 'Notes', Icon: NotebookPen, theme: 'notes', open: 'notes' },
  { label: 'Photos', Icon: Images, theme: 'photos', open: 'photos' },
  { label: 'Terminal', Icon: SquareTerminal, theme: 'terminal', open: 'terminal' },
  { label: 'Blog', Icon: FileText, theme: 'blog', open: 'reading' },
  { label: 'Projects', Icon: FolderKanban, theme: 'projects', open: 'projects' },
  { label: 'GitHub', Icon: Github, theme: 'github', href: 'https://github.com/Richard-Yang0130' },
  { label: '公众号', Icon: MessagesSquare, theme: 'wechat', open: 'profile' },
  { label: '小红书', Icon: BookOpen, theme: 'xiaohongshu', open: 'profile' },
];

function Dock({ onOpen }) {
  const [hovered, setHovered] = useState(null);
  const [bouncing, setBouncing] = useState(null);
  return (
    <nav className="desktop-dock" data-testid="dock" aria-label="Desktop applications" onMouseLeave={() => setHovered(null)}>
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
              <span className={`dock-art dock-${app.theme}`} aria-hidden="true"><app.Icon strokeWidth={1.7} /></span>
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
  return (
    <section className="desktop" data-testid="desktop" aria-label="李松洋的桌面">
      <div className="desktop-wallpaper" aria-hidden="true"><i /><i /></div>
      <div className="desktop-introduction" aria-label="Introduction">
        <p className="desktop-greeting">Hi, I’m</p>
        <div className="desktop-name">
          <i className="name-handle top-left" /><i className="name-handle top-right" /><i className="name-handle bottom-left" /><i className="name-handle bottom-right" />
          <h1><button type="button" aria-label="About Songyang Li" onClick={() => onNavigate?.('about')}>Songyang Li</button></h1>
        </div>
        <IdentityTag className="identity-product" Icon={CodeXml} onClick={open('profile')}>AI Product Manager</IdentityTag>
        <IdentityTag className="identity-agents" Icon={Brain} onClick={() => onNavigate?.('projects')}>Agents &amp; Product</IdentityTag>
      </div>
      <div className="desktop-objects" data-testid="desktop-decor">
        <DraggableObject id="evaluation" label="Move and open evaluation lens" onOpen={open('project:modellens')}><img className="decor-art" src={asset('evaluation-lens.png')} alt="Lavender evaluation lens with data bars" draggable={false} /><span className="object-caption">ModelLens</span></DraggableObject>
        <DraggableObject id="laptop" label="Move and open laptop" onOpen={open('terminal')}><img className="decor-art" src={asset('laptop.png')} alt="Cream laptop with abstract code blocks" draggable={false} /><span className="object-caption">Terminal</span></DraggableObject>
        <DraggableObject id="chip" label="Move and open embedded chip" onOpen={open('project:embedded')}><img className="decor-art" src={asset('chip.png')} alt="Translucent mint microchip" draggable={false} /><span className="object-caption">Embedded systems</span></DraggableObject>
        <DraggableObject id="health" label="Move and open Aevis health orb" onOpen={open('project:aevis')}><div className="health-art decor-art"><div className="health-orbit" /><div className="health-globe"><HeartPulse strokeWidth={1.25} /><span className="health-spark" /></div><span className="health-base" /><strong>aevis</strong></div><span className="object-caption">Aevis · AI Health</span></DraggableObject>
        <DraggableObject id="draft" label="Move and open article draft" onOpen={open('reading')}><div className="article-prop decor-art"><span className="paper-kicker">PRODUCT NOTES</span><strong>洋说 AI</strong><span className="paper-subtitle">记录产品，也记录思考。</span><div className="paper-lines"><i /><i /><i /><i /><i /></div><FileText className="paper-seal" /></div><span className="object-caption">文章与思考</span></DraggableObject>
        <DraggableObject id="note" label="Move and open PRD note" onOpen={open('notes')}><div className="prd-prop decor-art"><Paperclip className="note-clip" strokeWidth={1.3} /><strong>PRD</strong><span><Check />需求</span><span><Check />场景</span><span><Check />验证</span></div><span className="object-caption">产品便笺</span></DraggableObject>
        <DraggableObject id="folder" label="Move and open project folder" onOpen={open('projects')}><div className="folder-prop decor-art"><span className="desktop-folder-paper"><i /><i /><i /></span><span className="desktop-folder-front"><FolderKanban /><strong>Projects</strong></span></div><span className="object-caption">项目</span></DraggableObject>
        <IPod music={music} onOpen={open('music')} />
      </div>
      <Dock onOpen={onOpen} />
    </section>
  );
}
