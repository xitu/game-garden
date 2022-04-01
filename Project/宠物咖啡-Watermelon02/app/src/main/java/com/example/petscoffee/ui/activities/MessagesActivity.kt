package com.example.petscoffee.ui.activities

import android.os.Build
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.petscoffee.R
import com.example.petscoffee.adapters.MessageAdapter
import com.example.petscoffee.databinding.ActivityMessgaeBinding
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.repository.local.GsonInstance
import com.example.petscoffee.ui.viewModel.MessageViewModel

/**
 * description ： 留言板功能，支持上拉加载更多
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/5 10:50
 */

class MessagesActivity : AppCompatActivity() {
    private lateinit var viewModel: MessageViewModel
    private lateinit var binding: ActivityMessgaeBinding
    private lateinit var layoutManager: LinearLayoutManager
    private lateinit var adapter: MessageAdapter
    private var lastVisibleItemPosition = 0//最后一个可见的item序号

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //获取访问的好友的数据
        val coffeeShop = GsonInstance.getGsonInstance().fromJson(intent.extras?.get("coffee").toString(),
            CoffeeShop::class.java)
        viewModel = ViewModelProvider(this)[MessageViewModel::class.java]
        viewModel.coffeeShop = coffeeShop
        binding = DataBindingUtil.setContentView(this,R.layout.activity_messgae) as ActivityMessgaeBinding
        layoutManager = LinearLayoutManager(this)
        adapter = MessageAdapter(viewModel.messages, this)
        binding.activityMessageRv.adapter = adapter
        binding.activityMessageRv.layoutManager = layoutManager
        binding.activityMessageRv.itemAnimator = DefaultItemAnimator()
        binding.coffeeShop = coffeeShop
        initObserver()
        initScroll()
        initSwipeRefreshLayout()
        initClick()
        viewModel.getMessages()//进入时先查询一次
    }

    private fun initObserver() {
        viewModel.newMessages.observe(this) {//每次上拉时查询后调用
            if (it.isNotEmpty()) {
                adapter.apply {
                    hasMore = true
                    messages.addAll(it)
                    notifyDataSetChanged()
                }
            } else {
                adapter.hasMore = false
                adapter.notifyDataSetChanged()
            }
        }
    }

    private fun initScroll() {
        binding.activityMessageRv.addOnScrollListener(object : RecyclerView.OnScrollListener() {
            override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                super.onScrollStateChanged(recyclerView, newState)
                //滑到底部时
                if (newState == RecyclerView.SCROLL_STATE_IDLE) {
                    if (!adapter.fadeTips && layoutManager.findLastCompletelyVisibleItemPosition() == adapter.itemCount - 1) {
                        viewModel.getMessages()
                    } else if (adapter.fadeTips && layoutManager.findLastCompletelyVisibleItemPosition() == adapter.itemCount - 2) {
                        viewModel.getMessages()
                    }
                }
            }

            override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
                super.onScrolled(recyclerView, dx, dy)
                lastVisibleItemPosition = layoutManager.findLastVisibleItemPosition()
            }
        })
    }

    private fun initSwipeRefreshLayout() {
        binding.activityMessageSwipe.swipeRefreshListener {
            viewModel.refreshMessages()
        }
    }

    private fun initClick() {//初始化悬浮button点击事件
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            binding.activityMessageFloat.setScreenWH(display!!.width,display!!.height)
        }
        binding.activityMessageFloat.clickListener {
            Toast.makeText(this,"1",Toast.LENGTH_SHORT).show()
        }
    }
}