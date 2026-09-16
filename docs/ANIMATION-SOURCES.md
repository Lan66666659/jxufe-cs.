# 动效组件来源

蓝白版使用 React Bits 提供 18 种视觉效果，Animate UI 负责导航、Tabs、FAQ、按钮等交互。字体延续前一轮可读性调整：正文 16–17px，主导航和主按钮 16px。

## Animate UI

- 官网：https://animate-ui.com/
- 上游：https://github.com/imskyleen/animate-ui
- 固定提交：`efeb96ffd7a3b7a4868667e4ac3c346620fb3044`
- 入口组件及递归依赖共 20 个源码文件，完整清单在 `animate-ui-sources.json`。
- MIT 许可原文保存在 `ANIMATE-UI-LICENSE.md`。

| 组件/原语          | 实际使用位置                        |
| ------------------ | ----------------------------------- |
| Highlight          | 顶部导航、首页快捷入口、Tabs 当前项 |
| Tabs / AutoHeight  | 五部门切换、高度过渡与内容淡入      |
| Accordion          | 联系页常见问题展开、收起            |
| Ripple Button      | 主按钮、照片切换、筛选、复制群号    |
| Tilt / TiltContent | 首页照片及活动卡片的轻量倾斜        |
| Fade               | 区块进入视口、手机菜单出现和退出    |
| Scroll Progress    | 顶部阅读进度条                      |

适配内容：

- 调整 Tabs 到科技蓝主题，保留 Radix 的键盘与选中语义。
- `motion.tsx` 统一按钮、倾斜和淡入参数，响应减少动态效果偏好。
- Hexagon Background 源文件保留，首页已换成 React Bits Particles 与 CSS 网格背景。
- Highlight 在布局阶段初始化位置回调，并响应容器尺寸变化，保证首次加载及窗口调整时的位置正确。
- 新页面按路由加载，Suspense 边界放在正文中，加载期间保留导航栏。
- 上游源码的组件/Hook 混合导出保持原样，只为这些文件关闭 Fast Refresh 导出形式提示；TypeScript、Hooks 与其他 ESLint 检查保留。

## React Bits

实际使用 Particles、BlurText、GradientText、Magnet、ScrollVelocity、CountUp、DecryptedText、SpotlightCard、StarBorder、Aurora、CircularText、ScrollReveal、GlareHover、TiltedCard、PixelTransition、LogoLoop、RotatingText、ShinyText。完整来源及减少动态效果、暂停和 WebGL 降级适配见 [REACT-BITS.md](REACT-BITS.md)。早期 Orb 与 HeroArt 文件不再由页面导入，不计入效果数量。

## Aceternity UI

- 文档：https://ui.aceternity.com/components/background-beams
- 官方免费组件 registry：https://ui.aceternity.com/registry/background-beams.json
- 本地文件：`src/components/aceternity/background-beams.tsx`
- 用于蓝色加入区块，颜色调整为蓝、浅蓝和白。
- 只在区块进入视口附近、且用户允许动态效果时挂载；组件按需加载。

原站文章、照片、友链目标与联系方式继续使用迁移后的原始内容。
