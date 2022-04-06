using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Option : MonoBehaviour
{
    private int option = 0;
    public Transform pos1;
    public Transform pos2;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.W))
        {
            transform.position = pos1.position;
            option = 0;
        }
        if (Input.GetKeyDown(KeyCode.S))
        {
            transform.position = pos2.position;
            option = 1;
        }
        if(option == 0 && Input.GetKeyDown(KeyCode.Space))
        {
            SceneManager.LoadScene(1);
        }
    }
}
