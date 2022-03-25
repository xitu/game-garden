package com.example.petscoffee.ui.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.addTextChangedListener
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.petscoffee.R
import com.example.petscoffee.adapters.FriendsAdapter
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.customview.slidedelete.FriendCallback
import com.example.petscoffee.customview.slidedelete.FriendDecoration
import com.example.petscoffee.databinding.ActivityFriendsBinding
import com.example.petscoffee.ui.viewModel.FriendsViewModel

/**
 * description ： FriendsActivity,用于添加好友
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 14:16
 */

class FriendsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = DataBindingUtil.setContentView(
            this,
            R.layout.activity_friends
        ) as ActivityFriendsBinding
        val viewModel = ViewModelProvider(this)[FriendsViewModel::class.java]
        val friends = ArrayList<CoffeeShop>()
        val adapter = FriendsAdapter(friends,supportFragmentManager)
        binding.activityFriendsViewPager.adapter = adapter
        binding.activityFriendsViewPager.layoutManager = LinearLayoutManager(this)
        binding.activityFriendsViewPager.addItemDecoration(FriendDecoration())
        val friendCallback = ItemTouchHelper(FriendCallback(friends,adapter))//侧滑删除及拖拽
        friendCallback.attachToRecyclerView(binding.activityFriendsViewPager)
        binding.activityFriendsSearch.addTextChangedListener {
                if (it.toString().isNotEmpty()) {
                    viewModel.query(it.toString())
                } else {
                    viewModel.friends()
                }
        }
        viewModel.friendsLiveData.observe(this) {
            friends.clear()
            friends.addAll(it)
            binding.activityFriendsViewPager.adapter?.notifyDataSetChanged()
        }
        viewModel.coffeeShop.observe(this){
            binding.coffeeShop = it
        }
        viewModel.getCoffeeShop()
        viewModel.friends()//初始化最后时加载已经添加的好友
    }
}