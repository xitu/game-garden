/**
 * author:ls
 * email:liusaint@gmail.com
 * date:2016年4月9日
 * 
 * update: nfz
 * updateDate:2022年4月24日
 */

function SD() {
    this.sdArr = []; //生成的数独数组	
    this.errorArr = []; //错误的格子。
    this.blankNum = 81; //空白格子数量 
    this.backupSdArr = []; //数独数组备份。
    this.createTime = 1076275213; // 开始创建时间
    this.createEndTime = 1076275213; // 创建完成时间
}

SD.prototype = {
    constructor: SD,
    // 判断是否为数独
    isSudoku: function() {
        var backupSdArr = this.backupSdArr;
        // console.log(this.sdArr)
        var board = [];
        for (var i = 1; i < 10; i++) {
            var b = [];
            for (var j = 0; j < 9; j++) {
                if (backupSdArr[i * 10 + j + 1] == undefined) {
                    b[j] = "";
                } else {
                    b[j] = backupSdArr[i * 10 + j + 1];
                }
            }
            board[i - 1] = b;
        }
        // console.log(board)
        for (let i = 0; i < 9; i++) {
            let col = new Set()
            let row = new Set()
            for (let j = 0; j < 9; j++) {
                // console.log(board[i][j] )
                if (board[i][j] != "") { //判断行
                    if (!row.has(board[i][j])) {
                        row.add(board[i][j])
                    } else {
                        return false
                    }
                }
                if (board[j][i] != "") { //判断列
                    if (!col.has(board[j][i])) {
                        col.add(board[j][i])
                    } else {
                        return false
                    }
                }
            }
            let block = new Set()
            let x = parseInt(i / 3) * 3 //关键是找到块的x,y坐标
            let y = i % 3 * 3
            for (let k = 0; k < 9; k++) {
                if (board[x][y] != "") { //判断块
                    if (!block.has(board[x][y])) {
                        block.add(board[x][y])
                    } else {
                        return false
                    }
                }
                y++
                if ((k + 1) % 3 == 0) { //第4个换行
                    x += 1
                    y -= 3
                }
            }
        }

        return true;
    },
    createSudoku: function() {
        // console.log(this.sdArr)
        this.getInputVals();
        // console.log(this.backupSdArr)
        // console.log(this.sdArr)
        var isFlag = this.isSudoku();
        if (!isFlag) { // 不符合数独
            alert("当前数独不符合，请检查~");
            return;
        }
        this.createEndTime = new Date().getTime();
        var createShow = document.getElementById("createShow");
        var runningShow = document.getElementById("runningShow");
        createShow.style.display = "none";
        runningShow.style.display = "block";
    },
    init: function() {
        this.createDoms();
        this.drawCells();
        this.createBlank(this.blankNum);
        this.createBlankCells();
        this.createTime = new Date().getTime(); // 创建时间
    },
    reset: function() {
        //重置程序。
        this.errorArr = [];
        $(".sdspan").removeClass('bg_red blankCell');
        this.createSdArr();
        $(".sdspan[contenteditable=true]").prop('contenteditable', false);
        this.drawCells();
        this.createBlank(this.blankNum);
        this.createBlankCells();
        var createShow = document.getElementById("createShow");
        var runningShow = document.getElementById("runningShow");
        createShow.style.display = "block";
        runningShow.style.display = "none";
    },
    createSdArr: function() {
        //生成数独数组。
        var that = this;
        try {
            this.sdArr = [];
            this.setThird(2, 2);
            this.setThird(5, 5);
            this.setThird(8, 8);
            var allNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            outerfor:
                for (var i = 1; i <= 9; i++) {
                    innerfor: for (var j = 1; j <= 9; j++) {
                        if (this.sdArr[parseInt(i + '' + j)]) {
                            continue innerfor;
                        }
                        var XArr = this.getXArr(j, this.sdArr);
                        var YArr = this.getYArr(i, this.sdArr);
                        var thArr = this.getThArr(i, j, this.sdArr);
                        var arr = getConnect(getConnect(XArr, YArr), thArr);
                        var ableArr = arrMinus(allNum, arr);

                        if (ableArr.length == 0) {
                            this.createSdArr();
                            return;
                            break outerfor;
                        }

                        var item;
                        //如果生成的重复了就重新生成。
                        do {
                            item = ableArr[getRandom(ableArr.length) - 1];
                        } while (($.inArray(item, arr) > -1));

                        this.sdArr[parseInt(i + '' + j)] = item;
                    }
                }
            this.backupSdArr = this.sdArr.slice();
        } catch (e) {
            //如果因为超出浏览器的栈限制出错，就重新运行。
            that.createSdArr();
        }
    },
    getXArr: function(j, sdArr) {
        //获取所在行的值。
        var arr = [];
        for (var a = 1; a <= 9; a++) {
            if (this.sdArr[parseInt(a + "" + j)]) {
                arr.push(sdArr[parseInt(a + "" + j)])
            }
        }
        return arr;
    },
    getYArr: function(i, sdArr) {
        //获取所在列的值。
        var arr = [];
        for (var a = 1; a <= 9; a++) {
            if (sdArr[parseInt(i + '' + a)]) {
                arr.push(sdArr[parseInt(i + '' + a)])
            }
        }
        return arr;
    },
    getThArr: function(i, j, sdArr) {
        //获取所在三宫格的值。
        var arr = [];
        var cenNum = this.getTh(i, j);
        var thIndexArr = [cenNum - 11, cenNum - 1, cenNum + 9, cenNum - 10, cenNum, cenNum + 10, cenNum - 9, cenNum + 1, cenNum + 11];
        for (var a = 0; a < 9; a++) {
            if (sdArr[thIndexArr[a]]) {
                arr.push(sdArr[thIndexArr[a]]);
            }
        }
        return arr;
    },
    getTh: function(i, j) {
        //获取所在三宫格的中间位坐标。
        var cenArr = [22, 52, 82, 25, 55, 85, 28, 58, 88];
        var index = (Math.ceil(j / 3) - 1) * 3 + Math.ceil(i / 3) - 1;
        var cenNum = cenArr[index];
        return cenNum;
    },
    setThird: function(i, j) {
        //为对角线上的三个三宫格随机生成。
        var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var sortedNumArr = numArr.sort(function() { return Math.random() - 0.5 > 0 ? -1 : 1 });
        var cenNum = parseInt(i + '' + j);
        var thIndexArr = [cenNum - 11, cenNum - 1, cenNum + 9, cenNum - 10, cenNum, cenNum + 10, cenNum - 9, cenNum + 1, cenNum + 11];
        for (var a = 0; a < 9; a++) {
            this.sdArr[thIndexArr[a]] = sortedNumArr[a];
        }
    },
    drawCells: function() {
        //将生成的数组填写到九宫格
        for (var j = 1; j <= 9; j++) {
            for (var i = 1; i <= 9; i++) {
                $(".sdli").eq(j - 1).find(".sdspan").eq(i - 1).html(this.sdArr[parseInt(i + '' + j)]);
            }
        }
    },
    createBlank: function(num) {
        //生成指定数量的空白格子的坐标。
        var blankArr = [];
        var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var item;
        for (var a = 0; a < num; a++) {
            do {
                item = parseInt(numArr[getRandom(9) - 1] + '' + numArr[getRandom(9) - 1]);
            } while ($.inArray(item, blankArr) > -1);
            blankArr.push(item);
        }
        this.blankArr = blankArr;
    },
    createBlankCells: function() {
        //在创建好的数独中去除一部分格子的值，给用户自己填写。把对应格子变成可编辑,并添加事件。
        var blankArr = this.blankArr,
            len = this.blankArr.length,
            x, y, dom;

        for (var i = 0; i < len; i++) {
            x = parseInt(blankArr[i] / 10);
            y = blankArr[i] % 10;
            dom = $(".sdli").eq(y - 1).find(".sdspan").eq(x - 1);
            dom.attr('contenteditable', true).html('').addClass('blankCell');
            this.backupSdArr[blankArr[i]] = undefined;
        }

        $(".sdspan[contenteditable=true]").keyup(function(event) {
            var val = $(this).html();
            var reStr = /^[1-9]{1}$/;
            if (!reStr.test(val)) {
                $(this).html('');
            };
        });
    },
    checkRes: function() {
        //检测用户输入结果。检测前将输入加入数组。检测单个的时候将这一个的值缓存起来并从数组中删除，检测结束在赋值回去。
        var blankArr = this.blankArr,
            len = this.blankArr.length,
            x, y, dom, done, temp;
        this.getInputVals();
        this.errorArr.length = 0;
        for (var i = 0; i < len; i++) {
            x = parseInt(blankArr[i] / 10);
            y = blankArr[i] % 10;
            temp = this.backupSdArr[blankArr[i]];
            this.backupSdArr[blankArr[i]] = undefined;
            this.checkCell(x, y);
            this.backupSdArr[blankArr[i]] = temp;
        }
        done = this.isAllInputed();
        if (this.errorArr.length == 0 && done) {
            var gameTime = ((new Date().getTime()) - this.createEndTime) / 1000;
            var createTime = (this.createEndTime - this.createTime) / 1000;
            alert('你胜利了！创建数独耗时：' + createTime + '；完成数独耗时：' + gameTime + "秒！");
            $(".bg_red").removeClass('bg_red');
        } else {
            if (!done) {
                alert("你没有完成游戏！");
            }
            this.showErrors();
        }
    },
    checkCell: function(i, j) {
        //检测一个格子中输入的值，在横竖宫里是否已存在。
        var index = parseInt(i + '' + j);
        var backupSdArr = this.backupSdArr;
        var XArr = this.getXArr(j, backupSdArr);
        var YArr = this.getYArr(i, backupSdArr);
        var thArr = this.getThArr(i, j, backupSdArr);
        var arr = getConnect(getConnect(XArr, YArr), thArr);
        var val = parseInt($(".sdli").eq(j - 1).find(".sdspan").eq(i - 1).html());
        if ($.inArray(val, arr) > -1) {
            this.errorArr.push(index);
        }
    },
    getInputVals: function() {
        //将用户输入的结果添加到数组中。
        var blankArr = this.blankArr,
            len = this.blankArr.length,
            i, x, y, dom, theval;
        for (i = 0; i < len; i++) {
            x = parseInt(blankArr[i] / 10);
            y = blankArr[i] % 10;
            dom = $(".sdli").eq(y - 1).find(".sdspan").eq(x - 1);
            theval = parseInt(dom.text()) || undefined;
            this.backupSdArr[blankArr[i]] = theval;
        }
    },
    isAllInputed: function() {
        //检测是否全部空格都有输入。
        var blankArr = this.blankArr,
            len = this.blankArr.length,
            i, x, y, dom;
        for (i = 0; i < len; i++) {
            x = parseInt(blankArr[i] / 10);
            y = blankArr[i] % 10;
            dom = $(".sdli").eq(y - 1).find(".sdspan").eq(x - 1);
            if (dom.text() == '') {
                return false
            }
        }
        return true;
    },
    showErrors: function() {
        //把错误显示出来。
        var errorArr = this.errorArr,
            len = this.errorArr.length,
            x, y, dom;
        $(".bg_red").removeClass('bg_red');
        for (var i = 0; i < len; i++) {
            x = parseInt(errorArr[i] / 10);
            y = errorArr[i] % 10;
            dom = $(".sdli").eq(y - 1).find(".sdspan").eq(x - 1);
            dom.addClass('bg_red');
        }
    },
    createDoms: function() {
        //生成九宫格。
        var html = '<ul class="sd clearfix">';
        String.prototype.times = String.prototype.times || function(n) { return (new Array(n + 1)).join(this); };
        html = html + ('<li class="sdli">' + '<span class="sdspan"></span>'.times(9) + '</li>').times(9) + '</ul>';
        $("#sudoku-body").prepend(html);

        for (var k = 0; k < 9; k++) {
            $(".sdli:eq(" + k + ") .sdspan").eq(2).addClass('br');
            $(".sdli:eq(" + k + ") .sdspan").eq(5).addClass('br');
            $(".sdli:eq(" + k + ") .sdspan").eq(3).addClass('bl');
            $(".sdli:eq(" + k + ") .sdspan").eq(6).addClass('bl');
        }
        $(".sdli:eq(2) .sdspan,.sdli:eq(5) .sdspan").addClass('bb');
        $(".sdli:eq(3) .sdspan,.sdli:eq(6) .sdspan").addClass('bt');
    }
}


//生成随机正整数
function getRandom(n) {
    return Math.floor(Math.random() * n + 1)
}

//两个简单数组的并集。
function getConnect(arr1, arr2) {
    var i, len = arr1.length,
        resArr = arr2.slice();
    for (i = 0; i < len; i++) {
        if ($.inArray(arr1[i], arr2) < 0) {
            resArr.push(arr1[i]);
        }
    }
    return resArr;
}

//两个简单数组差集，arr1为大数组
function arrMinus(arr1, arr2) {
    var resArr = [],
        len = arr1.length;
    for (var i = 0; i < len; i++) {
        if ($.inArray(arr1[i], arr2) < 0) {
            resArr.push(arr1[i]);
        }
    }
    return resArr;
}