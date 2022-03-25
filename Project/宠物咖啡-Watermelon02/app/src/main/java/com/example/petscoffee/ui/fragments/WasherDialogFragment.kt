package com.example.petscoffee.ui.fragments

import android.app.Dialog
import android.os.Bundle
import android.view.LayoutInflater
import android.widget.ProgressBar
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.ViewModelProvider
import com.example.petscoffee.databinding.DialogPetsWashBinding
import com.example.petscoffee.ui.viewModel.WasherViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * description ： 宠物点击喂食按钮后的fragment,使用livedata
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/24 15:56
 */
class WasherDialogFragment : DialogFragment() {
    private var index = -1//要操作的宠物的下标
    private lateinit var progressBar: ProgressBar
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val viewModel = ViewModelProvider(this)[WasherViewModel::class.java]
        val binding = DialogPetsWashBinding.inflate(LayoutInflater.from(context), null, false)
        progressBar = binding.washProgressBar
        decreaseProgress()
        viewModel.getCoffee().observe(this) {
            val coffeeShop = it
            binding.apply {
                washText.text = "快快抓住逃跑的宠物"
                washButton.setOnClickListener {//点击按钮增加进度
                    var progress = progressBar.progress
                    if (progress < 100) {
                        progress += 2 * (10 - coffeeShop.pets[index].cleanliness) //根据宠物现在的清洁度动态调整清洗难度
                        progressBar.progress = progress
                        when {
                            progress > 30 -> washText.text = "就快洗完了，加油"
                            progress > 70 -> washText.text = "真的就快洗完了，加油"
                            else -> washText.text = "快快抓住逃跑的宠物"
                        }
                    } else {
                        coffeeShop.pets[index].cleanliness = 10
                        viewModel.saveCoffee(coffeeShop)
                        washText.text = "洗干净了！"
                    }
                }
            }
        }
        return AlertDialog.Builder(requireContext()).run {//洗澡dialog，传入上面的宠物洗澡view
            setTitle("Wash")
            setView(binding.root)
            setCancelable(true)
            create()
        }
    }

    fun setIndex(index: Int): WasherDialogFragment {
        this.index = index
        return this
    }

    private fun decreaseProgress() {
        CoroutineScope(Dispatchers.Default).launch {//定时减少进度
            while (progressBar.progress in 0..99) {
                progressBar.progress -= 10
                delay(1000)
            }
        }
    }
}