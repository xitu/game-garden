using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public float moveSpeed = 3;
    public Sprite[] tankSprite;
    public GameObject bulletPrefab;
    public GameObject explosionPrefab;
    private SpriteRenderer sr;
    private Vector3 bulletEulerAngle;
    private float attackTime;
    private float turnDirectionTime;
    private float v;
    private float h;

    // Start is called before the first frame update
    private void Awake()
    {
        sr = GetComponent<SpriteRenderer>();
    }

    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if (attackTime >= 3)
        {
            Attack();
        }
        else
        {
            attackTime += Time.deltaTime;
        }
    }

    private void FixedUpdate()
    {
        Move();
    }

    private void Attack()
    {
        Instantiate(bulletPrefab, transform.position, Quaternion.Euler(transform.eulerAngles + bulletEulerAngle));
        attackTime = 0;
    }

    private void Move()
    {
        if (turnDirectionTime >= 4)
        {
            int randomDirection = Random.Range(0, 8);
            if (randomDirection >= 5)
            {
                v = -1;
                h = 0;
            }
            else if (randomDirection >= 3)
            {
                v = 0;
                h = 1;
            }
            else if (randomDirection >= 1)
            {
                v = 0;
                h = -1;
            }
            else
            {
                v = -1;
                h = 0;
            }
            turnDirectionTime = 0;
        }
        else
        {
            turnDirectionTime += Time.deltaTime + 0.05f;
        }
        
        if (h > 0)
        {
            sr.sprite = tankSprite[1];
            bulletEulerAngle = new Vector3(0, 0, -90);
        }
        else if (h < 0)
        {
            sr.sprite = tankSprite[3];
            bulletEulerAngle = new Vector3(0, 0, 90);
        }
        if (v > 0)
        {
            sr.sprite = tankSprite[0];
            bulletEulerAngle = new Vector3(0, 0, 0);
        }
        else if (v < 0)
        {
            sr.sprite = tankSprite[2];
            bulletEulerAngle = new Vector3(0, 0, -180);
        }
        transform.Translate(Vector3.right * h * moveSpeed * Time.fixedDeltaTime, Space.World);
        transform.Translate(Vector3.up * v * moveSpeed * Time.fixedDeltaTime, Space.World);
    }

    private void Die()
    {
        Instantiate(explosionPrefab, transform.position, transform.rotation);
        Destroy(gameObject);
    }
     
    private void OnCollisionEnter2D(Collision2D collision)
    {
        if(collision.transform.tag == "Enemy")
        {
            turnDirectionTime = 5;
        }
    }
}
