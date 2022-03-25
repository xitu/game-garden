package com.example.petscoffee.ui.fragments

import android.app.Dialog
import android.os.Bundle
import android.view.LayoutInflater
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.ViewModelProvider
import com.example.petscoffee.databinding.DialogPetsEatBinding
import com.example.petscoffee.bean.Bag
import com.example.petscoffee.ui.viewModel.EaterViewModel

/**
 * description ： 宠物点击喂食按钮后的fragment,具有生命周期，因此可以直接使用livedata
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/24 15:56
 */
class EaterDialogFragment : DialogFragment() {
    private var index = -1
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val viewModel = ViewModelProvider(this)[EaterViewModel::class.java]
        val binding = DialogPetsEatBinding.inflate(LayoutInflater.from(context), null, false)
        val dialog = AlertDialog.Builder(requireContext())
        viewModel.getCoffee().observe(this) {
            val coffeeShop = it
            val bag = it.bag
            val pet = it.pets[index]
            if (Bag.search(bag, "Foods") != -1) {
                //如果背包里有食物
                binding.dialogPetsEatNumber.text = "剩余：${bag[Bag.search(bag, "Foods")].getNumber()}"
                binding.dialogPetsEatButton.setOnClickListener {
                    val eaten = binding.dialogPetsEatEdit.text.toString().toInt() //获取用户输入的投喂食物数
                    val total = bag[Bag.search(bag, "Foods")].getNumber() //获取背包中该物品剩余数量
                    if (pet.hunger == 10) {
                        Toast.makeText(context, pet.name + "已经吃撑了", Toast.LENGTH_SHORT)
                            .show()
                        return@setOnClickListener
                    }
                    if (eaten <= total) { //如果输入的数量小于/等于剩余食物数量
                        if (eaten <= 10 - pet.hunger) { //吃的食物数量小于/等于未满的饥饿值
                            pet.hunger = pet.hunger + eaten
                            bag[Bag.search(bag, "Foods")].setNumber(-eaten)
                            Toast.makeText(context, "恢复了${eaten}点饱食度", Toast.LENGTH_SHORT)
                                .show()
                        } else { //吃的食物数量大于未满的饥饿值
                            bag[Bag.search(
                                bag,
                                "Foods"
                            )].setNumber(10 - pet.hunger) //减少不足饱食度数量的食物
                            pet.hunger = 10 - pet.hunger //补满饱食度
                            Toast.makeText(context, "${pet.name}已经吃撑了", Toast.LENGTH_SHORT)
                                .show()
                        }
                    } else {
                        Toast.makeText(context, "没有这么多的食物", Toast.LENGTH_SHORT).show()
                    }
                    viewModel.saveCoffee(coffeeShop)
                }
            } else {
                Toast.makeText(context, "包包里没有食物啦", Toast.LENGTH_SHORT).show()
            }
        }
        return dialog.setTitle("F e e d").setView(binding.root).create()
    }

    fun setIndex(index: Int): EaterDialogFragment {
        this.index = index
        return this
    }
}