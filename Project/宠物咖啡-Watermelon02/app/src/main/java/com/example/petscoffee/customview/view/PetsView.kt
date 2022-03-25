package com.example.petscoffee.customview

import android.animation.ValueAnimator
import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.animation.BounceInterpolator
import androidx.core.animation.doOnEnd
import androidx.core.animation.doOnStart
import com.example.petscoffee.R
import kotlin.random.Random

class PetView(context: Context?, attrs: AttributeSet?) :
    androidx.appcompat.widget.AppCompatImageView(context!!, attrs) {
    private var isMoved = false
    private var mTop = 0
    private val paint = Paint()
    private var loveHearts = arrayOfNulls<LoveHeart>(10)
    private var isJumping = false
    private var isLoving = false
    private val srcBitmap = BitmapFactory.decodeResource(resources, R.drawable.love)
    private var bitmap = Bitmap.createBitmap(srcBitmap.copy(Bitmap.Config.ARGB_8888, true))
    private var listener: (() -> Unit)? = null

    init {
        jump()
        bitmap = Bitmap.createScaledBitmap(bitmap, 64, 64, true)
        paint.apply {
            color = Color.RED
            style = Paint.Style.FILL
        }
    }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        for (heart in loveHearts) {
            heart?.let { canvas?.drawBitmap(bitmap, heart.x, heart.y, paint) }
        }
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        mTop = top
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {
        when (event?.action) {
            MotionEvent.ACTION_DOWN -> {
                parent.requestDisallowInterceptTouchEvent(true)
                return true
            }
            MotionEvent.ACTION_MOVE -> {
                if ((event.rawX < 350 || event.rawX > 450) && (event.rawY > 350 || event.rawY < 450)) {
                    isMoved = true
                    jump()
                    love()
                }
            }
            MotionEvent.ACTION_UP -> {
                if (!isMoved) {
                    listener?.invoke()
                }
            }
        }
        return super.onTouchEvent(event)
    }

    fun jump() {//一个宠物跳跃动画
        if (!isJumping) {//不在跳跃状态中则跳跃
            isJumping = true
            val valueAnimator = ValueAnimator.ofInt(0, -100, 0)
            valueAnimator.addUpdateListener {
                top = mTop + it.animatedValue as Int
            }
            valueAnimator.interpolator = BounceInterpolator()
            valueAnimator.repeatCount = 0
            valueAnimator.duration = 2000
            valueAnimator.doOnEnd {
                isJumping = false
                isMoved = false
            }
            valueAnimator.start()
        }
    }

    fun love() {//抚摸爱心动画
        if (!isLoving) {
            val number = Random.nextInt(10)
            var i = 0
            while (i < number) {
                val positionX = Random.nextInt(0, 480).toFloat()
                val positionY = Random.nextInt(500).toFloat()
                val valueAnimator = ValueAnimator.ofFloat(1400f)
                loveHearts[i] = LoveHeart(positionX, 500f)
                valueAnimator.setDuration(2000).addUpdateListener {
                    val value = 1000 - it.animatedValue as Float
                    loveHearts[i]?.y = value
                    invalidate()
                }
                if (i == 8) {
                    valueAnimator.doOnStart { isLoving = true }
                    valueAnimator.doOnEnd {
                        isLoving = false
                        isMoved = false
                    }
                }
                valueAnimator.start()
                i++
            }

        }
    }

    fun clickListener(listener: () -> Unit) {//点击监听
        this.listener = listener
    }

    class LoveHeart(var x: Float, var y: Float)//爱心位置
}