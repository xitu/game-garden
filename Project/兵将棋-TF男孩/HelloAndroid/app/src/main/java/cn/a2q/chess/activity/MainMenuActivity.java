package cn.a2q.chess.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

import cn.a2q.chess.R;
import cn.a2q.chess.app.ChessApp;
import cn.a2q.chess.utils.SoundUtil;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 * 游戏主控制界面
 *
 */
public class MainMenuActivity extends Activity implements OnClickListener{

	private Button single,multiple,info,about;
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.mainmenu);
		single = (Button)findViewById(R.id.bt_sigle);
		single.setOnClickListener(this);
		multiple = (Button)findViewById(R.id.bt_multiple);
		multiple.setOnClickListener(this);
		info = (Button)findViewById(R.id.bt_info);
		info.setOnClickListener(this);
		about = (Button)findViewById(R.id.bt_about);
		about.setOnClickListener(this);
	}

	public void onClick(View v) {
		SoundUtil.playSound(SoundUtil.SOUND_SET);
		if (v == single) {//选择单人游戏
			Intent intent = new Intent(MainMenuActivity.this, GameViewActivity.class);
			intent.putExtra("mode", ChessApp.MODE_RvsC);
			startActivity(intent);
		}else if (v == multiple) {
			Intent intent = new Intent(MainMenuActivity.this, GameViewActivity.class);
			intent.putExtra("mode", ChessApp.MODE_RvsR);
			startActivity(intent);
		}else if (v == info) {
			Intent intent = new Intent(MainMenuActivity.this, InfoActivity.class);
			startActivity(intent);
		}else if (v == about) {
			Intent intent = new Intent(MainMenuActivity.this, AboutActivity.class);
			startActivity(intent);
		}
	}

	protected void onDestroy() {
		super.onDestroy();
		System.exit(0);
	}
	
}
