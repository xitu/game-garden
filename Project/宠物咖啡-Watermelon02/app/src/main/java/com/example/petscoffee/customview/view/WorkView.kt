package com.example.petscoffee.customview

import android.animation.Keyframe
import android.animation.ObjectAnimator
import android.animation.PropertyValuesHolder
import android.animation.ValueAnimator
import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.View
import android.view.animation.BounceInterpolator
import com.example.petscoffee.R

class WorkView(context: Context, attrs: AttributeSet?) : View(context, attrs) {
    private val paint = Paint()
    private val path = Path()
    private lateinit var pathMeasure: PathMeasure
    private val processPath = Path()
    private var process = 0f
    private lateinit var increaseAnimator: ValueAnimator
    private lateinit var decreaseAnimator: ValueAnimator
    private lateinit var shakeAnimator: ObjectAnimator
    private var pic: Bitmap
    private lateinit var work: () -> Unit


    init {
        setLayerType(LAYER_TYPE_NONE, null)
        paint.apply {
            isAntiAlias = true
            color = Color.BLUE
            style = Paint.Style.STROKE
            strokeWidth = 6f
        }
        pic = Bitmap.createScaledBitmap(//缩小图片
            BitmapFactory.decodeResource(resources, R.drawable.work),
            80,
            80,
            true
        )

        path.apply {
            addCircle(
                90f + pic.width / 2,
                0f + pic.height / 2,
                pic.width / 2f + 20,
                Path.Direction.CW
            )
        }
        initShakeAnimator()
    }

    private fun initShakeAnimator() {
        val frame1 = Keyframe.ofFloat(0f, 0f)
        frame1.interpolator = BounceInterpolator()
        val frame2 = Keyframe.ofFloat(0.4f, 8f)
        val frame3 = Keyframe.ofFloat(0.6f, -8f)
        val frame4 = Keyframe.ofFloat(1f, 0f)
        frame4.interpolator = BounceInterpolator()
        val propertyValueHolder =
            PropertyValuesHolder.ofKeyframe("rotation", frame1, frame2, frame3, frame4)
        shakeAnimator = ObjectAnimator.ofPropertyValuesHolder(this, propertyValueHolder)
        shakeAnimator.apply {
            duration = 1000
            repeatCount = -1
            pivotX = 100f + 18f
        }
    }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        pathMeasure = PathMeasure(path, false)
        pathMeasure.getSegment(0f, pathMeasure.length * process, processPath, true)
        canvas?.drawPath(processPath, paint)
        canvas?.drawBitmap(pic, 90f, 0f, paint)
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {
        when (event?.action) {
            MotionEvent.ACTION_DOWN -> {
                increase(3000)
                return true
            }
            MotionEvent.ACTION_UP -> {
                decrease(3000)
            }
        }
        return super.onTouchEvent(event)
    }

    private fun increase(duration: Long) {
        increaseAnimator = ValueAnimator.ofFloat(process, 1f)
        increaseAnimator.addUpdateListener {
            process = it.animatedValue as Float
            if (process < 1) {
                invalidate()
            } else {
                decrease(1000)
            }
        }
        increaseAnimator.duration = (duration * (1 - process)).toLong()
        increaseAnimator.start()
        shakeAnimator.start()
    }

    private fun decrease(duration: Long) {
        increaseAnimator.pause()
        shakeAnimator.pause()
        if (process == 1f) {
            work()
            this.animate().rotationYBy(360f).duration = 500
        }
        decreaseAnimator = ValueAnimator.ofFloat(process, 0f)
        decreaseAnimator.addUpdateListener {
            process = it.animatedValue as Float
            processPath.rewind()
            invalidate()
        }
        decreaseAnimator.duration = (duration * process).toLong()
        decreaseAnimator.start()
    }

    fun setWork(work: () -> Unit) {
        this.work = work
    }
}
