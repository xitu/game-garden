package cn.a2q.chess.activity;


import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.animation.AnticipateOvershootInterpolator;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.LinearLayout;

import cn.a2q.chess.app.Configs;
import cn.a2q.chess.bean.MapBean;
import cn.a2q.chess.bean.RoleBean;
import cn.a2q.chess.utils.SoundUtil;
import cn.a2q.chess.view.GameView;
import cn.a2q.chess.R;
import cn.a2q.chess.app.ChessApp;
import cn.a2q.chess.view.wheel.ArrayWheelAdapter;
import cn.a2q.chess.view.wheel.OnWheelChangedListener;
import cn.a2q.chess.view.wheel.OnWheelScrollListener;
import cn.a2q.chess.view.wheel.WheelView;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 * 游戏主界面的Activity
 * @author Administrator
 *
 */
public class GameViewActivity extends Activity  implements OnClickListener{

	private GameView gameView;
	private Button newGame,setGame,regretGame;
	private ImageView img_role;
	private LinearLayout gameLayout ;
	
	public static int gameState = 0;//游戏状态
	public static final int READY = 1;//游戏准备中
	public static final int SHOWICON = 2;//接着游戏
 	public static final int GAME_OVER = -1;//游戏结束
 	
	public static MyHandler myHandler = null;
	public static int mode;
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.gameview);
		
		Intent intent = getIntent();
		mode = intent.getIntExtra("mode", ChessApp.MODE_RvsC);
		
		gameLayout = findViewById(R.id.gameView_layout);
		gameView = new GameView(this);
		gameView.setRoleAndVsMode(RoleBean.ROLE_GENERAL, mode);
		gameLayout.addView(gameView);

		newGame = (Button)findViewById(R.id.bt_newGame);
		newGame.setOnClickListener(this);
		setGame = (Button)findViewById(R.id.bt_setGame);
		setGame.setOnClickListener(this);
		regretGame = (Button)findViewById(R.id.bt_regretGame);
		regretGame.setOnClickListener(this);
		img_role = (ImageView)findViewById(R.id.img_role);
		img_role.setImageResource(R.drawable.balu);
		
		myHandler = new MyHandler();
	}
   
	public class MyHandler extends Handler{
		
			public void handleMessage(Message msg) {
				super.handleMessage(msg);
				switch (msg.what) {
				
				case SHOWICON://走下一步
					//一方走完后，则限制其点击屏幕
					gameView.isBaLuMove = !gameView.isBaLuMove;
					int playID = msg.arg1;
					if (playID == RoleBean.ROLE_GENERAL) {//如果该将军走了
						img_role.setImageResource(R.drawable.balu);//显示将军的标志
						if (gameView.computerRole == RoleBean.ROLE_GENERAL) {//如果将军是电脑
							gameView.player_balu.play(null);//自动走一步
						}
					}else if (playID == RoleBean.ROLE_SOLDIER) {//如果该士兵走了
						img_role.setImageResource(R.drawable.guizi);// 显示士兵的标志
						if (gameView.computerRole == RoleBean.ROLE_SOLDIER) {//如果士兵是电脑
							gameView.player_guizi.play(null);//自动走一步
						}
					}
					break;
				case GAME_OVER:
					GameViewActivity.gameState = GameViewActivity.GAME_OVER;
					SoundUtil.playSound(SoundUtil.SOUND_GAMEOVER);
					int state = msg.arg1;
					String text = "";
					if (state == RoleBean.ROLE_GENERAL) {
						text= "将军胜利";
					}else if (state == RoleBean.ROLE_SOLDIER) {
						text= "士兵胜利";
					}
					new AlertDialog.Builder(GameViewActivity.this)
					.setTitle("游戏结束")
				 	.setMessage(text)
			   		.setPositiveButton(android.R.string.ok,new DialogInterface.OnClickListener() {
			   			public void onClick(DialogInterface dialog, int which) {
			   				
			   			} 
			   		}).show();
					break;
				default:
					break;
				}
			}
	} 
	public void onClick(View v) {
		SoundUtil.playSound(SoundUtil.SOUND_SELECT);
		if (v == newGame) {

			final View selectNew = View.inflate(this, R.layout.newgame, null);
			final WheelView w_role = (WheelView)selectNew.findViewById(R.id.w_role);
			w_role.setAdapter(new ArrayWheelAdapter<String>(RoleBean.getNames()));
			int index_ = gameView.computerRole;
			int roleIndex = 0;
			if (index_ == RoleBean.ROLE_SOLDIER) {
				roleIndex = 1;
			}
			w_role.setCurrentItem(roleIndex);
			w_role.addChangingListener(changedListener);
			w_role.addScrollingListener(scrolledListener);
			w_role.setCyclic(false);
			w_role.setInterpolator(new AnticipateOvershootInterpolator());

			final WheelView w_map = (WheelView)selectNew.findViewById(R.id.w_map);
			w_map.setAdapter(new ArrayWheelAdapter<String>(MapBean.getNames()));
			w_map.setCurrentItem((ChessApp.lineNumber-5));
			w_map.addChangingListener(changedListener);
			w_map.addScrollingListener(scrolledListener);
			w_map.setCyclic(true);
			w_map.setInterpolator(new AnticipateOvershootInterpolator());

			new AlertDialog.Builder(GameViewActivity.this)
			.setView(selectNew)
	   		.setPositiveButton(android.R.string.ok,new DialogInterface.OnClickListener() {
	   			public void onClick(DialogInterface dialog, int which) {
	   				SoundUtil.playSound(SoundUtil.SOUND_SET);
	   				gameLayout.removeView(gameView);
					gameView = null;

					int roleIndex = w_role.getCurrentItem();

					if (mode == ChessApp.MODE_RvsC) {
						roleIndex = ChessApp.roleBeans.get(roleIndex).getRoleCode();
					}else if (mode == ChessApp.MODE_RvsR) {
						roleIndex = -1;
					}

					int mapIndex = w_map.getCurrentItem();
					ChessApp.lineNumber = mapIndex + 5;
					gameView = new GameView(GameViewActivity.this,ChessApp.mapBeans.get(mapIndex));
					gameView.setRoleAndVsMode(roleIndex,mode);
					gameLayout.addView(gameView);
	   			}
	   		})
	   		.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener(){

				public void onClick(DialogInterface dialog, int which) {
					SoundUtil.playSound(SoundUtil.SOUND_SET);
				}

	   		}).show();
		}else if (v == setGame) {

			//设置
			final View view = View.inflate(getApplicationContext(), R.layout.dialog_set, null);
			final CheckBox cb_sound = (CheckBox)view.findViewById(R.id.cb_sound);
			cb_sound.setChecked(Configs.isSoundOpen);
			new AlertDialog.Builder(GameViewActivity.this)
			.setView(view)
	   		.setPositiveButton(android.R.string.ok,new DialogInterface.OnClickListener() {
	   			public void onClick(DialogInterface dialog, int which) {
					Configs.isSoundOpen = cb_sound.isChecked();
					SoundUtil.playSound(SoundUtil.SOUND_SELECT);
	   			} 
	   		}).show();
		}else if (v == regretGame) {

			if (gameView.isBaLuMove) {
				gameView.player_balu.regretPoint();
			}else{
				gameView.player_guizi.regretPoint();
			}
		}
	}

	// Wheel scrolled listener
    OnWheelScrollListener scrolledListener = new OnWheelScrollListener() {
        public void onScrollingStarted(WheelView wheel) {
        }
        public void onScrollingFinished(WheelView wheel) {
        }
    };
    
    // Wheel changed listener
    private OnWheelChangedListener changedListener = new OnWheelChangedListener() {
        public void onChanged(WheelView wheel, int oldValue, int newValue) {
           // if (!wheelScrolled) {
			SoundUtil.playSound(SoundUtil.SOUND_SLIDE);
           //}
        }
    };
}
