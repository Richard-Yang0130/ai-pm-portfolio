import { fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('portfolio homepage', () => {
  it('renders the core job-search sections and contact actions', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /0-1 AI 产品落地能力/i })).toBeInTheDocument();
    expect(screen.getAllByText(/李松洋/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/AI 产品经理/).length).toBeGreaterThan(0);
    expect(screen.getByText(/3 年工作经验/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /查看项目/i })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /精选项目/i })).toBeInTheDocument();
    expect(screen.getAllByTestId('project-card')).toHaveLength(3);
    expect(screen.getByRole('heading', { name: /企业级智能表格处理助手/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /智能审核数字员工/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /AI 穿戴压力管理系统 Unstress/i })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /^文章$/i })).toHaveAttribute('href', '#articles');
    expect(screen.getByRole('heading', { name: /文章与产品思考/i })).toBeInTheDocument();
    expect(screen.getAllByTestId('article-card')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /Vibe Coding 做产品，先选架构再写代码/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /别再把 Agent 当聊天框了/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /阅读文章/i })).toHaveLength(2);
    fireEvent.click(screen.getByRole('link', { name: /阅读文章：Vibe Coding 做产品，先选架构再写代码/i }));
    expect(screen.getByRole('heading', { name: /我用 Vibe Coding 做了一个 AI 小工具/i })).toBeInTheDocument();
    expect(screen.getByText(/跳过了架构，直接跳到了编码/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: /阅读文章：别再把 Agent 当聊天框了/i }));
    expect(screen.getByRole('heading', { name: /别再把 Agent 当聊天框了，Hermes Agent 给产品经理上的一课/i })).toBeInTheDocument();
    expect(screen.getByText(/Agent 产品的竞争，正在从「单次任务做得多好」转向「长期协作能不能变好」/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /人人都是产品经理主页|查看主页/i }).length).toBeGreaterThan(0);
    screen.getAllByRole('link', { name: /人人都是产品经理主页|查看主页/i }).forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://www.woshipm.com/u/1678280');
    });

    expect(screen.getByRole('heading', { name: /能力矩阵/i })).toBeInTheDocument();
    expect(screen.getAllByText(/业务流程拆解/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/指标体系与评测/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/跨团队落地推进/).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /联系我/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /lisongyang0130@gmail.com/i })).toHaveAttribute(
      'href',
      'mailto:lisongyang0130@gmail.com',
    );
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute(
      'href',
      'https://github.com/Richard-Yang0130',
    );

    expect(document.body).not.toHaveTextContent('江苏华创微系统有限公司');
    expect(document.body).not.toHaveTextContent('13995503461');
  });
});
