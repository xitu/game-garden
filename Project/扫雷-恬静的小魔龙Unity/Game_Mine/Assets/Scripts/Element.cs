using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Element : MonoBehaviour
{
    public bool mine;//判断是否是地雷

    // 不同的纹理
    public Sprite[] emptyTextures;
    public Sprite mineTexture;

    //提示信息
    public string info;

    void Start()
    {
        // 随机决定它是否是地雷
        mine = Random.value < 0.15;

        // 在Grid注册
        int x = (int)transform.position.x;
        int y = (int)transform.position.y;
        Grid.elements[x, y] = this;
    }

    // 加载数字的纹理
    public void loadTexture(int adjacentCount)
    {
        if (mine)
            GetComponent<SpriteRenderer>().sprite = mineTexture;
        else
            GetComponent<SpriteRenderer>().sprite = emptyTextures[adjacentCount];
    }

    // 判断是否被点击
    public bool isCovered()
    {
        //判断当前纹理的名称是不是默认值
        return GetComponent<SpriteRenderer>().sprite.texture.name == "default";
    }

    // 鼠标点击
    void OnMouseUpAsButton()
    {
        // 是雷的话
        if (mine)
        {
            // 揭露所有雷
            Grid.uncoverMines();

            // 游戏结束
            Debug.Log("Game Over");
            info = "游戏结束";
        }
        else
        {
            // 显示相邻的数字号
            int x = (int)transform.position.x;
            int y = (int)transform.position.y;
            loadTexture(Grid.adjacentMines(x, y));

            // 揭露没有地雷的地区  
            Grid.FFuncover(x, y, new bool[Grid.w, Grid.h]);

            // 判断游戏是否胜利
            if (Grid.isFinished())
            {
                Debug.Log("Game Win");
                info = "游戏胜利";
            }
        }
    }

    void OnGUI()
    {
        GUIStyle fontStyle = new GUIStyle();
        fontStyle.normal.background = null;    //设置背景填充
        fontStyle.normal.textColor = new Color(1, 0, 0);   //设置字体颜色
        fontStyle.fontSize = 40;       //字体大小
        GUI.Label(new Rect(700, 200, 100, 50), info, fontStyle);
    }
}
