package com.example.petscoffee.customview

import android.animation.Animator
import android.animation.Animator.AnimatorListener
import android.animation.ValueAnimator
import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.animation.AccelerateInterpolator
import android.view.animation.BounceInterpolator
import android.view.animation.DecelerateInterpolator
import com.example.petscoffee.R
import kotlin.random.Random

class PlayablePetView(context: Context?, attrs: AttributeSet?) :
    androidx.appcompat.widget.AppCompatImageView(context!!, attrs) {//主界面可抚摸，移动的petView
    private var mTop = 0
    private var right = true
    private var pX = 0f
    private val paint = Paint()
    private val srcBitmap = BitmapFactory.decodeResource(resources, R.drawable.love)
    private var bitmap = Bitmap.createBitmap(srcBitmap.copy(Bitmap.Config.ARGB_8888, true))
    private var loveHearts = arrayOfNulls<LoveHeart>(5)

    init {
        bitmap = Bitmap.createScaledBitmap(bitmap, 16, 16, true)
        paint.apply {
            color = Color.BLUE
            style = Paint.Style.FILL
        }
    }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        for (heart in loveHearts) {
            heart?.let { canvas?.drawBitmap(bitmap, heart.x, heart.y, paint) }
        }
    }

    fun jump(height: Int) {//一个宠物跳跃动画
        val valueAnimator = ValueAnimator.ofInt(0, -height, 0)
        valueAnimator.addUpdateListener {
            top = mTop + it.animatedValue as Int
        }
        valueAnimator.interpolator = BounceInterpolator()
        valueAnimator.repeatCount = 0
        valueAnimator.duration = 2000
        valueAnimator.start()
    }

    fun move() {
        val y = Random.nextInt(100).toFloat()
        val dx = if (right) {//判断移动方向
            pX += y * 0.6f
            if (pX > 1100) right = false
            y * 0.3f
        } else {
            pX += -y * 0.6f
            if (pX < -100) right = true
            -y * 0.3f
        }
        animate().scaleY(1.1f).translationXBy(dx).translationY(520-y).setDuration((y * 4.9).toLong())
            .setListener(object : AnimatorListener {
                override fun onAnimationStart(animation: Animator?) {

                }

                override fun onAnimationEnd(animation: Animator?) {//升高结束时进入该回调
                    animate().scaleY(0.9f).translationXBy(dx).translationY(520+y)
                        .setDuration((y * 4.9).toLong()).setListener(object : AnimatorListener {
                            override fun onAnimationStart(animation: Animator?) {
                            }

                            override fun onAnimationEnd(animation: Animator?) {//降落结束时进入该回调
                                move()
                            }

                            override fun onAnimationCancel(animation: Animator?) {
                            }

                            override fun onAnimationRepeat(animation: Animator?) {
                            }

                        }).interpolator = AccelerateInterpolator()
                }

                override fun onAnimationCancel(animation: Animator?) {
                }

                override fun onAnimationRepeat(animation: Animator?) {
                }
            }).interpolator = DecelerateInterpolator()
    }

    fun drop() {//生成该view时平移到地面
        this.animate().translationY(520f)
    }

    private fun love() {
        val number = Random.nextInt(5)
        var i = 0
        while (i < number) {
            val positionX = Random.nextInt(128).toFloat()
            val positionY = Random.nextInt(128).toFloat()
            val valueAnimator = ValueAnimator.ofFloat(200f)
            loveHearts[i] = LoveHeart(positionX, positionY)
            valueAnimator.setDuration(1000).addUpdateListener {
                val value = 160 - it.animatedValue as Float
                loveHearts[i]?.y = if (value > y) y else value
                invalidate()
            }
            valueAnimator.start()
            i++
        }
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        mTop = top
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {

        when (event?.action) {
            MotionEvent.ACTION_DOWN -> {
                this.animate().cancel()
                drop()
                return true
            }
            MotionEvent.ACTION_MOVE -> {
                love()
                move()
            }
        }
        return super.onTouchEvent(event)
    }

    class LoveHeart(var x: Float, var y: Float)
}