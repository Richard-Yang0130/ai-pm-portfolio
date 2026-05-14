import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  PenLine,
  Sparkles,
} from 'lucide-react';
import { articles, woshipmProfileUrl } from './articles.js';

const projects = [
  {
    label: '01 / Agent Workflow',
    title: '企业级智能表格处理助手',
    problem: '企业内部竞标和产品规划需要高频处理多源 Excel，人工清洗、拼接、异常标记耗时且不可追溯。',
    solution: '从业务流程切入定义 0-1 AI 表格处理助手，设计自然语言指令、任务拆解、结果确认和异常追溯链路。',
    ai: 'Dify Agent 工作流、多源表格解析、规则校验、可追溯结果输出。',
    result: '清洗准确率从 70% 提升到 93%，月均处理 600+ 表格，文档数据准备时间缩短 20%。',
    metrics: [
      ['70%→93%', '清洗准确率'],
      ['600+', '月均处理表格'],
      ['20%', '数据准备时间缩短'],
    ],
  },
  {
    label: '02 / RAG + LLM',
    title: '智能审核数字员工',
    problem: '外宣物料审核依赖人工经验，规则多、周期长、跨部门沟通成本高。',
    solution: '联合业务部门梳理 200+ 条审核规则，定义“上传物料、规则匹配、风险解释、人工确认”的审核产品闭环。',
    ai: 'RAG 知识检索、LLM 风险判断、OCR 图文识别、多模态审核链路。',
    result: '审核周期从 5 天缩短到 1 天，违规漏检率为 0，项目获得年度效能创新奖。',
    metrics: [
      ['5天→1天', '审核周期'],
      ['0', '违规漏检率'],
      ['200+', '审核规则'],
    ],
  },
  {
    label: '03 / AI Product Design',
    title: 'AI 穿戴压力管理系统 Unstress',
    problem: '压力管理产品常停留在数据展示，缺少来源识别、个性化解释和可持续干预闭环。',
    solution: '基于竞品调研和用户场景，定义从数据采集、基线建立、压力解释到干预建议的完整 AI 产品方案。',
    ai: 'HRV、睡眠、心率数据边界，规则引擎 + LLM 推理，14 天个人基线。',
    result: '完成 0-1 产品方案、数据链路和评测思路，沉淀可用于 AI 健康产品验证的 PRD 与原型。',
    metrics: [
      ['12+', '竞品调研'],
      ['9类', '生理数据'],
      ['14天', '个人基线'],
    ],
  },
];

const capabilities = [
  '0-1 AI 产品定义',
  '业务流程拆解',
  'Agent/RAG 场景设计',
  'AI 原型验证',
  '指标体系与评测',
  '跨团队落地推进',
  'AI 产品复盘与迭代',
];

const navItems = [
  ['作品', '#work'],
  ['文章', '#articles'],
  ['关于', '#about'],
  ['能力', '#capability'],
  ['联系', '#contact'],
];

export default function App() {
  const [selectedArticleSlug, setSelectedArticleSlug] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.location.hash.replace('#article-', '');
  });
  const selectedArticle = useMemo(
    () => articles.find((article) => article.slug === selectedArticleSlug),
    [selectedArticleSlug],
  );

  return (
    <main className="site-shell antialiased">
      <div className="background-grid" aria-hidden="true" />
      <nav className="top-nav" aria-label="主导航">
        <a className="brand" href="#top" aria-label="李松洋 首页">
          <span className="brand-mark">李</span>
          <span>李松洋</span>
        </a>
        <div className="nav-links">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact">
          联系
          <ArrowRight size={14} strokeWidth={2.2} />
        </a>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <div className="status-pill">
            <span className="pulse" />
            3 年工作经验 · AI 产品经理求职中
          </div>
          <h1>0-1 AI 产品落地能力</h1>
          <p className="hero-lede">
            我关注的是把 AI 能力变成可上线、可评估、可复用的产品方案：从需求识别、业务流程拆解、AI 方案设计，
            到原型验证、指标评估和跨团队推进。工程背景帮助我理解技术边界，但主线是 AI 产品从 0 到 1 的落地。
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#work">
              查看项目
              <ArrowRight size={18} />
            </a>
            <a className="button-secondary" href="mailto:lisongyang0130@gmail.com">
              <Mail size={18} />
              邮件联系
            </a>
          </div>
        </div>

        <aside className="profile-panel" aria-label="个人摘要">
          <div className="profile-head">
            <div className="avatar-visual" aria-hidden="true">
              李
            </div>
            <div>
              <p className="eyebrow">AI Product Manager</p>
              <h2>李松洋</h2>
              <p className="muted-row">
                <MapPin size={14} />
                南京 · 可远程协作
              </p>
            </div>
          </div>
          <div className="metric-grid">
            <div>
              <strong>3年</strong>
              <span>工作经验</span>
            </div>
            <div>
              <strong>2个</strong>
              <span>AI 项目落地案例</span>
            </div>
            <div>
              <strong>1套</strong>
              <span>0-1 产品方案</span>
            </div>
          </div>
          <div className="mini-product">
            <div>
              <span>当前重点</span>
              <strong>AI 产品经理 · 0-1 落地展示</strong>
            </div>
            <div className="progress-track">
              <span />
            </div>
          </div>
          <div className="tag-cloud">
            {capabilities.slice(0, 4).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </aside>
      </section>

      <section className="logo-strip" aria-label="关注方向">
        {['0-1 AI Product', '业务流程', 'LLM', 'RAG', 'Agent', '指标评测'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section id="work" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>精选项目</h2>
          <p>项目重点不放在“写了什么代码”，而是展示我如何把业务问题拆成 AI 产品方案，并推进到可验证的落地结果。</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={index === 0 ? 'project-card featured' : 'project-card'} data-testid="project-card" key={project.title}>
              <p className="project-label">{project.label}</p>
              <h3>{project.title}</h3>
              <div className="project-story">
                <p>
                  <strong>业务问题</strong>
                  {project.problem}
                </p>
                <p>
                  <strong>产品方案</strong>
                  {project.solution}
                </p>
                <p>
                  <strong>AI 能力组合</strong>
                  {project.ai}
                </p>
                <p>
                  <strong>落地结果</strong>
                  {project.result}
                </p>
              </div>
              <div className="project-metrics">
                {project.metrics.map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <a href="#contact">
                了解案例
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="articles" className="content-section article-section">
        <div className="section-heading">
          <p className="eyebrow">Writing</p>
          <h2>文章与产品思考</h2>
          <p>文章展示我对 AI 产品形态、Agent 长期协作和 Vibe Coding 工作流的判断。重点是产品方法，而不是开发经验本身。</p>
          <a className="section-link" href={woshipmProfileUrl} target="_blank" rel="noreferrer">
            人人都是产品经理主页
            <ExternalLink size={15} />
          </a>
        </div>
        <div className="article-grid">
          {articles.map((article) => (
            <article className="article-card" data-testid="article-card" key={article.title}>
              <div className="article-card-head">
                <span>
                  <BookOpenText size={17} />
                  {article.label}
                </span>
                <span>{article.sourceLabel}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <div className="article-tags">
                {article.tags.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
              <div className="article-status">
                <a
                  href={`#article-${article.slug}`}
                  aria-label={`阅读文章：${article.title}`}
                  onClick={() => setSelectedArticleSlug(article.slug)}
                >
                  阅读文章
                  <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
        {selectedArticle && (
          <article className="article-reader" id={`article-${selectedArticle.slug}`}>
            <div className="article-reader-head">
              <p className="eyebrow">Article</p>
              <h2>{selectedArticle.readerTitle}</h2>
              <div className="article-reader-actions">
                <a href={woshipmProfileUrl} target="_blank" rel="noreferrer">
                  人人都是产品经理主页
                  <ExternalLink size={15} />
                </a>
                {selectedArticle.sourceUrl && (
                  <a href={selectedArticle.sourceUrl} target="_blank" rel="noreferrer">
                    原文链接
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
            <div className="article-body">
              {selectedArticle.content.map((block, index) => {
                if (block.type === 'heading') {
                  return <h3 key={`${block.text}-${index}`}>{block.text}</h3>;
                }
                return (
                  <p className={block.type === 'lead' ? 'article-lead' : undefined} key={`${block.text}-${index}`}>
                    {block.text}
                  </p>
                );
              })}
            </div>
          </article>
        )}
      </section>

      <section id="about" className="about-section">
        <div>
          <p className="eyebrow">About</p>
          <h2>我关注的是把 AI 能力变成可上线、可评估、可复用的产品方案。</h2>
        </div>
        <div className="about-copy">
          <p>
            早期工程经历让我能理解系统边界、数据链路和研发协作成本；转向 AI 产品后，我更关注真实业务流程、用户操作路径、
            AI 能力边界、评测指标和上线后的持续迭代，而不是只展示模型能力。
          </p>
          <div className="about-cards">
            <div>
              <BriefcaseBusiness size={22} />
              <span>目标岗位</span>
              <strong>AI 产品经理</strong>
            </div>
            <div>
              <BadgeCheck size={22} />
              <span>优势</span>
              <strong>0-1 AI 产品落地</strong>
            </div>
            <div>
              <PenLine size={22} />
              <span>输出</span>
              <strong>原型、PRD、指标与复盘</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="capability" className="content-section capability-section">
        <div className="section-heading">
          <p className="eyebrow">Capability</p>
          <h2>能力矩阵</h2>
          <p>围绕 AI 产品从业务问题识别、场景边界定义、Agent/RAG 方案设计，到原型验证、指标体系和落地复盘组织。</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <div className="capability-card" key={item}>
              <Sparkles size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <p className="eyebrow">Contact</p>
        <h2>联系我</h2>
        <p>欢迎沟通 AI 产品经理机会。手机号不放在公网页面，如需完整简历可通过邮件联系。</p>
        <div className="contact-actions">
          <a className="button-primary" href="mailto:lisongyang0130@gmail.com">
            <Mail size={18} />
            lisongyang0130@gmail.com
          </a>
          <a className="button-secondary" href="https://github.com/Richard-Yang0130" target="_blank" rel="noreferrer">
            <Github size={18} />
            GitHub
          </a>
        </div>
      </section>

      <footer>
        <span>© 2026 李松洋</span>
        <span>
          <BarChart3 size={14} />
          Built for AI PM interviews · Company names redacted
        </span>
      </footer>
    </main>
  );
}
