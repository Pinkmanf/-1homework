const canvas = document.querySelector("#canvas");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const reStartBtn = document.getElementById("restart");
//获取绘图上下文
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
// 最高分
var highScore1=0;
var food;
var snake;
var score = 0; // 得分

class Snake {
    constructor(info) {
        /**
            head: 蛇头偏移量
            direction: 运动方向
            speed: 运动速度
            size: 蛇头和蛇身一个单位的大小
        */
        const {
            head = [1, 1],
            // 默认向右
            direction = "right",
            speed = 300,
            size = 10
        } = info;
        this.body = [head]; // 存放 蛇头和蛇身的偏移量
        this.direction = direction;
        this.speed = speed;
        this.size = size;
        this.moving = false; // 是否正在运动
        this.timer = null;
    }

    move() {
        // 开始移动
        this.moving = true;
        this.timer = setInterval(() => {
            const { speed, direction, size, body } = this;
            //移动的时候从尾部依次向前移动
            for (var i = body.length - 1; i >= 0; i--) {
                if (i !== 0) {
                    this.body[i][0] = body[i - 1][0];
                    this.body[i][1] = body[i - 1][1];
                } else {
                    // 蛇头
                    switch (direction) {
                        case "right":
                            this.body[0][0] += size;
                            break;
                        case "left":
                            this.body[0][0] -= size;
                            break;
                        case "top":
                            this.body[0][1] -= size;
                            break;
                        case "bottom":
                            this.body[0][1] += size;
                            break;
                    }
                }
            }
            // 判断是否撞墙
            if (
                body[0][0] > canvasWidth - size ||
                body[0][0] < 0 ||
                body[0][1] > canvasHeight - size ||
                body[0][1] < 0
            ) {
                highScore();
                this.stop();
                alert("撞墙了,游戏结束!");
            }
            // 判断是否撞到自身
            const index = body.findIndex((ret, i, self) => {
                return i !== 0 && ret[0] === self[0][0] && ret[1] === self[0][1];
            });
            if (index !== -1) {  
                highScore();
                this.stop();
                alert("撞到自己了,游戏结束!");
            }
            //判断是否遇到食物
            if (body[0][0] === food[0] && body[0][1] === food[1]) {
                this.eat();
            }
        }, this.speed);
    }

    //吃掉食物，蛇身尾部加上当前吃掉的食物
    eat() {
        this.body.push(food);
        score += 1;
        // 速度变快
        // this.speed -= 0.05 * this.speed
        this.stop();
        this.move();
        food = getFoodPosition();
    }

    stop() {

        this.moving = false;
        clearInterval(this.timer);
    }
}

function draw() {
    // 每次绘制前都重新清空画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const { body, size } = snake;
    body.forEach((ret, i) => {
        ctx.save();
        if (i === 0) {
            // 蛇头
            ctx.fillStyle = "blue";
        } else {
            // 蛇身
            ctx.fillStyle = "green";
        }
        ctx.fillRect(ret[0], ret[1], size, size);
        ctx.restore();
    });
    ctx.save();
    ctx.fillStyle = "OrangeRed";
    ctx.fillRect(food[0], food[1], size, size);
    ctx.restore();
    document.getElementById('score2').innerHTML = `得分： ${score}`;
    // 在浏览器下次重绘之前继续更新下一帧动画
    requestAnimationFrame(draw);
}

// 随机生成食物所在的位置
function getFoodPosition() {
    const { size, body } = snake;
    var flag = false;
    // 生成的必须是size的倍数
    var x = Math.floor(Math.random() * (canvasWidth - size));
    var y = Math.floor(Math.random() * (canvasHeight - size));
    const foodX = Math.floor(x / size) * size;
    const foodY = Math.floor(y / size) * size;
    const food = [foodX, foodY];
    // 判断食物是否与蛇身重合
    for (var i = 0; i < body.length; i++) {
        if (body[i][0] === food[0] && body[i][1] === food[1]) {
            flag = true;
            break;
        }
    }
    return flag ? getFoodPosition() : food;
}

function bindKeyDown() {
    document.onkeydown = e => {
        switch (
        e.keyCode // 不能直接反向移动
        ) {
            case 37: // 左
                if (snake && snake.direction !== "right") {
                    snake.direction = "left";
                }
                break;
            case 38: // 上
                if (snake && snake.direction !== "bottom") {
                    snake.direction = "top";
                }
                break;
            case 39: // 右
                if (snake && snake.direction !== "left") {
                    snake.direction = "right";
                }
                break;
            case 40: // 下
                if (snake && snake.direction !== "top") {
                    snake.direction = "bottom";
                }
                break;
        }
    };
}

function init() {
    const info = {
        direction: "right",
        head: [100, 50]
    };
    snake = new Snake(info);
    food = getFoodPosition();
    bindKeyDown();
    draw();
    startBtn.onclick = function () {
        snake.stop()
        snake.move();
    };


    reStartBtn.onclick = function () {
        location.reload();
    };
}
function highScore() {
    highScore1=localStorage.getItem("highScore");
    if (score > highScore1||highScore1==undefined) {
        localStorage.setItem("highScore", score);
    }
    highScore1=localStorage.getItem("highScore");
    document.getElementById('score1').innerHTML = `历史最高分： ${highScore1}`;
}
highScore();
init();