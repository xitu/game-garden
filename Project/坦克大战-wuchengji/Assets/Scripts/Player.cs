using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public float moveSpeed = 3;
    public Sprite[] tankSprite;
    public GameObject bulletPrefab;
    public GameObject explosionPrefab;
    public GameObject shieldPrefab;
    public AudioClip attackAudio;
    public AudioSource moveAudio;
    public AudioClip[] tankAudio;
    private SpriteRenderer sr;
    private Vector3 bulletEulerAngle;
    private float attackTime;
    private float isDefendedTimeVal = 3f;
    private bool isDefended = true;
     
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
        if(isDefended)
        {
            shieldPrefab.SetActive(true);
            isDefendedTimeVal -= Time.deltaTime;
            if(isDefendedTimeVal <= 0)
            { 
                isDefended = false;
                shieldPrefab.SetActive(false);
            }
        }
    }

    private void FixedUpdate()
    {
        if(!PlayerManager.Instance.isDefeat)
        {
            Move();
            if (attackTime >= 0.4f)
            {
                Attack();
            }
            else
            {
                attackTime += Time.fixedDeltaTime;
            }
        }
    }

    private void Attack()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            AudioSource.PlayClipAtPoint(attackAudio, transform.position);
            Instantiate(bulletPrefab, transform.position, Quaternion.Euler(transform.eulerAngles + bulletEulerAngle));
            attackTime = 0;
        }
    }

    private void Move()
    {
        float h = Input.GetAxisRaw("Horizontal");
        float v = Input.GetAxisRaw("Vertical");
        if (v != 0 && h != 0)
        {
            return;
        }
        if (h > 0)
        {
            sr.sprite = tankSprite[1];
            bulletEulerAngle = new Vector3(0,0, -90);
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
        if (Mathf.Abs(v) > 0.05f || Mathf.Abs(h) > 0.05f)
        {
            moveAudio.clip = tankAudio[1];
            moveAudio.volume = 0.1f;
            if (!moveAudio.isPlaying)
            {
                moveAudio.Play();
            }
        }
        else
        {
            moveAudio.clip = tankAudio[0];
            moveAudio.volume = 0.1f;
            if (!moveAudio.isPlaying)
            {
                moveAudio.Play();
            }
        }
        transform.Translate(Vector3.right * h * moveSpeed * Time.fixedDeltaTime, Space.World);
        transform.Translate(Vector3.up * v * moveSpeed * Time.fixedDeltaTime, Space.World);
    }

    private void Die()
    {
        if(!isDefended)
        {
            Instantiate(explosionPrefab, transform.position, transform.rotation);
            Destroy(gameObject);
            PlayerManager.Instance.isDead = true;
            PlayerManager.Instance.life--;
        }
    }
}
