package com.example.petscoffee.ui.fragments

import android.content.DialogInterface
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import com.example.petscoffee.R
import com.example.petscoffee.databinding.FragmentShopPetsBinding
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.bean.pets.createPet
import com.example.petscoffee.repository.ArchiveRepository

/**
 * description ： 商店购买宠物fragment,只包含两个子item
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/22 22:53
 */

class ShopPetsFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val binding = FragmentShopPetsBinding.inflate(inflater, container, false)
        ArchiveRepository.loadCoffee{ coffeeShop: CoffeeShop? ->
            binding.shopCatBuy.setOnClickListener {
                binding.shopCatImage.jump()//点击按钮时播放宠物跳跃动画
                buyPet(coffeeShop, 1)
            }
            binding.shopDogBuy.setOnClickListener {
                binding.shopDogImage.jump()
                buyPet(coffeeShop, 2)
            }
        }
        return binding.root
    }

    private fun buyPet(coffee: CoffeeShop?, species: Int) { //购买宠物方法
        coffee?.let {//避免读取错误
            if (coffee.money >= 2000f) {
                val view = LayoutInflater.from(activity)
                    .inflate(R.layout.shop_fragment_name_input, null)
                AlertDialog.Builder(this.requireContext()).apply {//创建对应的购买dialog
                    setTitle("购 买 " + if (species == 1) "猫 猫" else "狗 狗")
                    setMessage("给新" + (if (species == 1) "猫猫" else "狗狗") + "取一个名字：")
                    setView(view)
                    setPositiveButton("确认") { _: DialogInterface?, _: Int ->
                        val editText = view.findViewById<EditText>(R.id.inputName)
                        val name = editText.text.toString()
                        createPet(coffee, name, species) //调用pets.Create方法创建新宠物
                        coffee.money = coffee.money - 2000f //扣钱
                        ArchiveRepository.saveCoffee(coffee) //保存
                    }
                    setNegativeButton("取消") { _: DialogInterface?, _: Int -> }
                    show()
                }
            } else {
                Toast.makeText(activity, "钱钱不够TvT", Toast.LENGTH_SHORT).show()
            }
        }
    }

}