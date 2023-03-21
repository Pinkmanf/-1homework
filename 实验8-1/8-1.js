// 打开页面自动加载本地存储的颜色
window.onload = function () {
    var box1 = document.getElementById('box1');
    var box4 = document.getElementById('box4');
    var box5 = document.getElementById('box5');
    var box6 = document.getElementById('box6');
    
    var getLocalColor = window.localStorage.getItem("localColor");
    box1.className = getLocalColor;
    box4.className = getLocalColor;
    box5.className = getLocalColor;
    box6.className = getLocalColor;
    
}

// 点击按钮改变颜色
function save() {
    var box1 = document.getElementById('box1');
    var box4 = document.getElementById('box4');
    var box5 = document.getElementById('box5');
    var box6 = document.getElementById('box6');
    // 获取选择的颜色
    var color = document.getElementsByClassName('color')[0];
    var index = color.selectedIndex;
    var selectedcolor = color.options[index].text;
    // 将获取的颜色存储到本地存储
    window.localStorage.setItem('localColor', selectedcolor);
    var getLocalColor = window.localStorage.getItem("localColor");
    // 改变对应box的类名以改变颜色
    if (getLocalColor) {
        box1.className = getLocalColor;
        box4.className = getLocalColor;
        box5.className = getLocalColor;
        box6.className = getLocalColor;
    }

}
