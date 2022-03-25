package com.example.petscoffee.listener

import android.content.Context
import android.content.Intent
import android.view.View
import com.example.petscoffee.R
import com.example.petscoffee.ui.activities.BagActivity
import com.example.petscoffee.ui.activities.FriendsActivity
import com.example.petscoffee.ui.activities.PetsActivity
import com.example.petscoffee.ui.activities.ShopActivity

class BottomBarListener(  //底部toolbar的点击监听
    private val context: Context
) {
    fun onClick(view: View) {
        when (view.id) {
            R.id.bottomBar_bag -> {
                val bagIntent = Intent(context, BagActivity::class.java)
                context.startActivity(bagIntent)
            }
            R.id.bottomBar_shop -> {
                val shopIntent = Intent(context, ShopActivity::class.java)
                context.startActivity(shopIntent)
            }
            R.id.bottomBar_pets -> {
                val petsIntent = Intent(context, PetsActivity::class.java)
                context.startActivity(petsIntent)
            }
            R.id.bottomBar_friend -> {
                val homeIntent = Intent(context, FriendsActivity::class.java)
                context.startActivity(homeIntent)
            }
        }
    }
}