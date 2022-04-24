using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UIBase : MonoBehaviour
{
    private float showTime = 0.5f;
    private float hideTime = 0.5f;

    public bool isShow { get; private set; } = false;

    public virtual float Show(params object[] args)
    {
        if(!gameObject.activeSelf)
            gameObject.SetActive(true);

        isShow = true;

        return showTime;
    }

    public virtual void Refresh(params object[] args)
    {
        if(isShow && !gameObject.activeSelf)
            gameObject.SetActive(true);
    }

    public virtual float Hide(bool isDestroy)
    {
        isShow = false;

        if(isDestroy)
            Destroy(gameObject);
        else
            gameObject.SetActive(false);

        return hideTime;
    }

}
