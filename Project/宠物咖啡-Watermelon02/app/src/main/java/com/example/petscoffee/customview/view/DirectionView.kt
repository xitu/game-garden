package com.example.petscoffee.customview

import android.content.Context
import android.util.AttributeSet
import android.view.MotionEvent
import androidx.appcompat.widget.AppCompatImageView
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

/**
 * description ： 可拖动的floatingButton，注意为了解决在swipeRefreshLayout中的滑动冲突而导致的隐患
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/7 15:29
 */
class DirectionView(context: Context?, attrs: AttributeSet?) :
    AppCompatImageView(context!!, attrs) {
    private var screenW = 2000//屏幕宽度，在activity中设置
    private var screenH = 3000
    private var listener: (() -> Unit)? = null
    private var lastX = 0f
    private var lastY = 0f
    private var dx = 0
    private var dy = 0
    private var isMoved = false//是否有move标志位，绝对action_up后是否播放吸附动画

    override fun dispatchTouchEvent(event: MotionEvent?): Boolean {
        if (event?.action == MotionEvent.ACTION_DOWN) {
            if (parent.parent is SwipeRefreshLayout) {
                (parent.parent as SwipeRefreshLayout).isEnabled = false//为了在拖动按钮时不会导致冲突}
            }
        }
        return super.dispatchTouchEvent(event)
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {
        when (event?.action) {
            MotionEvent.ACTION_DOWN -> {
                lastX = event.rawX
                lastY = event.rawY
                //当view在onTouchEvent中消费了action_down，之后的action_move和action_up才会传到该view
                return true
            }
            MotionEvent.ACTION_MOVE -> {
                isMoved = true
                dx = (event.rawX - lastX).toInt()
                dy = (event.rawY - lastY).toInt()
                //防止超出屏幕
                if (event.rawX - measuredWidth / 2 < 0 || event.rawX + measuredWidth / 2 > screenW) return true
                if (event.rawY - measuredHeight / 2 < 0 || event.rawY > screenH) return true
                x += dx
                y += dy
                lastX = event.rawX
                lastY = event.rawY
                return true
            }
            MotionEvent.ACTION_UP -> {//ACTION_UP
                if (isMoved) {//若为true，则经过了拖动，执行吸附动画
                    if (lastX < rootView.width / 2) {//向左吸附
                        animate().x(0f)
                    } else {//向右
                        animate().xBy(screenW - width - x)
                    }
                    isMoved = false
                } else {//若为false，则为点击事件
                    listener?.invoke()
                }
                if (parent.parent is SwipeRefreshLayout) {
                    (parent.parent as SwipeRefreshLayout).isEnabled = true//恢复下拉刷新
                }

            }
        }
        return super.onTouchEvent(event)
    }

    fun clickListener(listener: () -> Unit) {//点击监听
        this.listener = listener
    }

    fun setScreenWH(width: Int, height: Int) {//传入屏幕宽高
        screenW = width
        screenH = height
    }
}