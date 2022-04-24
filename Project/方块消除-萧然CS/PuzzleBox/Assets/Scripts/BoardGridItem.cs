using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;

public class BoardGridItem : MonoBehaviour
{
    public enum GridState
    {
        Empty,
        CanPut,
        NotPut,
    }

    public const float moveDownDuration = 0.1f;

    [SerializeField] private Color emptyColor = new Color(1,1,1,0.5f);
    [SerializeField] private Color canPutColor = new Color(0,1,0,0.5f);
    [SerializeField] private Color notPutColor = new Color(1,0,0,0.5f);

    private SpriteRenderer spriteRender;

    public bool isEmpty { get; private set; } = true;

    private Color _gridColor;
    public Color gridColor
    {
        get { return _gridColor; }
        set
        {
            _gridColor = value;
            if(spriteRender != null)
                spriteRender.color = _gridColor;
        }
    }

    private void Awake()
    {
        spriteRender = GetComponentInChildren<SpriteRenderer>();
    }

    public void Init(int x,int y)
    {
        isEmpty = true;
        gridColor = emptyColor;
    }

    public void Move(int x,int y,float targetPosY)
    {
        transform.DOKill();
        transform.DOLocalMoveY(targetPosY,moveDownDuration);
    }

    /// <summary>
    /// -1:空格子；0:可放置格子；1:不可放置格子
    /// </summary>
    /// <param name="state"></param>
    public void RefreshPutState(GridState gridState)
    {
        if(!isEmpty)
            return;

        switch(gridState)
        {
            case GridState.Empty:
                gridColor = emptyColor;
                break;
            case GridState.CanPut:
                gridColor = canPutColor;
                break;
            case GridState.NotPut:
                gridColor = notPutColor;
                break;
            default:
                break;
        }
    }

    public void PutDownGrid(Color color)
    {
        isEmpty = false;
        gridColor = color;
    }

    public void DissolveGrid()
    {
        isEmpty = true;
        gridColor = emptyColor;
    }

    public void CutTargetGridToSelf(BoardGridItem target)
    {
        if(target == null)
        {
            isEmpty = true;
            gridColor = emptyColor;
        }
        else
        {
            isEmpty = target.isEmpty;
            gridColor = target.gridColor;

            target.gridColor = emptyColor;
        }
    }

}
