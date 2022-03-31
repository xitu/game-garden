using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StaetBg : MonoBehaviour {

	// Use this for initialization
	void Start () {
        //10秒后自动销毁
        Destroy(this.gameObject, 30f);
	}

}
