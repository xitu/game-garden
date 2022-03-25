package com.example.petscoffee.ui.activities

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.example.petscoffee.R
import com.example.petscoffee.databinding.ActivityShopBinding
import com.example.petscoffee.listener.BottomBarListener
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.repository.ArchiveRepository.loadCoffee
import com.example.petscoffee.ui.viewModel.ShopViewModel

/**
 * description ： 商店界面,包含宠物和商品两个fragment
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/22 22:53
 */
class ShopActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //为头部toolBar的dataBinding传入数据
        val shopBinding: ActivityShopBinding =
            DataBindingUtil.setContentView(this, R.layout.activity_shop)
        loadCoffee{ coffeeShop: CoffeeShop? -> shopBinding.coffeeShop = coffeeShop }
        //为底部toolBar的dataBinding传入数据
        shopBinding.bottomBarListener = BottomBarListener(this)
        //标题栏
        val shopViewModel = ViewModelProvider(this)[ShopViewModel::class.java]
        shopViewModel.coffeeShopLiveData.observe(
            this,
            { coffeeShop -> shopBinding.coffeeShop = coffeeShop })
        shopBinding.apply {
            shopChooseGoods.setOnClickListener {    //切换显示的fragment
                shopPetsLayout.visibility = View.GONE
                shopGoodsLayout.visibility = View.VISIBLE
            }
            shopChoosePets.setOnClickListener {
                shopPetsLayout.visibility = View.VISIBLE
                shopGoodsLayout.visibility = View.GONE
            }
        }
    }
}