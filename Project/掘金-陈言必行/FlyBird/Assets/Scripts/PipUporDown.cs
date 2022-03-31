using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PipUporDown : MonoBehaviour {

    private AudioSource colaudio;

    void Start()
    {
        //colaudio = GetComponent<AudioSource>();
    }

    private void OnCollisionEnter(Collision collision)
    {
        if(collision.gameObject.tag == "Player")
        {
            //colaudio.Play();
            GameManager.intance.GameState = GAME_STATUS.GAME_END;
        }
    }
}
