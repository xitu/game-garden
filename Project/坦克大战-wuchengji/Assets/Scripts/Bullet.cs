using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    public float moveSpeed = 10;
    public bool isPlayerBullet;
    public AudioClip barriarAudio;
    // Start is called before the first frame update
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        transform.Translate(transform.up * moveSpeed * Time.deltaTime, Space.World);
    }


    private void OnTriggerEnter2D(Collider2D collision)
    {
        switch (collision.tag)
        {
            case "Tank":
                if (!isPlayerBullet)
                {
                    collision.SendMessage("Die");
                    Destroy(gameObject);
                }
                break;
            case "Heart":
                collision.SendMessage("Die");
                Destroy(gameObject);
                break;
            case "Wall":
                Destroy(collision.gameObject);
                Destroy(gameObject);
                break;
            case "Enemy":
                if (isPlayerBullet)
                {
                    collision.SendMessage("Die");
                    Destroy(gameObject);
                    PlayerManager.Instance.score++;
                    PlayerManager.Instance.enemyNum--;
                }
                break;
            case "Barriar":
                if(isPlayerBullet)
                {
                    AudioSource.PlayClipAtPoint(barriarAudio, transform.position);
                }
                Destroy(gameObject);
                break;
            default:
                break;
        }
    }
}
