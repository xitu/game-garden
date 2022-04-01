package com.example.petscoffee.ui.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.repository.ArchiveRepository
import com.example.petscoffee.repository.local.CoffeeDatabase

/**
 * description ： EaterDialogFragment对应的viewModel
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/24 19:42
 */
class EaterViewModel : ViewModel() {
    fun getCoffee(): LiveData<CoffeeShop> {
        return CoffeeDatabase.getInstance().coffeeShopDao().queryCoffeeLiveData(ArchiveRepository.id)
    }

    fun saveCoffee(coffeeShop: CoffeeShop) {
        Thread { CoffeeDatabase.getInstance().coffeeShopDao().upDateCoffee(coffeeShop) }.start()
    }
}