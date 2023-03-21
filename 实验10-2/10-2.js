
// 获取弹窗
var modal = document.getElementById('myModal');
// 获取图片插入到弹窗 - 使用 "alt" 属性作为文本部分的内容
var modalImg = document.getElementById("img01");

// 换图片的速度
var speed = 3000;
var tab = document.getElementById("demo");
var tab1 = document.getElementById("demo1");
var tab2 = document.getElementById("demo2");
// 使两个demo内容相同
tab2.innerHTML = tab1.innerHTML;

// 传递参数来获取不同的大图地址
function showImage(n) {
    modal.style.display = "block";
    modalImg.src = "./images/product/large/" + n + ".jpg";
}
// 获取 <span> 元素，设置关闭按钮
var span = document.getElementsByClassName("close")[0];
// 当点击 (x), 关闭弹窗
span.onclick = function () {
    modal.style.display = "none";
}

function Marquee() {
    // 滚动播放完毕后重新滚动
    if (tab1.offsetWidth - tab.scrollLeft <= 0)
        tab.scrollLeft -= tab1.offsetWidth;
    else {
        // 一次滚动的宽度
        tab.scrollLeft += 527;
    }
}

// 重复执行滚动
var MyMar = setInterval(Marquee, speed);
// 鼠标悬停时会暂停滚动
tab.onmouseover = function () { clearInterval(MyMar) };
// 离开后继续滚动
tab.onmouseout = function () { MyMar = setInterval(Marquee, speed) };

