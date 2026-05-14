import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('portfolio homepage', () => {
  it('renders the core job-search sections and contact actions', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /把技术背景转化为 AI 产品落地能力/i })).toBeInTheDocument();
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

    expect(screen.getByRole('heading', { name: /能力矩阵/i })).toBeInTheDocument();
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
