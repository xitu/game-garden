package com.example.petscoffee.customview

import android.animation.AnimatorSet
import android.animation.ValueAnimator
import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.view.animation.DecelerateInterpolator

class BloodBar(context: Context?, attrs: AttributeSet?) : View(context, attrs) {
    private val max = 10
    private var lastValue = 0
    private var value = 0
    private var paintBorder = Paint()
    private var paintContent = Paint()
    private var paintBackground = Paint()
    private var border = Rect(50, 10, 550, 60)
    private var content = Rect(50, 10, 0, 60)
    private var backGround = RectF(0f, 0f, 600f, 70f)

    init {
        paintBorder.color = Color.GRAY
        paintBorder.style = Paint.Style.STROKE
        paintBorder.strokeWidth = 2f
        paintContent.color = Color.parseColor("#afff00")
        paintContent.style = Paint.Style.FILL_AND_STROKE
        paintBackground.color = Color.parseColor("#f0f0f0")
        doAnimation()
    }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        canvas?.drawRoundRect(backGround, 10f, 10f, paintBackground)
        canvas?.drawRect(border, paintBorder)
        canvas?.drawRect(content, paintContent)
    }

    fun setValue(value: Int) {
        lastValue = this.value
        this.value = value
        Log.d("testTag", calculateColor(lastValue).toString())
        doAnimation()
    }

    private fun doAnimation() {
        val animatorSet = AnimatorSet()
        animatorSet.playTogether(getValueAnimator(), getColorAnimator())
        animatorSet.start()
    }

    private fun getColorAnimator(): ValueAnimator {
        val valueAnimator = ValueAnimator.ofArgb(calculateColor(lastValue), calculateColor(value))
        valueAnimator.addUpdateListener {
            paintContent.color = it.animatedValue as Int
        }
        valueAnimator.duration = 1000
        valueAnimator.repeatCount = 0
        valueAnimator.interpolator = DecelerateInterpolator()
        return valueAnimator
    }

    private fun getValueAnimator(): ValueAnimator {
        val valueAnimator =
            ValueAnimator.ofInt((500 * lastValue / max) + 50, (500 * value / max) + 50)
        valueAnimator.addUpdateListener {
            val length = it.animatedValue as Int
            content = Rect(50, 10, length, 60)
            postInvalidate()
        }
        valueAnimator.duration = 1000
        valueAnimator.repeatCount = 0
        valueAnimator.interpolator = DecelerateInterpolator()
        return valueAnimator
    }

    private fun calculateColor(value: Int): Int {
        val startColor = Color.parseColor("#ff0000")
        val startA = startColor.shr(24)
        val startR = startColor.shr(16) and 0xff
        val startG = startColor.shr(8) and 0xff
        val startB = startColor and 0xff
        val endColor = Color.parseColor("#00ff00")
        val endA = endColor.shr(24)
        val endR = endColor.shr(16) and 0xff
        val endG = endColor.shr(8) and 0xff
        val endB = endColor and 0xff
        return (startA + (value.toFloat() / max.toFloat()) * (endA - startA)).toInt().shl(24) or (startR + (value.toFloat() / max.toFloat()) * (endR - startR)).toInt().shl(
            16
        ) or (startG + (value.toFloat() / max.toFloat()) * (endG - startG)).toInt().shl(8) or (startB + (value.toFloat() / max.toFloat()) * (endB - startB)).toInt()
    }

}