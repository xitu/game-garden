package com.example.petscoffee.ui.activities

import android.content.Intent
import android.graphics.BitmapFactory
import android.graphics.drawable.Animatable
import android.os.Bundle
import android.view.ViewGroup
import android.widget.ImageView
import androidx.activity.result.ActivityResult
import androidx.activity.result.ActivityResultCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.FileProvider
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.vectordrawable.graphics.drawable.AnimatedVectorDrawableCompat
import com.example.petscoffee.R
import com.example.petscoffee.customview.AvatarView
import com.example.petscoffee.customview.PlayablePetView
import com.example.petscoffee.databinding.ActivityMainBinding
import com.example.petscoffee.listener.BottomBarListener
import com.example.petscoffee.repository.local.GsonInstance
import com.example.petscoffee.service.WorkService
import com.example.petscoffee.ui.viewModel.MainPageViewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileNotFoundException
import kotlin.random.Random

/**
 * description ：
 * 游戏主界面，包含:
 * 天气展示模块（通过获取当前ip地址定位(IpGetter)获取天气）;
 * 长按底部open按钮后的营业功能；
 * 侧滑用户信息模块（头像展示，点击头像可进入PictureActivity）
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/23 21:50
 */

class MainPageActivity : AppCompatActivity() {
    private lateinit var userHeaderLauncherCallback: ActivityResultCallback<ActivityResult>
    private lateinit var viewModel: MainPageViewModel
    private lateinit var mainPageBinding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mainPageBinding =
            DataBindingUtil.setContentView(this, R.layout.activity_main) as ActivityMainBinding
        initUserHeader()
        mainPageBinding.bottomBarListener = BottomBarListener(this)//为底部栏设置点击监听
        mainPageBinding.mainPageTest.bottomBarWork.setWork {//为工作按钮设置监听器
            val workIntent = Intent(
                this,
                WorkService::class.java
            )
            startService(workIntent)
            workStart()
        }
        viewModel = ViewModelProvider(this).get(
            MainPageViewModel::class.java
        )
        viewModel.queryWeather()//查询天气
        viewModel.coffeeShop.observe(this, { coffee ->
            mainPageBinding.coffeeShop = coffee
        })
        //查询天气监听
        viewModel.weather.observe(this, {
            mainPageBinding.textMainWeather.text = it.weather
        })
        initMessageBoard()
    }

    private fun initUserHeader() {
        val userHeaderImage =
            mainPageBinding.mainPageNavigationView.inflateHeaderView(R.layout.user_nav_header)
                .findViewById(R.id.user_nav_header_image) as ImageView
        //加载头像
        val file = File("/data/data/com.example.petscoffee/userHead.jpg")
        if (file.exists()) {
            try {
                val avatar = AvatarView(
                    BitmapFactory.decodeStream(
                        contentResolver.openInputStream(
                            FileProvider.getUriForFile(
                                this,
                                "com.example.petscoffee.ui.activities.PictureActivity",
                                file
                            )
                        )
                    )
                )
                userHeaderImage.setImageDrawable(avatar)
            } catch (e: FileNotFoundException) {
                e.printStackTrace()
            }
        }
        userHeaderLauncherCallback = ActivityResultCallback<ActivityResult> {
            //头像设置界面返回
            try { //重新设置userHeader
                userHeaderImage.setImageBitmap(
                    BitmapFactory.decodeStream(
                        contentResolver.openInputStream(
                            FileProvider.getUriForFile(
                                this,
                                "com.example.petscoffee.ui.activities.PictureActivity",
                                File("/data/data/com.example.petscoffee/userHead.jpg")
                            )
                        )
                    )
                )
            } catch (e: FileNotFoundException) {
                e.printStackTrace()
            }
        }
        val resultLauncher = registerForActivityResult(
            ActivityResultContracts.StartActivityForResult(),
            userHeaderLauncherCallback
        )
        userHeaderImage.setOnClickListener {
            resultLauncher.launch(
                Intent(this, PictureActivity::class.java)
            )
        }
    }

    private fun workStart() {//生成移动的宠物
        viewModel.coffeeShop.observe(this, {
            val petsViews = ArrayList<PlayablePetView>()
            lifecycleScope.launch {
                for (pet in it.pets) {
                    val petView = PlayablePetView(this@MainPageActivity, null)
                    petView.setImageResource(if (pet.species == 1) R.drawable.cat else R.drawable.dog)//根据宠物的species属性设置对应的drawable
                    mainPageBinding.mainPageCounter.addView(petView, ViewGroup.LayoutParams(128, 128))
                    petView.x = Random.nextInt(1000).toFloat()
                    petsViews.add(petView)
                    petView.drop()
                    petView.move()
                    delay(800)
                }
                delay(18000)//工作结束后清除所有增加的petView
                mainPageBinding.mainPageCounter.removeViews(
                    1,
                    mainPageBinding.mainPageCounter.childCount - 1
                )
            }
        })
    }

    private fun initMessageBoard() {//初始化留言板
        //初始化留言板的svg动画
        val animatedVectorDrawable =
            AnimatedVectorDrawableCompat.create(this, R.drawable.animated_vector_window)
        mainPageBinding.mainPageWindow.setImageDrawable(animatedVectorDrawable)
        (mainPageBinding.mainPageWindow.drawable as Animatable).start()
        mainPageBinding.mainPageWindow.setOnClickListener { //设置点击监听
            val intent = Intent(this, MessagesActivity::class.java)
            intent.putExtra("coffee",GsonInstance.getGsonInstance().toJson(viewModel.coffeeShop.value))
            startActivity(intent)
        }
    }
}