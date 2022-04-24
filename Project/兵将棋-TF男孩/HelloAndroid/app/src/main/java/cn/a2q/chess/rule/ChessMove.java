package cn.a2q.chess.rule;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 *
 * 该类为棋子的一个走法
 * 包含是什么棋子
 * 起始点的位置
 * 目标点的位置
 * 以及估值时所用到的score
 */
public class ChessMove {
	public int ChessID;//表明是什么棋子，大炮还是小兵
	public int TagertID;
	public int fromX;//起始的坐标
	public int fromY;
	public int toX;//目的地的坐标
	public int toY;
	public int score;//值,估值时会用到
	public ChessMove(int ChessID, int fromX,int fromY,int TagertID, int toX,int toY,int score){//构造器
		this.ChessID = ChessID;//棋子的类型
		this.fromX = fromX;//棋子的起始坐标
		this.fromY = fromY;
		this.TagertID = TagertID;
		this.toX = toX;//棋子的目标点x坐标
		this.toY = toY;//棋子的目标点y坐标
		this.score = score;
	}
}