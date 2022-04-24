package cn.a2q.chess.rule;


import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import cn.a2q.chess.app.ChessApp;
import cn.a2q.chess.bean.RoleBean;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 *
 * 人工智能
 * @author Administrator
 */ 

public class AIPlayer {
	
	Random random = new Random();//随机函数的使用
	List<Integer> list_dp_index = new ArrayList<Integer>();//大炮的最佳索引
	List<Integer> list_xb_index = new ArrayList<Integer>();//小兵的最佳索引
	
	//电脑是通过该方法得到当前棋局最好的走法
	public ChessMove searchAGoodMove(int[][] qizi, int chessRole){//查询一个好的走法
		List<ChessMove> ret = allPossibleMoves(qizi,chessRole);//产生所有走法
		if(ret == null){
			return null;
		}
		try {
			Thread.sleep(1000);//睡眠一秒钟，以便调试
		} catch (InterruptedException e) {//捕获异常
			e.printStackTrace();//打印堆栈信息
		}
		int id = bestsorce(qizi,ret,chessRole);
		return ret.get(id);
	}
	
	
	//对走法进行优劣评估,选出一个最好的走法；
	public int bestsorce(int[][] qizi,List<ChessMove> ret, int chessRole){
		int bestID = 0;
		int guiziCount  = 100;
		int baluCount  = 100;
		int baluOwnCount = 0;
		//System.out.println("AI 电脑共提供："+ret.size()+"中路径");
		//System.out.println("[AIPlay]===================="+ret.size()+"=============================");
		for(int i=0; i<ret.size(); i++){
			
			//为了避免破坏源数据，此处又复制了一个当前棋局
			int[][] testqizi = new int[ChessApp.lineNumber][ChessApp.lineNumber];
			for(int m=0; m<qizi.length; m++){
				for(int n=0; n<qizi[m].length; n++){
					testqizi[m][n] = qizi[m][n];
				}
			}
			
			ChessMove cm = ret.get(i);
			int from_x = cm.fromX;
			int from_y = cm.fromY;
			int to_x = cm.toX;
			int to_y = cm.toY;
			
			testqizi[to_y][to_x] = testqizi[from_y][from_x];//移动棋子
			testqizi[from_y][from_x] = 0;//将原来处设空
			
//			for (int j = 0; j < testqizi.length; j++) {
//				System.out.print("\n[");
//				for (int j2 = 0; j2 < testqizi[j].length; j2++) {
//					System.out.print(testqizi[j][j2]+" ");
//				}
//				System.out.print("]\n");
//			}
			 if(chessRole == RoleBean.ROLE_GENERAL){
				 
				 ChessRule chessRule = new ChessRule(testqizi, from_x, from_y, to_x, to_y);
				 
				 List<ChessMove> list =  allPossibleMoves(testqizi, RoleBean.ROLE_GENERAL);
				 int myCount = 0;
				 if (list != null) {
					 myCount = list.size();
				}
				 int count = chessRule.getGuiZiCount();
				
				 if (count <= guiziCount) {//如果走这一步能时士兵数量减少，那肯定是首先的一步
					 guiziCount = count;
					 bestID = i;//选为最佳
					 if (myCount >= baluOwnCount) {//将军走的这一步，不但能使士兵减少，而且还能使自己更多
						 baluOwnCount = myCount;
						 bestID = i;
					}
				}
				 
			 }else if(chessRole == RoleBean.ROLE_SOLDIER){
				 	List<ChessMove> list =  allPossibleMoves(testqizi, RoleBean.ROLE_GENERAL);
				 	if (list == null) {
						return i;
					}
				 	int count = list.size();
				 	//System.out.println("AI 第"+i+"种，(fromX,fromY)--->(toX, toY):"+from_x+","+from_y+"-->"+to_x+","+to_y);
				 	//System.out.println("AI 将军的count:"+count);
				 	if (count < baluCount) {
				 		baluCount = count;
				 		bestID = i;
					}
			 }
		}
		
		return bestID;
	}
	
	//获得所有的走法
	public List<ChessMove> allPossibleMoves(int[][] map, int chessRole){//产生所有可能的走法
		
		List<ChessMove> guiziMoveList =new ArrayList<ChessMove>();//产生士兵的所有走法
		List<ChessMove> baluMoveList = new ArrayList<ChessMove>();//产生将军的所有走法
		
		 for (int y = 0; y < ChessApp.lineNumber; y++){
			 for (int x = 0; x < ChessApp.lineNumber; x++){//循环所有的棋牌位置
				 int chessman = map[y][x];
				 //System.out.println("=============this chessman is:"+chessman+"(x,y) :"+y+","+x);
				 if (chessman != 0){//当次位置不为空时，即有棋子时
					 switch (chessman){
					 	case RoleBean.ROLE_SOLDIER://小兵
					 		//向下走一格
					 		ChessRule chessRule1 = new ChessRule(map, x, y, x, y+1);
					 		if(chessRule1.guiziCanMove()){
					 			int sorce = 0;
					 			guiziMoveList.add(new ChessMove(chessman, x, y, map[x][y+1], x, y+1, sorce));
	                    	}
					 		//向上走一格
					 		ChessRule chessRule2 = new ChessRule(map, x, y, x, y-1);
					 		if(chessRule2.guiziCanMove()){
					 			int sorce = 0;
					 			guiziMoveList.add(new ChessMove(chessman,x, y, map[x][y-1], x, y-1, sorce));
	                    	}
					 		//向左走一格
					 		ChessRule chessRule3 = new ChessRule(map,  x, y, x-1, y);
					 		if(chessRule3.guiziCanMove()){
					 			int sorce = 0;
					 			guiziMoveList.add(new ChessMove(chessman, x, y, map[x-1][y], x-1, y, sorce));
	                    	}
					 		//向右走一格
					 		ChessRule chessRule4 = new ChessRule(map,  x, y, x+1, y);
					 		if(chessRule4.guiziCanMove()){
					 			int sorce = 0;
					 			guiziMoveList.add(new ChessMove(chessman,   x, y,  map[x+1][y], x+1, y, sorce));
	                    	}
					 		
	                    	break;
						
	         			case RoleBean.ROLE_GENERAL://将军
	         				//System.out.println("welcome to balu"); 
	         				//向下走1格
					 		ChessRule chessRule10 = new ChessRule(map, x, y, x, y+1);
					 		if(chessRule10.baluCanMove()){
					 			int sorce = 0;
					 			baluMoveList.add(new ChessMove(chessman, x, y, map[x][y+1],  x, y+1, sorce));
					 			//System.out.println("向下走1， is ok, "+baluMoveList.size());
	                    	}
					 		//向上走1格
					 		ChessRule chessRule20 = new ChessRule(map, x, y, x, y-1);
					 		if(chessRule20.baluCanMove()){
					 			int sorce = 0;
					 			baluMoveList.add(new ChessMove(chessman,x, y, map[x][y-1],  x, y-1, sorce));
					 			//System.out.println("向上走1， is ok, "+baluMoveList.size());
	                    	}
					 		//向左走1格
					 		ChessRule chessRule30 = new ChessRule(map,  x, y, x-1, y);
					 		if(chessRule30.baluCanMove()){
					 			int sorce =0;
					 			baluMoveList.add(new ChessMove(chessman, x, y, map[x-1][y],  x-1, y, sorce));
					 			//System.out.println("向左走1， is ok, "+baluMoveList.size());
	                    	}
					 		//向右走1格
					 		ChessRule chessRule40 = new ChessRule(map,  x, y, x+1, y);
					 		if(chessRule40.baluCanMove()){
					 			int sorce = 0;
					 			baluMoveList.add(new ChessMove(chessman,   x, y,  map[x+1][y], x+1, y, sorce));
					 			//System.out.println("向右走1， is ok, "+baluMoveList.size());
	                    	}
					 		//向下走2格
					 		ChessRule chessRule102 = new ChessRule(map, x, y, x, y+2);
					 		if(chessRule102.baluCanMove()){
					 			int sorce = 10;
					 			baluMoveList.add(new ChessMove(chessman, x, y,  map[x][y+2], x, y+2, sorce));
					 			//System.out.println("向下走2， is ok, "+baluMoveList.size());
	                    	}
					 		//向上走2格
					 		ChessRule chessRule202 = new ChessRule(map, x, y, x, y-2);
					 		if(chessRule202.baluCanMove()){
					 			int sorce = 10;
					 			baluMoveList.add(new ChessMove(chessman,x, y, map[x][y-2],  x, y-2, sorce));
					 			//System.out.println("向上走2， is ok, "+baluMoveList.size());
	                    	}
					 		//向左走2格
					 		ChessRule chessRule302 = new ChessRule(map,  x, y, x-2, y);
					 		if(chessRule302.baluCanMove()){
					 			int sorce = 10;
					 			baluMoveList.add(new ChessMove(chessman, x, y, map[x-2][y],  x-2, y, sorce));
					 			//System.out.println("向左走2， is ok, "+baluMoveList.size());
	                    	}
					 		//向右走2格
					 		ChessRule chessRule402 = new ChessRule(map,  x, y, x+2, y);
					 		if(chessRule402.baluCanMove()){
					 			int sorce = 10;
					 			baluMoveList.add(new ChessMove(chessman, x, y,  map[x+2][y], x+2, y, sorce));
					 		  // System.out.println("向右走2， is ok, "+baluMoveList.size());
	                    	}
					 		   //System.out.println("size:"+baluMoveList.size());
	                    	break;
					}
				 }
			 }
		 }
		 if (chessRole == RoleBean.ROLE_GENERAL) {
			return baluMoveList.isEmpty() ? null :baluMoveList;
		}else if(chessRole == RoleBean.ROLE_SOLDIER){
			return guiziMoveList.isEmpty() ? null :guiziMoveList;
		}
		return null;
	}


}
