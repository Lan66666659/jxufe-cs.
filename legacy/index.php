<?php
// 读取数据文件
$jsonFile = __DIR__ . '/data.json';
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);
$intro = $data['intro'];
$deptList = $data['dept'];
$actList = $data['activity'];
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>江西财经大学计算机协会</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Microsoft YaHei", Inter, system-ui, sans-serif;
        }
        html {
            scroll-behavior: smooth;
        }
        body {
            background:
                radial-gradient(circle at top left, rgba(22, 93, 255, 0.14), transparent 35%),
                radial-gradient(circle at bottom right, rgba(0, 150, 255, 0.12), transparent 35%),
                linear-gradient(135deg, #f8fcff 0%, #eaf6ff 45%, #d7ecff 100%);
            color: #111827;
            position: relative;
            overflow-x: hidden;
        }
        body::before {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            background-image:
                radial-gradient(rgba(22, 93, 255, 0.035) 1px, transparent 1px),
                linear-gradient(rgba(22, 93, 255, 0.035) 1px, transparent 1px);
            background-size: 20px 20px;
            z-index: 0;
        }
        a {
            text-decoration: none;
        }

        /* 顶部导航 磨砂玻璃科技风 */
        header {
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(255,255,255,0.75);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border-bottom: 1px solid rgba(22, 93, 255, 0.1);
            z-index: 999;
        }
        .nav-wrap {
            max-width: 1320px;
            margin: 0 auto;
            height: 72px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 32px;
        }
        .nav-logo {
            font-size: 24px;
            font-weight: 700;
            color: #165DFF;
            letter-spacing: 0.5px;
        }
        .nav-menu {
            display: flex;
            gap: 20px;
        }
        .nav-menu a {
            color: #374151;
            font-size: 15px;
            padding: 8px 0;
            position: relative;
            transition: 0.25s ease;
        }
        .nav-menu a::after {
            content: "";
            width: 0;
            height: 2px;
            background: #165DFF;
            position: absolute;
            left: 0;
            bottom: 0;
            transition: 0.3s;
        }
        .nav-menu a:hover {
            color: #165DFF;
        }
        .nav-menu a:hover::after {
            width: 100%;
        }

        /* 首屏英雄区 */
        .hero {
            margin-top: 72px;
            height: 88vh;
            background:
                radial-gradient(circle at 10% 20%, rgba(22, 93, 255, 0.18), transparent 25%),
                radial-gradient(circle at 90% 10%, rgba(0, 150, 255, 0.16), transparent 25%),
                linear-gradient(135deg, #eaf6ff 0%, #d7ecff 45%, #cde8ff 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        /* 网格缓慢滚动 */
        .hero::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(rgba(22, 93, 255, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(22, 93, 255, 0.08) 1px, transparent 1px);
            background-size: 60px 60px;
            opacity: 0.6;
            z-index: 0;
            animation: gridMove 20s linear infinite;
        }
        /* 光晕浮动 */
        .hero::after {
            content: "";
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(22,93,255,0.08) 0%, transparent 70%);
            top: -200px;
            right: -150px;
            z-index: 0;
            animation: lightFloat 8s ease-in-out infinite alternate;
        }
        .hero-content {
            z-index: 2;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        /* 标题容器，移除遮罩光标 */
        .hero-title-box {
            display: inline-block;
        }
        .hero h1 {
            font-size: 52px;
            color: #0f2847;
            font-weight: 700;
            text-shadow: 0 2px 12px rgba(22,93,255,0.08);
            /* 文字弹性蹦出动画 */
            opacity: 0;
            animation: textPop 1.2s ease-out forwards;
            animation-delay: 0.3s;
        }

        /* 动画定义 */
        /* 文字整体弹出，无打字擦除 */
        @keyframes textPop {
            0% {
                opacity: 0;
                transform: translateY(12px) scale(0.92);
            }
            60% {
                transform: translateY(-4px) scale(1.04);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        /* 网格平移 */
        @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 60px 60px; }
        }
        /* 光晕浮动缩放 */
        @keyframes lightFloat {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(60px) scale(1.1); }
        }

        /* 通用区块样式 */
        .section {
            max-width: 1320px;
            margin: 120px auto;
            padding: 0 32px;
            position: relative;
            z-index: 1;
        }
        .section-title {
            text-align: center;
            margin-bottom: 64px;
        }
        .section-title h2 {
            font-size: 34px;
            color: #0f2847;
            margin-bottom: 14px;
        }
        .section-title span {
            display: inline-block;
            width: 72px;
            height: 4px;
            background: linear-gradient(90deg,#165DFF,#60a5fa);
            border-radius: 2px;
        }

        /* 协会简介分栏 */
        .intro-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
        }
        .intro-text p {
            font-size: 17px;
            line-height: 1.9;
            color: #475569;
        }
        .intro-pic-box {
    width: 100%;
    height: 480px;
    background: linear-gradient(145deg, #dcebff, #c6ddff);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #165DFF;
    font-size: 18px;
    box-shadow: 0 10px 35px rgba(22, 93, 255, 0.07);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(22, 93, 255, 0.12);
    transition: transform 0.4s ease;
    overflow: hidden;
}

.intro-pic-box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    border-radius: 20px;
}
        .intro-pic-box:hover {
            transform: translateY(-10px);
            box-shadow: 0 14px 45px rgba(22,93,255,0.14);
        }

        /* 部门卡片 玻璃拟态 */
        .dept-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
        }
        .dept-card {
            padding: 32px 28px;
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border-radius: 18px;
            box-shadow:
                0 8px 32px rgba(22, 93, 255, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(22, 93, 255, 0.12);
            transition: all 0.35s ease;
        }
        .dept-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow:
                0 12px 40px rgba(22, 93, 255, 0.18),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
            border-color: rgba(22, 93, 255, 0.35);
        }
        .dept-card h3 {
            font-size: 22px;
            color: #165DFF;
            margin-bottom: 16px;
        }
        .dept-card p {
            font-size: 15px;
            line-height: 1.8;
            color: #64748b;
        }

        /* 活动风采卡片 */
        .act-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
        }
        .act-card {
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border-radius: 18px;
            overflow: hidden;
            box-shadow:
                0 8px 32px rgba(22, 93, 255, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(22, 93, 255, 0.12);
            transition: all 0.35s ease;
        }
        .act-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow:
                0 12px 40px rgba(22, 93, 255, 0.18),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
            border-color: rgba(22, 93, 255, 0.35);
        }
        .act-img-area {
            height: 190px;
            background: linear-gradient(145deg, #d0e1ff, #b0cfff);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #165DFF;
            font-size: 17px;
            overflow: hidden;
        }
        .act-img-area img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .act-text-area {
            padding: 26px;
        }
        .act-text-area h4 {
            font-size: 20px;
            margin-bottom: 12px;
            color: #0f2847;
        }
        .act-text-area p {
            font-size: 15px;
            line-height: 1.8;
            color: #64748b;
        }

        /* 招新板块科技渐变 */
        .join-block {
            max-width: 1320px;
            margin: 140px auto;
            padding: 80px 32px;
            background: linear-gradient(135deg, #0f4cd8, #2b7aff);
            border-radius: 24px;
            text-align: center;
            color: #fff;
            box-shadow: 0 10px 40px rgba(22,93,255,0.22);
            position: relative;
            overflow: hidden;
        }
        .join-block::before{
            content:"";
            position:absolute;
            width:400px;
            height:400px;
            background:radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%);
            top:-150px;
            left:-100px;
        }
        .join-block h2 {
            font-size: 34px;
            margin-bottom: 20px;
            position:relative;
            z-index:2;
        }
        .join-block p {
            font-size: 19px;
            opacity: 0.92;
            margin-bottom: 36px;
            position:relative;
            z-index:2;
        }
        .join-btn {
            padding: 18px 52px;
            background: #fff;
            color: #165DFF;
            font-size: 19px;
            font-weight: 600;
            border-radius: 999px;
            display: inline-block;
            box-shadow: 0 8px 28px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            position:relative;
            z-index:2;
        }
        .join-btn:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 36px rgba(0,0,0,0.2);
        }

        /* 页脚样式 */
        footer {
            background: #0b1a33;
            color: #cbd5e1;
            text-align: center;
            padding: 60px 20px;
            position:relative;
            z-index:1;
        }
        footer h3 {
            font-size: 24px;
            color: #fff;
            margin-bottom: 20px;
        }
        footer p {
            font-size: 15px;
            margin: 8px 0;
            opacity: 0.85;
        }

        /* 移动端全适配 */
        @media (max-width: 992px) {
            .intro-row {
                grid-template-columns: 1fr;
            }
            .dept-grid, .tech-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .act-grid,.member-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .hero h1 {
                font-size: 40px;
            }
            .nav-wrap {
                flex-direction: column;
                height: auto;
                padding: 16px 32px;
                gap: 16px;
            }
            .nav-menu {
                flex-wrap: wrap;
                justify-content: center;
            }
        }
        @media (max-width: 600px) {
            .dept-grid, .act-grid, .member-grid, .tech-grid {
                grid-template-columns: 1fr;
            }
            .hero h1 {
                font-size: 30px;
            }
            .section-title h2 {
                font-size: 28px;
            }
            .join-block h2 {
                font-size: 26px;
            }
            .join-btn {
                padding: 14px 36px;
                font-size: 17px;
            }
        }
    </style>
</head>
<body>
    <!-- 导航栏 -->
    <header>
        <div class="nav-wrap">
            <div class="nav-logo">计算机协会</div>
            <nav class="nav-menu">
                <a href="#home">首页</a>
                <a href="#intro">协会简介</a>
                <a href="#dept">部门架构</a>
                <a href="#activity">活动风采</a>
                <a href="#contact">联系我们</a>
                <a href="admin.php">后台管理</a>
            </nav>
        </div>
    </header>

    <!-- 首屏区域 -->
    <section class="hero" id="home">
        <div class="hero-content">
            <div class="hero-title-box">
                <h1>江西财经大学计算机协会</h1>
            </div>
        </div>
    </section>

    <!-- 协会简介 -->
    <section class="section" id="intro">
        <div class="section-title">
            <h2>协会简介</h2>
            <span></span>
        </div>
        <div class="intro-row">
            <div class="intro-text">
                <p><?= $intro['text'] ?></p>
            </div>
            <div class="intro-pic-box">
                <img src="<?= $intro['img'] ?>" alt="协会会徽">
            </div>
        </div>
    </section>

    <!-- 部门架构 -->
    <section class="section" id="dept">
        <div class="section-title">
            <h2>部门架构</h2>
            <span></span>
        </div>
        <div class="dept-grid">
            <?php foreach($deptList as $dept): ?>
            <div class="dept-card">
                <h3><?= $dept['title'] ?></h3>
                <p><?= $dept['desc'] ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- 活动风采 -->
<section class="section" id="activity">
    <div class="section-title">
        <h2>活动风采</h2>
        <span></span>
    </div>
    <div class="act-grid">
        <?php foreach($actList as $act): ?>
        <div class="act-card">
            <div class="act-img-area">
                <img src="<?= $act['img'] ?>" alt="<?= $act['title'] ?>">
            </div>
            <div class="act-text-area">
                <h4><?= $act['title'] ?></h4>
                <p><?= $act['desc'] ?></p>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</section>

    <!-- 招新板块 -->
    <div class="join-block">
        <h2>加入我们</h2>
        <p>无论有无计算机基础，都欢迎来到计协共同学习成长</p>
        <a href="admin.php" class="join-btn">后台修改内容</a>
    </div>

    <!-- 页脚 -->
    <footer id="contact">
        <h3>江西财经大学计算机协会</h3>
        <p>联系我们：18779063259 &nbsp;|&nbsp; 3585957631@qq.com</p>
        <p>地址：江西财经大学麦庐园校区计算机与人工智能学院 | 指导老师：陈强</p>
        <p>© 2026 计算机协会 版权所有</p>
    </footer>
</body>
</html>