package com.example.petscoffee.ui.viewModel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.petscoffee.bean.network.WeatherResponse
import com.example.petscoffee.repository.ArchiveRepository
import com.example.petscoffee.repository.WeatherRepository
import com.example.petscoffee.repository.local.CoffeeDatabase
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

/**
 * description ： mainPageActivity对应的viewModel,其包含一个用协程查询天气的方法
 * 在该模块创建了roomDatabase的实例
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/25 16:30
 */

class MainPageViewModel : ViewModel() {
    private lateinit var job: Job
    val weather = MutableLiveData<WeatherResponse.Live>()

    val coffeeShop = CoffeeDatabase.getInstance().coffeeShopDao()
        .queryCoffeeLiveData(ArchiveRepository.id)

    fun queryWeather() {

        job = CoroutineScope(Dispatchers.IO).launch {
            WeatherRepository.queryPlace()?.let {//避免返回值为null时的查询
                WeatherRepository.queryAdcode(it)
                    ?.let { weather.postValue(WeatherRepository.queryWeather(it)) }
            }
        }
    }

    override fun onCleared() {//关闭协程作用域
        super.onCleared()
        job.cancel()
    }
}