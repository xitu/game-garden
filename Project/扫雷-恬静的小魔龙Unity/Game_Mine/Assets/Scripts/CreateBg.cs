using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class CreateBg : MonoBehaviour
{
    public GameObject block;//默认方块

    void Start()
    {
        //创建默认方块
        CreateBlock();
    }

    private void CreateBlock()
    {
        //创建方块父物体
        GameObject blockParent = new GameObject("blockParent");
        //创建10行10列的默认方块
        for (int i = 0; i < 10; i++)
        {
            for (int j = 0; j < 10; j++)
            {
                //Instantiate参数为：预制体 位置 旋转 父物体
                Instantiate(block, new Vector2(i, j), Quaternion.identity, blockParent.transform);
            }
        }
    }

    void OnGUI()
    {
        if (GUI.Button(new Rect(700, 100, 100, 50), "重新开始"))
        {
            SceneManager.LoadScene(0);
        }
    }
}