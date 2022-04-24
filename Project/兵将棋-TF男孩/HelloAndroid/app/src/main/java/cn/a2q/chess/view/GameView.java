package cn.a2q.chess.view;

import java.util.ArrayList;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.MotionEvent;
import android.view.View;

import cn.a2q.chess.R;
import cn.a2q.chess.activity.GameViewActivity;
import cn.a2q.chess.app.ChessApp;
import cn.a2q.chess.app.Configs;
import cn.a2q.chess.bean.MapBean;
import cn.a2q.chess.bean.RoleBean;
import cn.a2q.chess.player.BasePlayer;
import cn.a2q.chess.player.ComputerPlayer;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 *
 * 游戏视图
 *
 * @author Administrator
 */
public class GameView extends View {

    public boolean focus = false;//是否选中
    public int computerRole = -1;//人机对战电脑角色

    Bitmap img_balu, img_balu2, img_guizi, img_guizi2;  //棋子的角色和状态
    int cellWidth;//线中点与点之间的宽度，高度以及起始位置
    int cellHeight;
    int startX;
    int startY;
    public int[][] map;//棋盘的布局
    int lineNumber = Configs.DEFAULT_LINE;//当前棋盘的条数

    private Paint paint;//画笔
    public BasePlayer player_balu;
    public BasePlayer player_guizi;

    public boolean isBaLuMove = true;
    public ArrayList<int[][]> allSteps;

    public GameView(Context context) {
        this(context, ChessApp.mapBeans.get(0));
    }

    public GameView(Context context, MapBean mapBean) {
        super(context);

        this.lineNumber = mapBean.getLineNum();

        img_balu = BitmapFactory.decodeResource(getResources(), R.drawable.balu);
        img_balu2 = BitmapFactory.decodeResource(getResources(), R.drawable.balu2);
        img_guizi = BitmapFactory.decodeResource(getResources(), R.drawable.guizi);
        img_guizi2 = BitmapFactory.decodeResource(getResources(), R.drawable.guizi2);

        paint = new Paint();
        paint.setColor(Color.BLACK);
        paint.setStrokeWidth(4);

        setMap(mapBean);
        setRoleAndVsMode(RoleBean.ROLE_GENERAL, ChessApp.MODE_RvsC);
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        super.onLayout(changed, l, t, r, b);

        cellWidth = getWidth() / lineNumber;
        cellHeight = cellWidth;
        startX = cellWidth / 2;
        startY = cellHeight / 2;

    }

    /**
     * 设置地图
     * @param mapBean
     */
    public void setMap(MapBean mapBean) {

        allSteps = new ArrayList<int[][]>();
        map = new int[lineNumber][lineNumber];
        int[][] step1 = new int[lineNumber][lineNumber];
        int[][] temp_map = mapBean.getMap();
        for (int i = 0; i < temp_map.length; i++) {
            for (int j = 0; j < temp_map[i].length; j++) {
                map[i][j] = temp_map[i][j];
                step1[i][j] = temp_map[i][j];
            }
        }
        allSteps.clear();
        allSteps.add(step1);

        GameViewActivity.gameState = GameViewActivity.READY;//游戏准备中，待开启
    }

    /**
     * 设置角色和对战模式
     * @param roleCode
     * @param vsMode
     */
    public void setRoleAndVsMode(int roleCode, int vsMode) {

        if (vsMode == ChessApp.MODE_RvsC) {
            if (roleCode == RoleBean.ROLE_SOLDIER) { // 人机对战，我选择了士兵
                player_balu = new ComputerPlayer(this, RoleBean.ROLE_GENERAL);
                player_guizi = new BasePlayer(this, RoleBean.ROLE_SOLDIER);
            } else if (roleCode == RoleBean.ROLE_GENERAL) {
                player_guizi = new ComputerPlayer(this, RoleBean.ROLE_SOLDIER);
                player_balu = new BasePlayer(this, RoleBean.ROLE_GENERAL);
            }
        } else if (vsMode == ChessApp.MODE_RvsR) {
            player_balu = new BasePlayer(this, RoleBean.ROLE_GENERAL);
            player_guizi = new BasePlayer(this, RoleBean.ROLE_SOLDIER);
        }

        GameViewActivity.gameState = GameViewActivity.READY;//游戏准备中，待开启
    }

    /**
     * 画图方法
     */
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        clearCanvas(canvas);
        drawChessBoard(canvas);
        drawQiZi(canvas);
    }

    /**
     * 清空画布
     *
     * @param canvas
     */
    private void clearCanvas(Canvas canvas) {


    }

    /**
     * 画棋盘
     *
     * @param canvas
     */
    private void drawChessBoard(Canvas canvas) {
        for (int i = 0; i < lineNumber; i++) {
            canvas.drawLine(startX, startY + cellWidth * i, startX + cellWidth * (lineNumber - 1), startY + cellWidth * i, paint);
            canvas.drawLine(startX + cellHeight * i, startY, startX + cellHeight * i, startY + cellHeight * (lineNumber - 1), paint);
        }
    }

    /**
     * 画棋子
     *
     * @param canvas
     */
    private void drawQiZi(Canvas canvas) {
        Bitmap qizi = null;
        for (int i = 0; i < map.length; i++) {//根据map里的排列进行画棋子，依照行
            for (int j = 0; j < map[i].length; j++) {//根据map里的排列进行画棋子，依照列
                int type = map[i][j];//获取这个棋子的类型
                if (type != RoleBean.ROLE_BLANK) {//如果不是空白
                    if (type == RoleBean.ROLE_GENERAL) {//是将军
                        qizi = img_balu;//把当前棋子设置成将军的棋子
                    } else if (type == RoleBean.ROLE_SOLDIER) {//是鬼子
                        qizi = img_guizi;//把当前棋子设置成鬼子的棋子
                    }
                    int[] xy = getPointXyByCellXy(i, j, qizi);
                    int x = xy[0];//设置棋子的坐标
                    int y = xy[1];
                    canvas.drawBitmap(qizi, x, y, paint);//画棋子
                }//end  (type != ChessApp.ROLE_BLANK)

                if (isBaLuMove) {

                    if (player_balu.isFocus) {
                        int[] focus_xy = getPointXyByCellXy(player_balu.selectX, player_balu.selectY, img_balu2);
                        canvas.drawBitmap(img_balu2, focus_xy[0], focus_xy[1], paint);//画棋子
                    }
                } else {
                    if (player_guizi.isFocus) {
                        int[] focus_xy = getPointXyByCellXy(player_guizi.selectX, player_guizi.selectY, img_guizi2);
                        canvas.drawBitmap(img_guizi2, focus_xy[0], focus_xy[1], paint);//画棋子
                    }
                }
            }//end  map[i].length
        }//end  map.length
    }

    //点击事件
    public boolean onTouchEvent(MotionEvent event) {
        if (event.getAction() == MotionEvent.ACTION_DOWN) {//只取鼠标按下的事件
            if (GameViewActivity.gameState == GameViewActivity.READY) {
                GameViewActivity.gameState = GameViewActivity.SHOWICON;//游戏中
            }

            if (GameViewActivity.gameState != GameViewActivity.GAME_OVER) {//如果游戏没结束
                int[] pointIJ = getPos(event);
                if (isBaLuMove) {//将军走
                    player_balu.play(pointIJ);
                } else {//不是将军走，鬼子走
                    player_guizi.play(pointIJ);
                }
            }
        }//end 按下事件
        this.reflashView();
        return true;
    }


    /**
     * 根据点击的物理坐标转换成棋盘点对应的行列数
     *
     * @param e
     * @return
     */
    public int[] getPos(MotionEvent e) {//将坐标换算成数组的维数
        int[] pos = new int[2];
        double x = e.getX();//得到点击位置的x坐标
        double y = e.getY();//得到点击位置的y坐标
        int d = img_balu.getHeight() / 2;
        if (e.getX() > startX - d && e.getX() < startX + cellWidth * lineNumber + d && e.getY() > startY - d && e.getY() < startY + cellWidth * lineNumber + d) {//点击的是棋盘时
            pos[0] = Math.round((float) ((y - startY) / cellHeight));//取得所在的行
            pos[1] = Math.round((float) ((x - startX) / cellWidth));//取得所在的列
        } else {//点击的位置不是棋盘时
            pos[0] = -1;//将位置设为不可用
            pos[1] = -1;
        }
        return pos;//将坐标数组返回
    }

    public void reflashView() {
        GameView.this.invalidate();
    }

    /**
     * 根据棋子所在的行列数返回在View上的物理坐标
     *
     * @param cellX
     * @param cellY
     * @return
     */
    public int[] getPointXyByCellXy(int cellX, int cellY, Bitmap bitmap) {
        int x = 0, y = 0;
        if (bitmap != null) {
            x = startX + cellY * cellWidth - bitmap.getWidth() / 2;
            y = startY + cellX * cellHeight - bitmap.getHeight() / 2;
        } else {
            x = startX + cellY * cellWidth;
            y = startY + cellX * cellHeight;
        }
        return new int[]{x, y};
    }
}
