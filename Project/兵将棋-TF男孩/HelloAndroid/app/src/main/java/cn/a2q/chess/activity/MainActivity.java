package cn.a2q.chess.activity;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Display;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;

import cn.a2q.chess.R;
import cn.a2q.chess.app.ChessApp;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 */
public class MainActivity extends Activity {

	private static final int OK = 1;
	private static final int ERROR = -1;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		/**
		 * 开启线程进行数据处理
		 */
		new Thread(new Runnable() {
			
			public void run() {
				Message msg = new Message();
				int result = initData();
				if (result == OK) {
					msg.what = OK;
				} else  if(result == ERROR){
					msg.what = ERROR;
				}
				myHandler.sendMessage(msg);
			}
		}).start();
	}
	/**
	 * 根据由线程传来的结果，做相应的UI处理
	 */
	Handler myHandler = new Handler(){

		public void handleMessage(Message msg) {
			super.handleMessage(msg);
			switch (msg.what) {
			case OK:
				Intent intent = new Intent(MainActivity.this, MainMenuActivity.class);
				MainActivity.this.startActivity(intent);
				MainActivity.this.finish();
				break;
			case ERROR:
				new AlertDialog.Builder(MainActivity.this)
		   		.setTitle(R.string.notice)
			 	.setMessage(R.string.init_wrong)
		   		.setPositiveButton(android.R.string.ok,new DialogInterface.OnClickListener() {
		   			public void onClick(DialogInterface dialog, int which) {
		   				MainActivity.this.finish();
		   				System.exit(0);
		   			}
		   		}).show();
				break;
			default:
				break;
			}
			
		}
		
	};
	/**
	 * 初始化数据，demo做延时处理
	 */
	public int initData(){
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return OK;
	}
}
