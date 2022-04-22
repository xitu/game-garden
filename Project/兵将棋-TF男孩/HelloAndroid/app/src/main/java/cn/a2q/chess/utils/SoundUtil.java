package cn.a2q.chess.utils;

import android.content.Context;
import android.media.AudioManager;
import android.media.SoundPool;

import java.util.HashMap;

import cn.a2q.chess.R;
import cn.a2q.chess.app.ChessApp;
import cn.a2q.chess.app.Configs;

/**
 * 掘金-TF男孩
 * https://juejin.cn/user/615370768790158
 * 1950278252@qq.com
 */
public class SoundUtil {

    public static final  int SOUND_GO = 0;//走棋声音
    public static final  int SOUND_SELECT = 1;//选棋声音
    public static final  int SOUND_GAMEOVER = 2;//游戏结束声音
    public static final  int SOUND_SET = 3;//设置确认声音
    public static final  int SOUND_SLIDE = 4;//滑动声音

    public static SoundPool soundPool;//声音播放池，播放急而且短促的声音
    public static HashMap<Integer,Integer> soundMap= new HashMap<Integer,Integer>();//声音池的map



    public static void init(Context context){

        soundPool = new SoundPool(10, AudioManager.STREAM_MUSIC,5);
        soundMap= new HashMap<Integer,Integer>();//声音池的map

        //加载声音
        soundMap.put(SOUND_GO,  soundPool.load(context, R.raw.go, 1));
        soundMap.put(SOUND_SELECT,  soundPool.load(context, R.raw.select, 1));
        soundMap.put(SOUND_GAMEOVER,  soundPool.load(context, R.raw.gameover, 1));
        soundMap.put(SOUND_SET,  soundPool.load(context, R.raw.set, 1));
        soundMap.put(SOUND_SLIDE,  soundPool.load(context, R.raw.slide, 1));
    }

    /**
     * 播放声音
     * @param id
     */
    public static void playSound(int id){
        if (Configs.isSoundOpen) {
            soundPool.setVolume(0, 0.2f, 0.2f);
            soundPool.play(soundMap.get(id), 0.2f, 0.2f, 0, 0, 1);
        }
    }
}
