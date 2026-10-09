import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BarChart3, BookOpen, Brain, BriefcaseBusiness, Check, ChevronLeft, ChevronRight, Github, Mail, Menu, MessageCircle, Pause, Play, Plus, Send, Sparkles, Volume2, VolumeX } from 'lucide-react';
import Desktop from './Desktop.jsx';
import WindowFrame from './Window.jsx';
import { articles, woshipmProfileUrl } from './articles.js';
import { asset, notes, profile, projects, tracks } from './content.js';

const titles = { music: 'Music', messages: 'Messages', notes: 'Notes', photos: 'Photos', terminal: 'Terminal', reading: '文章与产品思考', profile: '关于李松洋', projects: '精选项目' };
const timecode = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

function windowTitle(id) {
  if (id.startsWith('project:')) return projects.find((p) => p.id === id.slice(8))?.title;
  if (id.startsWith('article:')) return articles.find((a) => a.slug === id.slice(8))?.readerTitle;
  return titles[id];
}

function initialWindows() {
  const match = window.location.hash.match(/^#(article|project)-(.+)$/);
  const id = match ? `${match[1]}:${match[2]}` : '';
  return windowTitle(id) ? [{ id, minimized: false }] : [];
}

function SelectionCorners() {
  return <span className="selection-corners" aria-hidden="true"><i /><i /><i /><i /></span>;
}

function SectionTitle({ children, caption }) {
  return <header className="section-heading"><div className="handwritten-heading"><h2>{children}</h2><SelectionCorners /></div>{caption && <p>{caption}</p>}</header>;
}

function ProjectThumbnail({ project }) {
  if (project.image) return <img className={`project-preview-image image-${project.thumbnail}`} src={project.image} alt="" loading="lazy" />;
  if (project.thumbnail === 'support') return <div className="mini-product mini-support"><div className="mini-bar"><i /><i /><i /><span>TECH SUPPORT</span></div><p>这个型号可以接入吗？</p><div className="mini-answer"><Sparkles size={16} /><span>先确认接口与适用条件</span><small><Check size={11} /> 产品资料 · 带引用回答</small></div><div className="mini-line" /><div className="mini-line short" /></div>;
  if (project.thumbnail === 'compliance') return <div className="mini-product mini-compliance"><div className="mini-bar"><i /><i /><i /><span>REVIEW DESK</span></div><div className="mini-document"><div className="mini-line" /><div className="mini-line highlight" /><div className="mini-line" /><div className="mini-line short" /><span><Check size={13} /> 规则匹配 · 人工复核</span></div><b className="review-stamp">REVIEWED</b></div>;
  if (project.thumbnail === 'embedded') return <div className="mini-board"><div className="board-chip">HAL<br /><small>driver / middleware</small></div><span>UART · I2C · SPI</span><i /><i /><i /></div>;
  if (project.thumbnail === 'modellens') return <div className="mini-product mini-evaluation"><div className="mini-bar"><i /><i /><i /><span>MODELLENS</span></div><strong>Quality · Cost · Latency</strong><div className="evaluation-bars"><i /><i /><i /><i /><i /></div><small>compare · review · decide</small></div>;
  return <div className="mini-aevis"><div className="aevis-orb" /><span>aevis</span><small>让每一次行动，都有反馈。</small><div className="aevis-dots"><i /><i /><i /><i /><i /></div></div>;
}

function FolderCard({ project, onOpen }) {
  return <article className={`folder-card folder-${project.thumbnail} reveal`} data-testid="project-card">
    <button className="folder-button" aria-label={`查看项目：${project.title}`} onClick={() => onOpen(`project:${project.id}`)}>
      <span className="folder-tab"><i />{project.category}</span>
      <span className="folder-paper" aria-hidden="true" />
      <span className="folder-front"><span className="folder-symbol" aria-hidden="true">{project.symbol}</span><span className="folder-copy"><h3>{project.title}</h3><p>{project.description}</p><span className="folder-open">Open project <ArrowUpRight size={14} /></span></span><span className="folder-visual" aria-hidden="true"><ProjectThumbnail project={project} /></span></span>
    </button>
  </article>;
}

function StickyNote({ note, onOpen }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const drag = useRef(null);
  return <button
    className={`sticky-note note-${note.color}`}
    style={{ '--note-rotation': `${note.rotation}deg`, '--note-x': `${position.x}px`, '--note-y': `${position.y}px` }}
    aria-label={`便笺：${note.title}`}
    onPointerDown={(e) => { if (e.button !== 0) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = { pointer: e.pointerId, x: e.clientX, y: e.clientY, offset: position, moved: false }; }}
    onPointerMove={(e) => { const d = drag.current; if (!d || d.pointer !== e.pointerId) return; const x = e.clientX - d.x, y = e.clientY - d.y; if (Math.hypot(x, y) > 5) d.moved = true; if (d.moved) setPosition({ x: Math.max(-70, Math.min(70, d.offset.x + x)), y: Math.max(-70, Math.min(70, d.offset.y + y)) }); }}
    onPointerUp={() => { if (drag.current && !drag.current.moved) onOpen(); drag.current = null; }}
    onPointerCancel={() => { drag.current = null; }}
    onKeyDown={(e) => { if (e.key.startsWith('Arrow')) { e.preventDefault(); setPosition((p) => ({ x: Math.max(-70, Math.min(70, p.x + (e.key === 'ArrowRight' ? 10 : e.key === 'ArrowLeft' ? -10 : 0))), y: Math.max(-70, Math.min(70, p.y + (e.key === 'ArrowDown' ? 10 : e.key === 'ArrowUp' ? -10 : 0))) })); } }}
    onClick={(e) => { if (e.detail === 0) onOpen(); }}
  ><span className="note-pin" aria-hidden="true" /><strong>{note.title}</strong><p>{note.text}</p><span className="note-signature">李松洋 <ArrowUpRight size={14} /></span></button>;
}

function NotesBoard({ onOpen, onCompose }) {
  return <div className="notes-board"><div className="notes-toolbar"><span>一些想法，随手贴在这里。</span><button className="paper-action" onClick={onCompose}><Plus size={17} /> 给我写封信</button></div><div className="notes-grid">{notes.map((note) => <StickyNote key={note.title} note={note} onOpen={onOpen} />)}</div></div>;
}

function ArticleList({ onRead }) {
  return <div className="article-list">{articles.map((article, index) => <article className="article-card" data-testid="article-card" key={article.slug}><span className="article-number">0{index + 1}</span><span className="article-label">{article.label}</span><h3>{article.title}</h3><p>{article.summary}</p><button className="text-action" aria-label={`阅读文章：${article.title}`} onClick={() => onRead(article.slug)}>Read story <ArrowUpRight size={17} /></button></article>)}</div>;
}

function ArticleReader({ article }) {
  return <article className="article-reader"><p className="eyebrow">WRITING · 李松洋</p><h1>{article.readerTitle}</h1><div className="reader-links"><a href={woshipmProfileUrl} target="_blank" rel="noreferrer">人人都是产品经理主页 <ArrowUpRight size={14} /></a>{article.sourceUrl && <a href={article.sourceUrl} target="_blank" rel="noreferrer">原文链接 <ArrowUpRight size={14} /></a>}</div><div className="article-body">{article.content.map((block, index) => block.type === 'heading' ? <h2 key={index}>{block.text}</h2> : <p className={block.type === 'lead' ? 'article-lead' : ''} key={index}>{block.text}</p>)}</div></article>;
}

function ProjectDetail({ project }) {
  return <article className="project-detail"><div className={`detail-cover cover-${project.thumbnail}`}><span className="detail-symbol">{project.symbol}</span><div className="detail-cover-preview"><ProjectThumbnail project={project} /></div><small>{project.image ? project.imageCaption : '产品方案示意'}</small></div><div className="detail-body"><p className="eyebrow">{project.category} · {project.role}</p><h1>{project.title}</h1><p className="detail-summary">{project.description}</p><div className="detail-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h2>从什么问题开始</h2><p>{project.problem}</p><h2>我负责的部分</h2><ul>{project.approach.map((item) => <li key={item}>{item}</li>)}</ul><h2>最后交付了什么</h2><p>{project.result}</p><div className="detail-actions">{project.url && <a className="solid-action" href={project.url} target="_blank" rel="noreferrer"><Github size={16} /> 查看仓库</a>}<a className="paper-action" href={`mailto:${profile.email}?subject=${encodeURIComponent(`聊聊${project.title}`)}`}><Mail size={16} /> 交流这个项目</a></div></div></article>;
}

function Terminal({ onNavigate, onOpen }) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([{ command: 'whoami', output: `我是李松洋，${profile.role}。\n${profile.description}\n\n输入 help 看看这里能做什么。` }]);
  const [pastCommands, setPastCommands] = useState([]);
  const historyIndex = useRef(0);
  const log = useRef(null);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [history]);

  function run(event) {
    event.preventDefault();
    const text = command.trim();
    if (!text) return;
    setCommand('');
    setPastCommands((previous) => [...previous, text]);
    historyIndex.current = pastCommands.length + 1;
    if (text === 'clear') { setHistory([]); return; }
    let output;
    switch (text) {
      case 'help': output = 'whoami     关于我\nprojects   简历里的六个项目\nreading    我写过的文章\ncontact    联系方式\nabout      跳到个人介绍\nopen       打开项目列表\nclear      清空终端'; break;
      case 'whoami': output = `李松洋 / Songyang Li\n${profile.role}\n${profile.description}`; break;
      case 'projects': output = projects.map((p, index) => `${index + 1}. ${p.title}\n   ${p.description}`).join('\n\n'); break;
      case 'reading': output = articles.map((a) => a.title).join('\n'); break;
      case 'contact': output = `${profile.email}\n${profile.github}\n公众号：洋说 AI\n小红书：需求与 Agent`; break;
      case 'about': onNavigate('about'); output = '已打开个人介绍。'; break;
      case 'open': onOpen('projects'); output = '已打开精选项目。'; break;
      default: output = `未知命令：${text}\n输入 help 查看可用命令。`;
    }
    setHistory((previous) => [...previous.slice(-49), { command: text, output }]);
  }

  return <div className="terminal-session"><div className="terminal-history" role="log" aria-label="Terminal session" ref={log}>{history.map((item, index) => <div className="terminal-entry" key={index}><p className="terminal-prompt"><span>songyang</span>@desktop <b>~</b> &gt; <em>{item.command}</em></p><pre>{item.output}</pre></div>)}</div><form className="terminal-form" onSubmit={run}><label htmlFor="terminal-command"><span>songyang</span>@desktop <b>~</b> &gt;</label><input autoComplete="off" autoCapitalize="off" spellCheck="false" id="terminal-command" aria-label="Terminal command" value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => { if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return; e.preventDefault(); historyIndex.current = Math.max(0, Math.min(pastCommands.length, historyIndex.current + (e.key === 'ArrowUp' ? -1 : 1))); setCommand(pastCommands[historyIndex.current] || ''); }} /></form></div>;
}

function MessageComposer() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const body = `你好，松洋！\n\n${message}\n\n${name}`;
  return <div className="message-composer"><div className="message-recipient"><span className="message-mail-symbol" aria-hidden="true"><Mail size={22} /></span><div><strong>李松洋</strong><span>{profile.email}</span></div></div><div className="message-bubble">很高兴你来到这里。想聊 AI 产品、Agent，或者分享一个有意思的想法，都可以写给我。</div><label>怎么称呼你<input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="你的名字" /></label><label>想说些什么<textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={4000} rows={5} placeholder="从一句你好开始……" /></label><div className="message-send"><p>在你的邮件应用中打开，再由你确认发送。</p><a className="solid-action" aria-disabled={!message.trim()} href={message.trim() ? `mailto:${profile.email}?subject=${encodeURIComponent('来自个站的一封信')}&body=${encodeURIComponent(body)}` : undefined}><Send size={16} /> 用邮件发送</a></div></div>;
}

function ProfileView() {
  return <div className="profile-view"><p className="profile-wordmark">FROM IDEAS<br /><span>TO THINGS.</span></p><h1>李松洋 <span>Songyang Li</span></h1><p className="profile-role">{profile.role}</p><p>{profile.description}</p><div className="profile-channels"><div><span>公众号</span><strong>洋说 AI</strong></div><div><span>小红书</span><strong>需求与 Agent</strong></div></div><div className="detail-actions"><a className="solid-action" href={`mailto:${profile.email}`}><Mail size={17} /> 邮件联系</a><a className="paper-action" href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a></div></div>;
}

function PhotosView() {
  const photos = [{ src: asset('projects/content-cover.png'), title: '洋说 AI · 内容工作流实际产出' }, { src: asset('desktop/original/evaluation-lens.png'), title: 'ModelLens · 本站原创评测插画' }, { src: asset('desktop/original/laptop.png'), title: 'AI 工作桌面 · 本站原创插画' }];
  const [selected, setSelected] = useState(null);
  return <div className="photos-view"><aside><strong>作品图库</strong><span>全部作品 <b>{photos.length}</b></span><span>项目</span><span>内容</span><span>原创插画</span></aside><div className="photo-grid">{selected === null ? photos.map((photo, index) => <button key={photo.src} onClick={() => setSelected(index)}><img src={photo.src} alt={photo.title} /><span>{photo.title}</span></button>) : <div className="photo-viewer"><button className="text-action" onClick={() => setSelected(null)}><ChevronLeft size={16} /> 全部作品</button><img src={photos[selected].src} alt={photos[selected].title} /><p>{photos[selected].title}</p><div className="photo-controls"><button className="paper-action" aria-label="上一张作品" onClick={() => setSelected((selected + photos.length - 1) % photos.length)}><ChevronLeft size={18} /></button><span>{selected + 1} / {photos.length}</span><button className="paper-action" aria-label="下一张作品" onClick={() => setSelected((selected + 1) % photos.length)}><ChevronRight size={18} /></button></div></div>}</div></div>;
}

function MusicView({ music, audio, error }) {
  const [volume, setVolume] = useState(() => Math.round((audio.current?.volume ?? 0.35) * 100));
  return <div className="music-view"><div className="music-cover"><img src={music.track.cover} alt="音乐封面" /></div><p className="eyebrow">NOW PLAYING</p><h1>{music.track.title}</h1><p>{music.track.artist}</p><input className="music-seek" type="range" aria-label="播放进度" min="0" max={music.duration || 1} value={Math.min(music.elapsed, music.duration || 1)} step="0.1" onChange={(e) => { if (audio.current && Number.isFinite(audio.current.duration)) audio.current.currentTime = Number(e.target.value); }} /><div className="music-times"><span>{timecode(music.elapsed)}</span><span>{timecode(music.duration)}</span></div><div className="music-controls"><button aria-label="上一首" onClick={music.onPrevious}><ChevronLeft size={25} /></button><button className="music-main-control" aria-label={music.playing ? '暂停音乐' : '播放音乐'} onClick={music.onToggle}>{music.playing ? <Pause size={27} fill="currentColor" /> : <Play size={27} fill="currentColor" />}</button><button aria-label="下一首" onClick={music.onNext}><ChevronRight size={25} /></button></div><label className="music-volume"><Volume2 size={15} /><input type="range" aria-label="音量" value={volume} onChange={(e) => { setVolume(Number(e.target.value)); if (audio.current) audio.current.volume = Number(e.target.value) / 100; }} /><Volume2 size={19} /></label><small>当前单曲循环 · toxic till the end</small>{error && <p role="alert" className="audio-error">{error}</p>}</div>;
}

export default function App() {
  const [windows, setWindows] = useState(initialWindows);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sounds, setSounds] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState('');
  const audio = useRef(null);
  const soundContext = useRef(null);
  const scroll = useRef(null);

  function openWindow(id) {
    if (!windowTitle(id)) return;
    setWindows((previous) => [...previous.filter((w) => w.id !== id), { id, minimized: false }]);
    setMenuOpen(false);
  }

  function closeWindow(id) {
    setWindows((previous) => previous.filter((w) => w.id !== id));
    if (id.startsWith('article:') && window.location.hash === `#article-${id.slice(8)}`) window.history.replaceState(null, '', '#reading');
  }

  function navigate(id) {
    const target = { top: 'home', work: 'projects', articles: 'reading', capability: 'about' }[id] || id;
    setMenuOpen(false);
    if (target === 'home') scroll.current?.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${target}`);
  }

  function readArticle(slug) {
    openWindow(`article:${slug}`);
    window.history.replaceState(null, '', `#article-${slug}`);
  }

  useEffect(() => {
    const handleHash = () => {
      const match = window.location.hash.match(/^#(article|project)-(.+)$/);
      if (match) openWindow(`${match[1]}:${match[2]}`);
      else if (window.location.hash) {
        const target = window.location.hash.slice(1);
        const resolved = { top: 'home', work: 'projects', articles: 'reading', capability: 'about' }[target] || target;
        document.getElementById(resolved)?.scrollIntoView?.({ block: 'start' });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    if (audio.current) audio.current.volume = 0.35;
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const keydown = (event) => {
      if (event.key !== 'Escape') return;
      const front = [...windows].reverse().find((w) => !w.minimized);
      if (front) closeWindow(front.id);
      else setMenuOpen(false);
    };
    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, [windows]);

  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.dataset.reveal = 'visible'; observer.unobserve(entry.target); } });
    }, { root: scroll.current, threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => { element.dataset.reveal = 'pending'; observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  function interfaceSound(event) {
    if (!sounds || !event.target.closest('button, a') || !window.AudioContext) return;
    try {
      const context = soundContext.current || (soundContext.current = new AudioContext());
      if (context.state === 'suspended') context.resume().catch(() => {});
      const oscillator = context.createOscillator(), gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(850, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, context.currentTime + 0.065);
      gain.gain.setValueAtTime(0.022, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(); oscillator.stop(context.currentTime + 0.08);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    } catch { /* Optional interface sound can be unavailable on this browser. */ }
  }

  function toggleMusic() {
    if (!audio.current) return;
    setAudioError('');
    if (audio.current.paused) audio.current.play().catch(() => { setPlaying(false); setAudioError('音乐暂时无法播放，请再点一次播放。'); });
    else audio.current.pause();
  }

  function changeTrack(direction, continuePlaying = playing) {
    const next = (trackIndex + direction + tracks.length) % tracks.length;
    setTrackIndex(next); setElapsed(0); setDuration(0); setAudioError('');
    if (audio.current) {
      audio.current.pause();
      audio.current.src = tracks[next].src;
      if (continuePlaying) audio.current.play().catch(() => { setPlaying(false); setAudioError('音乐暂时无法播放，请再点一次播放。'); });
    }
  }

  const music = { playing, elapsed, duration, track: tracks[trackIndex], onToggle: toggleMusic, onNext: () => changeTrack(1), onPrevious: () => changeTrack(-1) };

  function windowContent(id) {
    if (id.startsWith('project:')) return <ProjectDetail project={projects.find((p) => p.id === id.slice(8))} />;
    if (id.startsWith('article:')) return <ArticleReader article={articles.find((a) => a.slug === id.slice(8))} />;
    switch (id) {
      case 'terminal': return <Terminal onNavigate={navigate} onOpen={openWindow} />;
      case 'messages': return <MessageComposer />;
      case 'profile': return <ProfileView />;
      case 'photos': return <PhotosView />;
      case 'notes': return <NotesBoard onOpen={() => {}} onCompose={() => openWindow('messages')} />;
      case 'music': return <MusicView music={music} audio={audio} error={audioError} />;
      case 'reading': return <div className="reading-window"><p className="eyebrow">WRITING · 洋说 AI</p><h1>文章与产品思考</h1><ArticleList onRead={readArticle} /><a className="text-action" href={woshipmProfileUrl} target="_blank" rel="noreferrer">查看作者主页 <ArrowUpRight size={16} /></a></div>;
      case 'projects': return <div className="project-directory"><p className="eyebrow">SIX PROJECTS · FROM MY RESUME</p><h1>精选项目</h1>{projects.map((p) => <button key={p.id} onClick={() => openWindow(`project:${p.id}`)}><span className={`directory-icon icon-${p.thumbnail}`}>{p.symbol}</span><span><strong>{p.title}</strong><small>{p.description}</small></span><ArrowUpRight size={18} /></button>)}</div>;
      default: return null;
    }
  }

  return <div className="portfolio" onClickCapture={interfaceSound}>
    <a className="skip-link" href="#about" onClick={(e) => { e.preventDefault(); navigate('about'); }}>跳到个人介绍</a>
    <header className={`menu-bar${scrolled ? ' menu-dark' : ''}`}>
      <nav aria-label="主导航"><button className="menu-brand" aria-label="李松洋 首页" onClick={() => navigate('home')}><span className="brand-symbol" aria-hidden="true">✳</span><strong>Songyang</strong></button><button className="mobile-menu-toggle" aria-label={menuOpen ? '关闭导航' : '打开导航'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu size={17} /></button><div className={`menu-links${menuOpen ? ' menu-open' : ''}`}>{[['Welcome', 'home'], ['About', 'about'], ['Projects', 'projects'], ['Memos', 'memos'], ['Blog', 'reading']].map(([label, id]) => <button key={id} onClick={() => navigate(id)}>{label}</button>)}</div></nav>
      <div className="menu-social"><button aria-label={sounds ? '关闭界面音效' : '开启界面音效'} onClick={() => setSounds(!sounds)}>{sounds ? <Volume2 size={17} /> : <VolumeX size={17} />}</button><a href={`mailto:${profile.email}`} aria-label="邮件联系"><Mail size={17} /></a><a href={woshipmProfileUrl} aria-label="人人都是产品经理主页" target="_blank" rel="noreferrer"><BookOpen size={16} /></a><a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={17} /></a><button aria-label="查看个人账号" onClick={() => openWindow('profile')}><MessageCircle size={17} /></button></div>
    </header>
    <main className="site-scroll" id="home" ref={scroll} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > window.innerHeight * 0.72)}>
      <Desktop onOpen={openWindow} onNavigate={navigate} music={music} />
      <section className="about-intro content-layer" id="about" aria-label="关于李松洋">
        <p className="intro-statement reveal">我是<span className="name-highlight">李松洋<span className="name-star" aria-hidden="true">✦</span></span>，<br />一名<span className="marker-highlight">AI 产品经理</span>，<br />也动手把想法做成<br /><span className="underline-highlight">真正能用的工具。</span></p>
        <div className="intro-polaroid intro-product reveal"><div className="model-summary-paper"><BarChart3 size={30} /><strong>ModelLens</strong><small>QUALITY / COST / LATENCY</small></div><span>build & test</span></div><div className="intro-polaroid intro-content reveal"><img src={asset('projects/content-cover.png')} alt="洋说 AI 内容成果" /><span>write & share</span></div><span className="intro-sticker sticker-agent">AI Agents</span><span className="intro-sticker sticker-eval">Model Evaluation</span><span className="intro-sticker sticker-create">AI Creator</span><span className="intro-sticker sticker-product">Product Design</span>
      </section>
      <section className="bio-section content-layer" aria-label="个人简介与经历">
        <div className="editor-frame bio-frame reveal"><span className="editor-caption caption-yellow">MAIN BIO</span><SelectionCorners /><p>我喜欢从真实问题出发。模型能做什么很有意思，但更值得花时间的，是弄清楚它放进业务和日常生活以后，怎样才好用。</p><p>做产品时，我会一起考虑用户的操作、数据的边界，以及回答出错之后谁来接手。工程经历让我习惯把这些约束早点想清楚，再做原型、看反馈、把效果测出来。</p><div className="bio-scraps"><p className="yellow-scrap">我做过技术支持与合规审核产品，也在探索 ModelLens、Aevis 和 AI 内容工作流。这里的六个项目，记录了我从想法到交付的不同路径。</p><button className="bio-brand-card" aria-label="打开个人介绍" onClick={() => openWindow('profile')}><span className="brand-card-title">洋说 AI</span><span className="brand-card-icons"><Brain size={20} /><BookOpen size={20} /><Sparkles size={20} /></span><span className="brand-card-caption">BUILD · TEST · SHARE</span></button></div><p className="yellow-scrap scrap-right">我也在「洋说 AI」和「需求与 Agent」分享产品观察、技术解读和动手实践。把问题讲清楚，和把东西做出来，对我一样重要。</p></div>
        <div className="editor-frame experience-frame reveal"><span className="editor-caption caption-blue">WHAT I WORK ON</span><SelectionCorners />{[{ icon: Brain, title: 'AI 产品', text: '企业技术支持、合规审核与健康管理，从业务问题走到可以验证的体验。', tag: 'Product · Agent · RAG' }, { icon: BriefcaseBusiness, title: '工具与评测', text: 'ModelLens 与嵌入式系统：把实验、数据和运行约束放到可复核的流程里。', tag: 'Evaluation · Engineering' }, { icon: BookOpen, title: '内容与表达', text: '洋说 AI、需求与 Agent：从选题判断到文章、图文、视频和平台内容包。', tag: 'Writing · Making · Sharing' }].map(({ icon: Icon, title, text, tag }) => <div className="experience-row" key={title}><span className="experience-icon"><Icon size={22} /></span><div><h3>{title}</h3><p>{text}</p><span className="experience-tag">{tag}</span></div></div>)}</div>
      </section>
      <section id="projects" className="projects-section content-layer" aria-label="简历项目">
        {[{ group: 'work', title: 'Highlights', caption: '把 AI 放进真实的业务流程。', color: 'blue' }, { group: 'personal', title: 'Personal Projects', caption: '自己动手，做一些值得使用的东西。', color: 'yellow' }].map(({ group, title, caption, color }) => <section className={`project-group group-${color}`} key={group}><div className="section-wave" aria-hidden="true"><svg viewBox="0 0 1440 82" preserveAspectRatio="none"><path d="M0,65 L200,0 L475,74 L835,8 L1125,74 L1440,4 L1440,82 L0,82Z" /></svg><i /><i /><i /><i /><i /></div><div className="starburst" aria-hidden="true" /><SectionTitle caption={caption}>{title}</SectionTitle><div className="folder-grid">{projects.filter((p) => p.group === group).map((p) => <FolderCard project={p} key={p.id} onOpen={openWindow} />)}</div></section>)}
      </section>
      <section className="writing-section content-layer" id="reading"><SectionTitle caption="写下实践，也写下判断。">Writing</SectionTitle><ArticleList onRead={readArticle} /><a className="writing-profile" href={woshipmProfileUrl} target="_blank" rel="noreferrer">更多文章，在人人都是产品经理 <ArrowUpRight size={16} /></a></section>
      <section className="memos-section content-layer" id="memos"><SectionTitle>My Memos</SectionTitle><NotesBoard onOpen={() => openWindow('notes')} onCompose={() => openWindow('messages')} /></section>
      <footer className="site-footer content-layer" id="contact"><div className="footer-links"><a href={`mailto:${profile.email}`}><Mail size={17} />{profile.email}</a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} />GitHub</a><button onClick={() => openWindow('profile')}>公众号：洋说 AI</button><button onClick={() => openWindow('profile')}>小红书：需求与 Agent</button></div><div className="footer-credit"><span>© 2026 李松洋</span><span>AI 产品 · 工具 · 创作</span></div></footer>
    </main>
    {windows.map((w, index) => <WindowFrame key={w.id} title={windowTitle(w.id)} kind={w.id.split(':')[0]} order={index} minimized={w.minimized} onClose={() => closeWindow(w.id)} onMinimize={() => setWindows((previous) => previous.map((item) => item.id === w.id ? { ...item, minimized: true } : item))} onRaise={() => setWindows((previous) => previous[previous.length - 1]?.id === w.id ? previous : [...previous.filter((item) => item.id !== w.id), previous.find((item) => item.id === w.id)].filter(Boolean))}>{windowContent(w.id)}</WindowFrame>)}
    {windows.some((w) => w.minimized) && <div className="minimized-windows" aria-label="最小化的窗口">{windows.filter((w) => w.minimized).map((w) => <button key={w.id} aria-label={`恢复 ${windowTitle(w.id)}`} onClick={() => openWindow(w.id)}>{windowTitle(w.id)} <ArrowUpRight size={14} /></button>)}</div>}
    {/* Source changes use the native player once, avoiding a React reload that interrupts play(). */}
    <audio ref={audio} src={tracks[0].src} preload="metadata" onTimeUpdate={() => setElapsed(audio.current?.currentTime || 0)} onLoadedMetadata={() => setDuration(Number.isFinite(audio.current?.duration) ? audio.current.duration : 0)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => changeTrack(1, true)} onError={() => { setPlaying(false); setAudioError('音轨加载失败，请稍后重试。'); }} />
  </div>;
}
