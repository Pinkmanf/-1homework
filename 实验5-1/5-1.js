window.onload = function () {
    //获取上下文对象
    var canvas = document.getElementById('myClock');
    var ctx = canvas.getContext('2d');
    //自定义函数---画表盘，针
    function toDraw() {
        //定义原点和半径
        var x = 250;
        var y = 250;
        var r = 150;
        //绘制秒刻度开始
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        for (var i = 0; i < 60; i++) {
            ctx.moveTo(x, y);//以圆心为起点
            ctx.arc(x, y, r, 6 * i * Math.PI / 180, 6 * (i + 1) * Math.PI / 180);//绘制一段6°的圆弧
        }
        ctx.closePath(); //为了不影响其他绘图，加上起始路径
        ctx.stroke();
        //较小的白色圆盘覆盖掉半径
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, 0.85 * r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill(); //实心圆
        //绘制秒刻度结束

        //同理绘制小时刻度
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8; //加粗小时刻度
        for (var i = 0; i < 12; i++) {
            ctx.moveTo(x, y);
            ctx.arc(x, y, r, 30 * i * Math.PI / 180, 30 * (i + 1) * Math.PI / 180);
        }
        ctx.closePath(); //为了不影响其他绘图，加上起始路径
        ctx.stroke();
        //较小的白色圆盘覆盖掉半径
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, 0.79 * r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        //绘制小时刻度结束

        // 画出表盘与刻度的间隙
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 10;
        ctx.arc(x,y,0.95*r,0,2*Math.PI,true);
        ctx.closePath(); 
        ctx.stroke();

        //获取当前系统时间
        var today = new Date();
        var hh = today.getHours();
        var mm = today.getMinutes();
        var ss = today.getSeconds();
        //对应的弧度
        var hhVal = (-90 + hh * 30 + mm / 2) * Math.PI / 180;
        var mmVal = (-90 + mm * 6) * Math.PI / 180;
        var ssVal = (-90 + ss * 6) * Math.PI / 180;
        //开始绘制时、分、秒针
        ctx.lineWidth = 7; //时针
        ctx.strokeStyle='black';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, 0.6 * r, hhVal, hhVal);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 5; //分针
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, 0.7 * r, mmVal, mmVal);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 3;  //秒针
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, 0.85 * r, ssVal, ssVal);
        ctx.closePath();
        ctx.stroke();
    }
    //每隔1秒调用一次函数
    setInterval(toDraw, 1000);
}    