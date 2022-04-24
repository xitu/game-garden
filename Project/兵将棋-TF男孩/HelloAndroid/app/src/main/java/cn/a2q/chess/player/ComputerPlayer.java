package cn.a2q.chess.player;


import cn.a2q.chess.rule.AIPlayer;
import cn.a2q.chess.rule.ChessMove;
import cn.a2q.chess.view.GameView;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 * 电脑玩家的类
 * @author Administrator
 *
 */
public class ComputerPlayer extends BasePlayer {

	GameView gameView;
	int playerID;
	AIPlayer aiPlayer;
	public ComputerPlayer(GameView gameView, int playerID) {
		super(gameView, playerID);
		this.gameView = gameView;
		this.playerID = playerID;
		aiPlayer = new AIPlayer();
	}

	@Override
	public void play(int[] pointIJ) {
		// TODO Auto-generated method stub
		ChessMove cm = aiPlayer.searchAGoodMove(gameView.map, playerID);
		runPoint(cm);
	}

	@Override
	public void runPoint(ChessMove cm) {
		// TODO Auto-generated method stub
		super.runPoint(cm);
	}

	@Override
	public void regretPoint() {
		// TODO Auto-generated method stub
		super.regretPoint();
	}

	@Override
	public boolean winChess() {
		// TODO Auto-generated method stub
		return super.winChess();
	}

	
}
