import { useEffect, useRef, useState } from 'react';
import { Maximize2, Minus, X } from 'lucide-react';

export default function WindowFrame({ title, kind, order, minimized, onClose, onMinimize, onRaise, children }) {
  const frame = useRef(null);
  const drag = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    if (minimized) return;
    const previous = document.activeElement;
    const target = frame.current?.querySelector('input, textarea') || frame.current?.querySelector('button');
    target?.focus({ preventScroll: true });
    const resize = () => setPosition({ x: 0, y: 0 });
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [minimized]);

  function startDrag(event) {
    if (maximized || event.button !== 0 || event.target.closest('button')) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointer: event.pointerId, startX: event.clientX, startY: event.clientY, offset: position };
  }

  function moveDrag(event) {
    if (!drag.current || event.pointerId !== drag.current.pointer) return;
    const bounds = frame.current.getBoundingClientRect();
    const maxX = Math.max(0, (window.innerWidth - bounds.width) / 2 - 8);
    const menuBottom = document.querySelector('.menu-bar')?.getBoundingClientRect().bottom || 34;
    const maxY = Math.max(0, (window.innerHeight - bounds.height) / 2 - menuBottom - 8);
    setPosition({
      x: Math.max(-maxX, Math.min(maxX, drag.current.offset.x + event.clientX - drag.current.startX)),
      y: Math.max(-maxY, Math.min(maxY, drag.current.offset.y + event.clientY - drag.current.startY)),
    });
  }

  return (
    <section
      ref={frame}
      role="dialog"
      aria-label={title}
      hidden={minimized}
      className={`app-window window-${kind}${maximized ? ' is-maximized' : ''}`}
      style={{ '--window-x': `${position.x}px`, '--window-y': `${position.y}px`, zIndex: 1100 + order }}
      onFocusCapture={onRaise}
      onPointerDown={(event) => {
        onRaise();
        if (event.target.closest('button, input, textarea, a, select, label')) return;
        event.preventDefault();
        const target = frame.current?.querySelector('input, textarea') || frame.current?.querySelector('button');
        target?.focus({ preventScroll: true });
      }}
    >
      <div
        className="window-titlebar"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
        onDoubleClick={() => { setMaximized(!maximized); setPosition({ x: 0, y: 0 }); }}
      >
        <div className="traffic-lights">
          <button className="traffic-close" aria-label={`关闭 ${title}`} onClick={onClose}><X size={10} /></button>
          <button className="traffic-minimize" aria-label={`最小化 ${title}`} onClick={onMinimize}><Minus size={10} /></button>
          <button className="traffic-zoom" aria-label={`${maximized ? '还原' : '放大'} ${title}`} onClick={() => { setMaximized(!maximized); setPosition({ x: 0, y: 0 }); }}><Maximize2 size={9} /></button>
        </div>
        <span className="window-title">{title}</span>
      </div>
      <div className="window-content">{children}</div>
    </section>
  );
}
