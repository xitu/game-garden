package cn.a2q.chess.player;

import java.util.List;

import android.os.Message;

import cn.a2q.chess.bean.RoleBean;
import cn.a2q.chess.rule.AIPlayer;
import cn.a2q.chess.app.ChessApp;
import cn.a2q.chess.rule.ChessMove;
import cn.a2q.chess.rule.ChessRule;
import cn.a2q.chess.utils.SoundUtil;
import cn.a2q.chess.view.GameView;
import cn.a2q.chess.activity.GameViewActivity;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 * 玩家基础类
 */
public class BasePlayer {

	GameView gameView; // 游戏视图
	int playerID; // 身份，将军还是士兵
	public boolean isFocus = false; // 是否选中了棋子
	public int selectX = -1, selectY = -1, targetX = -1, targetY = -1; // 起始点的选中
	public int selectID = -1, targetID = -1; // 起始点的棋子身份
	
	private boolean isEnable = false;//是否玩家可以控制，该对方走棋时，你不能动
	
	public BasePlayer(GameView gameView, int playerID){
		this.gameView = gameView;
		this.playerID = playerID;
	}
	
	/**
	 * 根据用户点击，选择棋子
	 * @param pointIJ 点击的位置
	 */
	public void play(int[] pointIJ){
		int i = pointIJ[0];
		int j = pointIJ[1];
		if (i != -1 && j != -1) {//如果选择的是有效棋子
			if (isFocus) {//之前选择过
				if (gameView.map[i][j] != selectID) {//后来选的不是自己的棋子
					//意思就是，要么吃棋，要么走空格
					targetX = i;
					targetY = j;
					targetID = gameView.map[i][j];
					ChessRule cr = new ChessRule(gameView.map, selectY, selectX, targetY, targetX);
					if (cr.canMove()) {
						ChessMove cm = new ChessMove(selectID, selectY, selectX, targetID, targetY, targetX, 0);
						runPoint(cm);
						selectX = -1;
						selectY = -1;
						selectID = -1;
						targetX = -1;
						targetY = -1;
						targetID = -1;
					}else{
						selectX = -1;
						selectY = -1;
						selectID = -1;
					}
				}
				isFocus = !isFocus;
			}else{//之前没有选择过,第一次肯定要选择自己的棋子，第一次不可以选择空白和对方的棋子
				//选的就设为起点
				if (gameView.map[i][j] == playerID) {
					SoundUtil.playSound(SoundUtil.SOUND_SELECT);
					selectX = i; 
					selectY = j;
					selectID = gameView.map[selectX][selectY];
					targetX = -1; 
					targetY = -1;
					targetID = -1;
					isFocus = !isFocus;
				}// end if (gameView.map[i][j] == playerID)
			}//else{
		}//end if (i != -1 && j != -1) {
	}
	
	
	/**
	 * 移动棋子
	 * @param cm
	 */
	public void runPoint(ChessMove cm){
		gameView.map[cm.toY][cm.toX] = cm.ChessID;//移动棋子
		gameView.map[cm.fromY][cm.fromX] = 0;//将原来处设空
		gameView.reflashView();
		SoundUtil.playSound(SoundUtil.SOUND_GO);
		int[][] gameMap = gameView.map;
		int[][] map = new int[gameMap.length][gameMap[0].length];
		for (int i = 0; i < gameMap.length; i++) {
			for (int j = 0; j < gameMap[i].length; j++) {
				map[i][j] = gameMap[i][j];
			}
		}
		gameView.allSteps.add(map);
		
		//走完棋子后，发送消息，告诉下一位玩家该你走棋了
		Message msg = new Message();
		 if (winChess()) {//如果胜利了，告诉裁判
			msg.what = GameViewActivity.GAME_OVER;
			msg.arg1 = playerID;
		}else{//如果没有胜利，告诉人家继续走棋
			msg.what = GameViewActivity.SHOWICON;
			int msgID = RoleBean.ROLE_GENERAL;
			if (RoleBean.ROLE_GENERAL == playerID) {
				msgID = RoleBean.ROLE_SOLDIER;
			}
			msg.arg1 =	msgID;
		}
		GameViewActivity.myHandler.sendMessage(msg);
	}
	
	public void regretPoint(){
		int size = gameView.allSteps.size();
		if (size > 1) {
			gameView.allSteps.remove(size-1);
			int[][] gameMap = gameView.allSteps.get((gameView.allSteps.size()-1));
			int[][] map = new int[gameMap.length][gameMap[0].length];
			for (int i = 0; i < gameMap.length; i++) {
				for (int j = 0; j < gameMap[i].length; j++) {
					map[i][j] = gameMap[i][j];
				}
			}
			gameView.map = map;
			gameView.reflashView();
			gameView.isBaLuMove = !gameView.isBaLuMove;
		}
	}
	
	
	/**
	 *	玩家胜利 
	 * @return
	 */
	public boolean winChess(){
		if (playerID == RoleBean.ROLE_GENERAL) {
			int count=0;
			for (int i = 0; i < gameView.map.length; i++) {
				for (int j = 0; j < gameView.map[i].length; j++) {
					if (gameView.map[i][j] == RoleBean.ROLE_SOLDIER) {//如果某一个棋子是鬼子
						count++;//数量给加1
					}
				}
			}
			if (count == 0) {
				return true;
			}
		}else if (playerID == RoleBean.ROLE_SOLDIER) {
			AIPlayer aiPlayer = new AIPlayer();
			List<ChessMove> list = aiPlayer.allPossibleMoves(gameView.map, RoleBean.ROLE_GENERAL);
			if (list == null) {
				return true;
			}
		}
		
		return false;
	}

	public boolean isEnable() {
		return isEnable;
	}

	public void setEnable(boolean isEnable) {
		this.isEnable = isEnable;
	}
	
	
}
