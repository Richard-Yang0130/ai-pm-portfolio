# 李松洋的个人桌面

李松洋的个站，发布地址：[richard-yang0130.github.io/ai-pm-portfolio](https://richard-yang0130.github.io/ai-pm-portfolio/)。

视觉参考 [Elliot Hu](https://elliothu.me/)，保留桌面摆件、iPod、Dock、应用窗口、手写标签和文件夹项目卡片的布局。个人身份、头像、简介、文章和六项项目来自李松洋的现有站点与最新版简历。

## 本地运行

```bash
npm ci
npm run dev
```

打开终端显示的 `/ai-pm-portfolio/` 地址。

## 验证与生产包

```bash
npm test
npm run build
npm run preview
```

9 项测试覆盖项目清单、文章深链接、窗口、焦点、终端、摆件拖动与视口变更。已用 Ego 验证 1440、768、390 三种视口、窗口拖动/最小化/放大、音轨播放/切换、站内阅读和项目详情。静态产物位于 `dist/`，现有 GitHub Pages 使用 `gh-pages` 分支。

## 更新内容

- `src/content.js`：个人简介、六项项目、便笺、两首本地氛围音轨。项目带详情，ModelLens 有公开仓库入口。
- `src/articles.js`：原有两篇文章，支持 `#article-<slug>` 直达阅读窗口。
- `public/profile/`：本人头像；`public/projects/`：ModelLens 产品概览与实际内容成果。Aevis 等没有实际图片的项目用方案示意。
- 公众号「洋说 AI」和小红书「需求与 Agent」展示真实账号名；收到准确入口后可在个人窗口加链接。

来信会在访客自己的邮件应用中打开，由访客确认发送。便笺是个人内容，本版没有公共留言数据库。终端是站内导航与个人介绍，可以输入 `help`、`whoami`、`projects`、`reading`、`contact`、`about`、`open`、`clear`。

研究记录、视觉参考、素材来源和验证结果保存在 `docs/research/` 与 `docs/design-references/`。旧的 `/cases/unstress/` 地址保留供历史链接使用；首页项目采用当前简历中的 Aevis。
