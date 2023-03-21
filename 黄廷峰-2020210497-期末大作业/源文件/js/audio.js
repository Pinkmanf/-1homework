var i = 0;
var j = 0;
var k = 0;
var audi;
var timer;
var count = 0;
var list = new Array("../../资源文件/music/儿童歌曲-大耳朵图图.mp3", "../../资源文件/music/纯音乐-小火车.mp3", "../../资源文件/music/陈洁丽&陆双&祖晴&王巍-疯狂果宝.mp3","../../资源文件/music/Falling晓 - Wanan (Demo).mp3","../../资源文件/music/邓寓君(等什么君) - 芳华慢 + 霜雪千年.mp3","../../资源文件/music/黑鸭子演唱组 - 听妈妈讲那过去的事情.mp3");
var list1 = new Array("../../资源文件/movie/广阳岛.MP4", "../../资源文件/movie/北滨路.MP4", "../../资源文件/movie/贵阳.MP4","../../资源文件/movie/海.MP4","../../资源文件/movie/晚霞1.MP4","../../资源文件/movie/晚霞2.MP4");
var list3 = new Array("广阳岛.MP4", "北滨路.MP4", "贵阳.MP4","海.MP4","晚霞1.MP4","晚霞2.MP4");
var list2 = new Array("大耳朵图图", "小火车", "疯狂果宝","Wanan (Demo)","芳华慢+霜雪千年","听妈妈讲那过去的事情");
function updat() {
    self.location = "修改密码.html";
}
function go() {
    self.location = "登录界面.html";
}
function myaudio(){
    self.location = "我的音视频.html";

}

function audio() {
    var tb = document.getElementById("tb");
    for (k = 0; k < list2.length; k++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.innerHTML = list2[k];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML=list3[k];
        tr.appendChild(td)
        tb.appendChild(tr);
    }
}

function draw() {
    var c = document.getElementsByTagName('canvas')[0];
    if (c != undefined) {
        var ctx = c.getContext('2d');
        ctx.stroke();
        ctx.fillStyle = "#DCE2F1"
        ctx.font = "bold 150px 宋体";
        ctx.clearRect(-600, 0, 2500, 200);
        ctx.translate(20, 0);
        ctx.fillText(list2[j], -600, 160);
        count++;
    }
    if (count == 100) {
        count = 0;
        ctx.translate(-2000, 0);
    }

}

function nextv() {
    var video = document.getElementById("video1");
    //如果当前为最后一首，则直接回到第一首
    if (i == list1.length - 1)
        i = 0;
    else
        i++;
    video.src = list1[i];
    //下一首过后需要重新播放
    video.play();
}

function previousv() {
    var video = document.getElementById("video1");
    //当为第一首时，直接回到最后一首
    if (i == 0) {
        i = list1.length - 1;
    } else
        i--;
    video.src = list1[i];
    video.play();
}
function nextm() {
    var music = document.getElementById("music");
    //如果当前为最后一首，则直接回到第一首
    if (j == list.length - 1)
        j = 0;
    else
        j++;
    music.src = list[j];
    //下一首过后需要重新播放
    music.play();
    draw();
}

function previousm() {
    var music = document.getElementById("music");
    //当为第一首时，直接回到最后一首
    if (j == 0) {
        j = list.length - 1;
    } else
        j--;
    music.src = list[j];
    music.play();
}

function change() {
    self.location = "音乐播放界面.html"

}
function change1() {
    self.location = "视频播放界面.html"

}
function login() {
    var usernamelo = document.getElementById("usernamelo").value;
    var passwordlo = document.getElementById("passwordlo").value;
    var leng = window.localStorage.length;
    if (usernamelo == 0) {
        alert("请输入用户名");
        return 0;
    }
    if (passwordlo == 0) {
        alert("请输入密码");
        return 0;
    }
    if (leng == 0) {
        alert("用户不存在，请前往注册");
    }
    for (i = 0; i < leng; i++) {
        if (usernamelo == localStorage.key(i)) {
            if (passwordlo == localStorage.getItem(usernamelo)) {
                self.location = "视频播放界面.html";
                return;
            }
            else {
                self.location = "登录失败.html";
                return;
            }
        }
    }
    if (leng > 0) {
        alert("用户不存在，请前往注册");
    }
}
function register() {
    var usernamein = document.getElementById("regiusername").value;
    var passwordin = document.getElementById("regipassword").value;
    if (usernamein == 0) {
        alert("请输入用户名");
        return 0;
    }
    if (passwordin == 0) {
        alert("请输入密码");
        return 0;
    }
    var len = window.localStorage.length;
    var regist = 0;
    for (i = 0; i < len; i++) {
        if (usernamein == localStorage.key(i)) {
            regist = 1;
            self.location = "注册失败.html";
            break;
        }
    }
    if (len == 0 || regist == 0) {
        localStorage.setItem(usernamein, passwordin);
        self.location = "注册成功.html";
    }
}
function update() {
    var usernameup = document.getElementById("usernameup").value;
    var passwordup = document.getElementById("passwordup").value;
    var passworduse = document.getElementById("passworduse").value;
    var leng = window.localStorage.length;
    if (usernameup == 0) {
        alert("请输入用户名");
        return 0;
    }
    if (passworduse == 0) {
        alert("请输入原密码");
        return 0;
    }
    if (passwordup == 0) {
        alert("请输入新密码");
        return 0;
    }
    if (leng == 0) {
        alert("用户不存在，请前往注册");
    }
    for (i = 0; i < leng; i++) {
        if (usernameup == localStorage.key(i)) {
            if (passworduse == localStorage.getItem(usernameup)) {
                window.localStorage.setItem(usernameup, passwordup);
                self.location = "修改成功.html"
                return;
            }
            else {
                self.location = "修改失败.html";
                return;
            }
        }
    }
    if (leng > 0) {
        alert("用户不存在，请前往注册");
    }
}
setInterval(draw, 200);
audio();