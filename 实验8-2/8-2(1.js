var tb = document.getElementById("tb");
refreshData(); ///刷新数据显示
function refreshData() {
    var length = localStorage.length;
    // 插入table
    tb.innerHTML = "<tr><th>序号</th><th width=300>日志内容</th><th width=300>保存时间</th><th width=50>操作</th></tr>"
    // 插入每一条数据
    for (var i = 0; i < length; i++) {
        var j = i + 1;
        var tr = document.createElement("tr");
        var name = localStorage.key(i);

        // 插入序号
        td = document.createElement("td");
        td.innerHTML = j;
        tr.appendChild(td);

        // 插入日志内容
        td = document.createElement("td");
        td.innerHTML = name;
        tr.appendChild(td);

        // 插入时间
        td = document.createElement("td");
        td.innerHTML = localStorage.getItem(name);
        tr.appendChild(td);

        // 删除按钮
        var butDel = document.createElement("input");
        butDel.type = "button";
        butDel.value = "删除";
        butDel.className = 'del';
        // 删除按钮函数
        butDel.onclick = function (n) {
            var name = localStorage.key(n);
            localStorage.removeItem(name);
            refreshData();
        }
        tr.appendChild(butDel);

        tb.appendChild(tr);
    }
}

// 保存日志
function save() {
    var length = localStorage.length;
    var n = length + 1;
    var test = document.getElementById('journal');
    var value = test.value;
    // 获取时间并转换
    var now = new Date();
    var keytime = now.toLocaleString();
    // 存入本地存储
    localStorage.setItem(value, keytime);
    refreshData();
}


function delall() {
    // 删除所有
    localStorage.clear();
    refreshData();
}