package com.example.petscoffee.customview.behavior

import android.content.Context
import android.util.AttributeSet
import android.view.View
import android.widget.LinearLayout
import androidx.coordinatorlayout.widget.CoordinatorLayout
import androidx.core.view.ViewCompat
import com.example.petscoffee.R
import com.example.petscoffee.customview.viewGroup.MyRefreshLayout

/**
 * description ： 在coordinatorLayout中让rv能随着appBarLayout的位置变化而改变自己的位置
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/11 16:17
 */
class RefreshBehavior(context: Context, attrs: AttributeSet) :
    CoordinatorLayout.Behavior<MyRefreshLayout>(context, attrs) {
    private var headerHeight: Int = 0

    override fun onLayoutChild(
        parent: CoordinatorLayout,
        child: MyRefreshLayout,
        layoutDirection: Int
    ): Boolean {
        parent.onLayoutChild(child, layoutDirection)
        headerHeight = parent.findViewById<LinearLayout>(R.id.activity_message_appBarLayout).height
        child.offsetTopAndBottom(headerHeight)
        return true
    }

    override fun onStartNestedScroll(
        coordinatorLayout: CoordinatorLayout,
        child: MyRefreshLayout,
        directTargetChild: View,
        target: View,
        axes: Int,
        type: Int
    ): Boolean {
        return (axes and ViewCompat.SCROLL_AXIS_VERTICAL) != 0
    }

    override fun onNestedPreScroll(
        coordinatorLayout: CoordinatorLayout,
        child: MyRefreshLayout,
        target: View,
        dx: Int,
        dy: Int,
        consumed: IntArray,
        type: Int
    ) {
        super.onNestedPreScroll(coordinatorLayout, child, target, dx, dy, consumed, type)
        if (dy > 0) {//手指向上滑动
            val newTranslation = child.translationY - dy
            if (newTranslation >= -headerHeight) {
                consumed[1] = dy
                child.translationY = newTranslation
            } else {
                consumed[1] = (headerHeight + child.translationY).toInt()
                child.translationY = -headerHeight.toFloat()
            }
        }
    }

    override fun onNestedScroll(
        coordinatorLayout: CoordinatorLayout,
        child: MyRefreshLayout,
        target: View,
        dxConsumed: Int,
        dyConsumed: Int,
        dxUnconsumed: Int,
        dyUnconsumed: Int,
        type: Int,
        consumed: IntArray
    ) {
        super.onNestedScroll(
            coordinatorLayout,
            child,
            target,
            dxConsumed,
            dyConsumed,
            dxUnconsumed,
            dyUnconsumed,
            type,
            consumed
        )
        if (dyUnconsumed < 0) {
            child.isEnabled = child.translationY.toInt() == 0
            val newTranslation = child.translationY - dyUnconsumed
            if (newTranslation <= 0 && newTranslation > -headerHeight) {
                child.translationY = newTranslation
            } else {
                child.translationY = 0f
            }
        }
    }
}