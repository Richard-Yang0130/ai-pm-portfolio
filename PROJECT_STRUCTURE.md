# 项目结构

```text
.
├── index.html                   # Vite HTML 入口
├── package.json                 # 脚本、依赖和项目信息
├── vite.config.js               # Vite、React、Vitest 和 Pages base 配置
├── tailwind.config.js           # Tailwind 扫描路径和字体配置
├── postcss.config.js            # Tailwind/PostCSS 配置
├── public/
│   └── cases/
│       └── unstress/
│           └── index.html       # Unstress 案例介绍静态页
├── src/
│   ├── App.jsx                  # 单页作品集主体
│   ├── App.test.jsx             # 首页核心内容验收测试
│   ├── articles.js              # 文章卡片和站内阅读正文数据
│   ├── main.jsx                 # React 挂载入口
│   ├── styles.css               # 全局样式和响应式布局
│   └── test/setup.js            # Vitest DOM matcher 初始化
└── README.md                    # 开发、验证和部署说明
```

## 模块说明

- `src/App.jsx`：按 Hero、项目作品、文章展示、关于、能力、联系、页脚组织页面内容。
- `src/articles.js`：维护文章元信息、正文块、人人都是产品经理主页和可选原文链接。
- `src/styles.css`：集中管理 Apple 风格视觉、卡片、按钮、响应式断点。
- `public/cases/unstress/index.html`：从 Unstress 面试展示 demo 拷贝来的独立案例页，构建后可通过 `/ai-pm-portfolio/cases/unstress/` 打开。
- `gh-pages` 分支：发布 `dist` 构建产物，用于 GitHub Pages。
- `.superpowers/`：brainstorming 临时可视化文件，已加入 `.gitignore`，不参与部署。
