using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Born : MonoBehaviour
{
    public GameObject playerPrefab;
    public GameObject[] enemyPrefabs;
    public bool createPlayer;
    // Start is called before the first frame update
    void Start()
    {
        Invoke("PlayerBorn", 0.8f);
        Destroy(gameObject, 0.8f);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void PlayerBorn()
    {
        if(createPlayer)
        {
            Instantiate(playerPrefab, transform.position, transform.rotation);
        }
        else
        {
            int index = Random.Range(0, 2);
            Instantiate(enemyPrefabs[index], transform.position, transform.rotation);
        }
    }
}
