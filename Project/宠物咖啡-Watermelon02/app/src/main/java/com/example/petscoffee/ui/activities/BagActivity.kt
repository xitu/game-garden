package com.example.petscoffee.ui.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.petscoffee.R
import com.example.petscoffee.adapters.GoodsAdapter
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.bean.goods.Goods
import com.example.petscoffee.databinding.ActivityBagBinding
import com.example.petscoffee.repository.ArchiveRepository.loadCoffee

/**
 * description ： 背包界面,展示用户拥有的道具数量和相关信息，包含一个rv
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/22 22:53
 */

class BagActivity : AppCompatActivity() {
    private lateinit var bag: MutableList<Goods>
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycle
        val bagBinding: ActivityBagBinding =
            DataBindingUtil.setContentView(this, R.layout.activity_bag)
        //设置dataBinding
        loadCoffee { coffeeShop: CoffeeShop ->//读取数据库中的数据，传递给rv
            bagBinding.coffeeShop = coffeeShop
            bag = coffeeShop.bag
            runOnUiThread {
                bagBinding.bagRecyclerview.layoutManager = LinearLayoutManager(this)
                bagBinding.bagRecyclerview.adapter = GoodsAdapter(bag)
            }
        }
    }
}