using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;
using System;

public class TetriItem : MonoBehaviour
{
    [SerializeField] private Color _tetriColor = Color.white;

    public Color tetriColor => _tetriColor;

    public TetriGridItem[] gridItemArray { get; private set; }

    public int prepareIndex { get; private set; }

    private void Awake()
    {
        gridItemArray = GetComponentsInChildren<TetriGridItem>();
        for(int i = 0; i < gridItemArray.Length; i++)
        {
            Vector2Int coord = Vector2Int.zero;
            if(i > 0)
            {
                Vector3 offset = gridItemArray[i].transform.localPosition - gridItemArray[0].transform.localPosition;
                coord.x = Mathf.RoundToInt(offset.x / GridBoardHandler.gridSize);
                coord.y = Mathf.RoundToInt(offset.y / GridBoardHandler.gridSize);
            }
            gridItemArray[i].Init(i,coord);
        }
    }

    public void OnInit(int index)
    {
        prepareIndex = index;

        transform.localScale = new Vector3(0.5f,0.5f,1);
        transform.DOScale(Vector3.one,0.2f);
    }

    public void OnSelect()
    {
        transform.DOKill();
    }

    public void OnRecycle()
    {
        transform.DOKill();
    }

#if UNITY_EDITOR
    [Sirenix.OdinInspector.Button]
    private void SetTetriColor()
    {
        SpriteRenderer[] spriteRenderers = GetComponentsInChildren<SpriteRenderer>();
        for(int i = 0; i < spriteRenderers.Length; i++)
        {
            spriteRenderers[i].color = tetriColor;
        }
    }
#endif
}
