<?php
$adminPwd = "123456";
if(!isset($_GET['pwd']) || $_GET['pwd'] != $adminPwd){
    exit("访问受限，请输入正确后台密码");
}
$jsonFile = __DIR__ . '/data.json';
// 保存提交
if($_POST){
    $newData = [
        "intro" => [
            "text" => $_POST['intro_text'],
            "img" => $_POST['intro_img']
        ],
        "dept" => [
            ["title"=>$_POST['d1_title'],"desc"=>$_POST['d1_desc']],
            ["title"=>$_POST['d2_title'],"desc"=>$_POST['d2_desc']],
            ["title"=>$_POST['d3_title'],"desc"=>$_POST['d3_desc']],
            ["title"=>$_POST['d4_title'],"desc"=>$_POST['d4_desc']],
            ["title"=>$_POST['d5_title'],"desc"=>$_POST['d5_desc']]
        ],
        "activity" => [
            ["title"=>$_POST['a1_title'],"desc"=>$_POST['a1_desc'],"img"=>$_POST['a1_img']],
            ["title"=>$_POST['a2_title'],"desc"=>$_POST['a2_desc'],"img"=>$_POST['a2_img']],
            ["title"=>$_POST['a3_title'],"desc"=>$_POST['a3_desc'],"img"=>$_POST['a3_img']]
        ]
    ];
    file_put_contents($jsonFile, json_encode($newData, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
    echo "<h3 style='color:green'>保存成功！<a href='index.php'>返回首页</a></h3>";
}
$data = json_decode(file_get_contents($jsonFile),true);
$intro = $data['intro'];
$dept = $data['dept'];
$act = $data['activity'];
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>计协网站后台管理</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:微软雅黑;}
body{background:#f0f7ff;padding:40px;max-width:1200px;margin:0 auto;}
h2{color:#165DFF;margin-bottom:30px;text-align:center;}
.box{background:#fff;padding:24px;border-radius:16px;margin-bottom:24px;box-shadow:0 4px 20px rgba(22,93,255,0.08);}
h3{margin-bottom:16px;color:#0f2847;border-left:4px solid #165DFF;padding-left:12px;}
textarea,input{width:100%;padding:10px;margin:8px 0 16px;border:1px solid #cce0ff;border-radius:8px;font-size:15px;}
textarea{min-height:120px;resize:vertical;}
button{padding:14px 40px;background:#165DFF;color:#fff;border:none;border-radius:99px;font-size:16px;font-weight:bold;cursor:pointer;display:block;margin:30px auto 0;}
button:hover{background:#0e4bdb;}
</style>
</head>
<body>
<h2>江财计算机协会网站后台修改</h2>
<form method="post">
    <div class="box">
        <h3>协会简介</h3>
        <p>简介文字：</p>
        <textarea name="intro_text"><?= $intro['text'] ?></textarea>
        <p>简介图片路径：</p>
        <input type="text" name="intro_img" value="<?= $intro['img'] ?>">
    </div>

    <div class="box">
        <h3>部门1 软件部</h3>
        <input name="d1_title" value="<?= $dept[0]['title'] ?>" placeholder="部门名称">
        <textarea name="d1_desc" placeholder="部门介绍"><?= $dept[0]['desc'] ?></textarea>
        <h3>部门2 维修部</h3>
        <input name="d2_title" value="<?= $dept[1]['title'] ?>">
        <textarea name="d2_desc"><?= $dept[1]['desc'] ?></textarea>
        <h3>部门3 量化部</h3>
        <input name="d3_title" value="<?= $dept[2]['title'] ?>">
        <textarea name="d3_desc"><?= $dept[2]['desc'] ?></textarea>
        <h3>部门4 宣传部</h3>
        <input name="d4_title" value="<?= $dept[3]['title'] ?>">
        <textarea name="d4_desc"><?= $dept[3]['desc'] ?></textarea>
        <h3>部门5 办公室</h3>
        <input name="d5_title" value="<?= $dept[4]['title'] ?>">
        <textarea name="d5_desc"><?= $dept[4]['desc'] ?></textarea>
    </div>

    <div class="box">
        <h3>活动1</h3>
        <input name="a1_title" value="<?= $act[0]['title'] ?>" placeholder="活动标题">
        <textarea name="a1_desc" placeholder="活动介绍"><?= $act[0]['desc'] ?></textarea>
        <input name="a1_img" value="<?= $act[0]['img'] ?>" placeholder="图片路径">

        <h3>活动2</h3>
        <input name="a2_title" value="<?= $act[1]['title'] ?>">
        <textarea name="a2_desc"><?= $act[1]['desc'] ?></textarea>
        <input name="a2_img" value="<?= $act[1]['img'] ?>">

        <h3>活动3</h3>
        <input name="a3_title" value="<?= $act[2]['title'] ?>">
        <textarea name="a3_desc"><?= $act[2]['desc'] ?></textarea>
        <input name="a3_img" value="<?= $act[2]['img'] ?>">
    </div>

    <button type="submit">保存全部修改</button>
</form>
</body>
</html>