using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class GridBoardHandler : MonoBehaviour
{
    [SerializeField] private int boardSize = 10;
    public const float gridSize = 1;

    private BoardGridItem gridItemPrefab;
    private Transform gridBoardRoot;

    private Vector2 boardStartPoint;

    private BoardGridItem[,] gridItemArray;

    public Transform[] prepareNodeArray { get; private set; }
    public float prepareRidus { get; private set; }

    public bool isActive { get; private set; } = false;

    private GridDragHandler gridDragHandler;

    private void Awake()
    {
        boardStartPoint = new Vector2((1 - boardSize) * 0.5f * gridSize,(1 - boardSize) * 0.5f * gridSize);

        gridDragHandler = gameObject.GetComponent<GridDragHandler>();
    }

    private void Start()
    {
        ScoreManager.Instance.OnGameStart();
        StartCoroutine(InitDelay());
    }

    private void OnDestroy()
    {
        ScoreManager.Instance.OnGameEnd();
    }

    private IEnumerator InitDelay()
    {
        yield return null;
        yield return null;

        //棋盘格子
        yield return StartCoroutine(InitGridBoard());
        yield return null;

        //备选方块位置节点
        InitPrepareNode();
        yield return null;

        //所有备选方块
        InitAllTetriItem();
        yield return null;

        //加载备选方块
        for(int i = 0; i < prepareNodeArray.Length; i++)
        {
            GetNewTetriItem(i);
            yield return null;
        }

        AudioManager.Instance.PlaySoundOnce(AudioName.pickUpName);
        yield return null;
        EffectController.Instance.Preload(EffectName.gridDissolveEffectName,boardSize);
        yield return null;

        gridDragHandler.Init();
        yield return null;

        isActive = true;
    }

    #region --- Init ---

    private IEnumerator InitGridBoard()
    {
        GridBoardBg gridBoardBg = GetComponentInChildren<GridBoardBg>();
        gridBoardBg.Init(boardSize,gridSize);
        yield return null;
        //
        gridBoardRoot = new GameObject("GridBoardRoot").transform;
        gridBoardRoot.SetParent(transform);
        gridBoardRoot.localPosition = Vector3.zero;
        //格子数据
        gridItemPrefab = Resources.Load<BoardGridItem>("Prefabs/BoardGrid");
        if(gridItemPrefab == null)
        {
            Debug.LogError("Grid is null");
            yield break;
        }
        yield return null;

        gridItemArray = new BoardGridItem[boardSize,boardSize];
        Vector2[,] gridPointArray = new Vector2[boardSize,boardSize];

        StartCoroutine(ForwardCreate());
        yield return StartCoroutine(ReverseCreate());

        IEnumerator ForwardCreate()
        {
            for(int y = 0; y < boardSize; y++)
            {
                if(y % 2 == 0)
                {
                    for(int x = 0; x < boardSize; x++)
                    {
                        if(y * boardSize + x >= boardSize * boardSize / 2)
                            yield break;

                        gridItemArray[x,y] = GetNewGridItem(x,y);
                        yield return null;
                    }
                }
                else
                {
                    for(int x = boardSize - 1; x >= 0; x--)
                    {
                        if(y * boardSize + x >= boardSize * boardSize / 2)
                            yield break;

                        gridItemArray[x,y] = GetNewGridItem(x,y);
                        yield return null;
                    }
                }
            }
        }
        IEnumerator ReverseCreate()
        {
            for(int y = boardSize - 1; y >= 0; y--)
            {
                if(y % 2 == 0)
                {
                    for(int x = 0; x < boardSize; x++)
                    {
                        if(y * boardSize + x < boardSize * boardSize / 2)
                            yield break;

                        gridItemArray[x,y] = GetNewGridItem(x,y);
                        yield return null;
                    }
                }
                else
                {
                    for(int x = boardSize - 1; x >= 0; x--)
                    {
                        if(y * boardSize + x < boardSize * boardSize / 2)
                            yield break;

                        gridItemArray[x,y] = GetNewGridItem(x,y);
                        yield return null;
                    }
                }
                AudioManager.Instance.PlaySoundOnce(AudioName.putDownName);
            }
        }
    }

    private void InitPrepareNode()
    {
        //备选方块位置节点
        Transform prepareParent = transform.Find("Prepare");
        if(prepareParent == null)
            Debug.LogError("prepareParent is null");
        prepareNodeArray = new Transform[prepareParent.childCount];
        for(int i = 0; i < prepareParent.childCount; i++)
        {
            prepareNodeArray[i] = prepareParent.GetChild(i);
        }
        if(prepareNodeArray.Length >= 2)
        {
            prepareRidus = (prepareNodeArray[0].position - prepareNodeArray[1].position).magnitude;
            prepareRidus *= 0.5f;
            prepareRidus -= 0.1f;
        }
        else
        {
            prepareRidus = 3;
            Debug.LogError("prepareNodeArray.Length < 2");
        }
    }

    #endregion

    #region --- Check ---

    private List<BoardGridItem> lastCheckGridList = new List<BoardGridItem>();
    private List<BoardGridItem> curCheckGridList = new List<BoardGridItem>();

    public int CheckDragingTetriItem(TetriItem tetriItem)
    {
        if(tetriItem == null)
        {
            for(int i = 0; i < lastCheckGridList.Count; i++)
            {
                if(!curCheckGridList.Contains(lastCheckGridList[i]))
                    lastCheckGridList[i].RefreshPutState(BoardGridItem.GridState.Empty);
            }
            lastCheckGridList.Clear();
            return 0;
        }

        int successCount = 0;

        //相对棋盘左下角的坐标（以方块的第一个格子为基准）
        Vector3 tempPos = gridBoardRoot.InverseTransformPoint(tetriItem.gridItemArray[0].transform.position);
        tempPos.x -= boardStartPoint.x;
        tempPos.y -= boardStartPoint.y;

        //第一个格子的棋盘坐标
        //tempPosX = Mathf.RoundToInt(tempPos.x / gridSize);
        //tempPosY = Mathf.RoundToInt(tempPos.y / gridSize);
        int firstCoordX = (int)Math.Round(tempPos.x / gridSize,MidpointRounding.AwayFromZero);
        int firstCoordY = (int)Math.Round(tempPos.y / gridSize,MidpointRounding.AwayFromZero);

        //遍历判断方块的每个格子
        int tempCoordX, tempCoordY;
        for(int i = 0; i < tetriItem.gridItemArray.Length; i++)
        {
            //每个格子的棋盘坐标
            tempCoordX = firstCoordX + tetriItem.gridItemArray[i].localCoord.x;
            tempCoordY = firstCoordY + tetriItem.gridItemArray[i].localCoord.y;

            if(tempCoordX >= 0 && tempCoordX < boardSize)
            {
                if(tempCoordY >= 0 && tempCoordY < boardSize)
                {
                    if(gridItemArray[tempCoordX,tempCoordY].isEmpty)
                        successCount++;

                    curCheckGridList.Add(gridItemArray[tempCoordX,tempCoordY]);
                }
            }
        }

        for(int i = 0; i < curCheckGridList.Count; i++)
        {
            if(successCount == tetriItem.gridItemArray.Length)
                curCheckGridList[i].RefreshPutState(BoardGridItem.GridState.CanPut);
            else
                curCheckGridList[i].RefreshPutState(BoardGridItem.GridState.NotPut);
        }
        for(int i = 0; i < lastCheckGridList.Count; i++)
        {
            if(!curCheckGridList.Contains(lastCheckGridList[i]))
                lastCheckGridList[i].RefreshPutState(BoardGridItem.GridState.Empty);
        }
        lastCheckGridList.Clear();
        lastCheckGridList.AddRange(curCheckGridList);
        curCheckGridList.Clear();

        return successCount;
    }

    //计算方块与棋盘对齐位置的世界坐标
    public bool GetTetriItemPutDownPos(TetriItem tetriItem,out Vector3? tetriPos)
    {
        if(tetriItem == null)
        {
            tetriPos = null;
            return false;
        }

        //相对棋盘左下角的坐标（以方块的第一个格子为基准）
        Vector3 tempPos = gridBoardRoot.InverseTransformPoint(tetriItem.gridItemArray[0].transform.position);
        tempPos.x -= boardStartPoint.x;
        tempPos.y -= boardStartPoint.y;

        //第一个格子的棋盘坐标
        int firstCoordX = (int)Math.Round(tempPos.x / gridSize,MidpointRounding.AwayFromZero);
        int firstCoordY = (int)Math.Round(tempPos.y / gridSize,MidpointRounding.AwayFromZero);

        if(firstCoordX >= 0 && firstCoordX < boardSize)
        {
            if(firstCoordY >= 0 && firstCoordY < boardSize)
            {
                if(gridItemArray[firstCoordX,firstCoordY].isEmpty)
                {
                    //第一个格子的世界坐标
                    tetriPos = gridItemArray[firstCoordX,firstCoordY].transform.position;
                    //方块的世界坐标
                    tetriPos -= tetriItem.gridItemArray[0].transform.localPosition;
                    return true;
                }
            }
        }
        tetriPos = null;
        return false;
    }

    public void PutDownTetriItem(TetriItem tetriItem)
    {
        if(tetriItem == null)
        {
            Debug.LogError("tetriItem == null");
            return;
        }
        isActive = false;
        StartCoroutine(PutDownTetriItemDelay(tetriItem));
    }
    private IEnumerator PutDownTetriItemDelay(TetriItem tetriItem)
    {
        yield return null;

        //相对棋盘左下角的坐标（以方块的第一个格子为基准）
        Vector3 tempPos = gridBoardRoot.InverseTransformPoint(tetriItem.gridItemArray[0].transform.position);
        tempPos.x -= boardStartPoint.x;
        tempPos.y -= boardStartPoint.y;

        //第一个格子的棋盘坐标
        int firstCoordX = (int)Math.Round(tempPos.x / gridSize,MidpointRounding.AwayFromZero);
        int firstCoordY = (int)Math.Round(tempPos.y / gridSize,MidpointRounding.AwayFromZero);

        //遍历判断方块的每个格子
        int tempCoordX, tempCoordY;
        for(int i = 0; i < tetriItem.gridItemArray.Length; i++)
        {
            //每个格子的棋盘坐标
            tempCoordX = firstCoordX + tetriItem.gridItemArray[i].localCoord.x;
            tempCoordY = firstCoordY + tetriItem.gridItemArray[i].localCoord.y;

            if(tempCoordX >= 0 && tempCoordX < boardSize)
            {
                if(tempCoordY >= 0 && tempCoordY < boardSize)
                {
                    //修改棋盘格子属性
                    if(gridItemArray[tempCoordX,tempCoordY].isEmpty)
                        gridItemArray[tempCoordX,tempCoordY].PutDownGrid(tetriItem.tetriColor);
                    else
                        Debug.LogError("Grid is not empty");
                }
            }
        }
        yield return null;
        //当前方块所在位置
        int preIndex = tetriItem.prepareIndex;
        yield return null;
        //回收旧方块
        RecycleTetriItem(tetriItem);
        yield return null;
        //加载新方块
        GetNewTetriItem(preIndex);
        yield return null;
        //查找可以消除的行
        yield return StartCoroutine(TryDissolveLine());
        yield return null;

        //判断是否可以继续放置方块，不可以结束游戏
        if(CheckContinuePutDown())
        {
            //继续游戏
        }
        else
        {
            //结束游戏
            AudioManager.Instance.PlaySoundOnce(AudioName.gameOverName);
            UIManager.Instance.ShowPopup<UIResultPopup>();
        }
        yield return null;
        //
        isActive = true;
    }

    private IEnumerator TryDissolveLine(int continueCount = 0)
    {
        int dissolveLine = -1;
        for(int y = 0; y < gridItemArray.GetLength(1); y++)
        {
            dissolveLine = y;
            for(int x = 0; x < gridItemArray.GetLength(0); x++)
            {
                if(gridItemArray[x,y].isEmpty)
                {
                    dissolveLine = -1;
                    break;
                }
            }
            if(dissolveLine >= 0)
            {
                break;
            }
        }

        yield return null;

        if(dissolveLine < 0)
        {
            //已经消除完成，类似消除行数>2，额外播放音效
            if(continueCount > 2)
                AudioManager.Instance.PlaySoundOnce(AudioName.dissolve0Name);
            yield break;
        }

        ScoreManager.Instance.OnDissolveScore();
        yield return null;
        EffectController.Instance.HideEffect(EffectName.gridDissolveEffectName);
        yield return null;
        AudioManager.Instance.PlaySoundOnce(AudioName.dissolveName);
        continueCount++;

        yield return null;

        for(int x = 0; x < gridItemArray.GetLength(0); x++)
        {
            Vector3 effectPos = gridItemArray[x,dissolveLine].transform.position;
            Color gridColor = gridItemArray[x,dissolveLine].gridColor;
            EffectItem effectItem = EffectController.Instance.ShowEffect(EffectName.gridDissolveEffectName,effectPos);
            effectItem.SetColorOverLifetimeColor(gridColor);
            yield return null;
            RecycleGridItem(gridItemArray[x,dissolveLine]);
            yield return null;
        }

        yield return null;

        for(int y = dissolveLine; y < gridItemArray.GetLength(0); y++)
        {
            if(y < gridItemArray.GetLength(0) - 1)
            {
                if(y % 2 == 0)
                {
                    for(int x = 0; x < gridItemArray.GetLength(0); x++)
                    {
                        gridItemArray[x,y] = gridItemArray[x,y + 1];
                        gridItemArray[x,y].Move(x,y,boardStartPoint.y + y * gridSize);
                        if(x % 2 == 0)
                            yield return null;
                    }
                }
                else
                {
                    for(int x = gridItemArray.GetLength(0) - 1; x >= 0; x--)
                    {
                        gridItemArray[x,y] = gridItemArray[x,y + 1];
                        gridItemArray[x,y].Move(x,y,boardStartPoint.y + y * gridSize);
                        if(x % 2 == 0)
                            yield return null;
                    }
                }
            }
            else
            {
                if(y % 2 == 0)
                {
                    for(int x = 0; x < gridItemArray.GetLength(0); x++)
                    {
                        gridItemArray[x,y] = GetNewGridItem(x,y);
                        if(x % 2 == 0)
                            yield return null;
                    }
                }
                else
                {
                    for(int x = gridItemArray.GetLength(0) - 1; x >= 0; x--)
                    {
                        gridItemArray[x,y] = GetNewGridItem(x,y);
                        if(x % 2 == 0)
                            yield return null;
                    }
                }
            }
            yield return null;
        }

        yield return new WaitForSeconds(BoardGridItem.moveDownDuration);

        yield return StartCoroutine(TryDissolveLine(continueCount));
    }

    private bool CheckContinuePutDown()
    {
        TetriItem[] preTetriArray = new TetriItem[prepareNodeArray.Length];
        for(int i = 0; i < prepareNodeArray.Length; i++)
        {
            preTetriArray[i] = prepareNodeArray[i].GetComponentInChildren<TetriItem>();
        }

        int coordX, coordY;
        bool prTetriCanDown;

        //遍历棋盘格子
        for(int y = 0; y < gridItemArray.GetLength(1); y++)
        {
            for(int x = 0; x < gridItemArray.GetLength(0); x++)
            {
                if(gridItemArray[x,y].isEmpty)
                {
                    //遍历预备方块的每个格子
                    for(int i = 0; i < preTetriArray.Length; i++)
                    {
                        if(preTetriArray[i] == null)
                        {
                            //预备方块为空时，因为已经被选中拖拽
                            preTetriArray[i] = gridDragHandler.curDragTetri;
                            if(preTetriArray[i] == null)
                            {
                                Debug.LogError("prepare tetri == null");
                                continue;
                            }
                        }

                        prTetriCanDown = true;
                        for(int j = 1; j < preTetriArray[i].gridItemArray.Length; j++)
                        {
                            coordX = x + preTetriArray[i].gridItemArray[j].localCoord.x;
                            coordY = y + preTetriArray[i].gridItemArray[j].localCoord.y;

                            if(coordX >= 0 && coordX < boardSize && coordY >= 0 && coordY < boardSize)
                            {
                                if(gridItemArray[coordX,coordY].isEmpty)
                                { }
                                else
                                {
                                    prTetriCanDown = false;
                                    break;
                                }
                            }
                            else
                            {
                                prTetriCanDown = false;
                                break;
                            }
                        }
                        if(prTetriCanDown)
                            return true;
                    }
                }
            }
        }
        return false;
    }

    private void HintNextPutDown()
    {
        TetriItem[] preTetriArray = new TetriItem[prepareNodeArray.Length];
        for(int i = 0; i < prepareNodeArray.Length; i++)
        {
            preTetriArray[i] = prepareNodeArray[i].GetComponentInChildren<TetriItem>();
        }

        int coordX, coordY;
        bool preTetriCanDown;

        //遍历棋盘格子
        for(int y = 0; y < gridItemArray.GetLength(1); y++)
        {
            for(int x = 0; x < gridItemArray.GetLength(0); x++)
            {
                if(gridItemArray[x,y].isEmpty)
                {
                    //遍历预备方块的每个格子
                    for(int i = 0; i < preTetriArray.Length; i++)
                    {
                        preTetriCanDown = true;
                        for(int j = 1; j < preTetriArray[i].gridItemArray.Length; j++)
                        {
                            coordX = x + preTetriArray[i].gridItemArray[j].localCoord.x;
                            coordY = y + preTetriArray[i].gridItemArray[j].localCoord.y;

                            if(coordX >= 0 && coordX < boardSize && coordY >= 0 && coordY < boardSize)
                            {
                                if(gridItemArray[coordX,coordY].isEmpty)
                                { }
                                else
                                {
                                    preTetriCanDown = false;
                                    break;
                                }
                            }
                            else
                            {
                                preTetriCanDown = false;
                                break;
                            }
                        }
                        if(preTetriCanDown)
                        {
                            HintNextPos();
                            return;
                        }
                    }
                }
            }
        }

        void HintNextPos()
        {
            //todo
        }
    }

    #endregion

    #region --- GridPool ---

    private Queue<BoardGridItem> gridItemPool = new Queue<BoardGridItem>();

    private BoardGridItem GetNewGridItem(int x,int y)
    {
        BoardGridItem gridItem;
        if(gridItemPool.Count > 0)
        {
            gridItem = gridItemPool.Dequeue();
            gridItem.gameObject.SetActive(true);
        }
        else
        {
            gridItem = Instantiate(gridItemPrefab,gridBoardRoot.transform);
        }

        Vector3 gridPos = Vector3.zero;
        gridPos.x = boardStartPoint.x + x * gridSize;
        gridPos.y = boardStartPoint.y + y * gridSize;

        gridItem.transform.localPosition = gridPos;
        gridItem.Init(x,y);

        return gridItem;
    }

    private void RecycleGridItem(BoardGridItem gridItem)
    {
        if(gridItem != null)
        {
            gridItem.gameObject.SetActive(false);
            gridItemPool.Enqueue(gridItem);
        }
    }

    #endregion

    #region --- TetriItem ---

    private Transform tetriRoot;
    private List<TetriItem> tetriItemList = new List<TetriItem>();

    private void InitAllTetriItem()
    {
        tetriRoot = new GameObject("TetriRoot").transform;
        tetriRoot.SetParent(transform);
        tetriRoot.localPosition = Vector3.zero;
        tetriRoot.gameObject.SetActive(false);

        //方块单元
        TetriItem[] prefabArray = Resources.LoadAll<TetriItem>("Prefabs/Tetris");

        for(int i = 0; i < prefabArray.Length; i++)
        {
            TetriItem tetriItem = Instantiate(prefabArray[i],tetriRoot);
            tetriItemList.Add(tetriItem);
        }
    }

    private void GetNewTetriItem(int prepareIndex)
    {
        if(prepareIndex >= 0 && prepareIndex < prepareNodeArray.Length)
        {
            TetriItem tetriItem = tetriItemList[UnityEngine.Random.Range(0,tetriItemList.Count)];

            //辅助测试
            if(tetriItemList.Exists(item => item.name.StartsWith("O0")))
                tetriItem = tetriItemList.Find(item => item.name.StartsWith("O0"));
            else if(tetriItemList.Exists(item => item.name.StartsWith("I1")))
                tetriItem = tetriItemList.Find(item => item.name.StartsWith("I1"));

            tetriItemList.Remove(tetriItem);
            tetriItem.transform.SetParent(prepareNodeArray[prepareIndex]);
            tetriItem.transform.localPosition = Vector3.zero;
            tetriItem.transform.localScale = Vector3.one;
            tetriItem.OnInit(prepareIndex);
        }
    }

    private void RecycleTetriItem(TetriItem tetriItem)
    {
        if(tetriItem == null)
        {
            Debug.LogError("RecycleTetriItem : tetriItem == null");
            return;
        }
        tetriItem.transform.SetParent(tetriRoot);
        tetriItemList.Add(tetriItem);
    }

    #endregion

}
