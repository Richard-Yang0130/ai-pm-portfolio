export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: '李松洋',
  englishName: 'Songyang Li',
  role: 'AI 产品经理 · 独立创作者',
  email: 'lisongyang0130@gmail.com',
  github: 'https://github.com/Richard-Yang0130',
  description: '做 AI 产品，也自己动手把想法做成工具。我关注 Agent、模型评测和 AI 内容生产，喜欢从真实问题出发，弄清楚它该怎么用，再把产品做出来、测清楚。',
};

export const projects = [
  {
    id: 'technical-support', group: 'work', category: 'ENTERPRISE · AGENT / RAG',
    title: '华创智擎技术支持平台', shortTitle: '可信技术支持', symbol: '✳',
    description: '把知识问答、权限控制和人工工单协作串成完整的技术支持流程。',
    role: 'AI 产品负责人', tags: ['可信问答', '权限边界', 'Bad Case 复盘'],
    problem: '硬件产品资料、历史工单和专家经验分散，技术答疑大量重复。客户需要的不只是一段答案，还包括依据、适用条件和下一步处理方式。',
    approach: ['设计客户自助门户与内部多角色工作台，把选型咨询、参数查询、故障问诊和工单协作放进同一个产品架构。', '组合结构化参数查询、关键词与向量检索，回答保留引用；权限不足、资料冲突和高风险判断交给人工。', '把问答失败、转人工和知识缺口放进 Bad Case 复盘，让 FAE 维护知识候选、QA 执行评测回归。'],
    result: '跑通“客户提问—AI 处理—人工兜底—工单流转—知识回流”的闭环，沉淀分层评测与知识运营机制。',
    thumbnail: 'support',
  },
  {
    id: 'compliance', group: 'work', category: 'ENTERPRISE · HUMAN + AI',
    title: 'AI 合规审核数字员工', shortTitle: 'AI 合规审核', symbol: '✓',
    description: '让 AI 做首轮筛查，让法务围绕风险、证据和规则做最终判断。',
    role: 'AI 产品负责人', tags: ['风险分级', '人机协同', '审计留痕'],
    problem: '海报、公众号、官网和招标材料有不同审核规则。逐字逐图扫描耗时，沟通与修改记录也难以持续追踪。',
    approach: ['按四类物料梳理提交、规则匹配、问题标记、修改反馈与发布流程。', '统一输出命中规则、问题证据、风险等级和修改建议，高风险及依据不足的内容进入人工复核。', '把法务反馈分成采纳、误报和漏报，持续校正规则与评测样本，并沉淀运营交接 SOP。'],
    result: '形成 AI 筛查、法务复核、反馈回流的审核流程；规则维护和版本回归可以由业务与 QA 持续执行。',
    thumbnail: 'compliance',
  },
  {
    id: 'embedded', group: 'work', category: 'EMBEDDED · RELIABLE SYSTEMS',
    title: '机载雷达嵌入式高可靠系统', shortTitle: '嵌入式高可靠系统', symbol: '⌘',
    description: '从驱动和中间件，到现场升级、回滚与异常恢复，照顾真实硬件的约束。',
    role: '软件模块负责人', tags: ['分层架构', '跨平台复用', '现场验证'],
    problem: '多个硬件平台和频繁更换的外设需要共用软件；裸 NAND、掉电、存储寿命和现场升级都带来实际约束。',
    approach: ['按硬件抽象、驱动、中间件和应用接口划分职责，统一设备接口、错误码、超时与重入规则。', '完成 UART、I2C、SPI 和 NAND 适配，处理 DMA、中断、缓冲、ECC 和总线仲裁。', '把现场问题转成可复现用例，通过掉电、连续读写和多分区并发场景完成系统验证与回归。'],
    result: '形成可跨硬件平台复用的软件体系，以及部署、现场升级、回滚和问题闭环的完整方案。',
    thumbnail: 'embedded',
  },
  {
    id: 'aevis', group: 'personal', category: 'AI HEALTH · PRODUCT DESIGN',
    title: 'Aevis', shortTitle: 'Aevis', symbol: 'a',
    description: '从健康数据到 AI 对话、行动计划和周期复盘，让压力管理回到日常生活。',
    role: 'AI 产品方向设计', tags: ['压力归因', '个性化计划', '产品验证'],
    problem: '压力管理产品常停在指标展示和冥想音频，用户仍然不知道压力来自哪里，也难以判断行动是否有效。',
    approach: ['围绕多源健康数据、本地智能引擎和 LLM 推理设计个性化压力管理体验。', '把压力解释、计划生成、执行反馈和周期复盘连起来，明确核心体验与数据边界。', '规划免费与订阅权益，并通过种子用户反馈调整 AI 对话和计划执行的体验。'],
    result: '完成产品定位、核心体验和验证方案，围绕“分析—计划—执行—反馈”建立迭代路径。',
    thumbnail: 'aevis',
  },
  {
    id: 'modellens', group: 'personal', category: 'OPEN SOURCE · MODEL EVALUATION',
    title: 'ModelLens', shortTitle: 'ModelLens', symbol: 'M',
    description: '用自己的业务测试集比较模型，把质量、稳定性、成本和延迟放到一起看。',
    role: '产品负责人', tags: ['LLM-as-a-Judge', '匿名 A/B', 'Pareto 分析'],
    problem: '多窗口手动试模型，输入、参数和评分标准往往不一致。单次回答和品牌印象很容易左右选型判断。',
    approach: ['建立“评测集—实验控制—多维评分—人工复核—指标分析—选型报告”的流程，保留实验参数快照。', '组合规则评分、LLM-as-a-Judge、人工复核和匿名 A/B 盲测，允许按业务定义 Rubric 和权重。', '同时看质量、通过率、分数波动、成本与 P95 延迟，用约束筛选和 Pareto 分析帮助做决定。'],
    result: '完成可自部署的文本模型评测与选型工具，支持重复运行、结果复核和选型报告。',
    url: 'https://github.com/Richard-Yang0130/modellens',
    thumbnail: 'modellens',
  },
  {
    id: 'content-system', group: 'personal', category: 'CREATOR TOOLS · CONTENT WORKFLOW',
    title: 'AI 内容价值判断与多平台自动化运营系统', shortTitle: 'AI 内容工作流', symbol: '洋',
    description: '从资讯筛选和选题，到图文、视频与平台内容包，让每一步都有材料可检查。',
    role: '独立产品 / 开发者', tags: ['信息价值判断', '图文与视频', '多平台运营'],
    problem: '内容运营最花时间的，是判断什么值得写、从什么角度写，以及怎样适配不同平台。采集更多信息并不能直接解决它。',
    approach: ['对信息源分级，结合时效、可信度、观点增量、证据和受众相关性判断价值，处理重复与低质量内容。', '将零散信号归并成主题，生成观点、切口、来源和不同平台的内容版本，保留发布前的人工确认。', '衔接配图、配音、字幕、视频编排和公众号草稿回读，交付可检查的文章、图文和视频素材。'],
    result: '同一套选题与生产能力复用于“洋说 AI”公众号和“需求与 Agent”小红书内容。',
    image: asset('projects/content-cover.png'),
    imageCaption: '内容工作流实际产出的图文封面。',
    thumbnail: 'content',
  },
];

export const notes = [
  { title: 'Hi, I’m Songyang!', text: '这里是我的小桌面。看看项目、读读文章，也可以给我写封信。', color: 'yellow', rotation: -7 },
  { title: '先想清楚，再动手', text: '做 Vibe Coding，也要先确定产品形态、运行环境、数据存储和 MVP 边界。', color: 'pink', rotation: 6 },
  { title: 'Agent 要走进流程', text: '可信问答只是起点。权限、人工接管、工单和反馈，都得一起工作。', color: 'blue', rotation: -4 },
  { title: '把模型测清楚', text: '质量、波动、成本和延迟放在一起看，才能做出可复核的选型决定。', color: 'green', rotation: 8 },
];

export const tracks = [
  { title: 'toxic till the end', artist: 'ROSÉ', cover: asset('desktop/original/evaluation-lens.png'), src: asset('audio/toxic-till-the-end.mp3') },
];
