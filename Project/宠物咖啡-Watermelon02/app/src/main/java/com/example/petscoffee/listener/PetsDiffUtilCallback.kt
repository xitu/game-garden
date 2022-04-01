package com.example.petscoffee.listener

import androidx.recyclerview.widget.DiffUtil
import com.example.petscoffee.bean.pets.Pets

/**
 * description ： 用于petsActivity的差分刷新
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/24 21:05
 */
class PetsDiffUtilCallback(private val oldPets: List<Pets>, private val newPets: List<Pets>) :
    DiffUtil.Callback() {
    override fun getOldListSize(): Int {
        return oldPets.size
    }

    override fun getNewListSize(): Int {
        return newPets.size
    }

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return oldPets[oldItemPosition].name == newPets[newItemPosition].name
    }

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {//因为宠物界面只会修改这两项属性，所以只比较这两项
        return (oldPets[oldItemPosition].cleanliness == newPets[newItemPosition].cleanliness && oldPets[oldItemPosition].hunger == newPets[newItemPosition].hunger)
    }

}