# 参考站交互记录

实际在 Ego TaskSpace 17 查看。页面 #home 是 100svh 内部纵向滚动容器，主桌面 sticky top:0；页面总高约 10441px（原作者项目数量不同，改版按六项目决定高度）。顶栏 34px，玻璃背景。Dock 位于桌面底部 10px，外壳 20px 圆角，图标 43px、基础格 51.6px；hover 放大并显示标签，点击启动对应窗口。

首屏对象支持拖动，点击进入窗口；camera hover 上移 5px/180ms；怪物 hover 由闭合图切到张开图/180ms；海边两人切到牵手图/320ms；iPod hover 上移 5px。背景 clouds 位置 top:80%, left:50%, width:100vw+1392px；页面蓝色 #4c9bfb 附近（实际 CSS blue-400 使用 oklch）。

Introduction 桌面：top:calc(50% - 148px), height:480px, translateY(-50%)；问候 font Nudge Hand/40px line48, top134；标题字体 Lofty Hero,180px line0.8 tracking.025em，标题容器top224/padding32，选择框外扩8px；四角16px方块。标签分别紫/青柠，倾斜、纸夹图标，900px以下隐藏。

手机/平板：900px下简介垂直居中、h270；问候32px，标题clamp(82px,20vw,120px)；摆件改为四列三行 grid；Dock 适配到视口；菜单品牌折叠顶部导航，保留社交入口。原站终端在390px下存在越界；实现将窗口限制在视口内。

滚动触发介绍文字的逐段揭示和卡片轻微倾斜；个人简介居于白底，800px max-width,85vw；项目背景为 sky-200/amber-200/pink-200/emerald-200，各组标题为手写字体带选择框，文件夹卡片白底，宽472、高354左右，两列，780px下单列。

Notes 打开 Message Board 带可拖动便笺；Terminal 打开黑色macOS窗口，顶部交通灯（Close/Minimize/Zoom），输入框支持命令。窗口应先等待打开完成再截图。
