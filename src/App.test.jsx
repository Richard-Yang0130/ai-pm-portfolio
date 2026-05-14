import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('portfolio homepage', () => {
  it('renders the core job-search sections and contact actions', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /把 AI 能力变成可交付产品/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /查看项目/i })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /精选项目/i })).toBeInTheDocument();
    expect(screen.getAllByTestId('project-card')).toHaveLength(3);

    expect(screen.getByRole('heading', { name: /能力矩阵/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /联系我/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute(
      'href',
      'https://github.com/Richard-Yang0130',
    );
  });
});
