using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class InputManager : MonoBehaviour
{
    public static Action<Vector3> OnMouseDragStartAct;
    public static Action<Vector3> OnMouseDragIngAct;
    public static Action<Vector3> OnMouseDragEndAct;

    private Camera mainCamera;

    private bool isInput = false;

    private void Awake()
    {
        mainCamera = Camera.main;
    }

    private Vector3 tempPos;
    private void Update()
    {
        if(Input.GetMouseButtonDown(0))
        {
            if(!UIManager.IsCurRaycastUI())
            {
                isInput = true;
                tempPos = mainCamera.ScreenToWorldPoint(Input.mousePosition);
                OnMouseDragStartAct?.Invoke(tempPos);
            }
        }
        else if(Input.GetMouseButton(0))
        {
            if(isInput)
            {
                tempPos = mainCamera.ScreenToWorldPoint(Input.mousePosition);
                OnMouseDragIngAct?.Invoke(tempPos);
            }
        }
        else if(Input.GetMouseButtonUp(0))
        {
            if(isInput)
            {
                tempPos = mainCamera.ScreenToWorldPoint(Input.mousePosition);
                OnMouseDragEndAct?.Invoke(tempPos);
                isInput = false;
            }
        }
    }

}
