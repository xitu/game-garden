package com.example.petscoffee.ui.activities

import android.content.Intent
import android.graphics.drawable.Animatable
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.vectordrawable.graphics.drawable.AnimatedVectorDrawableCompat
import com.example.petscoffee.R
import com.example.petscoffee.databinding.ActivityVisitBinding
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.repository.local.GsonInstance

/**
 * description ：
 * 访问好友界面，和主界面相比少了一个底部toolBar，进入时就会有宠物出现
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/9 16:06
 */

class VisitActivity : AppCompatActivity() {
    private lateinit var binding: ActivityVisitBinding
    private lateinit var coffeeShop: CoffeeShop
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //获取访问的好友的数据
        coffeeShop = GsonInstance.getGsonInstance().fromJson(intent.extras?.get("coffee").toString(),CoffeeShop::class.java)
        binding = DataBindingUtil.setContentView(this,R.layout.activity_visit)
        binding.coffeeShop = coffeeShop
        initMessageBoard()
    }

    /*private fun workStart() {//生成移动的宠物
        viewModel.coffeeShop.observe(this, {
            val petsViews = ArrayList<PlayablePetView>()
            for (pet in it.pets) {
                val petView = PlayablePetView(this, null)
                petView.setImageResource(if (pet.species == 1) R.drawable.cat else R.drawable.dog)//根据宠物的species属性设置对应的drawable
                mainPageBinding.mainPageCounter.addView(petView, ViewGroup.LayoutParams(128, 128))
                petsViews.add(petView)
                petView.drop()
                petView.move()
                lifecycleScope.launch {
                    delay(20500)//工作结束后清除所有增加的petView
                    mainPageBinding.mainPageCounter.removeViews(
                        1,
                        mainPageBinding.mainPageCounter.childCount - 1
                    )
                }
            }
        })
    }*/

    private fun initMessageBoard() {//初始化留言板
        //初始化留言板的svg动画
        val animatedVectorDrawable =
            AnimatedVectorDrawableCompat.create(this, R.drawable.animated_vector_window)
        binding.visitWindow.setImageDrawable(animatedVectorDrawable)
        (binding.visitWindow.drawable as Animatable).start()
        binding.visitWindow.setOnClickListener { //设置点击监听
            val intent = Intent(this, MessagesActivity::class.java)
            intent.putExtra("coffee",GsonInstance.getGsonInstance().toJson(coffeeShop))
            startActivity(intent)
        }
    }
}