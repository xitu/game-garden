package com.example.petscoffee.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.FragmentManager
import androidx.recyclerview.widget.RecyclerView
import com.example.petscoffee.R
import com.example.petscoffee.bean.pets.Pets
import com.example.petscoffee.databinding.ItemPetsBinding
import com.example.petscoffee.ui.fragments.EaterDialogFragment
import com.example.petscoffee.ui.fragments.WasherDialogFragment

/**
 * description ： 宠物界面vp2的adapter
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/22 22:53
 */

class PetsAdapter(var pets: List<Pets>, val fragmentManager: FragmentManager) :
    RecyclerView.Adapter<PetsAdapter.PetViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PetViewHolder {
        val binding = ItemPetsBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        val viewHolder = PetViewHolder(binding)
        return viewHolder
    }

    override fun onBindViewHolder(holder: PetViewHolder, position: Int) {
        val mPet = pets[position]
        holder.binding.apply {
            pet = mPet//为dataBinding中的data传值
            petsImage.setImageResource(if (mPet.species == 1) R.drawable.cat else R.drawable.dog)
            petsHp.setValue(mPet.hp)//这两项都是自定义view的属性设置，暂时没法从xml的dataBinding直接设置
            petsImage.jump()
        }
    }

    override fun getItemCount(): Int {
        return pets.size
    }


    /**
     * description ： 宠物界面vp2的adapter对应的viewHolder,
     * 在此绑定了点击监听，避免在onBindViewHolder中重复消耗内存资源
     * author : Watermelon02
     * email : 1446157077@qq.com
     * date : 2022/1/24 15:46
     */
    inner class PetViewHolder(val binding: ItemPetsBinding) :
        RecyclerView.ViewHolder(binding.root) {

        private var isClicked = false//宠物图片点击标志位,控制动画状态

        init {
            bindClick(binding)
        }

        private fun bindClick(binding: ItemPetsBinding) {
            binding.apply {//绑定点击监听
                petsImage.clickListener {
                    if (isClicked) {
                        isClicked = false
                        petsImage.jump()
                        petsImage.love()
                        //按钮消失动画
                        petsButtonWash.animate().translationXBy(-400f).scaleX(0f).scaleY(0f)
                            .withEndAction { petsButtonWash.visibility = View.GONE }
                            .alpha(0f).duration = 500
                        petsButtonEat.animate().translationXBy(400f).scaleX(0f).scaleY(0f)
                            .withEndAction { petsButtonEat.visibility = View.GONE }
                            .alpha(0f).duration = 500
                    } else {
                        isClicked = true
                        petsImage.jump()
                        //按钮出现动画
                        petsButtonWash.animate().translationXBy(400f).scaleX(1f).scaleY(1f)
                            .withStartAction { petsButtonWash.visibility = View.VISIBLE }
                            .alpha(1f).duration = 500
                        petsButtonEat.animate().translationXBy(-400f).scaleX(1f).scaleY(1f)
                            .withStartAction { petsButtonEat.visibility = View.VISIBLE }
                            .alpha(1f).duration = 500
                    }
                }
                petsButtonEat.setOnClickListener {
                    EaterDialogFragment().setIndex(absoluteAdapterPosition)
                        .show(fragmentManager, "EaterDialog")
                }
                petsButtonWash.setOnClickListener {//点击开始洗澡进度条task
                    WasherDialogFragment().setIndex(absoluteAdapterPosition)
                        .show(fragmentManager, "WasherDialog")
                }
            }
        }
    }
}