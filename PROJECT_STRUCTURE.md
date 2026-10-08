# 项目结构

```text
src/
  App.jsx             页面、个人内容区与应用内容
  Desktop.jsx         首屏、可拖动摆件、iPod 和 Dock
  Window.jsx          窗口拖动、交通灯、焦点与最小化
  content.js          个人资料、简历六项目、便笺、音轨
  articles.js         已有文章元信息与正文
  styles.css          页面、应用窗口与响应式样式
  desktop.css         原创桌面、动效与响应式
  App.test.jsx        内容、文章、终端、窗口和焦点回归
  Desktop.test.jsx    拖动/点击、resize、Dock、素材验收
  main.jsx            React 入口
  test/setup.js       DOM matcher
public/
  desktop/            原创插画、完整提示词、通用字体
  projects/           个人内容成果
  audio/              两首本地氛围音轨
  favicon.svg         个站图标
  cases/unstress/     兼容旧的案例路径
docs/
  research/           页面规格、交互、素材来源和验证
  superpowers/plans/  本次实施记录
```

保留原项目 React / Vite / lucide-react / Vitest 依赖与 Pages base，没有增加运行时依赖。每个应用窗口在最小化时保留状态；焦点进入时置顶；小屏幕下保持窗口与 Dock 在视口内。所有运行时图片、字体和音轨在本地，不调用参考站的业务接口。
