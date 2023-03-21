var c = document.getElementById("myCanvas");
var s = document.getElementById("score2");
var s1 = document.getElementById("score3");
var speed = document.getElementById("speed");
var speed1 = speed.options[speed.selectedIndex].value;
var time = 300; //蛇的速度 
var cxt = c.getContext("2d");
var x1 = y1 = 384;
var x = y = 8;
var a = 0; //食物坐标 
var t = 0; //蛇身长 
var t1 = 0; //蛇身长 
var map = []; //记录蛇运行路径 
var map1 = []; //记录蛇运行路径 
var size = 8; //蛇身单元大小 
var direction = 2; // 1 向上 2 向右 0 左 3下 
var direction1 = 0; // 1 向上 2 向右 0 左 3下 
var score = 0;
var score1 = 0;
var highscore1 = 0;
function move() { // 玩家一移动蛇 
    // 蛇移动的方向
    switch (direction) {
        case 1: y = y - size; break;
        case 2: x = x + size; break;
        case 0: x = x - size; break;
        case 3: y = y + size; break;
    }
    // 碰到墙了
    if (x > 400 || y > 400 || x < 0 || y < 0) {
        alert("玩家1游戏结束，继续努力吧!失败原因：碰壁了.....");
        // x = y = 8;
        highScore();
        clearInterval(interval);
    }
    // 撞到自己了
    for (var i = 0; i < map.length; i++) {
        if (parseInt(map[i].x) == x && parseInt(map[i].y) == y) {
            alert("玩家1游戏结束，继续努力吧！失败原因：撞到自己了.....");
            highScore();
            clearInterval(interval);

        }

        // 撞到玩家2了
        if (parseInt(map[i].x) == x1 && parseInt(map[i].y) == y1) {
            alert("玩家2游戏结束，继续努力吧！失败原因：撞到玩家1了.....");
            highScore();
            clearInterval(interval1);

        }
    }
    if (map.length > t) { //保持蛇身长度 
        var cl = map.shift(); //删除数组第一项，并且返回原元素 
        cxt.clearRect(cl['x'], cl['y'], size, size);
    };
    map.push({ 'x': x, 'y': y }); //将数据添加到原数组尾部 
    cxt.fillStyle = "blue";//内部填充颜色 
    cxt.strokeStyle = "blue";//边框颜色 
    cxt.fillRect(x, y, size, size);//绘制矩形 
    if ((a * 8) == x && (b * 8) == y) { //吃食物 
        score++;
        s.innerHTML = "玩家1得分:" + score;
        rand_frog();
        t++;
    }
}
function move1() { // 移动蛇 
    switch (direction1) {
        case 1: y1 = y1 - size; break;
        case 2: x1 = x1 + size; break;
        case 0: x1 = x1 - size; break;
        case 3: y1 = y1 + size; break;
    }
    if (x1 > 400 || y1 > 400 || x1 < 0 || y1 < 0) {
        alert("玩家2游戏结束，继续努力吧!失败原因：碰壁了.....");
        // x1 = y1 = 384;
        highScore();
        clearInterval(interval1);

    }
    for (var i = 0; i < map1.length; i++) {
        if (parseInt(map1[i].x1) == x1 && parseInt(map1[i].y1) == y1) {
            alert("玩家2游戏结束，继续努力吧！失败原因：撞到自己了.....");
            highScore();
            clearInterval(interval1);

        }
        if (parseInt(map1[i].x1) == x && parseInt(map1[i].y1) == y) {
            alert("玩家1游戏结束，继续努力吧！失败原因：撞到玩家2了.....");
            highScore();
            clearInterval(interval);

        }
    }
    if (map1.length > t1) { //保持蛇身长度 
        var cl1 = map1.shift(); //删除数组第一项，并且返回原元素 
        cxt.clearRect(cl1['x'], cl1['y'], size, size);
    };
    map1.push({ 'x': x1, 'y': y1 }); //将数据添加到原数组尾部 
    cxt.fillStyle = "red";//内部填充颜色 
    cxt.strokeStyle = "red";//边框颜色 
    cxt.fillRect(x1, y1, size, size);//绘制矩形 
    if ((a * 8) == x1 && (b * 8) == y1) { //吃食物 
        score1++;
        s1.innerHTML = "玩家2得分:" + score1;
        rand_frog();
        t1++;
    }
}
document.onkeydown = function (e) { //改变蛇方向 
    var code = e.keyCode - 37;
    switch (code) {
        case 50: direction = 1; break;//上 
        case 31: direction = 2; break;//右 
        case 46: direction = 3; break;//下 
        case 28: direction = 0; break;//左 
        case 1: direction1 = 1; break;//上 
        case 2: direction1 = 2; break;//右 
        case 3: direction1 = 3; break;//下 
        case 0: direction1 = 0; break;//左 
    }
}
// 随机放置食物 
function rand_frog() {
    a = Math.ceil(Math.random() * 49);
    b = Math.ceil(Math.random() * 49);
    cxt.fillStyle = "#000000";//内部填充颜色 
    cxt.strokeStyle = "#000000";//边框颜色 
    cxt.fillRect(a * 8, b * 8, 8, 8);//绘制矩形 
}
//最高分
function highScore() {
    // 获取本地存储的最高分
    highScore1 = localStorage.getItem("highScore");
    if (score > highScore1 || highScore1 == undefined) {
        // 插入玩家1最高分
        localStorage.setItem("highScore", score);
    }
    if (score1 > highScore1) {
        // 插入玩家2最高分
        localStorage.setItem("highScore", score1);
    }
    highScore1 = localStorage.getItem("highScore");
    document.getElementById('score1').innerHTML = `历史最高分:${highScore1}`;
}
function restart() {
    window.location.reload();
}

function start() {
    var speed = document.getElementById("speed");
    var speed1 = speed.options[speed.selectedIndex].value;
    // 获取选择的速度
    time = speed1;
    interval = setInterval(move, time);

    var double = document.getElementById("double");
    var double1 = double.options[double.selectedIndex].text;
    // 判断选择的是双人还是单人
    if (double1 == 2) {
        // 双人则调用第二个move函数
        interval1 = setInterval(move1, time);
    }
    else {
        x1 = y1 = -1;
    }
}
// 生成最高分
highScore();
// 随机放置食物 
rand_frog(); 