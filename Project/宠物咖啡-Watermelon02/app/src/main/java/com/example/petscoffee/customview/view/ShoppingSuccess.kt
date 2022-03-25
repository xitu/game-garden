package com.example.petscoffee.customview

import android.animation.ValueAnimator
import android.app.Activity
import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.view.View

class ShoppingSuccess(context: Context?, attrs: AttributeSet?) : View(context, attrs) {
    private val paint = Paint()
    private val path = Path()
    private var pathMeasure: PathMeasure
    private var drawPath = Path()
    private var currentV = 0f
    private var mNext = false
    private val animator = ValueAnimator.ofFloat(0f, 2f)

    init {
        setLayerType(LAYER_TYPE_SOFTWARE, null)
        paint.apply {
            color = Color.parseColor("#3F51B5")
            style = Paint.Style.STROKE
            strokeWidth = 8f
        }
        path.apply {
            addCircle(208f, 208f, 200f, Path.Direction.CW)
            moveTo(128f, 208f)
            lineTo(208f, 288f)
            lineTo(288f, 88f)
        }
        pathMeasure = PathMeasure(path, false)

        animator.apply {
            addUpdateListener {
                currentV = it.animatedValue as Float
                postInvalidate()
            }
            repeatCount = 0
            duration = 1000
        }
        (context as Activity).runOnUiThread { animator.start() }
    }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        if (currentV < 1) {
            pathMeasure.getSegment(0f, currentV * pathMeasure.length, drawPath, true)
        } else {
            if (!mNext) {
                mNext = true
                pathMeasure.getSegment(0f, pathMeasure.length, drawPath, true)
                pathMeasure.nextContour()
            }
            pathMeasure.getSegment(0f, (currentV - 1) * pathMeasure.length, drawPath, true)
        }
        canvas?.drawPath(drawPath, paint)
    }

}