using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EffectName
{
    public const string gridDissolveEffectName = "GridDissolve";
}

public class EffectController : MonoBehaviour
{

    public static EffectController Instance { get; private set; }

    private Dictionary<string,List<EffectItem>> effectWorkPoolDic = new Dictionary<string,List<EffectItem>>();
    private Dictionary<string,Queue<EffectItem>> effectIdlePoolDic = new Dictionary<string,Queue<EffectItem>>();
    private bool needRefreshHide = false;

    private void Awake()
    {
        Instance = this;
    }

    bool hasPlaying = false;
    private void Update()
    {
        if(needRefreshHide)
        {
            hasPlaying = false;

            foreach(var workList in effectWorkPoolDic.Values)
            {
                if(workList.Count > 0)
                {
                    for(int i = 0; i < workList.Count; i++)
                    {
                        if(workList[i].isPlaying)
                        {
                            hasPlaying = true;
                        }
                        else
                        {
                            EffectItem effectItem = workList[i];

                            effectIdlePoolDic.TryGetValue(effectItem.effectName,out var idleQueue);
                            if(idleQueue == null)
                                effectIdlePoolDic[effectItem.effectName] = idleQueue = new Queue<EffectItem>();

                            idleQueue.Enqueue(effectItem);
                            workList.RemoveAt(i);
                            return;
                        }
                    }
                }
            }
            if(!hasPlaying)
            {
                needRefreshHide = false;
            }
        }
    }

    public void Clear(bool destroyPool)
    {
        foreach(var item in effectWorkPoolDic)
        {
            var effectName = item.Key;
            var workList = item.Value;

            if(workList.Count > 0)
            {
                effectIdlePoolDic.TryGetValue(effectName,out var idleQueue);
                if(idleQueue == null)
                    effectIdlePoolDic[effectName] = idleQueue = new Queue<EffectItem>();

                for(int i = 0; i < workList.Count; i++)
                {
                    idleQueue.Enqueue(workList[i]);
                }

                workList.Clear();
            }
        }

        if(destroyPool)
        {
            foreach(var idleQueue in effectIdlePoolDic.Values)
            {
                while(idleQueue.Count > 0)
                {
                    EffectItem effectItem = idleQueue.Dequeue();
                    Destroy(effectItem.gameObject);
                }
            }
        }
    }

    public void Preload(string effectName,int count)
    {
        EffectItem prefab = Resources.Load<EffectItem>($"Effect/{effectName}");
        if(prefab == null)
        {
            Debug.LogError($"{effectName} : effect prefab == null");
            return;
        }
        effectIdlePoolDic.TryGetValue(effectName,out var idleQueue);
        if(idleQueue == null)
            effectIdlePoolDic[effectName] = idleQueue = new Queue<EffectItem>();
        for(int i = 0; i < count; i++)
        {
            EffectItem effectItem = Instantiate(prefab,transform);
            idleQueue.Enqueue(effectItem);
        }
    }

    #region --- Show Hide ---

    public EffectItem ShowEffect(string effectName,Transform parentNode,Vector3? direction = null,bool? isLoop = null)
    {
        if(string.IsNullOrEmpty(effectName))
            return null;
        EffectItem effectItem = GetEmptyEffectItem(effectName,parentNode,Vector3.zero,direction,Space.Self);
        if(effectItem != null)
            effectItem.Show(isLoop);
        needRefreshHide = true;
        return effectItem;
    }

    public EffectItem ShowEffect(string effectName,Vector3 position,Vector3? direction = null,bool? isLoop = null)
    {
        if(string.IsNullOrEmpty(effectName))
            return null;
        EffectItem effectItem = GetEmptyEffectItem(effectName,transform,position,direction,Space.World);
        if(effectItem != null)
            effectItem.Show(isLoop);
        needRefreshHide = true;
        return effectItem;
    }

    //------

    public void HideEffect(string effectName)
    {
        if(effectWorkPoolDic.TryGetValue(effectName,out var workList))
        {
            if(workList.Count > 0)
            {
                effectIdlePoolDic.TryGetValue(effectName,out var idleQueue);
                if(idleQueue == null)
                    effectIdlePoolDic[effectName] = idleQueue = new Queue<EffectItem>();

                for(int i = 0; i < workList.Count; i++)
                {
                    workList[i].Hide();
                    idleQueue.Enqueue(workList[i]);
                }
                workList.Clear();
            }
        }
    }

    public void HideEffect(EffectItem effectItem)
    {
        if(effectItem == null)
            return;

        if(effectItem.isPlaying)
            effectItem.Hide();

        if(effectWorkPoolDic.TryGetValue(effectItem.effectName,out var workList))
        {
            if(workList.Contains(effectItem))
                workList.Remove(effectItem);
        }

        Debug.LogWarning(workList.Count);

        effectIdlePoolDic.TryGetValue(effectItem.effectName,out var idleQueue);
        if(idleQueue == null)
            effectIdlePoolDic[effectItem.effectName] = idleQueue = new Queue<EffectItem>();
        if(!idleQueue.Contains(effectItem))
            idleQueue.Enqueue(effectItem);

        Debug.LogWarning(idleQueue.Count);

    }

    #endregion

    #region --- Pool ---

    private EffectItem GetEmptyEffectItem(string effectName,Transform parentNode,Vector3 position,Vector3? direction,Space space)
    {
        if(string.IsNullOrEmpty(effectName))
            return null;

        EffectItem effectItem = null;

        if(effectIdlePoolDic.TryGetValue(effectName,out var effectIdleQueue))
        {
            if(effectIdleQueue.Count > 0)
            {
                effectItem = effectIdleQueue.Dequeue();

                if(effectItem.transform.parent != parentNode)
                    effectItem.transform.SetParent(parentNode);

                if(space == Space.World)
                {
                    effectItem.transform.position = position;
                    if(direction.HasValue)
                        effectItem.transform.eulerAngles = direction.Value;
                }
                else
                {
                    effectItem.transform.localPosition = position;
                    if(direction.HasValue)
                        effectItem.transform.localEulerAngles = direction.Value;
                }
            }
        }

        if(effectItem == null)
        {
            EffectItem prefab = Resources.Load<EffectItem>($"Effect/{effectName}");
            if(prefab == null)
            {
                Debug.LogError($"{effectName} : effect prefab == null");
                return null;
            }

            if(space == Space.World)
            {
                if(direction.HasValue)
                    effectItem = Instantiate(prefab,position,Quaternion.Euler(direction.Value),parentNode);
                else
                    effectItem = Instantiate(prefab,position,Quaternion.identity,parentNode);
            }
            else
            {
                effectItem = Instantiate(prefab,parentNode);
                effectItem.transform.localPosition = position;
                if(direction.HasValue)
                    effectItem.transform.localEulerAngles = direction.Value;
            }
        }

        effectWorkPoolDic.TryGetValue(effectName,out var effectWorkList);
        if(effectWorkList == null)
            effectWorkPoolDic[effectName] = effectWorkList = new List<EffectItem>();
        effectWorkList.Add(effectItem);

        return effectItem;
    }

    #endregion

}
