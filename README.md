# 江财计协 · 江西财经大学计算机协会

使用 React 19、TypeScript、Vite 8、Tailwind CSS 4 和 React Router 7 重构的协会网站。科技蓝与白色为主色，使用 18 种 React Bits 效果，配合 Animate UI 的导航、Tabs、FAQ 与按钮交互，以及 Aceternity UI 的 Background Beams。

原仓库：https://github.com/Lan66666659/jxufe-cs.（仓库名末尾包含英文句点）

## 本地运行

需要 Node.js 22.12 或更高版本。

```sh
npm ci
npm run dev
```

开发地址：`http://127.0.0.1:5173`。

```sh
npm run check
npm run preview
```

生产预览：`http://127.0.0.1:4173`。`check` 包含 ESLint、TypeScript、生产构建和迁移内容检查。

## 页面与交互

- 首页：真实活动照片切换、轻量倾斜、蓝色粒子背景、渐变与逐字标题、滚动文字横幅、数字增长、五部门动画 Tabs、活动与博客精选。
- React Bits：Particles、BlurText、GradientText、Magnet、ScrollVelocity、CountUp、DecryptedText、SpotlightCard、StarBorder，以及内页的 Aurora、CircularText、ScrollReveal、GlareHover、TiltedCard、PixelTransition、LogoLoop、RotatingText、ShinyText，共 18 种实际页面效果；支持手动暂停和系统减少动态效果偏好。
- Animate UI：导航高亮、滚动进度、Fade、Tilt、Ripple Button、Tabs 和 Accordion；源文件直接维护在项目中。
- 内页：极光横幅、旋转会徽、滚动宗旨、部门扫光、3D 活动照片、像素成员卡、伙伴循环带、工具主题轮换和流光导语。
- 协会介绍、五部门详情、6 项活动分类、18 位骨干年级筛选、10 个友情链接。
- 动效暂停状态在应用内页面切换时保留，系统减少动态效果设置可实时生效。
- 4 篇知识教程、8 篇博客，支持搜索、分类、目录、脚注、代码块和文章跳转。
- 联系方式：邮箱链接、真实 QQ 群号复制、常见问题。
- 桌面与手机导航均包含优秀骨干和友情链接；页面切换保留导航栏，支持键盘操作与减少动态效果偏好。

## 内容维护

| 路径                    | 用途                                        |
| ----------------------- | ------------------------------------------- |
| `src/data/site.ts`      | 协会名称、邮箱、群号、部门主题信息          |
| `src/data/content.json` | 协会介绍、活动、成员、友链、文章索引        |
| `src/content/`          | 完整文章正文，按需加载                      |
| `src/data/aliases.json` | 旧网址到新路由的映射                        |
| `public/img/`           | 运行时图片，沿用原站素材                    |
| `src/components/`       | 站点组件、React Bits 组件                   |
| `src/styles.css`        | Tailwind 主题、公共控件、品牌视觉与文章样式 |
| `legacy/`               | 未改写的原始 HTML、PHP、图片与博客归档      |

布局、间距、响应式和按钮状态使用 Tailwind 工具类或 `@apply`；特殊轨道图形、着色器容器和历史文章排版使用组件层 CSS。

`npm run migrate:content` 从 `legacy/` 重新生成数据和正文，会覆盖 `src/data/content.json`、`src/data/aliases.json` 和 `src/content/` 中对应文件。正常维护请直接编辑新站文件，不必重复迁移。导入会移除可执行标签与内联事件，保留正文、代码、目录与脚注。

成员资料维护在 `src/data/content.json` 的 `members` 数组中；可选 `href` 会将该成员卡片作为博客链接，未设置链接的成员保留像素翻转交互。

新增文章需同时添加文章索引和 `src/content/blog-<id>.html`，并在 `aliases.json` 中登记旧地址（如适用）。

## 部署与旧链接

仅发布 `npm run build` 生成的 `dist/`。仓库提供 Vercel 构建和路由配置，本次未执行线上部署。

构建为旧 `.html` 链接和已登记的新路由生成真实 HTML 入口。Vercel 及其他带 SPA fallback 的主机支持所有新路由和 `/index.php` 别名。Nginx 可使用：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

部署到已有 PHP 站点时，需将 `/index.php` 指向新首页，避免旧 PHP location 优先处理。默认部署在域名根路径；子目录部署需同步调整 Vite base、路由 basename 和素材路径。

原 PHP 后台及 `data.json` 完整保存在 `legacy/`，没有接入新站的数据维护流程；新站使用代码仓库维护内容，不提供在线后台写入或报名提交。回退可使用原仓库 `main` 分支，或从 `legacy/` 恢复原目录结构。不要将 `legacy/` 作为新站发布目录。

## 验证与许可

- `npm run check`：静态检查、构建、原文与资产完整性。
- `npm run format`：格式化新站源码与配置，保留历史归档原样。
- 浏览器验证记录见 [docs/VERIFICATION.md](docs/VERIFICATION.md)。
- React Bits 来源及适配见 [docs/REACT-BITS.md](docs/REACT-BITS.md)，许可见 [docs/REACT-BITS-LICENSE.md](docs/REACT-BITS-LICENSE.md)。
- Animate UI 与 Aceternity UI 的来源、使用位置及适配见 [docs/ANIMATION-SOURCES.md](docs/ANIMATION-SOURCES.md)。
