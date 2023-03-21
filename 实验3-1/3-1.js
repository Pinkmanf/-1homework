// 页面打开时就加载此函数
window.onload = function () {
    //与getelementby效果差不多
    var box2 = document.querySelector(".box2");
    var box = document.querySelector(".box");
    // 用于计数当前为第几张img，以获取图片的id
    var count = 0;
    function photoFrame() {
        // 创建新的div用于存放相片相框，并且设置样式
        var d1 = document.createElement("div");
        d1.className = "photoFrame";
        d1.style.marginTop = "30px";
        d1.style.marginLeft = "5px";
        var img = document.createElement("img");
        img.src = "";
        count++;
        // 解析字符串返回整数，以获取相片的id
        img.id = 'img' + parseInt(count);
        // 加上新的相片子节点
        d1.appendChild(img);
        return d1;
    }
    box.ondragover = function (ev) {
        ev.preventDefault();
    }
    box.ondrop = function (ev) {
        ev.preventDefault();
        var files = ev.dataTransfer.files;
        // 获取刚刚创建的photFrame
        var img_1 = document.getElementsByClassName("photoFrame");
        var img_2 = document.getElementsByTagName("li");
        // 当进行第二次拖放图片时，如果已经存在图片，就删除已有的图片
        while (img_1.length > 0 || img_2.length > 0) {
            img_1[0].parentNode.removeChild(img_1[0]);
            img_2[0].parentNode.removeChild(img_2[0]);
        }
        // 获取图片的信息，包括名称，类型，大小，上次修改日期以及路径
        for (i = 0; i < files.length; i++) {
            var lastModified = files[i].lastModifiedDate;
            var lastModifiedStr = lastModified ? lastModified.toLocaleDateString() + ' ' + lastModified.toLocaleTimeString() : 'n/a';
            var fileStaus = "<li>1.名称:" + files[i].name + "<br>2.类型:" + files[i].type + "<br>3.大小:" + files[i].size + "字节" + "<br>4.修改时间:" + lastModifiedStr + "</li>";
            // 添加刚刚输入的信息子节点进入box2
            box2.appendChild(photoFrame());
            box2.innerHTML = box2.innerHTML + fileStaus;
            // 调用获取的路径
            setPath();
        }
        function setPath() {
            var fd = new FileReader();
            // 判断文件类型是否为图片类型
            if (files[i].type.indexOf('image') != 1) {
                fd.readAsDataURL(files[i]);
                count++;
                // 设置id，并且通过id获取当前的照片，由于photo里面已经加1了所以此处需要减1
                var id = "img" + parseInt(count - 1);
                var img = document.getElementById(id);
                fd.onload = function () {
                    var img = document.getElementById(id);
                    // 获取图片路径
                    img.src = this.result;
                }
            }
        }
    }
}