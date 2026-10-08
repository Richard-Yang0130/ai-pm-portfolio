# Desktop 首屏制作规格

输入：参考原图 docs/design-references/elliothu-me-89338db7/root-8a5edab2/desktop.png；手机参考 mobile.png（终端旧截图需忽略其窗口，不复刻窗口溢出）。源 DOM 样式见 docs/research/elliothu-me-89338db7/root-8a5edab2/desktop-dom.html。

只修改 src/Desktop.jsx、src/desktop.css，其他源文件主 Agent 管理。
导出 default Desktop({ onOpen, onNavigate, music })；onOpen 名称：music/messages/notes/photos/terminal/reading/profile/projects。onNavigate：home/about/projects/memos/reading。music = { playing, elapsed, duration, track:{title,artist,cover}, onToggle, onNext, onPrevious }，可空默认。Dock GitHub/mail 外链固定真实邮箱账号。

asset 前缀 import.meta.env.BASE_URL + 'desktop/desktop/'；本地装饰 assets/decor/*.webp，icons apps/*.webp；字体另在 /desktop/fonts/，主 Agent 设置全局 @font-face。用真实照片 import.meta.env.BASE_URL+'profile/songyang.jpeg' 替换个人猫 Polaroid，文字 Li Songyang / 李松洋，不出现 Elliot。通用影视道具只做互动入口，点击打开个人信息/项目/文章，不复制原作者爱好文案。

INTERACTION MODEL：鼠标/触控拖动对象，轻点打开窗口；hover 角色换图；Dock hover 放大、标签，点击打开应用；原生滚动显示下一屏；不做点击冒充滚动切换。

## 全局
Desktop 是首屏 section，class desktop，position sticky; top:0; height:100svh; width:100%; overflow:clip; z-index:0; background source blue-400 oklch(.707 .165 254.624)。顶栏由主 Agent 设置34px，Desktop不要额外header。
clouds: position:absolute; top:80%; left:50%; width:calc(100vw + 1392px); max-width:none; transform:translate(-50%,-50%)。原图为渐变云图，加缓慢水平浮动（reduced-motion 关闭）。

## 姓名选框
section:absolute;top:calc(50% - 148px);left:0;h480;width100%;transform translateY(-50%);pointer-events:none。
问候 Hi, I am：Nudge Hand 40px,line48,tracking-1.2px,top134px,left50%,translateX(-50%)，画倾斜2px下划线。
标题容器：absolute top224px,left50%,translateX(-50%), padding32px, width:max-content。边框 cyan #36c5f0 2px，外扩8px。四角16px cyan、2px黑边、方块外角位置-16px。
h1 Songyang Li：Lofty Hero,180px,font700,line0.8,tracking.025em,white-space:nowrap。如果新名字更长允许名称字号少量调整以保持整体中部留白不碰装饰。
紫色身份标签 AI Product Manager：top160px,left calc(50% - 280px),rotate-10deg；绿色 Agents & Product：right calc(50% - 305px),bottom18px,rotate10deg。标签77px高，纸片49px高、margin-top28px、radius7.44px、font16/19.2px font600，badge41px, SVG code/cloud或brain，paperclip（lucide-react已安装）。

## 装饰（在一个对象场层内 absolute；source y 值是对象场。源对象场 padding top80 bottom100，为 desktop height - 150 左右，需参照原图）
Camera fujifilm-xpro3-silver.webp：top42.6px,left26.33%,w218px。
Macintosh macintosh-clean.webp：top60.12%,left9.21%,w250px。屏幕补绿色滚动终端文字，内容 SONGYANG/OS、agent runtime:ready、build useful things。不要混入 ELLIOT。
Tardis tardis-clean.webp：bottom28px,left62.96%,w176px。
Portrait:top51.01%,right6.8%,w215px，白色拍立得容器、照片用真实头像、旋转7度。
Demogorgon:top71.61%,left37.36%,w190px。默认 closed-clean，hover 切 open-clean。
Roadside kaili-bucket-figure-clean.webp：top37px,left52.84%,w158px。
Teotfw teotfw-beach-clean.webp：top25.78%,left7.02%,w230px；hover切holding-hands。
Objects 默认outline:none，但keyboard focus用清晰轮廓，pointer cursor:grab，move后避免误触点击；arrow keys 10px移动，Shift 20px；Enter打开。
悬停各道具上移5px、阴影0 14px 15px /20%，transition180ms。

## iPod
对象：top80px,right14.95%,w148px,rotate-4deg。ratio358/700; CSS金属外壳 rounded10px。背景 radial-gradient(circle at 50% 26%,rgb(255 255 255/.48),transparent42%),linear-gradient(211deg,#e2e2e2 4%,#aeaeae 95%)；box-shadow inset2px2px12pxwhite,inset0 0 16pxrgb(233 230 224/.5),inset4px -29px 52px rgb(46 45 45/.6),0 9px22pxrgb(0 0 0/.16)。texture本地 figpod/texture.webp overlay opacity.3。
屏幕 absolute top3.43%,left4.47%,h49.71%,w91.06%,border4px #050505，dark background。头条 Now playing 7px；展示传入cover/title/artist/time；点屏幕 onOpen(music)。
滚轮坐标 top56.38%,left12.07%,w75.98%,h38.84%,白色圆盘，使用本地figpod/icon-1.svg（原轮盘）；中心select白/银圆盘，边上 MENU（onOpen music）、previous/next/play按传入music调用，不能有假播放。

## Dock
absolute left50%,bottom10px translateX(-50%),玻璃底radius20px;border1px white/.4,padding10px;background rgba(210,210,210,.58);backdrop-filterblur20px;shadow0 1px 8pxrgb(0 0 0/.35),0 0 24pxrgb(0 0 0/.24)。11个图标，基础43px，格width52px,gap6px，hover scale1.2，邻近的适度scale即可，不加库；tooltip小字黑白。
顺序Music（itunes）,Mail,Messages,Notes,Photos,Terminal,Blog（pages）,Projects（自定义简洁蓝色项目图标，不用open-compute品牌）,GitHub,公众号（自定义绿图标）,小红书（自定义红图标）。Mail href mailto:lisongyang0130@gmail.com；GitHub href https://github.com/Richard-Yang0130。公众号/小红书onOpen(profile)，profile只展示用户真实账号名。
所有 Dock 按钮 aria-label 用上述英文 Music/Messages/Notes/Photos/Terminal/Blog/Projects，公众号和小红书中文。click app反弹 animation220ms。

## 响应式
900px以下：stageTop50%,stageHeight270px，Hi top24px32/38，title top83px p16，fontclamp(70px,17vw,120px)（新姓名更长），身份标签隐藏。
Objects 改 grid，top区域四列：camera/roadside/teotfw/ipod；底部区域 macintosh/demogorgon/tardis/portrait，留足标题空间。camera82px，roadside56px，teotfw100px，ipod58px（内部画布148px缩放.392）；macintosh92px,demogorgon70px,tardis54px,portrait88px。
Dock宽度不得超过viewport-16px；390px图标约25px、格30px,gap3px,p8px。顶栏占34px，由主Agent控制。
高度600px以下缩小object和名字，用clamp避免中心标题/顶部标签碰撞。

## 验收
Desktop不依赖不存在的内容模块或远程接口；所有资源存在；模块可被 App 导入。给拖动/点击判断补一个小行为测试，或可复用assert测试（不需要图形布局断言）。沿用 Vitest。运行npm run build确认编译后汇报改动文件与注意点。不要提交Git，不改App/全局样式/内容/文章。
