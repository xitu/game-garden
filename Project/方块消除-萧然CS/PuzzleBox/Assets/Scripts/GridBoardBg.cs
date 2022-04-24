using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(MeshFilter),typeof(MeshRenderer))]
public class GridBoardBg : MonoBehaviour
{
    public void Init(float chessboardSize,float gridSize)
    {
        float halfWidth = chessboardSize * gridSize * 0.5f;
        float halfHeight = halfWidth;

        Vector3[] vertices = new Vector3[4];
        vertices[0] = new Vector3(-halfWidth,-halfHeight,0);
        vertices[1] = new Vector3(-halfWidth,halfHeight,0);
        vertices[2] = new Vector3(halfWidth,halfHeight,0);
        vertices[3] = new Vector3(halfWidth,-halfHeight,0);

        int[] triangles = new int[6];
        triangles[0] = 0;
        triangles[1] = 1;
        triangles[2] = 3;
        triangles[3] = 3;
        triangles[4] = 1;
        triangles[5] = 2;

        Mesh newMesh = new Mesh();
        newMesh.vertices = vertices;
        newMesh.triangles = triangles;
        newMesh.name = string.Format($"{halfWidth * 2}x{halfHeight * 2}");

        Transform gridLineTrans = transform;

        MeshFilter meshFilter = gridLineTrans.GetComponent<MeshFilter>();
        meshFilter.sharedMesh = newMesh;

        MeshRenderer meshRenderer = gridLineTrans.GetComponent<MeshRenderer>();

        float tiling = 1.0f / gridSize;
        meshRenderer.sharedMaterial.SetTextureScale("_MainTex",new Vector2(tiling,tiling));
        meshRenderer.sharedMaterial.SetTextureOffset("_MainTex",Vector2.zero);
    }

}

