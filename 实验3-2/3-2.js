function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}
function allow(ev) {
    ev.preventDefault();
}
function drop(ev) {
    ev.preventDefault(); //设置为可放置被拖拽元素的区域
    var id = ev.dataTransfer.getData("text"); //获取当前被放置的元素id名称
    var folder = document.getElementById(id); //根据id名称获取元素对象
    document.getElementById("container").removeChild(folder); //获取文件夹区域并删除该元素对象
}