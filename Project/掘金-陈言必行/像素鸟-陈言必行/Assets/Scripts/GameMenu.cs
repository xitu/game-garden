using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameMenu : MonoBehaviour {

    public Text nowScore;  //显示此次游戏得分

    public Text highScore; //此游戏最高得分
    //单例
    public static GameMenu _instance;

    private void Awake()
    {
        _instance = this;
    }

    // Use this for initialization
    void Start () {
     
    }
	
	// Update is called once per frame
	public void UpdateScore (int nowscore) {

        //玩家偏好存储，最大等分数
        int highscore = PlayerPrefs.GetInt("score1",0);

        if (highscore < nowscore) {
            highscore = nowscore;
        }
        PlayerPrefs.SetInt("score1", highscore);

        //将等分现在在UI上
        this.nowScore.text = nowscore.ToString();
        this.highScore.text = highscore.ToString();
    }
}
