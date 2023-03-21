window.onload = function () {
    // 根据html里面的ID和name创建
    var submitBut = document.getElementById('submit');
    var grade = document.getElementsByName('grade');
    var type = document.getElementsByName('type');
    var type1 = document.getElementsByName('type1');
    var pay = document.getElementsByName('pay');
    var age = document.getElementsByName('age');
    // 置i为0
    var i = 0;
    // 设置提交按钮的点击事件
    submitBut.onclick = function () {
        // 循环检查是否已经选中
        while (true) {
            if (grade[i].checked) {
                // alert("提交成功");
                i=0;
                break;
            }
            i++;
            // 没有选中则输出并且返回false
            if (i == grade.length) {
                alert("请填写必选项(PS：单选和多选都至少选择一个)");
                i=0;
                return false;
            }
            
        }
        // 重复判断每个单选多选
        while (true) {
            if (age[i].checked) {
                // alert("提交成功");
                i=0;
                break;
            }
            i++;
            if (i == age.length) {
                alert("请填写必选项(PS：单选和多选都至少选择一个)");
                i=0;
                return false;
            }
        }
        while (true) {
            if (pay[i].checked) {
                // alert("提交成功");
                i=0;
                break;
            }
            i++;
            if (i == pay.length) {
                alert("请填写必选项(PS：单选和多选都至少选择一个)");
                i=0;
                return false;
            }
        }
        while (true) {
            if (type[i].checked) {
                // alert("提交成功");
                i=0;
                break;
            }
            i++;
            if (i == type.length) {
                alert("请填写必选项(PS：单选和多选都至少选择一个)");
                i=0;
                return false;
            }
        }
        while (true) {
            if (type1[i].checked) {
                // alert("提交成功");
                i=0;
                return true;
            }
            i++;
            if (i == type1.length) {
                alert("请填写必选项(PS：单选和多选都至少选择一个)");
                i=0;
                return false;
            }
        }
    }

}
