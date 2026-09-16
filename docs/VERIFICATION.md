# 本地验证记录

## 内页再增加 9 种效果（当前版本）

2026-09-16：全站现有 18 种 React Bits 效果。本轮新增 Aurora、CircularText、ScrollReveal、GlareHover、TiltedCard、PixelTransition、LogoLoop、RotatingText、ShinyText，分布于 8 个内页。

- `npm run check` 通过：ESLint、TypeScript、生产构建和内容检查，无大块警告；新增 GSAP 后依赖审计为 0 个漏洞。内页效果与 GSAP 单独按需加载。
- 8 个内页在 320、390、768、1080、1440px 下均无横向溢出。320 和 390px 下没有 WebGL Canvas；按钮、标题和正文未越过视口边缘。
- 实测极光 Canvas 为 1239×311；环形文字旋转值变化；滚动宗旨全部字符达到完整显示；部门卡扫光运行；活动图产生 rotateX/rotateY 的实际变换；友链带位置及知识主题、文字流光持续变化。
- 成员卡 Enter 可翻转、Escape 可返回；独立触屏浏览器上下文中连续两次 tap 分别打开和关闭介绍。25 级筛选返回 7 人，技术课堂返回 2 项，Debian 搜索返回 2 篇，友链仍为 10 个。
- 暂停环形文字后数值保持不变；通过导航进入知识页后轮换文字仍暂停，返回首页后粒子仍停用；恢复按钮可重新启用。
- 修复系统减少动态效果偏好不能实时更新的问题：运行中切换为 reduce，按钮立即显示相应状态，Canvas 卸载，GSAP 显字恢复静态；切回 no-preference 后极光恢复，无需刷新。
- QQ 群号复制并读取剪贴板仍为 1124074128；FAQ 展开正常；手机菜单可以进入友情链接。交互验证期间没有应用异常。
- 桌面截图：`artifacts/interior-about.png`、`interior-departments.png`、`interior-activities.png`、`interior-members.png`、`interior-friends.png`、`interior-resources.png`、`interior-blog.png`、`interior-contact.png`。手机截图为同名前缀加 `-mobile`，触屏翻转截图为 `interior-member-touch.png`。
- 预览仍为 `http://127.0.0.1:4173/`。本节对应 PR 提交前的本地验收，尚未执行线上部署。

用于 PR 审阅的当前截图已纳入仓库：

- [桌面首页](screenshots/home-desktop.png)
- [协会介绍](screenshots/about-desktop.png)
- [手机成员页](screenshots/members-mobile.png)

原站归档复核：69 个文件全部保留，其中 32 个与 Git 原文逐字节一致，37 个仅有 Git 检出换行差异。

以下为前一轮及更早的验证记录。

## React Bits 首批扩展

2026-09-16：继续完成“更大胆、至少 8 个 React Bits 效果”的要求。蓝白主题、Tailwind、大字号、真实内容及 Animate UI 交互保留；当前实际使用 9 种效果，清单见 [REACT-BITS.md](REACT-BITS.md)。

- `npm run check` 通过：ESLint、TypeScript、生产构建与内容检查均通过，无大块警告。12 篇正文、29 张引用图片及 23 个旧入口映射检查通过。
- 浏览器确认 9 个不同效果在首页挂载，桌面粒子 Canvas 实际渲染。渐变背景位置变化、磁吸按钮实际位移、键盘聚焦后复位、成立年份最终为 1996、部门数量最终为 5。
- 暂停后粒子卸载，标题渐变位置和横幅位置保持不变；恢复后可继续。Tabs 鼠标及方向键切换、活动照片下一张均通过。
- 320、390、768、1080、1440px 首页无横向溢出；前三种宽度没有粒子 Canvas。390px 协会介绍和加入区块也无横向溢出。
- 减少动态效果模式下无 Canvas，标题与数字直接显示，渐变停在初始位置，边框 animation-name 为 none；部门 Tabs 仍可操作。
- 模拟 WebGL context loss 后粒子隐藏，CSS 网格保留，标题及主要链接仍可用。
- 手机友情链接导航显示 10 个条目；菜单 Escape 关闭并回焦。FAQ 展开、QQ 群号复制（读取剪贴板为 1124074128）、Debian 搜索返回 2 篇、技术课堂筛选返回 2 项，均通过。
- 本轮浏览器检查未捕获应用异常。截图保存在 `artifacts/react-bits-desktop.png`、`react-bits-mobile.png`、`react-bits-join.png`、`react-bits-mobile-join.png`。
- 本地生产预览地址：`http://127.0.0.1:4173/`。没有执行提交、推送或线上部署。

以下保留先前阶段的验证记录；与当前效果有差异的说明以本节和 React Bits 清单为准。

## 蓝白主题与 Animate UI 更新

2026-09-16 后续调整：科技蓝/白色；真实活动照片替代原光环；主要交互切换为 Animate UI。正文 16–17px，主导航、按钮保持 16px。

- 新版 `npm run check` 通过，构建没有大块警告；正文内容、图片和旧入口映射检查仍通过。
- 1440px 桌面验证照片前后切换、Tabs 鼠标/方向键/Home 键切换、FAQ 展开/收起、QQ群号复制。
- 320、390、768、1080px 下：首页、协会介绍、部门、活动、成员、知识分享、友链、联系、博客及长文章均无横向溢出。
- 顶部友情链接打开 `/friends`、选中状态正确，页面包含 10 个友链；手机菜单同样只有一个友情链接入口。
- 手机菜单支持 Escape 关闭并回焦按钮；Debian 搜索返回 2 篇，技术课堂筛选返回 2 项。
- 蓝白版浏览时无应用异常；蓝色加入区块的 SVG 光束在接近视口时加载。
- 快速连续切换 Tabs 最终只保留所选面板；照片倾斜产生实际 3D 变换。减少动态效果时取消光束，Tabs 与 FAQ 仍可操作。
- 当前截图：`artifacts/blue-white-desktop.png`、`blue-white-mobile.png`、`blue-white-tabs.png`、`blue-white-full.png`、`blue-white-contact.png`。

以下是首版迁移的历史验证，光环和原 FAQ 展示已被本次调整替换。

日期：2026-09-16。环境：Windows / Node.js 22.23.1 / Chromium，验证地址为 `http://127.0.0.1:4173`，使用 Vite 生产构建预览。

## 自动检查

- ESLint 无错误、无警告；TypeScript 检查和生产构建通过。
- 12 篇原文对比通过：8 篇博客、4 篇知识教程，忽略格式空白后正文一致。
- 5 个部门、6 项活动、17 位骨干、10 个友链完整迁移。
- 29 个引用的本地图片存在，全部文章内部链接和目录、脚注锚点可解析。
- 23 个旧入口实测返回 200 并打开对应 React 页面，包括全部旧文章地址和 `/index.php`。
- 依赖安装时 npm audit 报告 0 个漏洞。

`npm run check` 执行日常静态、构建、链接和资产检查；`npm run verify:migration` 额外与原站逐篇比较，用于初次迁移验收。后续正常编辑文章不要求继续保持原文完全相同。

## 浏览器交互

| 项目         | 实测结果                                                        |
| ------------ | --------------------------------------------------------------- |
| 部门切换     | 点击维修部、键盘切换量化部、Home 返回软件部；选择状态与正文一致 |
| 活动分类     | 技术课堂筛出 2 项新生培训                                       |
| 成员筛选     | 25 级筛出 7 位成员，岗位年级匹配                                |
| 博客搜索     | Debian 返回 2 篇；无匹配显示空态；重置恢复 8 篇                 |
| 文章         | 12 篇正文按需加载成功，目录点击跳到对应标题                     |
| 联系方式     | 点击后读取剪贴板确认为 `1124074128`；FAQ 正常展开               |
| 手机菜单     | 打开、Escape 关闭、键盘焦点返回按钮、导航后关闭                 |
| 减少动态效果 | 无 Canvas，浮动动画停止，终端文字直接展示                       |
| WebGL 丢失   | 模拟 context loss，CSS 静态光环显示，页面继续可用               |

## 视觉与运行时

- 1440 × 1000：桌面首页、联系页面与主要交互。
- 390 × 844：所有 8 个内页与全部 12 篇文章检查，无横向溢出；手机首页无 Canvas。
- 320 × 740：首页、联系、部门和博客检查，无横向溢出。
- 主要页面浏览过程中无应用异常和控制台警告。
- 截图保存在本地 `artifacts/`，不纳入版本控制：`home-desktop.png`、`home-desktop-viewport.png`、`home-mobile-viewport.png`、`contact-desktop.png`、`article-mobile.png`。

## 边界

以上为本地生产构建的浏览器验证，尚未执行线上部署。没有测试外部友链站点自身的服务状态，也没有重构或启用归档中的 PHP 后台。没有以本地检查替代用户的视觉审阅。
