using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using UnityEngine.UI;
using System.Linq;
using UnityEngine.EventSystems;

public class UIManager : MonoBehaviour
{
    public static UIManager Instance { get; private set; }

    public enum CanvasMatchMode
    {
        Width,
        Height,
        Both
    }

    public enum UIPosition
    {
        Bottom = 1,
        Panel = 2,
        Popup = 3,
        Top = 4,
    }

    public Vector2 canvasSize { get; private set; } = new Vector2(1080,1920);

    private Canvas mainCanvas;
    private CanvasScaler canvasScaler;

    private GraphicRaycaster graphicRaycaster;
    private static bool isOnRaycaster;

    private Dictionary<Type,UIBase> uiPrefabDic = new Dictionary<Type,UIBase>();
    private Dictionary<UIPosition,Transform> uiRootDic = new Dictionary<UIPosition,Transform>();

    private Dictionary<Type,UIBase> uiCacheDic = new Dictionary<Type,UIBase>();
    private List<Type> panelOrderList = new List<Type>();
    private List<Type> uiShowList = new List<Type>();

    //----------

    private void Awake()
    {
        Instance = this;

        mainCanvas = GetComponent<Canvas>();
        canvasScaler = GetComponent<CanvasScaler>();
        canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        canvasScaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
        SetCanvasMatchMode(CanvasMatchMode.Width);

        float canvasSizeX = canvasScaler.referenceResolution.x;
        float canvasSizeY = (int)(canvasSize.x * Screen.height / Screen.width);
        canvasSize = new Vector2(canvasSizeX,canvasSizeY);

        graphicRaycaster = GetComponent<GraphicRaycaster>();
        isOnRaycaster = graphicRaycaster.enabled;

        foreach(UIPosition item in Enum.GetValues(typeof(UIPosition)))
        {
            Transform root = transform.Find($"{item}Root");
            if(root == null)
                root = transform;
            uiRootDic.Add(item,root);
        }
    }

    private void Start()
    {
        ShowPanel<UIMainPanel>();
    }

    public void SetCanvasMatchMode(CanvasMatchMode matchMode)
    {
        switch(matchMode)
        {
            case CanvasMatchMode.Width:
                canvasScaler.matchWidthOrHeight = 0;
                break;
            case CanvasMatchMode.Height:
                canvasScaler.matchWidthOrHeight = 1;
                break;
            case CanvasMatchMode.Both:
                canvasScaler.matchWidthOrHeight = 0.5f;
                break;
            default:
                break;
        }
    }

    private int settingAmount = 0;
    /// <summary>
    /// 开关UI射线检测，用于屏蔽UI点击操作
    /// </summary>
    /// <param name="enabled"></param>
    public void SetCanvasRaycastEnable(bool enabled)
    {
        if(enabled)
        {
            settingAmount++;
            if(settingAmount >= 0 && !isOnRaycaster)
            {
                graphicRaycaster.enabled = true;
                isOnRaycaster = true;
            }
        }
        else
        {
            settingAmount--;
            if(settingAmount < 0 && isOnRaycaster)
            {
                graphicRaycaster.enabled = false;
                isOnRaycaster = false;
            }
        }
        //Debug.LogError(enabled + " : " + settingAmount);
    }
    public bool GetCanvasRaycastEnable()
    {
        return isOnRaycaster;
    }

    /// <summary>
    /// 是否点击UI
    /// </summary>
    /// <returns></returns>
    public static bool IsCurRaycastUI()
    {
        if(isOnRaycaster)
        {
            if(Input.touchCount > 0)
            {
                return EventSystem.current.IsPointerOverGameObject(Input.GetTouch(0).fingerId);
            }
#if UNITY_EDITOR
            return EventSystem.current.IsPointerOverGameObject();
#endif
        }
        return false;
    }

    #region --- State ---

    public bool IsShowUI<T>() where T : UIBase
    {
        return IsShowUI(typeof(T));
    }
    public bool IsShowUI(Type uiType)
    {
        return uiShowList.Contains(uiType);
    }

    public T TryGetShowUI<T>() where T : UIBase
    {
        UIBase uiBase = TryGetShowUI(typeof(T));
        if(uiBase != null)
            return uiBase as T;
        return null;
    }
    public UIBase TryGetShowUI(Type uiType)
    {
        if(IsShowUI(uiType))
        {
            if(uiCacheDic.TryGetValue(uiType,out UIBase showUi))
                return showUi;
        }
        return null;
    }

    #endregion

    #region --- Load ---

    private T GetUIPrefab<T>() where T : UIBase
    {
        UIBase uiPrefab = GetUIPrefab(typeof(T));
        return uiPrefab == null ? null : uiPrefab as T;
    }
    private UIBase GetUIPrefab(Type uiType)
    {
        if(uiPrefabDic.TryGetValue(uiType,out UIBase uiBase))
        {
            return uiBase;
        }

        UIBase uiPrefab = Resources.Load<UIBase>($"UIPrefab/{uiType.Name}");
        if(uiPrefab == null)
        {
            Debug.LogError("Load ui error, ui prefab is null : " + uiType.Name);
            return null;
        }

        uiPrefabDic[uiType] = uiPrefab;
        return uiPrefab;
    }

    private T LoadUI<T>() where T : UIBase
    {
        UIBase uiBase = LoadUI(typeof(T));
        return uiBase == null ? null : uiBase as T;
    }
    private UIBase LoadUI(Type uiType)
    {
        if(uiCacheDic.ContainsKey(uiType))
        {
            HideUI(uiType,true);
        }

        UIBase uiPrefab = GetUIPrefab(uiType);
        if(uiPrefab == null)
            return null;

        UIPosition uiPosition;
        if(uiPrefab is UIPanelBase)
            uiPosition = UIPosition.Panel;
        else if(uiPrefab is UIPopupBase)
            uiPosition = UIPosition.Popup;
        else
            uiPosition = UIPosition.Bottom;

        Transform parentNode;
        uiRootDic.TryGetValue(uiPosition,out parentNode);
        if(parentNode == null)
            parentNode = transform;
        UIBase ui = Instantiate(uiPrefab,parentNode);

        AddAllButtonAndToggleClickEffect(ui.transform);
        SetAdaptionScreen(ui.transform);

        uiCacheDic[uiType] = ui;
        return ui;
    }

    #endregion

    #region --- Show ---

    public void ShowPanel<T>(params object[] args) where T : UIPanelBase
    {
        StartCoroutine(ShowPanelDelay());

        IEnumerator ShowPanelDelay()
        {
            SetCanvasRaycastEnable(false);
            yield return null;

            float hideTime = -1;
            for(int i = 0; i < panelOrderList.Count; i++)
            {
                if(IsShowUI(panelOrderList[i]))
                {
                    float tempTime = HideUI(panelOrderList[i],false);
                    hideTime = Mathf.Max(hideTime,tempTime);
                }
            }
            if(hideTime > 0)
                yield return new WaitForSeconds(hideTime);
            else
                yield return null;

            Type showType = typeof(T);
            float showTime = ShowUI(showType,args);

            if(panelOrderList.LastOrDefault() != showType)
                panelOrderList.Add(showType);

            if(showTime > 0)
                yield return new WaitForSeconds(showTime);
            else
                yield return null;

            SetCanvasRaycastEnable(true);
        }
    }

    public float ShowPopup<T>(params object[] args) where T : UIPopupBase
    {
        return ShowUI<T>(args);
    }

    private float ShowUI<T>(params object[] args) where T : UIBase
    {
        return ShowUI(typeof(T),args);
    }
    private float ShowUI(Type uiType,params object[] args)
    {
        float showTime = -1;
        UIBase uibase = null;
        if(uiCacheDic.TryGetValue(uiType,out uibase))
        {
            if(uibase != null)
            {
                //Refresh不会播动画，Show有动画
                if(uibase.isShow)
                    uibase.Refresh(args);
                else
                    showTime = uibase.Show(args);
            }
        }
        if(uibase == null)
        {
            uibase = LoadUI(uiType);
            if(uibase == null)
                return -1;
            showTime = uibase.Show(args);
        }

        if(!uiShowList.Contains(uiType))
            uiShowList.Add(uiType);

        uibase.transform.SetAsLastSibling();

        return showTime;
    }

    #endregion

    #region --- Hide ---

    public void HidePanel<T>(bool isDestroy = true) where T : UIPanelBase
    {
        HidePanel(typeof(T),isDestroy);
    }
    public void HidePanel(UIPanelBase panel,bool isDestroy = true)
    {
        HidePanel(panel.GetType(),isDestroy);
    }
    public void HidePanel(Type hideType,bool isDestroy = true)
    {
        StartCoroutine(HidePanelDelay());

        IEnumerator HidePanelDelay()
        {
            SetCanvasRaycastEnable(false);
            yield return null;

            float hideTime = HideUI(hideType,isDestroy);
            if(panelOrderList.Contains(hideType))
                panelOrderList.Remove(hideType);

            if(hideTime > 0)
                yield return new WaitForSeconds(hideTime);
            else
                yield return null;

            Type lastType;
            if(panelOrderList.Count > 0)
            {
                lastType = panelOrderList[panelOrderList.Count - 1];
            }
            else
            {
                lastType = typeof(UIMainPanel);
                panelOrderList.Add(lastType);
            }
            float showTime = ShowUI(lastType);

            if(showTime > 0)
                yield return new WaitForSeconds(showTime);
            else
                yield return null;

            SetCanvasRaycastEnable(true);
        }
    }

    public void HidePopup<T>(bool isDestroy = true) where T : UIPopupBase
    {
        HidePopup(typeof(T),isDestroy);
    }
    public void HidePopup(UIPopupBase popup,bool isDestroy = true)
    {
        HidePopup(popup.GetType(),isDestroy);
    }
    public void HidePopup(Type uiType,bool isDestroy = true)
    {
        StartCoroutine(HidePopupDelay());

        IEnumerator HidePopupDelay()
        {
            SetCanvasRaycastEnable(false);
            yield return null;

            float hideTime = HideUI(uiType,isDestroy);
            if(hideTime > 0)
                yield return new WaitForSeconds(hideTime);
            else
                yield return null;

            if(panelOrderList.Count > 0)
            {
                UIBase uiBase = TryGetShowUI(panelOrderList[panelOrderList.Count - 1]);
                if(uiBase != null)
                    uiBase.Refresh();
            }

            SetCanvasRaycastEnable(true);
        }
    }

    private float HideUI<T>(bool isDestroy = true) where T : UIBase
    {
        return HideUI(typeof(T),isDestroy);
    }
    private float HideUI(UIBase ui,bool isDestroy = true)
    {
        return HideUI(ui.GetType(),isDestroy);
    }
    private float HideUI(Type uiType,bool isDestroy = true)
    {
        if(uiShowList.Contains(uiType))
            uiShowList.Remove(uiType);

        if(uiCacheDic.TryGetValue(uiType,out UIBase uiBase))
        {
            if(isDestroy)
                uiCacheDic.Remove(uiType);
            if(uiBase != null)
                return uiBase.Hide(isDestroy);
        }
        return -1;
    }

    #endregion

    #region --- AddButtonClickSound ---

    private void AddAllButtonAndToggleClickEffect(Transform targetObj)
    {
        if(targetObj == null)
            return;

        Button[] buttons = targetObj.GetComponentsInChildren<Button>();
        for(int i = 0; i < buttons.Length; i++)
        {
            buttons[i].onClick.AddListener(PlayButtonSound);
        }

        Toggle[] toggles = targetObj.GetComponentsInChildren<Toggle>();
        for(int i = 0; i < toggles.Length; i++)
        {
            toggles[i].onValueChanged.AddListener(PlayToggleSound);
        }

        void PlayButtonSound()
        {
            AudioManager.Instance.PlaySoundOnce(AudioName.uiButtonName);
        }
        void PlayToggleSound(bool isOn)
        {
            AudioManager.Instance.PlaySoundOnce(AudioName.uiButtonName);
        }
    }

    #endregion

    #region --- 屏幕适配 ---

    private void SetAdaptionScreen(Transform uiItemRoot)
    {
        const string safeAreaNodeName = "SafeArea";

        if(uiItemRoot == null)
            return;

        int safeAreaOffset = (int)(Screen.height - Screen.safeArea.yMax);
        if(safeAreaOffset <= 0)
            return;

        Transform safeNode = uiItemRoot.Find(safeAreaNodeName);
        if(safeNode != null)
        {
            RectTransform rectTrans = safeNode.GetComponent<RectTransform>();
            if(rectTrans != null)
            {
                rectTrans.offsetMax = new Vector2(0,-safeAreaOffset);
            }
        }
    }

    #endregion

}
