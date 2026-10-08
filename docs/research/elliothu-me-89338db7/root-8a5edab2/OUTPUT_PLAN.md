# 个站改版范围

参考：https://elliothu.me/
目标：李松洋 GitHub Pages 个站 /ai-pm-portfolio/，保留 Vite、React、既有站内文章和旧案例 URL。
根目录：outputs/personal-site，独立 Git worktree，分支 codex/desktop-portfolio。

用户已指定一比一复刻外观，内容按最新版简历六项项目；这构成设计方向和首页改版的授权。

## 页面
- 首屏：蓝天、流动云朵、手写问候、压缩大标题 Songyang Li、两个身份标签、原版桌面道具的布置与拖动、可点选的 iPod、玻璃 Dock。作者头像和个人照片替换为李松洋真实照片；所有作者履历/作品/文章/联系地址替换。通用摆件用作装饰，不作为个人爱好陈述。
- 滚动区：超大自我介绍、带编辑选择框的倾斜个人简介和经历、彩色波浪底的文件夹项目卡片。
- 项目：华创智擎技术支持平台、AI 合规审核数字员工、机载雷达嵌入式高可靠系统；Aevis、ModelLens、AI 内容价值判断与多平台自动化运营系统。按企业产品与个人项目两组呈现，卡片点开真实项目详情。
- 便笺与文章：个人内容便笺；已有两篇文章正文保留，文章可以站内阅读。没有外部数据的访客来信通过邮件编辑器交给访客确认发送。
- 窗口：Music、Messages、Notes、Photos、Terminal、项目与文章；支持打开、拖动、关闭、最小化、放大、Escape 和键盘可访问性。
- 终端：help/whoami/projects/reading/contact/clear/navigation，浏览器内命令，不执行任意代码。
- 音乐：本站本地氛围音轨，支持播放暂停、切歌、进度和音量，不声称是用户收藏。

## 约束
- 沿用已有 GitHub Pages base，所有资产本地路径，不依赖参考站运行时或业务 API。
- 六项项目来自最新简历；不增加简历之外的项目、不捏造 Aevis 实机截图、不转用 Elliot 的肖像和作品。
- 沿用原站公开邮箱和 GitHub；公众号/小红书只有名称，展示为账号名称，不捏造 URL。
- 手机号不进入公开源码/简历下载；公开简历不额外复制。
- 390/768/1440 三种宽度验证，窗口在小屏幕内，reduced-motion 生效。

## 实施位置
- src/Desktop.jsx, src/desktop.css：首屏桌面（独立 Agent）。
- src/App.jsx, src/styles.css：滚动内容、应用窗口与集成（主 Agent）。
- src/content.js：经过核实的个人资料与六项项目。
- src/articles.js：沿用。
- src/App.test.jsx：更新旧验收，加入窗口、终端与项目事实的行为测试。
- public/desktop, public/profile, public/projects, public/audio：冻结本地素材。
- index.html, README.md, PROJECT_STRUCTURE.md：用户身份和运行说明。

## 验收
构建和单元行为通过；Ego 验证首屏/滚动/窗口/拖动/音乐/终端/文章和三种视口；生成可审查截图，再提交 GitHub 代码与 Pages 发布，确认线上内容。
