// 动画显示随机产生的数
function showNumberWithAnimation(i,j,randNumber) {
	// 通过传入进来的二维索引值，获取需要动画显示数值的容器
	var numberCell = $('#number-cell-' + i + '-' + j);
	// 设置这个number-cell的背景色和文本色，以及文本内容
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	// 默认
	// numberCell.text(randNumber);
	// 定制
	numberCell.text(growUp(randNumber));
	// 设置显示动画
	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top: getPosTop(i,j),
		left: getPosLeft(i,j)
	},50);
}
// 起始位置向目标位置移动的动画
function showMoveAnimation(fromx, fromy, tox, toy) {
	// 获取起始位置的单元格
	var numberCell = $('#number-cell-' + fromx + '-' + fromy);
	// 通过animation动画将起始位置单元格移动到目标位置
	numberCell.animate({
		top: getPosTop(tox, toy),
		left: getPosLeft(tox, toy)
	},200)
}
// 更新得分
function updateScore(score) {

	$('#score').text(score);
}