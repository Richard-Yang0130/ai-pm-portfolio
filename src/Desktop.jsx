import { useEffect, useRef, useState } from 'react';
import { Brain, CodeXml, FolderKanban, MessageCircle, Paperclip, Pause, Play } from 'lucide-react';
import './desktop.css';

const asset = (path) => `${import.meta.env.BASE_URL}desktop/desktop/${path}`;
const portrait = `${import.meta.env.BASE_URL}profile/songyang.jpeg`;

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
    <DraggableObject id="ipod" label="Move and open iPod" onOpen={onOpen} group>
      <div className="ipod-body" style={{ '--ipod-texture': `url("${asset('figpod/texture.webp')}")` }}>
        <button data-desktop-control type="button" className="ipod-screen" aria-label="Open Music" onClick={onOpen}>
          <span className="ipod-status">
            <strong>Now playing</strong>
            <span data-testid="ipod-playback-status" data-playback-state={playing ? 'playing' : 'paused'}>{playing ? <Pause size={7} fill="currentColor" /> : <Play size={7} fill="currentColor" />}</span>
            <i className="ipod-battery" aria-hidden="true" />
          </span>
          <span className="ipod-album">
            {track?.cover ? <img src={track.cover} alt={track.title ? `${track.title} cover` : 'Album cover'} draggable={false} /> : <span className="ipod-cover-placeholder"><Play size={40} /></span>}
            <span className="ipod-track">
              <strong>{track?.title || 'Music'}</strong>
              <span>{track?.artist || '选择一首歌'}</span>
              <span className="ipod-progress"><i style={{ width: `${progress}%` }} /></span>
              <small><span>{timeLabel(elapsed)}</span><span>{timeLabel(duration)}</span></small>
            </span>
          </span>
        </button>
        <div className="ipod-wheel">
          <img src={asset('figpod/icon-1.svg')} alt="" aria-hidden="true" draggable={false} />
          <button data-desktop-control type="button" className="wheel-menu" aria-label="Menu" onClick={onOpen}><span>MENU</span></button>
          <button data-desktop-control type="button" className="wheel-previous" aria-label="Previous track" onClick={onPrevious} disabled={!onPrevious}><img src={asset('figpod/icon-6.svg')} alt="" aria-hidden="true" draggable={false} /></button>
          <button data-desktop-control type="button" className="wheel-next" aria-label="Next track" onClick={onNext} disabled={!onNext}><img src={asset('figpod/icon-5.svg')} alt="" aria-hidden="true" draggable={false} /></button>
          <button data-desktop-control type="button" className="wheel-play" aria-label={playing ? 'Pause' : 'Play'} onClick={onToggle} disabled={!onToggle}><img src={asset('figpod/icon-4.svg')} alt="" aria-hidden="true" draggable={false} /></button>
          <button data-desktop-control type="button" className="wheel-select" aria-label="Select" onClick={onOpen} />
        </div>
      </div>
    </DraggableObject>
  );
}

const dockApps = [
  { label: 'Music', icon: 'itunes', open: 'music' },
  { label: 'Mail', icon: 'mail', href: 'mailto:lisongyang0130@gmail.com' },
  { label: 'Messages', icon: 'messages', open: 'messages' },
  { label: 'Notes', icon: 'notes', open: 'notes' },
  { label: 'Photos', icon: 'photos', open: 'photos' },
  { label: 'Terminal', icon: 'terminal', open: 'terminal' },
  { label: 'Blog', icon: 'pages', open: 'reading' },
  { label: 'Projects', custom: 'projects', open: 'projects' },
  { label: 'GitHub', icon: 'github', href: 'https://github.com/Richard-Yang0130' },
  { label: '公众号', custom: 'wechat', open: 'profile' },
  { label: '小红书', custom: 'xiaohongshu', open: 'profile' },
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
              {app.icon ? <img src={asset(`apps/${app.icon}.webp`)} alt="" aria-hidden="true" draggable={false} /> : (
                <span className={`dock-custom dock-${app.custom}`} aria-hidden="true">
                  {app.custom === 'projects' ? <FolderKanban strokeWidth={1.7} /> : app.custom === 'wechat' ? <><MessageCircle className="wechat-large" fill="currentColor" /><MessageCircle className="wechat-small" fill="currentColor" /></> : <span>小红书</span>}
                </span>
              )}
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
  const terminalLines = ['SONGYANG/OS', '> boot portfolio', 'agent runtime: ready', '> build useful things', '> _'];
  return (
    <section className="desktop" data-testid="desktop" aria-label="李松洋的桌面">
      <div className="desktop-wallpaper" aria-hidden="true"><img className="desktop-clouds" src={asset('decor/lofty-cloud.webp')} alt="" draggable={false} /></div>
      <div className="desktop-introduction" aria-label="Introduction">
        <p className="desktop-greeting">Hi, I am</p>
        <div className="desktop-name">
          <i className="name-handle top-left" /><i className="name-handle top-right" /><i className="name-handle bottom-left" /><i className="name-handle bottom-right" />
          <h1><button type="button" aria-label="About Songyang Li" onClick={() => onNavigate?.('about')}>Songyang Li</button></h1>
        </div>
        <IdentityTag className="identity-product" Icon={CodeXml} onClick={open('profile')}>AI Product Manager</IdentityTag>
        <IdentityTag className="identity-agents" Icon={Brain} onClick={() => onNavigate?.('projects')}>Agents &amp; Product</IdentityTag>
      </div>
      <div className="desktop-objects" data-testid="desktop-decor">
        <DraggableObject id="camera" label="Move and open camera" onOpen={open('photos')}><img className="decor-art" src={asset('decor/fujifilm-xpro3-silver.webp')} alt="Silver Fujifilm X-Pro3 camera" draggable={false} /></DraggableObject>
        <DraggableObject id="macintosh" label="Move and open Macintosh" onOpen={open('terminal')}>
          <div className="macintosh-art decor-art">
            <img src={asset('decor/macintosh-clean.webp')} alt="Vintage Macintosh" draggable={false} />
            <span className="macintosh-screen" aria-hidden="true"><span className="macintosh-lines">{[...terminalLines, ...terminalLines].map((line, i) => <span key={i}>{line}</span>)}</span></span>
          </div>
        </DraggableObject>
        <DraggableObject id="tardis" label="Move and open TARDIS" onOpen={open('projects')}><img className="decor-art" src={asset('decor/tardis-clean.webp')} alt="TARDIS" draggable={false} /><span className="tardis-light" aria-hidden="true" /></DraggableObject>
        <DraggableObject id="portrait" label="Move and open portrait" onOpen={open('profile')}><div className="portrait-polaroid decor-art"><img src={portrait} alt="李松洋" draggable={false} /><span>Li Songyang</span></div></DraggableObject>
        <DraggableObject id="demogorgon" label="Move and open Demogorgon" onOpen={open('projects')}><img className="decor-art decor-default" src={asset('decor/demogorgon-closed-clean.webp')} alt="Demogorgon" draggable={false} /><img className="decor-art decor-hover" src={asset('decor/demogorgon-open-clean.webp')} alt="" aria-hidden="true" draggable={false} /></DraggableObject>
        <DraggableObject id="roadside" label="Move and open roadside figure" onOpen={open('profile')}><img className="decor-art" src={asset('decor/kaili-bucket-figure-clean.webp')} alt="A figure with a blue bucket" draggable={false} /></DraggableObject>
        <DraggableObject id="teotfw" label="Move and open beach figures" onOpen={open('reading')}><img className="decor-art decor-default" src={asset('decor/teotfw-beach-clean.webp')} alt="Two figures on a beach" draggable={false} /><img className="decor-art decor-hover" src={asset('decor/teotfw-beach-holding-hands.webp')} alt="" aria-hidden="true" draggable={false} /></DraggableObject>
        <IPod music={music} onOpen={open('music')} />
      </div>
      <Dock onOpen={onOpen} />
    </section>
  );
}
