// new 一个新的Date对象
let today = new Date();
// 获取当前日期月份
let currentMonth = today.getMonth();
//获取当前完整年份
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


//下个月
function next() {
    //当currentMonth等于11时（0代表1月，所以11代表12月），跳到下一年
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    //月份数求余
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}
//上个月
function previous() {
    //当为1月时，上一月即为12月，年数减1
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

//展示日历主函数
function showCalendar(month, year) {
    //获取这周第一天是星期几
    let firstDay = (new Date(year, month)).getDay();
    //返回当月的天数
    //假如这个月有31天，32表示的就是下个月1号，再用32-1就是表示这个月31天，要是这个月30天，32就表示下个月2号，再用32-2，就表示这个月30天
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body"); 

    //清除之前所有的单元格
    tbl.innerHTML = "";

    // 日历标题
    monthAndYear.innerHTML =  year+ " " + months[month];
    //将获取到的年月注入html
    selectYear.value = year;
    selectMonth.value = month;

    // 创建所有单元格
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            //在第一行且列小于本月第一天的星期时
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                //直接用空格填充元素td
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            //当date大于当月天数时，跳出循环
            else if (date > daysInMonth) {
                break;
            }

            else {
                //非第一列后直接填充日期即可
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                //为今天的日期设置背景颜色
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.style.color='red';
                } 
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // 将每一行追加到日历正文中
    }

}