using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BridHandler : MonoBehaviour {
    
    //单例
    public static BridHandler intance;
    private void Awake()
    {
        intance = this; 
    }
    
    private Renderer _renderer;      // 材质
    private Rigidbody _rigidbody;    // 刚体组件
    
    private float timer;        // 计时器
    private int frameNum =10;   // 每秒显示几帧
    private int frameCount;     // 帧的计数器

    private float x = 3;        // 小鸟运行速度

    private AudioSource Jumpaudio;  // 跳跃音效
	void Start () {
        _renderer = this.GetComponent<Renderer>();
        _rigidbody = this.GetComponent<Rigidbody>();
        _rigidbody.useGravity = false;
        Jumpaudio = this.GetComponent<AudioSource>();
    }
	
	// Update is called once per frame
    void Update()
    {
        if (GameManager.intance.GameState == GAME_STATUS.GAME_PLAYING) //可以跳的状态
        {
            Vector3 vel = _rigidbody.velocity;
            //跳
            if (Input.GetMouseButtonDown(0))
            {
                Jumpaudio.Play();
                vel.x += 0.05f; // 每跳一次增加一点移速
                _rigidbody.velocity = new Vector3(vel.x, 5, vel.z);
                Debug.Log(vel);
            }
            
            //通过游戏状态控制，是否播放此动画
            timer += Time.deltaTime; //加上一帧的时间
            if (timer >= 1.0f / frameNum) //大于1帧所用的时间
            {
                frameCount++; //帧数增加
                timer -= 1.0f / frameNum;

                //三帧  （0,1,2显示每一帧画面）
                int frameIndex = frameCount % 3;

                //更新offset x 属性
                _renderer.material.SetTextureOffset("_MainTex", new Vector2(0.33333f * frameIndex, 0));
            }
        }
    }

    public void StartGame()
    {
        _rigidbody.useGravity = true;
        _rigidbody.velocity = new Vector3(x, 0, 0);
    }
}
