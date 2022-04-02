using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MapCreation : MonoBehaviour
{
    // 0：老家 1：墙 2：障碍 3：出生效果 4：河流 5：草 6：空气墙
    public GameObject[] item;
    private Vector3 heartPosition;
    private Vector3[] defendHeartWallPosition = new Vector3[5];
    private List<Vector3> existPosition = new List<Vector3>();

    private void Awake()
    {
        CreateHeart();
        CreateAirBarriar();
        CreatePlayer();
        existPosition.Add(new Vector3(-10, 8, 0));
        existPosition.Add(new Vector3(0, 8, 0));
        existPosition.Add(new Vector3(10, 8, 0));
        CreateRandomMap();
        InvokeRepeating("createEnemy", 0, 5);
    }

    private Vector3 createEnemyPosition()
    {
        int positionIndex = Random.Range(0, 3);
        Vector3[] list = new Vector3[3] { new Vector3(-10, 8, 0), new Vector3(10, 8, 0), new Vector3(0, 8, 0) };
        return list[positionIndex];
    }

    private void createEnemy()
    {
        if (PlayerManager.Instance.enemyNum <= 0)
        {
            return;
        }
        GameObject enemy = CreateItem(item[3], createEnemyPosition(), Quaternion.identity);
        enemy.GetComponent<Born>().createPlayer = false;
    }

    private GameObject CreateItem(GameObject createGameObject, Vector3 position, Quaternion rotation)
    {
        GameObject gb = Instantiate(createGameObject, position, rotation);
        gb.transform.SetParent(gameObject.transform);
        if(!HasPosition(position))
        {
            existPosition.Add(position);
        }
        return gb;
    }

    private void CreateRandomMap()
    {
        for (int i = 0; i < 20; i++)
        {
            CreateItem(item[2], CreateRandomPosition(), Quaternion.identity);
            CreateItem(item[4], CreateRandomPosition(), Quaternion.identity);
            CreateItem(item[5], CreateRandomPosition(), Quaternion.identity);
        }
        for (int i = 0; i < 50; i++)
        {
            CreateItem(item[1], CreateRandomPosition(), Quaternion.identity);
        }
    }

    private void CreatePlayer()
    {
        CreateItem(item[3], new Vector3(-2, -8, 0), Quaternion.identity);
    }

    private void CreateHeart()
    {
        // 实例化老家
        heartPosition = new Vector3(0, -8, 0);
        defendHeartWallPosition[0] = new Vector3(-1, -8, 0);
        defendHeartWallPosition[1] = new Vector3(1, -8, 0);
        for (int i = 2; i <= 4; i++)
        {
            defendHeartWallPosition[i] = new Vector3(i - 3, -7, 0);
        }
        CreateItem(item[0], heartPosition, Quaternion.identity);
        for (int i = 0; i < defendHeartWallPosition.Length; i++)
        {
            CreateItem(item[1], defendHeartWallPosition[i], Quaternion.identity);
        }
    }

    private void CreateAirBarriar()
    {
        for (int i = -10; i < 11; i++)
        {
            CreateItem(item[6], new Vector3(i, 9, 0), Quaternion.identity);
            CreateItem(item[6], new Vector3(i, -9, 0), Quaternion.identity);
        }
        for (int i = -8; i < 9; i++)
        {
            CreateItem(item[6], new Vector3(-11, i, 0), Quaternion.identity);
            CreateItem(item[6], new Vector3(11, i, 0), Quaternion.identity);
        }
    }

    private Vector3 CreateRandomPosition()
    {
        while (true)
        {
            Vector3 newPosition = new Vector3(Random.Range(-10, 11), Random.Range(8, -9), 0);
            if(!HasPosition(newPosition))
            {
                return newPosition;
            }
        }
    }

    private bool HasPosition(Vector3 position)
    {
        for (int i = 0; i < existPosition.Count; i++)
        {
            if(existPosition[i] == position)
            {
                return true;
            }
        }
        return false;
    }
}
