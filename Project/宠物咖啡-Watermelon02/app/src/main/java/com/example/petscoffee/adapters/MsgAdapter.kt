package com.example.petscoffee.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.petscoffee.R
import com.example.petscoffee.bean.Message

class MsgAdapter(
    private val messageList: ArrayList<Message>//传入context以延迟启动activity
) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    class LeftViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val leftMsg: TextView = itemView.findViewById(R.id.msg_left)
    }

    class RightViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val rightMsg: TextView = itemView.findViewById(R.id.msg_right)
    }

    override fun getItemViewType(position: Int): Int {//返回当前position对应的viewType
        val message = messageList[position]
        return message.msgType
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder =
//根据viewType加载布局
        if (viewType == Message.LEFT_MSG) {
            val leftView =
                LayoutInflater.from(parent.context).inflate(R.layout.item_msg_left, parent, false)
            LeftViewHolder(leftView)
        } else {
            val rightView =
                LayoutInflater.from(parent.context).inflate(R.layout.item_msg_right, parent, false)
            RightViewHolder(rightView)
        }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val msg = messageList[position]
        when (holder) {
            is LeftViewHolder -> holder.leftMsg.text = msg.content
            is RightViewHolder -> holder.rightMsg.text = msg.content
        }
    }

    override fun getItemCount(): Int {
        return messageList.size
    }

    override fun onViewAttachedToWindow(holder: RecyclerView.ViewHolder) {//当插入消息时刷新消息列表
        super.onViewAttachedToWindow(holder)
    }
}