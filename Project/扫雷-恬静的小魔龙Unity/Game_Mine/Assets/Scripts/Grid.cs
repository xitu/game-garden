using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Grid : MonoBehaviour
{
    // 创建一个二维数组网格
    public static int w = 10; // 网格的长
    public static int h = 10; // 网格的高
    public static Element[,] elements = new Element[w, h];

    // 发现所有地雷
    public static void uncoverMines()
    {
        foreach (Element elem in elements)
            if (elem.mine)
                elem.loadTexture(0);
    }

    // 看看这个坐标上是否有地雷
    public static bool mineAt(int x, int y)
    {
        // 控制坐标范围
        if (x >= 0 && y >= 0 && x < w && y < h)
            return elements[x, y].mine;
        return false;
    }

    // 为一个元素计算相邻的地雷 8个方向
    public static int adjacentMines(int x, int y)
    {
        //计数器
        int count = 0;
        if (mineAt(x, y + 1)) ++count; // 上
        if (mineAt(x + 1, y + 1)) ++count; // 右上
        if (mineAt(x + 1, y)) ++count; // 右
        if (mineAt(x + 1, y - 1)) ++count; // 右下
        if (mineAt(x, y - 1)) ++count; // 下
        if (mineAt(x - 1, y - 1)) ++count; // 左下
        if (mineAt(x - 1, y)) ++count; // 做
        if (mineAt(x - 1, y + 1)) ++count; // 左上
        //返回相邻的地雷数量
        return count;
    }

    // 泛洪算法填充空元素
    public static void FFuncover(int x, int y, bool[,] visited)
    {
        if (x >= 0 && y >= 0 && x < w && y < h)
        {
            // 判断是否遍历过
            if (visited[x, y])
                return;

            // 发现元素
            elements[x, y].loadTexture(adjacentMines(x, y));

            // 发现地雷
            if (adjacentMines(x, y) > 0)
                return;

            // 设置遍历标识
            visited[x, y] = true;

            // 递归
            FFuncover(x - 1, y, visited);
            FFuncover(x + 1, y, visited);
            FFuncover(x, y - 1, visited);
            FFuncover(x, y + 1, visited);
        }
    }

    // 是否找到所有地雷

    public static bool isFinished()
    {
        // 遍历数组 找到没有被地雷覆盖的元素
        foreach (Element elem in elements)
            if (elem.isCovered() && !elem.mine)
                return false;
        // 没有找到 => 全是地雷 => 游戏胜利.
        return true;
    }
}