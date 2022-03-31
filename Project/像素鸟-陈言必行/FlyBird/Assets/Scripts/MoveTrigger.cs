using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveTrigger : MonoBehaviour
{
    public Transform currentBg;

    public PipeHandler pipe1;
    public PipeHandler pipe2;

    private void OnTriggerExit(Collider other)
    {
        //Debug.Log("触发到背景移动");
        if (other.tag == "Player")
        {
            //前面的背景移动到后面
            //获取第一个背景位置
            Transform firstbg = GameManager.intance.moveBgTrans;
            //移动
            currentBg.position = new Vector3(firstbg.position.x + 10, currentBg.position.y, currentBg.position.z);
            //更新
            GameManager.intance.moveBgTrans = currentBg;

            pipe1.RandomPos();
            pipe2.RandomPos();
        }
    }
}