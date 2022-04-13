package cn.a2q.chess.rule;

import java.util.List;

import cn.a2q.chess.app.ChessApp;
import cn.a2q.chess.bean.RoleBean;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 *
 * 棋走法的规则
 * @author Administrator
 *
 */
public class ChessRule {

	private int[][] map;//棋盘的布局
	private int fromX; // 出发位置X
	private int fromY;// 出发位置Y
	private int toX;// 目的位置X
	private int toY;// 目的位置Y
	private int moveChessID;//起始位置是什么棋子
	private int targetID;//目的地是什么棋子或空地
	
	int guiziCount=0;//士兵的数量
	int baluCount=0;//将军的可走数量
	
//	public ChessRule(int[][] map){
//		this.map = map;
//	}
	
	public ChessRule(int[][] map,int fromX,int fromY,int toX,int toY){
		this.map = map;
		this.fromX = fromX;
		this.fromY = fromY;
		this.toX = toX;
		this.toY = toY;
	}
	/**
	 * 判断能不能走棋
	 * @return
	 */
	public boolean canMove(){

		boolean balu =  baluCanMove();
		boolean guizi = guiziCanMove();
		if (moveChessID == RoleBean.ROLE_GENERAL) {
			return balu;
		}
		if (moveChessID == RoleBean.ROLE_SOLDIER) {
			return guizi;
		}
		return false;
	} 
	
	/**
	 * 判断将军是否能走
	 * @return
	 */
	public  boolean baluCanMove(){
		if (fromX < 0 || fromX > (ChessApp.lineNumber-1) || fromY < 0 || fromY > (ChessApp.lineNumber-1)){
			//超出屏幕的，不移动
			return false;
		}
		if (toX < 0 || toX > (ChessApp.lineNumber-1) || toY < 0 || toY > (ChessApp.lineNumber-1)){
			//超出屏幕的，不移动
			return false;
		}
		if(fromX==toX && fromY==toY){//目的地与出发点相同，
			return false;
		}
		moveChessID = map[fromY][fromX];//得到起始棋子
		targetID = map[toY][toX];//得带终点棋子
		if(isSameSide(moveChessID,targetID)){//如果是同一阵营的
			return false;
		}
		if (targetID == 0) {//如果将军的目的地是空地时
			if(Math.abs(fromY - toY)  + Math.abs(toX - fromX) > 1){//只能走一步，并且是直线 
				return false;//返回false不让走
			}
		}else{ // 将军的目的地不是空地
			if(fromY!=toY && fromX!=toX){//走直线
				return false;//返回false
			}
			if(toY == fromY){//横线
				if(Math.abs(toX - fromX) != 2){//横着只能隔一个
					return false;
				}
				if(fromX > toX){//向左走,中间不能各一个
					if(map[toY][toX+1] != 0){
						return false;
					}
				}else{//向右走
					if(map[toY][toX-1] != 0){
						return false;
					}
				}
			}
			if(toX == fromX){//是竖线
				if(Math.abs(toY - fromY) != 2){//竖着只能各一个
					return false;
				}
				if(toY > fromY){//向下走
					if(map[toY-1][toX] != 0){
						return false;
					}
				}else{//向上走
					if(map[toY+1][toX] != 0){
						return false;
					}
				}
			}
		}
		return true;
	} 
	
	/**
	 * 判断士兵能不能走棋
	 * @return
	 */
	public  boolean guiziCanMove(){
		if (fromX < 0 || fromX > (ChessApp.lineNumber-1) || fromY < 0 || fromY > (ChessApp.lineNumber-1)){
			//超出屏幕的，不移动
			return false;
		}
		if (toX < 0 || toX > (ChessApp.lineNumber-1) || toY < 0 || toY > (ChessApp.lineNumber-1)){
			//超出屏幕的，不移动
			return false;
		}
		
		if(fromX==toX && fromY==toY){//目的地与出发点相同，
			return false;
		}
		
		moveChessID = map[fromY][fromX];//得到起始棋子
		targetID = map[toY][toX];//得带终点棋子
		if(isSameSide(moveChessID,targetID)){//如果是同一阵营的
			return false;
		}
		if((Math.abs(fromY - toY) + Math.abs(toX - fromX)) > 1){//只能走一步，并且是直线
			return false;//返回false不让走
		}
		if(map[toY][toX]!=0){//如果终点有棋
			return false;//返回false不让走
		}
		return true;
	} 
	
	public boolean isSameSide(int moveChessID, int targetID){//判断两个子是否为同一阵营
		if(targetID == 0){// 当目标地位空地时
			return false;
		}
		if(moveChessID == RoleBean.ROLE_SOLDIER &&targetID == RoleBean.ROLE_SOLDIER){//当都为小兵时
			return true;
		}
		else if(moveChessID == RoleBean.ROLE_GENERAL &&targetID == RoleBean.ROLE_GENERAL){//都为黑色棋子时
			return true;
		}
		else{//其他情况
			return false;
		}
	}
	
	/**
	 * 获得士兵的生命力
	 * @return
	 */
	public int getGuiZiCount(){
		int count=0;
		for (int i = 0; i < map.length; i++) {
			for (int j = 0; j < map[i].length; j++) {
				if (map[i][j] == RoleBean.ROLE_SOLDIER) {//如果某一个棋子是士兵
					count++;//数量给加1
				}
			}
		}
		return count;
	}
	
	/**
	 * 获得将军的生命力
	 * @return 
	 */
	
	public int getBaluCount(){
		AIPlayer aiPlayer = new AIPlayer();
		List<ChessMove> list = aiPlayer.allPossibleMoves(map, RoleBean.ROLE_GENERAL);
		if (list == null) {
			return 0;
		}
		return list.size();
	}
}
