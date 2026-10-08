import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Desktop from './Desktop.jsx';

describe('desktop interaction', () => {
  beforeAll(() => vi.stubGlobal('PointerEvent', MouseEvent));
  afterAll(() => vi.unstubAllGlobals());

  it('opens on a click, moves on a drag, and does not open after dragging', () => {
    const onOpen = vi.fn();
    render(<Desktop onOpen={onOpen} />);
    const camera = screen.getByRole('button', { name: 'Move and open camera' });
    fireEvent.click(camera);
    expect(onOpen).toHaveBeenCalledWith('photos');
    onOpen.mockClear();

    fireEvent.pointerDown(camera, { button: 0, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(camera, { clientX: 140, clientY: 120 });
    fireEvent.pointerUp(camera, { clientX: 140, clientY: 120 });
    fireEvent.click(camera);
    expect(camera.style.getPropertyValue('--move-x')).toBe('40px');
    expect(camera.style.getPropertyValue('--move-y')).toBe('20px');
    expect(onOpen).not.toHaveBeenCalled();

    fireEvent.keyDown(camera, { key: 'ArrowRight', shiftKey: true });
    expect(camera.style.getPropertyValue('--move-x')).toBe('60px');
    fireEvent.keyDown(camera, { key: 'Enter' });
    expect(onOpen).toHaveBeenCalledWith('photos');
    fireEvent(window, new Event('resize'));
    expect(camera.style.getPropertyValue('--move-x')).toBe('0px');
    expect(camera.style.getPropertyValue('--move-y')).toBe('0px');
  });

  it('connects Dock applications and navigation to the supplied callbacks', () => {
    const onOpen = vi.fn();
    const onNavigate = vi.fn();
    render(<Desktop onOpen={onOpen} onNavigate={onNavigate} />);
    const dock = within(screen.getByTestId('dock'));
    for (const [label, target] of [['Music', 'music'], ['Messages', 'messages'], ['Notes', 'notes'], ['Photos', 'photos'], ['Terminal', 'terminal'], ['Blog', 'reading'], ['Projects', 'projects'], ['公众号', 'profile'], ['小红书', 'profile']]) {
      fireEvent.click(dock.getByRole('button', { name: label }));
      expect(onOpen).toHaveBeenLastCalledWith(target);
    }
    expect(dock.getByRole('link', { name: 'Mail' })).toHaveAttribute('href', 'mailto:lisongyang0130@gmail.com');
    expect(dock.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/Richard-Yang0130');
    fireEvent.click(screen.getByRole('button', { name: 'About Songyang Li' }));
    expect(onNavigate).toHaveBeenCalledWith('about');
  });

  it('uses real music state and playback callbacks', () => {
    const music = { playing: true, elapsed: 65, duration: 222, track: { title: 'My track', artist: 'My artist' }, onToggle: vi.fn(), onNext: vi.fn(), onPrevious: vi.fn() };
    const onOpen = vi.fn();
    render(<Desktop music={music} onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next track' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous track' }));
    expect(music.onToggle).toHaveBeenCalledOnce();
    expect(music.onNext).toHaveBeenCalledOnce();
    expect(music.onPrevious).toHaveBeenCalledOnce();
    expect(onOpen).not.toHaveBeenCalled();
    expect(screen.getByTestId('ipod-playback-status')).toHaveAttribute('data-playback-state', 'playing');
    expect(screen.getByText('1:05')).toBeInTheDocument();
    expect(screen.getByText('3:42')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open Music' }));
    expect(onOpen).toHaveBeenCalledWith('music');
  });

  it('only references local assets that exist and has no reference-owner identity', () => {
    const { container } = render(<Desktop />);
    for (const image of container.querySelectorAll('img')) {
      const path = image.getAttribute('src').replace(import.meta.env.BASE_URL, '');
      expect(existsSync(resolve('public', path)), path).toBe(true);
    }
    expect(container).not.toHaveTextContent(/Elliot|ELLIOT|elliothux/);
  });
});
