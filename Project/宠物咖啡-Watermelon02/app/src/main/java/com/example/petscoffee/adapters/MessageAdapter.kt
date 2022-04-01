package com.example.petscoffee.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.RecyclerView
import com.example.petscoffee.databinding.ItemMessagesFooterBinding
import com.example.petscoffee.databinding.ItemMessagesNormalBinding
import com.example.petscoffee.bean.friends.Messages
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * description ： MainActivity上的留言板对应的adapter,实现上拉加载更多
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/5 10:01
 */
class MessageAdapter(val messages: ArrayList<Messages>, val context: AppCompatActivity) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    private val normalHolder = 0//viewType标志
    private val footerHolder = 1
    var hasMore = true // 变量，是否有更多数据
    var fadeTips = false // 变量，是否隐藏了底部的提示


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return if (viewType == normalHolder) {
            val binding =
                ItemMessagesNormalBinding.inflate(LayoutInflater.from(parent.context), null, false)
            NormalViewHolder(binding)
        } else {
            val binding =
                ItemMessagesFooterBinding.inflate(LayoutInflater.from(parent.context), null, false)
            FooterViewHolder(binding)
        }
    }


    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder) {
            is FooterViewHolder -> {
                holder.binding.itemMessagesFooterTips.visibility = View.VISIBLE//将加载 footer 设置为可见
                if (hasMore) {
                    holder.binding.itemMessagesFooterTips.text = "Loading"
                    context.lifecycleScope.launch {
                        delay(1000)
                        holder.binding.itemMessagesFooterTips.visibility = View.GONE//一段事件后隐藏该提示
                        notifyDataSetChanged()
                        fadeTips = false
                    }
                } else {
                    holder.binding.itemMessagesFooterTips.text = "NoMore"
                    context.lifecycleScope.launch {
                        delay(1000)
                        holder.binding.itemMessagesFooterTips.visibility = View.GONE
                        fadeTips = false
                        hasMore = true//为了下次上拉能再次显示加载更多
                    }
                }
            }
            is NormalViewHolder -> {
                holder.binding.itemMessagesNormalTitle.text = messages[position].title
                holder.binding.itemMessagesNormalContent.text = messages[position].content
                holder.binding.itemMessagesNormalSender.text = messages[position].senderAccount
            }
        }
    }

    override fun getItemCount(): Int {
        return messages.size + 1
    }

    override fun getItemViewType(position: Int): Int {
        return if (position == messages.size ) footerHolder else normalHolder
    }

    class NormalViewHolder(val binding: ItemMessagesNormalBinding) :
        RecyclerView.ViewHolder(binding.root)

    class FooterViewHolder(val binding: ItemMessagesFooterBinding) :
        RecyclerView.ViewHolder(binding.root)
}