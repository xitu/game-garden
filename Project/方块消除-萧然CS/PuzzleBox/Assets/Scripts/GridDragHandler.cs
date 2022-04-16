using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GridDragHandler : MonoBehaviour
{
    public enum DragState
    {
        None,
        PickUp,
        DragMove,
        PutBack,
        PutDown,
    }

    public bool isActive { get; private set; } = false;

    private GridBoardHandler gridBoardHandler;

    private Transform[] prepareNodeArray => gridBoardHandler.prepareNodeArray;
    private float prepareRidus => gridBoardHandler.prepareRidus;

    public TetriItem curDragTetri => dragTetriItem;

    //选中拖拽对象
    private TetriItem dragTetriItem;
    //点击选中时，手指点击位置与方块中心的偏移量
    private Vector3 dragFingerOffset;
    //点击选中后，为了手指不遮挡视线，方块偏移量
    private Vector3 dragGridMoveOffset;

    private readonly Vector3 gridDisplayOffset = new Vector3(0,2,0);

    [SerializeField]
    private DragState dragState = DragState.None;
    private bool isInput = false;

    [SerializeField]
    float pickUpMoveLerp = 0.5f;
    [SerializeField]
    float pickUpScaleLerp = 0.5f;

    [SerializeField]
    float putBackMoveLerp = 0.5f;
    [SerializeField]
    float putBackScaleLerp = 0.5f;

    [SerializeField]
    float putDownMoveLerp = 0.5f;

    private void Awake()
    {
        gridBoardHandler = GetComponent<GridBoardHandler>();
    }

    private void Start()
    {
        InputManager.OnMouseDragStartAct += OnMouseDragStart;
        InputManager.OnMouseDragIngAct += OnMouseDragIng;
        InputManager.OnMouseDragEndAct += OnMouseDragEnd;
    }
    private void OnDestroy()
    {
        InputManager.OnMouseDragStartAct -= OnMouseDragStart;
        InputManager.OnMouseDragIngAct -= OnMouseDragIng;
        InputManager.OnMouseDragEndAct -= OnMouseDragEnd;
    }

    private void Update()
    {
        if(dragState == DragState.PutBack)
        {
            OnPutBack();
        }
        else if(dragState == DragState.PutDown)
        {
            OnPutDown();
        }
    }

    public void Init()
    {
        isActive = true;
    }

    #region --- Input ---

    private void OnMouseDragStart(Vector3 pos)
    {
        if(!isActive || isInput || dragState != DragState.None)
            return;

        for(int i = 0; i < prepareNodeArray.Length; i++)
        {
            if(Mathf.Abs(pos.x - prepareNodeArray[i].position.x) <= prepareRidus)
            {
                if(Mathf.Abs(pos.y - prepareNodeArray[i].position.y) <= prepareRidus)
                {
                    dragTetriItem = prepareNodeArray[i].GetComponentInChildren<TetriItem>();
                    if(dragTetriItem != null)
                    {
                        dragTetriItem.OnSelect();
                        dragTetriItem.transform.SetParent(transform);

                        dragFingerOffset = dragTetriItem.transform.position - pos;
                        dragGridMoveOffset = Vector3.zero;

                        dragState = DragState.PickUp;

                        isInput = true;

                        AudioManager.Instance.PlaySoundOnce(AudioName.pickUpName);
                    }
                }
            }
        }
    }
    private void OnMouseDragIng(Vector3 pos)
    {
        if(isInput && dragTetriItem != null)
        {
            if(dragState == DragState.PickUp)
                OnPickUp();
            else if(gridBoardHandler.isActive)
                gridBoardHandler.CheckDragingTetriItem(dragTetriItem);

            dragTetriItem.transform.position = pos + dragFingerOffset + dragGridMoveOffset;
        }
    }
    private void OnMouseDragEnd(Vector3 pos)
    {
        if(isInput && dragTetriItem != null)
        {
            isInput = false;

            if(gridBoardHandler.isActive)
            {
                int successCount = gridBoardHandler.CheckDragingTetriItem(dragTetriItem);

                if(successCount >= dragTetriItem.gridItemArray.Length)
                {
                    dragState = DragState.PutDown;

                    if(Random.Range(0,100) < 80)
                        AudioManager.Instance.PlaySoundOnce(AudioName.putDownName);
                    else
                        AudioManager.Instance.PlaySoundOnce(AudioName.putDown0Name);
                }
                else
                {
                    dragTetriItem.transform.SetParent(prepareNodeArray[dragTetriItem.prepareIndex]);
                    dragState = DragState.PutBack;

                    if(successCount > 0)
                        AudioManager.Instance.PlaySoundOnce(AudioName.putBackName);
                }
            }
            else
            {
                dragTetriItem.transform.SetParent(prepareNodeArray[dragTetriItem.prepareIndex]);
                dragState = DragState.PutBack;
            }
        }
    }

    #endregion

    private void OnPickUp()
    {
        dragState = DragState.DragMove;
        if(dragGridMoveOffset.y < gridDisplayOffset.y)
        {
            dragGridMoveOffset.y = Mathf.Lerp(dragGridMoveOffset.y,gridDisplayOffset.y,pickUpMoveLerp);
            if(gridDisplayOffset.y - dragGridMoveOffset.y < 0.01f)
                dragGridMoveOffset.y = gridDisplayOffset.y;
            dragState = DragState.PickUp;
        }
        if(dragTetriItem.transform.localScale != Vector3.one)
        {
            dragTetriItem.transform.localScale = Vector3.Lerp(dragTetriItem.transform.localScale,Vector3.one,pickUpScaleLerp);
            if(Mathf.Abs(1 - dragTetriItem.transform.localScale.x) < 0.01f)
                dragTetriItem.transform.localScale = Vector3.one;
            dragState = DragState.PickUp;
        }
    }

    private void OnPutBack()
    {
        if(dragTetriItem == null)
        {
            Debug.LogError("dragGridGroup == null");
            dragState = DragState.None;
            return;
        }

        dragState = DragState.None;
        if(dragTetriItem.transform.localPosition != Vector3.zero)
        {
            dragTetriItem.transform.localPosition = Vector3.Lerp(dragTetriItem.transform.localPosition,Vector3.zero,putBackMoveLerp);
            if(dragTetriItem.transform.localPosition.sqrMagnitude < 0.01f)
                dragTetriItem.transform.localPosition = Vector3.zero;
            dragState = DragState.PutBack;
        }
        if(dragTetriItem.transform.localScale != Vector3.one)
        {
            dragTetriItem.transform.localScale = Vector3.Lerp(dragTetriItem.transform.localScale,Vector3.one,putBackScaleLerp);
            if(Mathf.Abs(dragTetriItem.transform.localScale.x - 1) < 0.01f)
                dragTetriItem.transform.localScale = Vector3.one;
            dragState = DragState.PutBack;
        }

        if(dragState == DragState.None)
        {
            dragTetriItem = null;
            gridBoardHandler.CheckDragingTetriItem(null);
        }
    }

    Vector3? groupDownPos;
    private void OnPutDown()
    {
        if(dragTetriItem == null)
        {
            Debug.LogError("dragGridGroup == null");
            dragState = DragState.None;
            return;
        }

        if(!groupDownPos.HasValue)
        {
            gridBoardHandler.GetTetriItemPutDownPos(dragTetriItem,out groupDownPos);
            if(!groupDownPos.HasValue)
            {
                Debug.LogError("groupDownPos == null");
                return;
            }
        }

        dragState = DragState.None;
        if((dragTetriItem.transform.position - groupDownPos.Value).sqrMagnitude >= 0.01f)
        {
            dragTetriItem.transform.position = Vector3.Lerp(dragTetriItem.transform.position,groupDownPos.Value,putDownMoveLerp);
            if((dragTetriItem.transform.position - groupDownPos.Value).sqrMagnitude < 0.01f)
                dragTetriItem.transform.position = groupDownPos.Value;
            dragState = DragState.PutDown;
        }

        if(dragState == DragState.None)
        {
            gridBoardHandler.PutDownTetriItem(dragTetriItem);

            dragTetriItem = null;
            groupDownPos = null;

            gridBoardHandler.CheckDragingTetriItem(null);
        }
    }

}
