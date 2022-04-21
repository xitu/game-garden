let that = this;
// 定义设置颜色(12种颜色) 
let colorNameList = ['红', '绿', '蓝', '黄', '黑', '白', '灰', '紫', '粉', '青', '橙', '棕'];
// 对应颜色的十六进制
let colorHexList = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#000000', '#FFFFFF', '#999999', '#9933FF', '#ff00cc', '#65ffcd', '#ffa500', '#D2691E'];
// 颜色对应的map形式
let colorMap = {
    '红': '#FF0000',
    '绿': '#00FF00',
    '蓝': '#0000FF',
    '黄': '#FFFF00',
    '黑': '#000000',
    '白': '#FFFFFF',
    '灰': '#999999',
    '紫': '#9933FF',
    '粉': '#ff00cc',
    '青': '#65ffcd',
    '橙': '#ffa500',
    '棕': '#D2691E'
}

// 颜色下标（方便记录，去掉相同颜色，避免出现相同颜色）
var numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// console.log(colorMap);
var optList = ["A", "B", "C", "D"]; // 选项
var msg = ""; // 提示语
var isNext = true; // 是否下一题

var optRightNum = 0; // 正确答案下标
let questionNumber = 10; // 默认题目数量 10（下标从0开始）
let theQuerstionNumber = 0; // 题目数
let theResultNum = 0; // 分数
var theRightNum = 0; // 正确选项
// that.showQuestion();
// 显示答题
function showQuestion(e) {
    that.bindQuestion();
    if (e && e.getAttribute("data-value")) {
        questionNumber = e.getAttribute("data-value");
    }
    var questionNum = document.getElementById("questionNum");
    questionNum.innerHTML = questionNumber;
    that.getQuestion();
}
// 来一道题
function getQuestion() {
    optRightNum = Math.floor(Math.random() * 4); // 正确答案下标（获取随机数0~3）
    var size = questionNumber;
    size = parseInt(size);
    var theColor = getRandomColor(size);
    // console.log(theColor);
    // for(var i =0;i<questionNumber;i++){
    var num = Math.floor(Math.random() * 2); // 随机获取0 or 1；为0时候是读字；为1时是读颜色
    var titleStr = theQuerstionNumber + "、题目：";
    // console.log(num)
    if (num == 0) {
        titleStr += "选择该字对应的文字";
        theRightNum = theColor.numName;
    } else {
        titleStr += "选择该字对应的颜色";
        theRightNum = theColor.numHex;
    }
    titleStr += "<div class='the-title-span' style='color:" + theColor.colorHex + "'>" + theColor.colorName + "</div>";

    // console.log(titleStr);
    // }
    var themDiv = document.getElementById("opt-them");
    var titleDiv = document.getElementById("opt-title");
    titleDiv.innerHTML = titleStr;

    var newNumList = [].concat(numberList);

    newNumList.splice(theRightNum, 1); // 删除正确答案的下标（防止出现相同答案）

    // console.log("numberList",numberList);
    // console.log("newNumList",newNumList);
    // console.log(newNumList.length);

    var optStr = "<div class='opt-them'>";

    for (var i = 0; i < 4; i++) {
        optStr += "<div class='opt-item' onclick='onclickOpt(this)' data-value='" + i + "'>" + optList[i] + ". ";
        var colorNum = Math.floor(Math.random() * newNumList.length);
        if (i == optRightNum) {
            optStr += colorNameList[theRightNum];
            optStr += "</div>";
            continue;
        }
        optStr += colorNameList[newNumList[colorNum]];
        newNumList.splice(colorNum, 1); // 删除已出现过的选项的下标（防止出现相同选项）
        optStr += "</div>";
    }
    optStr += "</div>";
    // console.log(optStr);
    // console.log("正确答案:"+(optRightNum+1));
    themDiv.innerHTML = optStr;
}

// 点击选项方法（事件)
function onclickOpt(e) {
    if (!isNext) { // 当前状态不能进行下一题
        return;
    }
    var result = document.getElementById("result");
    var theOpt = "";
    if (e && e.getAttribute("data-value")) {
        theOpt = e.getAttribute("data-value");
    } else {
        return;
    }
    isNext = false;
    if (optRightNum == theOpt) {
        theResultNum++;
        result.innerHTML = theResultNum;
        // console.log("选择正确！");
        msg = "选择正确！";
    } else {
        // console.log("选择错误！");
        msg = "选择错误！";
    }
    if (theQuerstionNumber == questionNumber) {
        msg = "游戏结束！一共：" + questionNumber + "题；<br>您的最终得分是：" + theResultNum;
        that.bindShowResult(msg);
        return;
    }
    that.bindShowResult(msg);
}

// 下一题
function nextQuerstion() {
    that.bindShowResult();
    isNext = true;
    if (theQuerstionNumber == questionNumber) {
        that.reset();
        return;
    }
    theQuerstionNumber++;
    that.getQuestion();
}

// 显示分数
function bindShowResult(msg) {
    var showMsg = document.getElementById("show-msg");
    if (showMsg.style.display == "none") {
        showMsg.children[0].innerHTML = msg;
        showMsg.style.display = "block";
    } else {
        showMsg.style.display = "none";
    }
}

// 重置游戏
function reset() {
    theQuerstionNumber = 1;
    isNext = true;
    theResultNum = 0;
    result.innerHTML = theResultNum;
    that.getQuestion();
}
// 显示图片模式
function bindImg() {
    var traget = document.getElementById("show-img-div");
    var btnList = document.getElementsByClassName("nfz-btn");
    if (traget.style.display == "none") {
        traget.style.display = "block";
        that.bindBtn(btnList);
    } else {
        traget.style.display = "none";
        that.bindBtn(btnList);
    }
}

// 禁止按钮
function bindBtn(btnList) {
    for (var btn of btnList) {
        btn.disabled = !btn.disabled;
    }
}

// 图片模式显示对应的
function showImg(e) {
    var size = e.getAttribute("data-value");
    size = parseInt(size);
    that.bindImg();
    const colorList = getTwoArray(size);
    // console.log(colorList);
    var imgBody = document.getElementById("imgBody");
    imgBody.innerHTML = colorList;
}

// 获取一个颜色对象
function getRandomColor(size) {
    // console.log(size)
    var numHex = Math.floor(Math.random() * size);
    var numName = Math.floor(Math.random() * size);
    if (numHex == numName) { // 避免“字”和“字”的颜色相同
        if (numHex > 1 && numHex < size) {
            numHex -= 2;
        } else {
            numHex += 2;
        }
    };
    var color = {
        colorHex: colorHexList[numHex],
        colorName: colorNameList[numName],
        numHex: numHex,
        numName: numName
    }
    return color; // 可均衡获取 0 到 9 的随机整数.
}

// 获取二维坐标系（画“图”）
function getTwoArray(size) {
    // console.log(e);
    var textList = new Array();
    for (var i = 0; i < size; i++) {
        textList[i] = new Array();
    }
    // console.log(textList)
    var textStr = "";
    for (var i = 0; i < size; i++) {
        if (i % 2 == 0) {
            textStr += "<div style='background: #cce8f5;margin:0px;'>";
        } else {
            textStr += "<div style='background: #ffd4d4;margin:0px;'>";
        }
        for (var j = 0; j < size; j++) {
            var theColor = getRandomColor(size);
            textList[i][j] = theColor;
            textStr += "<span class='the-color-span' style='color:" + theColor.colorHex + "'>" + theColor.colorName + "</span>";
        }
        textStr += "</div>";
    }
    return textStr; // 可均衡获取 0 到 9 的随机整数.
}


// 显示游戏模式
function bindQuestion() {
    if (!isNext) { // 当前状态不能操作游戏模式窗口
        return;
    }
    var traget = document.getElementById("show-question-div");
    var btnList = document.getElementsByClassName("nfz-btn");
    // console.log(btnList)
    // console.log(traget.style.display)
    if (traget.style.display == "none") {
        traget.style.display = "block";
        that.bindBtn(btnList);
        that.reset();
    } else {
        traget.style.display = "none";
        that.bindBtn(btnList);
    }
}