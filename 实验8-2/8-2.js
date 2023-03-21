var textarea;
var count = 0;
var nowcount;
var tr;
var td;
var tb;
var butt;
var i = 1;
var leng = 0;


function save() {
    var now = new Date();
    var nowdate = now.toLocaleString();


    var textarea = document.getElementById('journal').value;
    count++;
    window.localStorage.setItem(count, textarea);
    tr = document.createElement("tr");
    tb = document.getElementsByTagName('table')[0];
    tb.appendChild(tr);

    td = document.createElement("td");

    td.innerHTML = count;
    // td.value = count;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = textarea;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = nowdate;
    tr.appendChild(td);
    // td = document.createElement("td");

    var butDel = document.createElement("input");
    butDel.type = "button";
    butDel.value = "删除";
    butDel.className = 'del';
    butDel.id = count;

    butDel.onclick = function () {
        window.localStorage.removeItem(butDel.id);
        // alert(butDel.id);
        while (1) {
            td = document.getElementsByTagName("td")[3 * (i - 1)];
            tr = document.getElementsByTagName("tr")[i];
            if (td.innerHTML == butDel.id) {
                tr.parentNode.removeChild(tr);
                i = 1;
                leng--;
                break;
            }
            i++;
        }
        // tr.parentNode.removeChild(tr);
    }
    tr.appendChild(butDel);
    leng++;
}

function delall() {
    window.localStorage.clear();
    // var i=1;
    while (1) {
        tr = document.getElementsByTagName("tr")[1];
        tr.parentNode.removeChild(tr);
        i++;
        if (i - 1 == leng) {
            break;
        }
    }
    leng -= (i - 1);
    i = 1;
}