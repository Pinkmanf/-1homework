
var music = document.getElementById('music');
var volume = document.getElementById("volume");
var title = document.getElementById('title');
var img=document.getElementById('beginpause');
//设置数组来实现上下首播放
var list = new Array("儿童歌曲-大耳朵图图.mp3", "陈洁丽&陆双&祖晴&王巍-疯狂果宝.mp3", "纯音乐-小火车.mp3");
var i = 0;

function beginPause() {
	if (music.paused) {
		//暂停状态时重新播放并且改变按钮图片
		music.play();
		title.innerHTML = list[i];
		img.innerHTML="<img src='pause.png' width='50' height='50'/>";
	}
	else {
		//播放状态时暂停并且改变按钮图片
		music.pause();
		img.innerHTML="<img src='begin.png' width='50' height='50'/>";
	}
}

function nextm() {
	//如果当前为最后一首，则直接回到第一首
	if (i == list.length - 1)
		i = 0;
	else
		i++;
	music.pause();
	music.src = list[i];
	title.innerHTML = list[i];
	//下一首过后需要重新播放
	music.play();
	img.innerHTML="<img src='pause.png' width='50' height='50'/>";
}
function previousm() {
	//当为第一首时，直接回到最后一首
	if (i == 0) {
		i = list.length - 1;
	} else
		i--;
	music.pause();
	music.src = list[i];
	title.innerHTML = list[i];
	music.play();
	img.innerHTML="<img src='pause.png' width='50' height='50'/>";
}
volume.onchange = function () {
	//调节音量赋值
	music.volume = volume.value;
}
