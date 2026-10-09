# 李松洋的个人桌面

李松洋的个站，发布地址：[richard-yang0130.github.io/ai-pm-portfolio](https://richard-yang0130.github.io/ai-pm-portfolio/)。

借鉴桌面式个站的交互，围绕李松洋的 AI 产品、评测与内容创作重新设计视觉：白纸拼贴、黄色姓名笔刷、粉色手绘标记与纸片 Dock，保留原创电脑、芯片、评测镜头、纸稿和 iPod。页面不使用个人头像、参考作者内容或影视摆件。个人简介、文章和六项项目来自现有站点与最新版简历。

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

11 项测试覆盖项目清单、文章深链接、窗口、焦点、终端、摆件拖动与视口变更。本次用 Ego 验证 1774×887、390×844、320×568 和 844×390，涵盖窗口拖动/最小化/放大、iPod 播放/暂停/进度/音量、站内阅读和项目详情。静态产物位于 `dist/`，现有 GitHub Pages 使用 `gh-pages` 分支。

## 更新内容

- `src/content.js`：个人简介、六项项目、便笺、用户提供的本地背景音乐。项目带详情，ModelLens 有公开仓库入口。
- `src/articles.js`：原有两篇文章，支持 `#article-<slug>` 直达阅读窗口。
- `public/desktop/paper/`：用户确认的拼贴图与拖动时使用的透明遮罩；坐标与来源见 `docs/design/approved-homepage.md`。
- `public/desktop/original/`：图库继续使用的三张内置 imagegen 原创透明插画及完整提示词。
- `public/projects/`：实际内容成果。ModelLens、Aevis 等项目采用本站原创图示，页面不放人物头像。
- 公众号「洋说 AI」和小红书「需求与 Agent」展示真实账号名；收到准确入口后可在个人窗口加链接。

来信会在访客自己的邮件应用中打开，由访客确认发送。便笺是个人内容，本版没有公共留言数据库。终端是站内导航与个人介绍，可以输入 `help`、`whoami`、`projects`、`reading`、`contact`、`about`、`open`、`clear`。

当前视觉对照见 `design-qa.md`，素材来源和历次验证保存在 `docs/design/` 与 `docs/research/`。旧的 `/cases/unstress/` 地址保留供历史链接使用；首页项目采用当前简历中的 Aevis。

背景音乐为用户提供的 ROSÉ《toxic till the end》MP3，保留 iPod 控件和单曲循环。

iPod 与音乐窗口使用歌曲对应的《rosie》官方专辑封面，来源记录：docs/research/music/cover-source.json。
