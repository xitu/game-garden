package com.example.petscoffee.customview.viewGroup

import android.content.Context
import android.graphics.Canvas
import android.util.AttributeSet
import android.view.View
import android.view.ViewGroup
import android.widget.Scroller
import androidx.core.view.*
import androidx.recyclerview.widget.RecyclerView
import com.example.petscoffee.customview.PetView
import kotlin.math.roundToInt

/**
 * description ： TODO:类的作用
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/10 15:31
 */
class MyRefreshLayout(context: Context?, attrs: AttributeSet?) :
    ViewGroup(context, attrs), NestedScrollingParent2 {
    private var mNestedScrollingParentHelper = NestedScrollingParentHelper(this)
    private lateinit var mRv: RecyclerView//内部嵌套的rv
    private var offY = 0//滑动偏移的y
    private var lastScrollerY = 0
    private var mScrollState = ScrollState.NORMAL//当前滑动状态
    private var mScroller: Scroller? = null
    private val maxY = -400//下拉边界
    private var swipeRefreshListener: (() -> Unit)? = null
    private lateinit var mLoadingView: PetView


    override fun generateLayoutParams(attrs: AttributeSet?): LayoutParams {
        return MarginLayoutParams(context, attrs)
    }

    override fun generateDefaultLayoutParams(): LayoutParams {
        return MarginLayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
        val measureWidth = MeasureSpec.getSize(widthMeasureSpec)
        var height = 0
        for (child in children) {
            measureChild(child, widthMeasureSpec, heightMeasureSpec)
            height += child.measuredHeight
        }
        setMeasuredDimension(measureWidth, height)
    }

    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
        for (child in children) {
            val lp = child.layoutParams as MarginLayoutParams
            val childHeight = measuredHeight + child.marginTop + child.marginBottom
            val childWidth = child.measuredWidth + lp.leftMargin + lp.rightMargin
            /*if (child is PetView) {
                child.layout(measuredWidth, -20, childWidth + measuredWidth, childHeight - 20)
            }*/
            child.layout(0, 0, childWidth, childHeight)
        }
    }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)

    }

    override fun onStartNestedScroll(child: View, target: View, axes: Int, type: Int): Boolean {
        if (child is RecyclerView) {
            mRv = child
        } else if (child is PetView) {
            mLoadingView = child
        } else {
            if (child is ViewGroup) {
                for (mChild in child.children) {
                    onStartNestedScroll(mChild, target, axes, type)
                }
            }
        }
        return isEnabled
    }

    override fun onNestedScrollAccepted(child: View, target: View, axes: Int, type: Int) {
        mNestedScrollingParentHelper.onNestedScrollAccepted(child, target, axes, type)
    }

    override fun onNestedPreScroll(target: View, dx: Int, dy: Int, consumed: IntArray, type: Int) {
        if (dy>0) {
            isEnabled = false
            return
        }
        val dampingY = dampedScroll(dy)
        if (offY+dampingY > maxY) {
            if (!mRv.canScrollVertically(-1) && dy < 0) {//滑动到顶部且继续往下拉
                mScrollState = ScrollState.PULL
                scrollBy(0, dampingY)
                offY += dampingY
                consumed[1] = dy
            } else if (!mRv.canScrollVertically(-1) && dy > 0 && mScrollState == ScrollState.PULL) {
                //下拉时又往上拉时消耗掉所有滑动距离，避免子rv滚动
                if (offY < 0) {
                    dampedScroll(dy)
                    scrollBy(0, dampingY)
                }
                consumed[1] = dy
            }
        } else {
            mScrollState = ScrollState.Ready//拉到极限，可以刷新
        }
    }

    override fun onNestedScroll(
        target: View,
        dxConsumed: Int,
        dyConsumed: Int,
        dxUnconsumed: Int,
        dyUnconsumed: Int,
        type: Int
    ) {
    }

    override fun onStopNestedScroll(target: View, type: Int) {
        mNestedScrollingParentHelper.onStopNestedScroll(target, type)
        if (mScrollState == ScrollState.PULL) {
            lastScrollerY = 0
            mScroller = Scroller(context)
            mScroller?.startScroll(0, 0, 0, -offY, 1000)
            offY = 0
            invalidate()
            mScrollState = ScrollState.NORMAL
        } else if (mScrollState == ScrollState.Ready) {
            lastScrollerY = 0
            mScroller = Scroller(context)
            mScroller?.startScroll(0, 0, 0, -offY, 1000)
            offY = 0
            mLoadingView.visibility = View.VISIBLE
            mLoadingView.jump()
            mLoadingView.love()
            invalidate()
            swipeRefreshListener?.invoke()
            mScrollState = ScrollState.NORMAL
        }
    }

    override fun computeScroll() {//上拉结束时开始回到原位
        super.computeScroll()
        mScroller?.let {
            if (mScroller!!.computeScrollOffset()) {
                scrollBy(0, mScroller!!.currY - lastScrollerY)
                lastScrollerY = mScroller!!.currY
                invalidate()
            }
        }
    }

    private fun dampedScroll(dy: Int):Int {//阻尼滚动，根据偏移位置改变滑动系数
        val i = (Math.abs(maxY - scrollY) * 0.01)
        return  if (i < 2) dy else (dy / i).roundToInt()
    }

    fun swipeRefreshListener(swipeRefreshListener: () -> Unit) {
        this.swipeRefreshListener = swipeRefreshListener
    }

    enum class ScrollState {
        NORMAL,
        PULL,
        RELEASE,
        Ready
    }
}