using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Heart : MonoBehaviour
{
    private SpriteRenderer sr;
    public Sprite brokenHeart;
    public GameObject explosionPrefab;
    public AudioClip dieAudio;
    // Start is called before the first frame update
    void Start()
    {
        sr = GetComponent<SpriteRenderer>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void Die()
    {
        AudioSource.PlayClipAtPoint(dieAudio, transform.position);
        Instantiate(explosionPrefab, transform.position, transform.rotation);
        sr.sprite = brokenHeart;
        PlayerManager.Instance.isDefeat = true;
    }
}
