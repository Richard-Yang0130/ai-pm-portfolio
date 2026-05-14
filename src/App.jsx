import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Github,
  Mail,
  MapPin,
  PenLine,
  Sparkles,
} from 'lucide-react';

const projects = [
  {
    label: '01 / RAG Product',
    title: '企业知识库 AI 助手',
    summary: '从 0 到 1 设计知识召回、权限边界和反馈闭环，面向销售、客服与运营团队沉淀可复用问答能力。',
    metrics: [
      ['78%', '高频问题自动解决'],
      ['12+', '业务知识域'],
      ['4w+', '月活跃查询'],
    ],
  },
  {
    label: '02 / Agent Workflow',
    title: '多步骤任务 Agent',
    summary: '把复杂流程拆成可观测节点，定义人工确认点、失败兜底和结果评估，降低业务人员使用门槛。',
    metrics: [
      ['35%', '流程处理提效'],
      ['8', '核心任务链路'],
    ],
  },
  {
    label: '03 / AI Evaluation',
    title: 'LLM 评测与发布体系',
    summary: '建立数据集、人工标注、自动评测和灰度发布机制，让 AI 能力迭代从经验判断走向可验证决策。',
    metrics: [
      ['1200+', '评测样本'],
      ['5', '质量维度'],
    ],
  },
];

const capabilities = ['LLM 应用定义', 'RAG 架构协作', 'Agent 流程设计', '数据分析', '产品评测', '跨团队推进'];

const navItems = [
  ['作品', '#work'],
  ['关于', '#about'],
  ['能力', '#capability'],
  ['联系', '#contact'],
];

export default function App() {
  return (
    <main className="site-shell antialiased">
      <div className="background-grid" aria-hidden="true" />
      <nav className="top-nav" aria-label="主导航">
        <a className="brand" href="#top" aria-label="Richard Yang 首页">
          <span className="brand-mark">R</span>
          <span>Richard Yang</span>
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
            Available for 2026 · AI 产品经理求职中
          </div>
          <h1>把 AI 能力变成可交付产品</h1>
          <p className="hero-lede">
            我关注 LLM 应用、RAG、Agent 和企业智能化落地。这个作品集用于展示我的产品判断、
            项目拆解能力和从问题定义到上线验证的完整方法。
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#work">
              查看项目
              <ArrowRight size={18} />
            </a>
            <a className="button-secondary" href="mailto:hello@example.com">
              <Mail size={18} />
              邮件联系
            </a>
          </div>
        </div>

        <aside className="profile-panel" aria-label="个人摘要">
          <div className="profile-head">
            <div className="avatar-visual" aria-hidden="true">
              R
            </div>
            <div>
              <p className="eyebrow">AI Product Manager</p>
              <h2>Richard Yang</h2>
              <p className="muted-row">
                <MapPin size={14} />
                Shanghai · Remote
              </p>
            </div>
          </div>
          <div className="metric-grid">
            <div>
              <strong>3+</strong>
              <span>AI 项目</span>
            </div>
            <div>
              <strong>6</strong>
              <span>核心能力</span>
            </div>
            <div>
              <strong>2026</strong>
              <span>求职目标</span>
            </div>
          </div>
          <div className="mini-product">
            <div>
              <span>当前重点</span>
              <strong>AI 产品经理作品集</strong>
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
        {['AI Product', 'LLM', 'RAG', 'Agent', 'Evals', 'B2B SaaS'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section id="work" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>精选项目</h2>
          <p>先用占位项目展示结构，后续可以替换为真实公司、产品、数据和案例链接。</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={index === 0 ? 'project-card featured' : 'project-card'} data-testid="project-card" key={project.title}>
              <p className="project-label">{project.label}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
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

      <section id="about" className="about-section">
        <div>
          <p className="eyebrow">About</p>
          <h2>我做的不是 AI 玩具，而是能被业务使用的产品。</h2>
        </div>
        <div className="about-copy">
          <p>
            我会从用户任务、业务约束和上线后的衡量指标出发定义 AI 产品，而不是只追模型能力。
            对我来说，好的 AI 产品需要清晰边界、稳定体验、可解释反馈和可持续迭代机制。
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
              <strong>问题定义与落地验证</strong>
            </div>
            <div>
              <PenLine size={22} />
              <span>输出</span>
              <strong>PRD、案例、复盘</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="capability" className="content-section capability-section">
        <div className="section-heading">
          <p className="eyebrow">Capability</p>
          <h2>能力矩阵</h2>
          <p>围绕 AI 产品从 0 到 1、从验证到上线所需的关键能力组织。</p>
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
        <p>欢迎沟通 AI 产品经理机会、项目案例或作品集内容替换。</p>
        <div className="contact-actions">
          <a className="button-primary" href="mailto:hello@example.com">
            <Mail size={18} />
            hello@example.com
          </a>
          <a className="button-secondary" href="https://github.com/Richard-Yang0130" target="_blank" rel="noreferrer">
            <Github size={18} />
            GitHub
          </a>
        </div>
      </section>

      <footer>
        <span>© 2026 Richard Yang</span>
        <span>
          <BarChart3 size={14} />
          Built for AI PM interviews
        </span>
      </footer>
    </main>
  );
}
