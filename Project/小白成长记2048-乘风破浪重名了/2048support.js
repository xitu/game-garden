// 定制版
// 小白成长记
function growUp(number) {
	switch(number) {
		case 2:return "小小白";break;
        case 4:return "小白";break;
        case 8:return "实习生";break;
        case 16:return "新手";break;
        case 32:return "老手";break;
        case 64:return "骨干";break;
        case 128:return "副主管";break;
        case 256:return "主管";break;
        case 512:return "副经理";break;
        case 1024:return "经理";break;
        case 2048:return "总经理";break;
        case 4096:return "副总裁";break;
        case 8192:return "总裁";break;
	}
	return '天外来客';
}

// 根据所在行获取绝对定位的top值
function getPosTop(i , j) {
	return cellSpace + i * (cellSideLength + cellSpace);
}
// 根据所在列获取绝对定位的left值
function getPosLeft(i , j) {
	return cellSpace + j * (cellSideLength + cellSpace);
}
// 根据格子里的数值不同设置不同的背景色
function getNumberBackgroundColor(number) {
	switch(number) {
		case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
	}
	return '#000';
}
// 根据格子里的数值不同设置不同的文本颜色

function getNumberColor(number) {
	switch(number) {
		case 2:return "#fff";break;
        case 4:return "#776e65";break;
        case 8:return "#dda0dd";break;
        case 16:return "#ff1493";break;
        case 32:return "#9932cc";break;
        case 64:return "#9370db";break;
        case 128:return "#0000cd";break;
        case 256:return "#483d8b";break;
        case 512:return "#1e90ff";break;
        case 1024:return "#00bfff";break;
        case 2048:return "#00ffff";break;
        case 4096:return "#008b8b";break;
        case 8192:return "#00ff7f";break;
	}
	return '#fff';
	// 原版中大于4的统一为白色
	// if (number <= 4) {
	// 	return '#776e65';
	// } else {
	// 	return '#fff';
	// }
}
// 遍历棋盘格，如果数值为0返回false，说明是空的，否则返回true，非空
function nospace(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j]==0) {
				return false;
			}
		}
	}
	return true;
}
// 判断当前二维数组board是否可以进行左移操作
function canMoveLeft(board) {
	// 循环遍历每一行
	for (var i = 0; i < 4; i++) {
		// 循环遍历右侧三列
		for (var j = 1; j < 4; j++) {
			// 判断当前位置数值是否为0
			if (board[i][j] != 0) {
				// 判断当前位置左侧数值是否为0，或者与左侧位置数值是否相等
				if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
					// 如果当前位置左侧数值为0，或者与左侧位置数值相等，则可以左移
					return true;
				}
			}
		}
	}
	// 否则不可以左移
	return false;
}
// 判断当前二维数组board是否可以进行右移操作
function canMoveRight(board) {
	// 循环遍历每一行
	for (var i = 0; i < 4; i++) {
		// 循环遍历左侧三列
		for (var j = 2; j >= 0; j--) {
			// 判断当前位置数值是否为0
			if (board[i][j] != 0) {
				// 判断当前位置右侧数值是否为0，或者与右侧位置数值是否相等
				if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
					// 如果当前位置右侧数值为0，或者与右侧位置数值相等，则可以右移
					return true;
				}
			}
		}
	}
	// 否则不可以右移
	return false;
}
// 判断当前二维数组board是否可以进行上移操作
function canMoveUp(board) {
	// 循环遍历每一列
	for (var j = 0; j < 4; j++) {
		// 循环遍历下侧三行
		for (var i = 1; i < 4; i++) {
			// 判断当前位置数值是否为0
			if (board[i][j] != 0) {
				// 判断当前位置上侧数值是否为0，或者与上侧位置数值是否相等
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
					// 如果当前位置上侧数值为0，或者与上侧位置数值相等，则可以上移
					return true;
				}
			}
		}
	}
	// 否则不可以上移
	return false;
}
// 判断当前二维数组board是否可以进行下移操作
function canMoveDown(board) {
	// 循环遍历每一列
	for (var j = 0; j < 4; j++) {
		// 循环遍历上侧三行
		for (var i = 2; i >= 0; i--) {
			// 判断当前位置数值是否为0
			if (board[i][j] != 0) {
				// 判断当前位置下侧数值是否为0，或者与下侧位置数值是否相等
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					// 如果当前位置下侧数值为0，或者与下侧位置数值相等，则可以下移
					return true;
				}
			}
		}
	}
	// 否则不可以下移
	return false;
}
// 判断row行，col1和col2之间是否有阻碍，即是否有非空单元格
// 如果有返回false
function noBlockHorizontal(row, col1, col2, board) {
	for (var i = col1 + 1; i < col2; i++) {
		if (board[row][i] != 0) {
			return false;
		}
	}
	return true;
}
// 判断col列，row1和row2之间是否有阻碍，即是否有非空单元格
// 如果有返回false
function noBlockVertical(col, row1, row2, board) {
	for (var i = row1 + 1; i < row2; i++) {
		if (board[i][col] != 0) {
			return false;
		}
	}
	return true;
}
// 判断是否可以继续移动
// 如果可以左移或者右移或者上移或者下移，则可以移动，返回false
function nomove(board) {
	if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) {
		return false;
	}
	return true;
}