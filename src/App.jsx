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
    label: '01 / Agent Workflow',
    title: '企业级智能表格处理助手',
    summary:
      '面向企业内部竞标和产品规划场景，拆解多源 Excel 清洗、拼接、异常标记与查询需求，基于 Dify 搭建“自然语言指令 + Agent 自动处理 + 结果可追溯”的工作流。',
    metrics: [
      ['70%→93%', '清洗准确率'],
      ['600+', '月均处理表格'],
      ['20%', '数据准备时间缩短'],
    ],
  },
  {
    label: '02 / RAG + LLM',
    title: '智能审核数字员工',
    summary:
      '针对企业外宣物料审核流程，联合业务部门梳理 200+ 条审核规则，设计 RAG + LLM + OCR 的多模态审核链路，并输出可解释驳回理由。',
    metrics: [
      ['5天→1天', '审核周期'],
      ['0', '违规漏检率'],
      ['200+', '审核规则'],
    ],
  },
  {
    label: '03 / AI Product Design',
    title: 'AI 穿戴压力管理系统 Unstress',
    summary:
      '调研 12+ 款压力与健康管理竞品，围绕来源识别、个性化干预和预测预警定义产品闭环，设计 HRV、心率、睡眠等数据链路和规则引擎 + LLM 推理方案。',
    metrics: [
      ['12+', '竞品调研'],
      ['9类', '生理数据'],
      ['14天', '个人基线'],
    ],
  },
];

const capabilities = [
  'AI 项目 0-1',
  'Agent 工作流设计',
  'RAG 产品设计',
  'Dify 原型验证',
  '评测指标设计',
  '跨团队推进',
  '技术背景转产品判断',
];

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
          <h1>把技术背景转化为 AI 产品落地能力</h1>
          <p className="hero-lede">
            我从嵌入式研发转向 AI 产品，关注 LLM、RAG、Agent 与企业提效场景。
            已主导企业级智能表格处理助手、智能审核数字员工落地，并独立完成 AI 穿戴压力管理系统 Unstress 的产品方案。
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
              <span>企业 AI 落地项目</span>
            </div>
            <div>
              <strong>1套</strong>
              <span>AI 产品完整方案</span>
            </div>
          </div>
          <div className="mini-product">
            <div>
              <span>当前重点</span>
              <strong>AI 产品经理 · 项目落地展示</strong>
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
        {['AI Product', 'LLM', 'RAG', 'Agent', 'Dify', 'Vibe Coding'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section id="work" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>精选项目</h2>
          <p>项目来自真实简历经历，已去除公司名称与私人手机号，仅保留可公开的项目名称、职责和结果指标。</p>
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
          <h2>某硬科技企业：嵌入式软件开发工程师 → AI 产品经理。</h2>
        </div>
        <div className="about-copy">
          <p>
            早期负责 Linux/ReWorks 底层驱动适配、通信协议栈和数据采集应用开发，积累了从技术问题定位到跨团队联调的工程经验。
            转向 AI 产品后，我更关注真实业务流程、工具边界、评测指标和上线后的持续迭代，而不是只展示模型能力。
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
              <strong>工程背景 + 产品落地</strong>
            </div>
            <div>
              <PenLine size={22} />
              <span>输出</span>
              <strong>原型、PRD、评测与复盘</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="capability" className="content-section capability-section">
        <div className="section-heading">
          <p className="eyebrow">Capability</p>
          <h2>能力矩阵</h2>
          <p>围绕 AI 产品从需求识别、原型验证、Agent/RAG 方案设计，到灰度测试和数据指标跟踪组织。</p>
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
