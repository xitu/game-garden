using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//摄像头跟随
public class FollowBrid : MonoBehaviour {

    private Transform bridTrans;

	// Use this for initialization
	void Start () {
        bridTrans = GameObject.FindGameObjectWithTag("Player").transform;
        if (bridTrans == null)
        {
            bridTrans = BridHandler.intance.transform;
        }
    }
	
	// Update is called once per frame
	void Update () {
        Vector3 bridPos = bridTrans.position;        
        float y = bridPos.y - 4.4f;
        //限制摄像机的最大最小位置
        if (y > 1.5f)
        {
            y = 1.5f;
        }
        if (y < 0 )
        {
            y = 0f;        
        }
        this.transform.position = new Vector3(bridPos.x + 3.63223f,y, -10);
    }
}
