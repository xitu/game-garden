package com.example.petscoffee.customview

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.util.AttributeSet
import com.bumptech.glide.Glide
import com.example.petscoffee.R

class WindowView(context: Context?, attrs: AttributeSet?) :androidx.appcompat.widget.AppCompatImageView(
    context!!, attrs){
    private val mPaint = Paint()
    private val windowPaint = Paint()
    init {
        mPaint.run {
            isAntiAlias = true
            color = Color.parseColor("#3F51B5")
            style = Paint.Style.FILL
            strokeWidth = 20f
            alpha = 40
        }
        windowPaint.run {
            color = Color.parseColor("#E8F6FF")
            style = Paint.Style.FILL
            strokeWidth = 10f
            alpha = 120
        }
    }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        Glide.with(this).load(R.drawable.mainpage_background_1).into(this)
        canvas?.drawCircle(width.toFloat()/2,height.toFloat()/2,height.toFloat()/2,mPaint)
        canvas?.drawLine(width/2f,0f,width/2f,height.toFloat(),windowPaint)
        canvas?.drawLine(0f,140f,width.toFloat(),140f,windowPaint)
        canvas?.drawLine(0f,390f,width.toFloat(),390f,windowPaint)
    }
}