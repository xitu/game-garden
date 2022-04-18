// 二维数组，用于存储数值
var board = new Array();
// 得分
var score = 0;
// 二维数组，用于判断当前单元格是否发生了相加
// 避免一次操作中，同一单元格相加超过一次
var hasConflicted = new Array();
// 定制显示"小白成长记"，二维数组容器
var myShow = new Array();
// 获取屏幕可用宽度
documentWidth = window.screen.availWidth;
// 根据屏幕宽度确定棋盘容器宽度、棋盘单元格宽度、单元格间隔
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04*documentWidth;

$(document).ready(function() {
	// 移动端响应式布局
	prepareForMobile();
	// 新游戏
	newgame();
});
// 移动端响应式
function prepareForMobile() {
	// 如果设备屏幕宽度大于500，则采用固定宽度
	if (documentWidth > 500) {
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	// 根据屏幕宽度，确定grid-container的宽高、内边距和圆角
	$('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
	$('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
	$('#grid-container').css('padding', cellSpace);
	$('#grid-container').css('border-radius', 0.02 * gridContainerWidth);
	// 根据屏幕宽度，确定grid-cell的宽高、内边距和圆角
	$('.grid-cell').css('width', cellSideLength);
	$('.grid-cell').css('height', cellSideLength);
	$('.grid-cell').css('border-radius', 0.02 * cellSideLength);
}
// 新游戏
function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}
// 初始化
function init() {
	// 通过二维循环分别获取十六个grid-cell，
	// 并根据所在行确定绝对定位的top值，根据所在列确定绝对定位的left值
	// 实现棋盘格布局
	for(var i = 0; i < 4; i ++) {
		for(var j = 0; j < 4; j ++) {
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top', getPosTop(i , j));
			gridCell.css('left', getPosLeft(i , j));
		}
	}
	// 把board数组二维化
	// 并将所有的值初始化为0
	for( var i = 0; i < 4; i ++ ) {
		board[i] = new Array();
		// 将同一单元格相加状态数组二维化
		hasConflicted[i] = new Array();
		// 将定制显示内容数组二维化
		myShow[i] = new Array();
		for ( var j = 0; j < 4; j++ ) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
			myShow[i][j] = growUp(board[i][j]);
		}
	}
	// 更新board中显示的内容
	updateBoardView();
	// 得分初始化为0
	score = 0;

}
// 更新board中显示的内容
function updateBoardView() {
	// 先移除原有的number-cell
	$('.number-cell').remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			// 利用二维循环，创建十六个数字容器number-cell
			// 并把number-cell添加进grid-container容器
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			// 获取每个number-cell
			// 并判断其值，如果为0，则不显示
			// 如果不为零则绝对定位在对应位置，并显示其值和改变背景色和文字颜色
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			if (board[i][j] == 0) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', getPosTop(i, j) + cellSideLength / 2);
				theNumberCell.css('left', getPosLeft(i, j) + cellSideLength / 2);
			} else {
				theNumberCell.css('width', cellSideLength);
				theNumberCell.css('height', cellSideLength);
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				// 默认显示数值
				// theNumberCell.text(board[i][j]);
				// 定制显示"小白成长记"
				myShow[i][j] = growUp(board[i][j]);
				theNumberCell.text(myShow[i][j]);
			}
			// 刷新每个单元格是否发生相加的状态
			hasConflicted[i][j] = false;
		}
	}
	// 设置行高和字号，垂直居中
	$('.number-cell').css('line-height',cellSideLength + 'px');
	// 默认显示数值
	// $('.number-cell').css('font-size',0.6 * cellSideLength + 'px');
	// 定制显示"小白成长记"
	$('.number-cell').css('font-size',0.2 * cellSideLength + 'px');
}

function generateOneNumber() {
	// 判断是否有空格子，如果没有空格子，则返回false
	if(nospace(board)) {
		return false;
	}
	// 随机一个位置
	// 随机（0~1）*4，取整，转整型
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	// 原思路是一直随机，直到随机到一个空的格子
	// 但是这样随着空格子越来越少，随机所需时间越来越久，体验不好
	// while(true){
	// 	if (board[randx][randy] == 0) {
	// 		break;
	// 	}
	// 	randx = parseInt(Math.floor(Math.random()*4));
	// 	randy = parseInt(Math.floor(Math.random()*4));
	// }
	// 改进思路为随机次数上限设为50次
	// 如果50次后还没有随机到空格子，则遍历寻找确定一个空格子
	var times = 0;
	while(times<50){
		if (board[randx][randy] == 0) {
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
		times++;
	}
	if (times==50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] == 0) {
					randx = i;
					randy = j;
				}
			}
		}
	}
	// 随机一个数值2/4
	// 如果随机数小于0.5则取2，否则取4
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	// 在随机位置显示随机数字
	// board[randx][randy] = randNumber;
	// 定制显示"小白成长记"
	board[randx][randy] = randNumber;
	// 显示动画
	showNumberWithAnimation(randx, randy, randNumber);
}
// 移动端操作
// 初始化触摸位置参数
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
// 监听touchstart事件，记下touchstart的坐标位置
document.addEventListener('touchstart', function(event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});
// 监听touchend事件，记下touchend的坐标位置
// 根据start和end坐标位置的不同确定用户操作的方向
// 上滑、下滑、左滑、右滑
// 手机坐标系中x轴正方向向左，y轴正方向向下
document.addEventListener('touchend', function(event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	// 计算x、y轴上起止位置之间的差值
	var deltax = endx - startx;
    var deltay = endy - starty;
    // 如果滑动起止位置距离太近则判断为误操作，不动作
    if (Math.abs(deltax) < 0.3 * documentWidth && Math.abs(deltay) < 0.3 * documentWidth) {
    	return;
    }
    // 如果x轴位移大于等于y轴，则判断为左右滑动，否则判断为上下滑动
    if (Math.abs(deltax) >= Math.abs(deltay)) {
    	// 如果x轴位移值大于零，判断为右滑，否则判断为左滑
    	if (deltax > 0) {
    		//move right
    		event.preventDefault();
			if (moveRight()) {
				setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
			} 
    	} else {
    		//move left
    		event.preventDefault();
			if (moveLeft()) {
				setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
			} 
    	}
    } else {
    	// 如果y轴位移值大于零，判断为下滑，否则判断为上滑
    	if (deltay > 0) {
    		//move down
    		event.preventDefault();
			if (moveDown()) {
				setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
			} 
    	} else {
    		//move up
    		event.preventDefault();
			if (moveUp()) {
				setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
			} 
    	}
    }
});
// 根据用户按下的方向键实现上下左右的操作,如果按下非方向键不做动作
// 先尝试移动，如果移动成功，则在空格子中随机位置产生一个随机数
// 并判断游戏是否结束
// 为了避免出现随机数和判断游戏是否结束发生在移动完成前，将这两个函数延时执行
$(document).keydown(function(event) {
	switch(event.keyCode) {
		case 37://left
			event.preventDefault();
			if (moveLeft()) {
				setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
			} 
			break;
		case 38://up
			event.preventDefault();
			if (moveUp()) {
				setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
			} 
			break;
		case 39://right
			event.preventDefault();
			if (moveRight()) {
				setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
			} 
			break;
		case 40://down
			event.preventDefault();
			if (moveDown()) {
				setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
			} 
			break;	
		default://default
			break;

	}
});
// 判断游戏是否结束
// 如果board中没有空格，且不能移动，则游戏结束
function isgameover() {
	if (nospace(board) && nomove(board)) {
		gameover();
	}
}
// 游戏结束函数
function gameover() {
	$('#game-over-score').text(score).css('color', '#1e90ff').css('font-size', '20px');
	$( "#game-over" ).dialog({
		title: "游戏结束",
		modal: true,
	  	dialogClass: "no-close",
	  	buttons: [
	    	{
	      		text: "再来一局",
	      		click: function() {
	        		$( this ).dialog( "close" );
	        		newgame();
	      		}
	    	},
	    	{
	      		text: "取消",
	      		click: function() {
	        		$( this ).dialog( "close" );
	      		}
	    	}
	  	]
	});
}
// 左移函数，先判断是否可以左移，如果不可以则返回false
function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}
	// moveLeft
	// 遍历每一行
	for (var i = 0; i < 4; i++) {
		// 遍历右侧三列
		for (var j = 1; j < 4; j++) {
			// 如果当前位置非空
			if (board[i][j] != 0) {
				// 遍历当前位置左侧单元格
				for (var k = 0; k < j; k++) {
					// 如果当前位置board[i][j]左侧单元格board[i][k]为0
					// 且两者之间没有非空单元格
					// 则将[i][j]位置的number-cell向左移动到[i][k]位置
					// 将[i][j]位置的board值赋值给[i][k]位置的board，原位置清零
					if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
						// move
						// 起始位置向目标位置移动的动画
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						// 继续循环
						continue;
					} 
					// 如果当前位置board[i][j]左侧单元格board[i][k]相等
					// 且两者之间没有非空单元格
					// 且当前单元格没有发生过相加，避免相加超过一次
					// 则将[i][j]位置的number-cell向左移动到[i][k]位置
					// 将[i][j]位置的board值与[i][k]位置的board值相加后赋值给[i][k]位置的board，原位置清零
					// 并计算、更新得分
					else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);
						// 修改当前发生相加的单元格的状态
						hasConflicted[i][k] = true;
						continue;
					} 
				}
			}
		}
	}
	// 更新board中显示的内容
	// 因为updateBoardView()函数执行较快，先于移动动画执行了
	// 导致不能正常显示动画，故延时200ms执行
	setTimeout('updateBoardView()',200);
	// 返回true，表示可以移动，然后随机产生一个新数，并判断游戏是否结束
	return true;
}
// 右移函数，先判断是否可以右移，如果不可以则返回false
function moveRight() {
	if (!canMoveRight(board)) {
		return false;
	}
	// moveRight
	// 遍历每一行
	for (var i = 0; i < 4; i++) {
		// 遍历左侧三列
		for (var j = 2; j >= 0; j--) {
			// 如果当前位置非空
			if (board[i][j] != 0) {
				// 遍历当前位置右侧单元格
				for (var k = 3; k > j; k--) {
					// 如果当前位置board[i][j]右侧单元格board[i][k]为0
					// 且两者之间没有非空单元格
					// 则将[i][j]位置的number-cell向右移动到[i][k]位置
					// 将[i][j]位置的board值赋值给[i][k]位置的board，原位置清零
					if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
						// move
						// 起始位置向目标位置移动的动画
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						// 继续循环
						continue;
					} 
					// 如果当前位置board[i][j]右侧单元格board[i][k]相等
					// 且两者之间没有非空单元格
					// 且当前单元格没有发生过相加，避免相加超过一次
					// 则将[i][j]位置的number-cell向右移动到[i][k]位置
					// 将[i][j]位置的board值与[i][k]位置的board值相加后赋值给[i][k]位置的board，原位置清零
					// 并计算、更新得分
					else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);
						// 修改当前发生相加的单元格的状态
						hasConflicted[i][k] = true;
						continue;
					} 
				}
			}
		}
	}
	// 更新board中显示的内容
	// 因为updateBoardView()函数执行较快，先于移动动画执行了
	// 导致不能正常显示动画，故延时200ms执行
	setTimeout('updateBoardView()',200);
	// 返回true，表示可以移动，然后随机产生一个新数，并判断游戏是否结束
	return true;
}
// 上移函数，先判断是否可以上移，如果不可以则返回false
function moveUp() {
	if (!canMoveUp(board)) {
		return false;
	}
	// moveUp
	// 遍历每一列
	for (var j = 0; j < 4; j++) {
		// 遍历下侧三行
		for (var i = 1; i < 4; i++) {
			// 如果当前位置非空
			if (board[i][j] != 0) {
				// 遍历当前位置上侧单元格
				for (var k = 0; k < i; k++) {
					// 如果当前位置board[i][j]上侧单元格board[k][j]为0
					// 且两者之间没有非空单元格
					// 则将[i][j]位置的number-cell向上移动到[k][j]位置
					// 将[i][j]位置的board值赋值给[k][j]位置的board，原位置清零
					if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
						// move
						// 起始位置向目标位置移动的动画
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						// 继续循环
						continue;
					} 
					// 如果当前位置board[i][j]上侧单元格board[k][j]相等
					// 且两者之间没有非空单元格
					// 且当前单元格没有发生过相加，避免相加超过一次
					// 则将[i][j]位置的number-cell向上移动到[k][j]位置
					// 将[i][j]位置的board值与[k][j]位置的board值相加后赋值给[k][j]位置的board，原位置清零
					// 并计算、更新得分
					else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
						//move
						showMoveAnimation(i, j, k, j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j];
						updateScore(score);
						// 修改当前发生相加的单元格的状态
						hasConflicted[k][j] = true;
						continue;
					} 
				}
			}
		}
	}
	// 更新board中显示的内容
	// 因为updateBoardView()函数执行较快，先于移动动画执行了
	// 导致不能正常显示动画，故延时200ms执行
	setTimeout('updateBoardView()',200);
	// 返回true，表示可以移动，然后随机产生一个新数，并判断游戏是否结束
	return true;
}
// 下移函数，先判断是否可以下移，如果不可以则返回false
function moveDown() {
	if (!canMoveDown(board)) {
		return false;
	}
	// moveDown
	// 遍历每一列
	for (var j = 0; j < 4; j++) {
		// 遍历上侧三行
		for (var i = 2; i >= 0; i--) {
			// 如果当前位置非空
			if (board[i][j] != 0) {
				// 遍历当前位置下侧单元格
				for (var k = 3; k > i; k--) {
					// 如果当前位置board[i][j]下侧单元格board[k][j]为0
					// 且两者之间没有非空单元格
					// 则将[i][j]位置的number-cell向下移动到[k][j]位置
					// 将[i][j]位置的board值赋值给[k][j]位置的board，原位置清零
					if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
						// move
						// 起始位置向目标位置移动的动画
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						// 继续循环
						continue;
					} 
					// 如果当前位置board[i][j]下侧单元格board[k][j]相等
					// 且两者之间没有非空单元格
					// 且当前单元格没有发生过相加，避免相加超过一次
					// 则将[i][j]位置的number-cell向下移动到[k][j]位置
					// 将[i][j]位置的board值与[k][j]位置的board值相加后赋值给[k][j]位置的board，原位置清零
					// 并计算、更新得分
					else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
						//move
						showMoveAnimation(i, j, k, j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[k][j];
						updateScore(score);
						// 修改当前发生相加的单元格的状态
						hasConflicted[k][j] = true;
						continue;
					} 
				}
			}
		}
	}
	// 更新board中显示的内容
	// 因为updateBoardView()函数执行较快，先于移动动画执行了
	// 导致不能正常显示动画，故延时200ms执行
	setTimeout('updateBoardView()',200);
	// 返回true，表示可以移动，然后随机产生一个新数，并判断游戏是否结束
	return true;
}