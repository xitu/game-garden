var type = 1; // 1滑入模式；2点击模式
var time = 30;
let that = this;
var result = 0;
that.createPuzzleTable(); // 创建表格，“画”表格
var isStart = false;
var theCaptainPosition = -1; // 船长的位置
// 切换模式
function bindType(e) {
    if (isStart) {
        // 当前已经开始游戏，不可创建
        return;
    }
    // console.log(e)
    var theType = e.getAttribute("data-value");
    if (theType == 1) {
        e.setAttribute("data-value", "2");
        $("#gameType").text("点击模式");
        type = 2;
    } else {
        e.setAttribute("data-value", "1");
        $("#gameType").text("滑入模式");
        type = 1;
    }
}
// 创建表格，“画”表格
function createPuzzleTable() {
    $pt = $('<table>').attr('id', 'puzzleTable');
    for (var y = 0; y < 4; y++) {
        var $row = $pt.append($('<tr>'));
        for (var x = 0; x < 4; x++) {
            $row.children().append($('<td class="td" onclick="clickSpan(this)" onmouseenter="enterSpan(this)" onmouseleave="leaveSpan(this)" data-value=' + (y * 4 + x) + '>').text(y * 4 + x + 1));
        }
    }
    $('#catch-body').append($pt);
}

// 开始游戏
function start() {
    if (isStart)
        return;
    if (time == 30) { //如果不加入该判断，则会出现在倒计时期间不断的点击发生不断的加快（其实就是你点了多少次就重复多少次该函数）的问题，用setTimeout（）方法不加此判断也是一样的
        var time1 = setInterval(function() {
            if (time == 0) {
                $("#gameStart").text("再来一把");
                $("#gameStart").removeAttr("disabled");
                time = 30;
                clearInterval(time1);
                isStart = false;
                that.gameOver();
            } else {
                $("#gameStart").attr("disabled", "true");
                $("#gameStart").text("倒计时(" + time + ")");
                time--;
            }
        }, 1000);
        // 随机的船长
        randomCaptain();
        isStart = true;
    }

}

// 游戏结束
function gameOver() {
    alert("游戏结束，您的最终分数：" + result);
    result = 0;
}

// 生成随机的船长
function randomCaptain() {
    var tdList = $('.td');
    if (tdList == undefined || tdList.length == 0) {
        // console.log("出错了！")
        return;
    }
    var size = tdList.length;
    var randomNum = Math.floor(Math.random() * size);
    var lastImg = tdList[randomNum].style.backgroundImage;
    while (lastImg != "") {
        randomNum = Math.floor(Math.random() * size);
        lastImg = tdList[randomNum].style.backgroundImage;
    }
    for (var i = 0; i < size; i++) {
        tdList[i].style.backgroundImage = "";
    }
    that.theCaptainPosition = randomNum;
    tdList[randomNum].style.backgroundImage = 'url("https://p9-passport.byteacctimg.com/img/user-avatar/2ee55cb1e7f476ace6a73fc86a8ff7e2~300x300.image")';
    // console.log(size);
    // console.log(tdList);
    // console.log(tdList[randomNum])
}

// 判断是否抓到的是船长
function bindCatch(theNumber) {
    // console.log(theCaptainPosition);
    // console.log(theNumber)
    if (theNumber == theCaptainPosition) {
        // console.log("加一分！");
        result++;
        $("#result").text(result);
        randomCaptain();
    }
}

// 点击模式
function clickSpan(e) {
    console.log(type, isStart)
    if (!isStart || type == 1) { // 当前未开始或滑入模式，不需要点击
        return;
    }
    var theNumber = e.getAttribute("data-value");
    that.bindCatch(theNumber);
}

// 鼠标滑入
function enterSpan(e) {
    e.style.border = "1px solid #66d3ff";
    if (!isStart || type == 2) { // 未开始或是点击模式不操作
        return;
    }
    // console.log(result)
    // console.log("滑入", e);
    var theNumber = e.getAttribute("data-value");
    that.bindCatch(theNumber);
}

// 鼠标滑出
function leaveSpan(e) {
    e.style.border = "1px solid #000000";
    if (!isStart) {
        return;
    }
    // console.log("离开", e);
}