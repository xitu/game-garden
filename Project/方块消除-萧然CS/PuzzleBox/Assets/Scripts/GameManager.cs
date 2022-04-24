using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    private const string gameBoardName = "GridBoard";

    private void Awake()
    {
        Instance = this;
    }

    private void Start()
    {

    }

    public void StartupGame()
    {
        for(int i = 0; i < transform.childCount; i++)
        {
            if(transform.GetChild(i).name.StartsWith(gameBoardName))
            {
                Debug.LogError("已加载棋盘");
                return;
            }
        }

        StartCoroutine(StartupDelay());

        IEnumerator StartupDelay()
        {
            yield return null;
            AudioManager.Instance.PlaySoundOnce(AudioName.gameStartName);
            yield return null;
            GameObject prefab = Resources.Load<GameObject>($"Prefabs/{gameBoardName}");
            yield return null;
            Instantiate(prefab,Vector3.zero,Quaternion.identity,transform);
        }
    }

    public void RestartGame()
    {
        GameObject boardObj = null;
        for(int i = 0; i < transform.childCount; i++)
        {
            if(transform.GetChild(i).name.StartsWith(gameBoardName))
            {
                boardObj = transform.GetChild(i).gameObject;
                break;
            }
        }

        if(boardObj == null)
        {
            Debug.LogError("当前不在游戏中");
            return;
        }

        StartCoroutine(RestartDelay());

        IEnumerator RestartDelay()
        {
            yield return null;
            AudioManager.Instance.PlaySoundOnce(AudioName.gameStartName);
            yield return null;
            Destroy(boardObj);
            yield return null;
            GameObject prefab = Resources.Load<GameObject>($"Prefabs/{gameBoardName}");
            yield return null;
            Instantiate(prefab,Vector3.zero,Quaternion.identity,transform);
        }
    }

    public void ExitGame()
    {
        for(int i = 0; i < transform.childCount; i++)
        {
            if(transform.GetChild(i).name.StartsWith(gameBoardName))
            {
                GameObject boardObj = transform.GetChild(i).gameObject;
                Destroy(boardObj);
            }
        }
    }

}
