using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerManager : MonoBehaviour
{
    public int life = 3;
    public int enemyNum = 10;
    public int score;
    public bool isDead;
    public GameObject bornPrefab;
    public bool isDefeat;
    public Text enemyText;
    public Text playerText;
    public GameObject isDefeatUi;

    private static PlayerManager instance;
    public static PlayerManager Instance
    {
        get
        {
            return instance;
        }
        set
        {
            instance = value;
        }
    }

    private void Awake()
    {
        Instance = this;
    }

    private void Update()
    {
        enemyText.text = enemyNum.ToString();
        playerText.text = life.ToString();
        if(isDefeat)
        {
            isDefeatUi.SetActive(true);
            Invoke("ReturnToMenu", 2);
        }
        if (life <= 0)
        {
            isDefeat = true;
        }
        if(isDead)
        {
            Recover();
        }
    }

    private void Recover()
    {
        isDead = false;
        GameObject go = Instantiate(bornPrefab, new Vector3(-2, -8, 0), Quaternion.identity);
        go.GetComponent<Born>().createPlayer = true;
    }

    private void ReturnToMenu()
    {
        SceneManager.LoadScene(0);
    }
}
