package com.example.petscoffee.customview.layoutmanager

import android.graphics.Rect
import android.os.Build
import android.util.Log
import android.util.SparseArray
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.RecyclerView

/**
 * description ： 练习写的layoutManager,主要是为了学习关于rv的viewHolder复用机制
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/3/16 16:42
 */
class MyLayoutManager : RecyclerView.LayoutManager() {
    private var visibleCount = 0//可见item数
    private var itemHeight = 0
    private var itemWidth = 0
    private val itemRect = SparseArray<Rect>()
    var sumDx = 0
    private var mTotalWidth = 0


    override fun generateDefaultLayoutParams(): RecyclerView.LayoutParams {
        return RecyclerView.LayoutParams(
            RecyclerView.LayoutParams.WRAP_CONTENT,
            RecyclerView.LayoutParams.WRAP_CONTENT
        )
    }

    @RequiresApi(Build.VERSION_CODES.S)
    override fun onLayoutChildren(recycler: RecyclerView.Recycler, state: RecyclerView.State) {
        detachAndScrapAttachedViews(recycler)
        //随便获取一个view,测量宽高
        val view = recycler.getViewForPosition(0)
        measureChildWithMargins(view, 0, 0)
        itemWidth = getDecoratedMeasuredWidth(view)
        itemHeight = getDecoratedMeasuredHeight(view)
        visibleCount = width / getInterval()
        var offsetX = getStartDx()
        for (i in 0 until itemCount) {//获取所有item的rect，并存入itemRect
            val rect = Rect(offsetX, 0, offsetX + itemWidth, itemHeight)
            itemRect[i] = rect
            offsetX += getInterval()
        }
        mTotalWidth = maxOf(offsetX, width)
        for (i in 0 until visibleCount) {
            val rect = itemRect[i]
            val view = recycler.getViewForPosition(i)
            addView(view)
            measureChildWithMargins(view, 0, 0)
            layoutDecorated(view, rect.left, rect.top, rect.right, rect.bottom)
        }
    }

    override fun canScrollHorizontally(): Boolean {
        return true
    }

    override fun scrollHorizontallyBy(
        dx: Int,
        recycler: RecyclerView.Recycler,
        state: RecyclerView.State
    ): Int {
        var travel = dx//实际上将要移动的距离
        if (sumDx + dx < 0) {
            travel = -sumDx
        } else if (sumDx + dx > mTotalWidth - width) {
            travel = mTotalWidth - width - sumDx
        }
        val visibleRect = getVisibleRect(travel)
        for (i in childCount - 1 downTo 0) {//回收看不到的view
            val view = getChildAt(i)
            var position = getPosition(view!!)
            val rect = itemRect[position]
            if (!Rect.intersects(rect, visibleRect)) {
                removeAndRecycleView(view, recycler)
            }
        }
        val lastChild = getChildAt(childCount - 1)
        val firstChild = getChildAt(0)
        if (travel >= 0) {//手指从右往左，右滑
            val lastPosition =
                getPosition(lastChild!!) + 1//可见的最后一个item的后一个（如果不+1则会重复加载最后一个可见的item,下同理
            Log.d("layoutM", "${lastPosition}")
            for (position in lastPosition until itemCount) {
                insertView(position, recycler, visibleRect, true)
            }
        } else {
            val maxPosition = getPosition(firstChild!!) - 1
            if (maxPosition >= 0) {
                for (position in maxPosition downTo 0) {
                    insertView(position, recycler, visibleRect, false)
                }
            }
        }
        sumDx += travel
        offsetChildrenHorizontal(-travel)
        return travel
    }

    private fun insertView(
        position: Int,
        recycler: RecyclerView.Recycler,
        visibleRect: Rect,
        isRight: Boolean
    ) {
        val rect = itemRect[position]
        Log.d("testTag", "${position},${visibleRect.left}")
        if (Rect.intersects(rect, visibleRect)) {
            val view = recycler.getViewForPosition(position)
            if (isRight) addView(view) else addView(view, 0)//根据滑动方向增加view
            measureChildWithMargins(view, 0, 0)
            layoutDecoratedWithMargins(
                view,
                rect.left - sumDx,
                rect.top,
                rect.right - sumDx,
                rect.bottom
            )
        }
    }

    private fun getVisibleRect(travel: Int): Rect {
        return Rect(sumDx + travel, 0, sumDx + width + travel, height)
    }

    private fun getInterval() = itemWidth / 2

    private fun getStartDx() = width / 2 - getInterval() / 2//让item处于屏幕中央

    fun getCenterPosition(): Int {
        var center = sumDx / getInterval()
        val more = sumDx % getInterval()
        if (getInterval() < more * 0.5) center++
        return center
    }

    fun getFirstPosition(): Int = if (childCount > 0) {
        val view = getChildAt(0)
        getPosition(view!!)
    } else 0
}