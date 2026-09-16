# React Bits 集成

当前蓝白版本实际使用 **18 种 React Bits 效果**，同时保留 Animate UI 的导航、Tabs、FAQ、按钮及照片交互。

官方来源：https://github.com/DavidHDev/react-bits

固定版本：`64cbf950620eb40b7ab5d692d12f29a2fe9dc121`。采用官方 TypeScript + CSS 源码，保存在 `src/components/react-bits/`，沿用项目已有的 Motion 与 OGL，新增 GSAP 用于 ScrollReveal 和 PixelTransition。

| 效果            | 页面中的位置                         | 上游源码（相对 `src/ts-default/`）                 |
| --------------- | ------------------------------------ | -------------------------------------------------- |
| Particles       | 桌面首屏蓝色粒子背景                 | `Backgrounds/Particles/Particles.tsx`              |
| BlurText        | 首屏“江西财经大学”逐字清晰出现       | `TextAnimations/BlurText/BlurText.tsx`             |
| GradientText    | “计算机协会”蓝色渐变标题             | `TextAnimations/GradientText/GradientText.tsx`     |
| Magnet          | “了解计协”按钮轻量磁吸               | `Animations/Magnet/Magnet.tsx`                     |
| ScrollVelocity  | 首屏下方随滚动速度变化的蓝色文字横幅 | `TextAnimations/ScrollVelocity/ScrollVelocity.tsx` |
| CountUp         | 成立年份与部门数量进入视口后增长     | `TextAnimations/CountUp/CountUp.tsx`               |
| DecryptedText   | 部门 Tabs 内的英文名称解密出现       | `TextAnimations/DecryptedText/DecryptedText.tsx`   |
| SpotlightCard   | 部门、协会介绍与知识分享卡片聚光     | `Components/SpotlightCard/SpotlightCard.tsx`       |
| StarBorder      | 加入区块按钮的流动边框               | `Animations/StarBorder/StarBorder.tsx`             |
| Aurora          | 协会介绍和联系页极光横幅             | `Backgrounds/Aurora/Aurora.tsx`                    |
| CircularText    | 协会会徽周围的旋转文字               | `TextAnimations/CircularText/CircularText.tsx`     |
| ScrollReveal    | 协会宗旨随滚动逐字显现               | `TextAnimations/ScrollReveal/ScrollReveal.tsx`     |
| GlareHover      | 部门详情卡片的斜向扫光               | `Animations/GlareHover/GlareHover.tsx`             |
| TiltedCard      | 活动照片的 3D 倾斜和悬浮标签         | `Components/TiltedCard/TiltedCard.tsx`             |
| PixelTransition | 成员照片和介绍的像素翻转             | `Animations/PixelTransition/PixelTransition.tsx`   |
| LogoLoop        | 友情链接页的伙伴循环带               | `Animations/LogoLoop/LogoLoop.tsx`                 |
| RotatingText    | 知识分享页的主题轮换                 | `TextAnimations/RotatingText/RotatingText.tsx`     |
| ShinyText       | 博客导语和招新交流标签的流光         | `TextAnimations/ShinyText/ShinyText.tsx`           |

## 内页扩展适配

- 8 个内页使用大标题、编号、蓝白横幅和不同的内容布局。正文、图片、成员信息、友链地址与文章继续使用原始迁移内容。
- 暂停按钮现在由 SiteMotionProvider 统一管理，应用内切换页面时保留设置；matchMedia change 事件实时响应系统减少动态效果偏好，无需刷新。
- Aurora 在 801px 以上、位于视口附近且允许动效时按需挂载，像素比为 1；窗口变化使用 ResizeObserver，卸载释放 WebGL 对象。CircularText、LogoLoop、RotatingText、ShinyText 在离屏或后台暂停。
- ScrollReveal 支持中文逐字分割，用独立 GSAP context 清理自身动画和 ScrollTrigger，不影响其他组件。暂停时还原为完整静态文字。
- PixelTransition 使用 6×6 网格，支持鼠标悬停、触屏点击、Enter/Space 切换和 Escape 返回。减少动态效果时立即切换；卸载清理补间及延迟调用。
- TiltedCard 在触屏关闭倾斜，照片标签不承担导航；参与活动链接继续在卡片正文中提供。GlareHover 在键盘焦点内也可触发，暂停或触屏时关闭扫光。
- LogoLoop 是装饰性的伙伴展示，完整的 10 个友链保留在下方静态卡片；重复列表对辅助技术隐藏，不引入重复键盘焦点。
- 内页组件和 GSAP 单独分包，未在首页预加载。

## 首批效果适配

- 颜色限定在科技蓝、浅蓝和白色；保留较大的中文正文及真实活动照片。布局继续使用 Tailwind；特殊背景与组件皮肤在 `site-effects.css` 的 components 层维护。
- 首屏“暂停动效”会停止渐变、粒子、滚动横幅、数字增长、解密和流动边框；加入区块的 Aceternity 光束也停止。点击、键盘导航和照片切换继续可用。
- 跟随系统“减少动态效果”偏好，标题和数字直接显示，渐变与横幅静止，粒子和光束不挂载，磁吸与边框动画关闭。
- Particles 仅在至少 801px 且支持精确指针时按需加载；110 个粒子，像素比为 1。ResizeObserver 跟踪尺寸，IntersectionObserver 和页面可见性控制渲染。WebGL 不可用或丢失时保留 CSS 网格背景，卸载时释放 Geometry、Program、监听器和动画帧。
- GradientText、ScrollVelocity 离开视口或页面进入后台后不再更新动画值。ScrollVelocity 子组件移至模块作用域，暂停、恢复时保留位置。
- Magnet 仅响应精确鼠标指针，键盘聚焦时回到原位。按钮仍使用真实链接。
- BlurText 与 GradientText 使用 span，保证标题 HTML 结构有效；屏幕阅读器读取完整标题及数字，不重复朗读拆分字符。页面标题也使用完整的可访问名称。
- SpotlightCard 保留键盘焦点样式，触屏与减少动态效果模式关闭移动聚光。StarBorder 的装饰层对辅助技术隐藏。

早期 Orb、HeroArt 源文件保留，但没有页面导入，不计入这 18 种效果，也不进入当前运行包。

React Bits 的 MIT + Commons Clause 许可原文见 `REACT-BITS-LICENSE.md`；历史博客许可仍保存在 `legacy/blog/LICENSE`。
