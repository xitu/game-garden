package com.example.petscoffee.customview.slidedelete

import android.graphics.Canvas
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView
import java.util.*

/**
 * description ： 好友界面侧滑删除实现ItemTouchHelper
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/3/14 08:50
 */
class FriendCallback(val data: ArrayList<*>, val adapter:RecyclerView.Adapter<*>) : ItemTouchHelper.Callback() {
    private val maxSwipeWidth = 220//最大侧滑宽度
    private var swipeFlag = ItemTouchHelper.LEFT
    private var lastViewHolder: RecyclerView.ViewHolder? = null
    private var pullEnd = false

    override fun getMovementFlags(
        recyclerView: RecyclerView,
        viewHolder: RecyclerView.ViewHolder
    ): Int {
        lastViewHolder?.let {//当拉动已经被拉出的item时，将已经被拉出的item归位（避免viewHolder复用而出现问题）
            if (pullEnd && lastViewHolder != viewHolder) {
                lastViewHolder!!.itemView.scrollTo(0, 0)
                lastViewHolder = null
                pullEnd = false
                swipeFlag = ItemTouchHelper.LEFT
            }
        }

        val dragFlag = ItemTouchHelper.UP or ItemTouchHelper.DOWN
        return makeMovementFlags(dragFlag, swipeFlag)
    }

    override fun onMove(
        recyclerView: RecyclerView,
        viewHolder: RecyclerView.ViewHolder,
        target: RecyclerView.ViewHolder
    ): Boolean {
        val fromPosition = viewHolder.absoluteAdapterPosition
        val toPosition = target.absoluteAdapterPosition
        Collections.swap(data, fromPosition, toPosition)
        adapter.notifyItemMoved(fromPosition, toPosition)
        return true
    }

    override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {

    }

    override fun getSwipeEscapeVelocity(defaultValue: Float): Float {
        return Float.MAX_VALUE
    }

    override fun onChildDraw(
        c: Canvas,
        recyclerView: RecyclerView,
        viewHolder: RecyclerView.ViewHolder,
        dX: Float,
        dY: Float,
        actionState: Int,
        isCurrentlyActive: Boolean
    ) {
        super.onChildDraw(c, recyclerView, viewHolder, 0f, dY, actionState, isCurrentlyActive)
        if (swipeFlag == ItemTouchHelper.LEFT) {
            if (isCurrentlyActive) {
                viewHolder.itemView.scrollTo(-dX.toInt(), 0)
            }
            if (-dX > maxSwipeWidth) {
                viewHolder.itemView.scrollTo(maxSwipeWidth, 0)
            }
        } else {
            if (isCurrentlyActive) {
                viewHolder.itemView.scrollTo(maxSwipeWidth - dX.toInt(), 0)
            }
            if (dX > maxSwipeWidth) {
                viewHolder.itemView.scrollTo(0, 0)
            }
        }
    }

    override fun clearView(recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder) {
        super.clearView(recyclerView, viewHolder)
        //给swipeFlag重新赋值，使其能在向左拉到底时能往右拉回
        if (viewHolder.itemView.scrollX < maxSwipeWidth / 2) {
            viewHolder.itemView.scrollTo(0, 0)
            swipeFlag = ItemTouchHelper.LEFT
        } else {
            viewHolder.itemView.scrollTo(maxSwipeWidth, 0)
            swipeFlag = ItemTouchHelper.RIGHT
            pullEnd = true
            lastViewHolder = viewHolder
            getMovementFlags(recyclerView, viewHolder)
        }
    }
}