package cn.a2q.chess.app;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import android.app.Application;
import android.media.AudioManager;
import android.media.SoundPool;

import cn.a2q.chess.R;
import cn.a2q.chess.bean.MapBean;
import cn.a2q.chess.bean.RoleBean;
import cn.a2q.chess.utils.SoundUtil;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 */
public class ChessApp extends Application {


	public static final int MODE_RvsR = 11;//人人对战
	public static final int MODE_RvsC = 10;//人机对战
	
	public static int lineNumber = 5;//划线的条数

	public static List<MapBean> mapBeans = new ArrayList<>();
	public static List<RoleBean> roleBeans = new ArrayList<>();

	@Override
	public void onCreate() {
		super.onCreate();
		mapBeans = MapBean.getMaps();
		roleBeans = RoleBean.getRoles();
		SoundUtil.init(getApplicationContext());
	}
}
