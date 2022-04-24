using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TetriGridItem : MonoBehaviour
{
    public int groupIndex { get; private set; }
    public Vector2Int localCoord{ get; private set; }

    public void Init(int index,Vector2Int coord)
    {
        groupIndex = index;
        localCoord = coord;
    }
}
