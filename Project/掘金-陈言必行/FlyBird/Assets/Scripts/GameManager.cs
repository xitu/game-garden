using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Serialization;
using UnityEngine.UI;

public enum GAME_STATUS
{
    // 游戏开启
    GAME_START = 0,  
    // 游戏中
    GAME_PLAYING = 1,
    // 游戏结束
    GAME_END = 2 
}

public class GameManager : MonoBehaviour {
    //单例
    public static GameManager intance;
    private void Awake()
    {
        intance = this; 
    }
 
    /// <summary>
    /// 当前游戏状态
    /// </summary>
    public GAME_STATUS GameState = GAME_STATUS.GAME_START;

    // 需要移动的背景
    public Transform moveBgTrans;
    
    // 分数
    public Text ScoreText;
    
    // 游戏结束UI
    public GameObject GameOverUI;
    // 游戏结束得分
    public Text GameOverScore;
    // 游戏结束最高得分
    public Text GameOverBest;
    // 游戏结束重开按钮
    public Button GameOverButton;
    
    // 本局得分
    int score = 0;

    private AudioSource getSecoreAudio;
    void Start()
    {
        getSecoreAudio = GetComponent<AudioSource>();
        GameOverButton.onClick.AddListener(()=>{
            SceneManager.LoadScene(0);
        });
    }

    void Update () {

        switch (GameState)
        {
            case GAME_STATUS.GAME_START: 
                GameOverUI.SetActive(false);
                //点击屏幕 开始游戏
                if (Input.GetMouseButtonDown(0))
                {
                    GameState = GAME_STATUS.GAME_PLAYING;
                    BridHandler.intance.StartGame();
                }
                break;
            case GAME_STATUS.GAME_PLAYING:
                break;
            case GAME_STATUS.GAME_END:
                // 游戏结束，显示面板 ，维护分数
                GameOverUI.SetActive(true);
                GameOverScore.text = score.ToString();
                GameOverBest.text = PlayerPrefs.GetInt("Best").ToString();
                break;
            default: break;
        }
    }

    // 分数更新
    public void UpdateScore()
    {
        //分数增加
        score++;
        ScoreText.text = "分数:" + score;
        // 维护最高得分
        if (score > PlayerPrefs.GetInt("Best"))
        {
            PlayerPrefs.SetInt("Best", score);
        }
        getSecoreAudio.Play();
    }
}
