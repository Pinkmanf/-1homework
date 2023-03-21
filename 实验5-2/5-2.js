var counts=0;
var countm=0;
var counth=0;

//获取画图区域
var context = document.getElementById('pintu').getContext('2d');

//创建图片
var img = new Image();
img.src = 'test.jpeg';
img.addEventListener('load', drawTiles, false);//事件监听函数   addEventListener(事件,处理方法。监听强度(防止回收))

//取得图像大小和分成的块数
var boardSize = document.getElementById('pintu').width;
var tileCount = 3;
var but=document.getElementById('restart');
var tileSize = boardSize / tileCount;


//追踪空白图片位置，记录点击图片位置
var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

//默认拼图未完成
var solved =false;
//获取并初始化画板
var boardParts = new Object;
setBoard();

//追踪鼠标划过的区域  
document.getElementById('pintu').onmousemove = function (e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
};

//追踪鼠标点击的区域
document.getElementById('pintu').onclick = function () {
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    setTimeout(function () { alert("你完成了！用了" +counth+'小时'+countm+'分钟'+counts+'秒'); }, 500); //防止浏览器在重绘图片区域之前弹窗而进行500ms的延迟
  }
};

//初始化画板函数，模拟n*n的n宫格，使用二维数组创建图片区域
function setBoard() {
  boardParts = new Array(tileCount);
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i;
      boardParts[i][j].y = (tileCount - 1) - j;
    }
  }
  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
  solved = false;
}

//将点击的拼图移动到新的位置
function drawTiles() {
  context.clearRect(0, 0, boardSize, boardSize);
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if (i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
          i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }
}

//判断图片是否可移动的方法
function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2); //判断到空白位置的距离是否为1,1
}

//移动拼图相关方法
function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  }
}

//检查拼图位置是否完成的方法
function checkSolved() {
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}
// 共计时间的展示
function count(){
  counts++;
  if(counts==60){
    countm++;
    counts=0;
  }
  if(countm==60){
    counth++;
    countm=0;
  }
  // 在小于10时展示两个数字
  if(counts<10&&countm<10&&counth<10){
    document.getElementById('time').innerHTML='0'+counth+':'+'0'+countm+':'+'0'+counts;
  }
  if(counth>=10&&countm>=10&&counts<10){
    document.getElementById('time').innerHTML=counth+':'+countm+':'+'0'+counts;
  }
  if(counth>=10&&countm>=10&&counts>=10){
    document.getElementById('time').innerHTML=counth+':'+countm+':'+counts;
  }
  if(counth<10&&countm>=10&&counts<10){
    document.getElementById('time').innerHTML='0'+counth+':'+countm+':'+'0'+counts;
  }
  if(counts>=10&&countm<10&&counth<10){
    document.getElementById('time').innerHTML='0'+counth+':'+'0'+countm+':'+counts;
  }
  if(counth<10&&countm>=10&&counts>=10){
    document.getElementById('time').innerHTML='0'+counth+':'+countm+':'+counts;
  }
  if(counth>=10&&countm<10&&counts>=10){
    document.getElementById('time').innerHTML=counth+':'+'0'+countm+':'+counts;
  }
}
// 重新加载页面
but.onclick=function(){
  location.reload();
}
setInterval(count, 1000);
