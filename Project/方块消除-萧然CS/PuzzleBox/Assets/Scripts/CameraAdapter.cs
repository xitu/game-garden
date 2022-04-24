using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(Camera))]
public class CameraAdapter : MonoBehaviour
{
    private void Awake()
    {
        Camera camera = GetComponent<Camera>();
        camera.orthographicSize = Screen.height / 2f / 100;
    }

}
