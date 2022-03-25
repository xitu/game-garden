package com.example.petscoffee.customview.behavior

import android.content.Context
import android.util.AttributeSet
import android.view.View
import android.view.ViewGroup
import androidx.coordinatorlayout.widget.CoordinatorLayout
import com.example.petscoffee.customview.viewGroup.MyRefreshLayout

/**
 * description ： TODO:类的作用
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/3/20 10:03
 */
class TitleBehavior(context: Context?, attrs: AttributeSet?) :
    CoordinatorLayout.Behavior<ViewGroup>(context, attrs) {
    override fun layoutDependsOn(
        parent: CoordinatorLayout,
        child: ViewGroup,
        dependency: View
    ): Boolean {
        return dependency is MyRefreshLayout
    }

    override fun onDependentViewChanged(
        parent: CoordinatorLayout,
        child: ViewGroup,
        dependency: View
    ): Boolean {
        child.translationY = dependency.translationY
        return true
    }
}