# Desktop Portfolio Implementation Plan

> **For agentic workers:** 主 Agent 集成页面和窗口；独立 Agent 只制作 Desktop 模块，避免共享状态冲突。

**Goal:** 将现有 GitHub Pages 个站复刻为参考桌面体验，并按李松洋最新简历替换个人内容。
**Architecture:** 保留 React/Vite 及 /ai-pm-portfolio/ base。Desktop 渲染装饰与 Dock，通过 onOpen 回调调用 App 中的窗口；数据统一放在 content.js，旧文章沿用。
**Tech Stack:** 已安装 React, Vite, lucide-react, Vitest；原生 Pointer Events、Audio、IntersectionObserver。

- [x] 读取现有站、Git 状态、最新版简历；运行旧版npm test及npm run build。
- [x] Ego抓取1440/768/390参考、交互和本地冻结素材。
- [x] 更新 src/App.test.jsx，先验证新版项目清单和窗口/终端的缺失失败。
- [x] 制作 Desktop.jsx/desktop.css；App.jsx/styles.css/content.js实现滚动区、窗口、文章和项目详情；用原生 audio 播放本地音轨。
- [x] npm test与npm run build；Ego查看三视口，交互验证窗口/拖动/音乐/终端/文章/导航，按实际问题修复。
- [x] 更新README、PROJECT_STRUCTURE、meta；提交分支，合入现有仓库，发布gh-pages，等待线上返回新页面后确认。
