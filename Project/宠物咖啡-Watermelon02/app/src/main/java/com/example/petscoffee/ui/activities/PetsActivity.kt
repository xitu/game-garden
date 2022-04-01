package com.example.petscoffee.ui.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.DiffUtil
import com.example.petscoffee.R
import com.example.petscoffee.adapters.PetsAdapter
import com.example.petscoffee.databinding.ActivityPetsBinding
import com.example.petscoffee.listener.PetsDiffUtilCallback
import com.example.petscoffee.bean.pets.Pets
import com.example.petscoffee.ui.viewModel.PetsViewModel

/**
 * description ： 宠物界面，展示宠物的属性，点击宠物图标可以吃饭和洗澡;
 * 使用Diffutil实现差分刷新
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/22 22:53
 */

class PetsActivity : AppCompatActivity() {
    private var mPets:List<Pets> = ArrayList()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val mActivityPetsBinding = DataBindingUtil.setContentView<ActivityPetsBinding>(this,R.layout.activity_pets)
        val petsAdapter = PetsAdapter(mPets,supportFragmentManager)
        mActivityPetsBinding.petsRecyclerView.adapter = petsAdapter
        val viewModel = ViewModelProvider(this)[PetsViewModel::class.java]
        viewModel.getPets().observe(this){
            val diffResult = DiffUtil.calculateDiff(PetsDiffUtilCallback(mPets,it))
            diffResult.dispatchUpdatesTo(petsAdapter)
            mPets = it
            (mActivityPetsBinding.petsRecyclerView.adapter as PetsAdapter).pets = mPets
        }
    }
}