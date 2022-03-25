package com.example.petscoffee.customview.layoutmanager

import android.content.Context
import android.util.AttributeSet
import androidx.recyclerview.widget.RecyclerView

/**
 * description ： 配合MyLayoutManager的RV子类，为了实现横向重叠卡片一样的布局
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/3/17 21:45
 */
class RecyclerCoverFlowView(context: Context, attrs: AttributeSet?) : RecyclerView(context, attrs) {
    init {
        isChildrenDrawingOrderEnabled = true
    }

    override fun getChildDrawingOrder(childCount: Int, i: Int): Int {
        val layoutManager = getConvertLayoutManager()
        val centerPosition = layoutManager.getCenterPosition() - layoutManager.getFirstPosition()
        return if (i == centerPosition) {
            childCount - 1
        } else if (i < centerPosition) {
            i
        } else {
            centerPosition + childCount - 1 - i
        }
    }

    private fun getConvertLayoutManager(): MyLayoutManager {
        return layoutManager as MyLayoutManager
    }

}