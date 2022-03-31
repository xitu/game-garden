using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PipeHandler : MonoBehaviour {

    private AudioSource scoreaudio;

    private void Start()
    {
        Debug.Log("---------");
        //scoreaudio = GetComponent<AudioSource>();
        RandomPos();
    }

    /// <summary>
    /// 产生随机数
    /// </summary>
    public void RandomPos()
    {
        float pos_y = Random.Range(0.1f,-0.1f);
        this.transform.localPosition = new Vector3(this.transform.localPosition.x, pos_y, this.transform.localPosition.z);
    }

    private void OnTriggerExit(Collider other)
    {
        if(other.tag == "Player")
        {
            //scoreaudio.Play();
            GameManager.intance.UpdateScore();
            //  Debug.Log("加分");
        }
    }
}
