import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App.jsx';

beforeEach(() => window.history.replaceState(null, '', '/ai-pm-portfolio/'));

describe('Songyang’s desktop portfolio', () => {
  it('shows the six resume projects and the existing public contacts', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Songyang Li' })).toBeInTheDocument();
    expect(screen.getAllByTestId('project-card')).toHaveLength(6);
    for (const name of ['华创智擎技术支持平台', 'AI 合规审核数字员工', '机载雷达嵌入式高可靠系统', 'Aevis', 'ModelLens', 'AI 内容价值判断与多平台自动化运营系统']) {
      expect(screen.getByRole('heading', { name, exact: true })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: 'lisongyang0130@gmail.com' })).toHaveAttribute('href', 'mailto:lisongyang0130@gmail.com');
    expect(screen.getAllByRole('link', { name: 'GitHub' })[0]).toHaveAttribute('href', 'https://github.com/Richard-Yang0130');
    expect(document.body.textContent).not.toMatch(/\b1[3-9]\d{9}\b/);
    expect(screen.queryByRole('heading', { name: 'Elliot Hu' })).not.toBeInTheDocument();
    expect(document.querySelector('a[href="mailto:elliothu.my@gmail.com"]')).toBeNull();
    expect(document.body).not.toHaveTextContent('求职中');
  });

  it('opens a terminal, runs commands, and closes it with Escape', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Terminal', exact: true }));
    const terminal = screen.getByRole('dialog', { name: 'Terminal' });
    const input = within(terminal).getByRole('textbox', { name: 'Terminal command' });
    fireEvent.change(input, { target: { value: 'projects' } });
    fireEvent.submit(input.closest('form'));
    expect(within(terminal).getByRole('log')).toHaveTextContent('ModelLens');
    fireEvent.click(screen.getByRole('button', { name: '最小化 Terminal' }));
    fireEvent.click(screen.getByRole('button', { name: '恢复 Terminal' }));
    expect(within(screen.getByRole('dialog', { name: 'Terminal' })).getByRole('log')).toHaveTextContent('ModelLens');
    fireEvent.change(input, { target: { value: 'sudo something' } });
    fireEvent.submit(input.closest('form'));
    expect(within(terminal).getByRole('log')).toHaveTextContent('未知命令');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Terminal' })).not.toBeInTheDocument();
  });

  it('restores a minimized window and opens a real project detail', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Photos', exact: true }));
    fireEvent.click(screen.getByRole('button', { name: '最小化 Photos' }));
    expect(screen.queryByRole('dialog', { name: 'Photos' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '恢复 Photos' }));
    expect(screen.getByRole('dialog', { name: 'Photos' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '查看项目：ModelLens' }));
    const detail = screen.getByRole('dialog', { name: 'ModelLens' });
    expect(within(detail).getByRole('link', { name: '查看仓库' })).toHaveAttribute('href', 'https://github.com/Richard-Yang0130/modellens');
  });

  it('keeps existing article bodies and direct article hashes working', () => {
    window.history.replaceState(null, '', '#article-vibe-coding-architecture');
    render(<App />);
    expect(screen.getByRole('dialog', { name: /我用 Vibe Coding 做了一个 AI 小工具/ })).toHaveTextContent('跳过了架构');
    fireEvent.click(screen.getByRole('button', { name: '阅读文章：别再把 Agent 当聊天框了' }));
    expect(screen.getByRole('dialog', { name: /Hermes Agent 给产品经理上的一课/ })).toHaveTextContent('长期协作');
  });

  it('closes the window reached by keyboard focus, and focuses a clicked terminal', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Photos', exact: true }));
    fireEvent.click(screen.getByRole('button', { name: 'Terminal', exact: true }));
    fireEvent.focus(screen.getByRole('button', { name: '关闭 Photos' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Photos' })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Terminal' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Messages', exact: true }));
    fireEvent.pointerDown(screen.getByRole('log'), { button: 0 });
    expect(screen.getByRole('textbox', { name: 'Terminal command' })).toHaveFocus();
  });
});
