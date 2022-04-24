using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

[Serializable]
public class GroupShape
{
    public bool[] fillArray = new bool[16];
}

[CreateAssetMenu(fileName = "GridGroupConfig",menuName = "GridGroupConfig")]
public class GridGroupConfig : ScriptableObject
{

    public List<GroupShape> groupFillList;
}
