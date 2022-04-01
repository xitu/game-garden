package com.example.petscoffee.ui.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import com.example.petscoffee.bean.pets.Pets
import com.example.petscoffee.repository.ArchiveRepository
import com.example.petscoffee.repository.local.CoffeeDatabase

/**
 * description ： PetsActivity对应的viewModel
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/24 14:12
 */
class PetsViewModel : ViewModel() {
    fun getPets(): LiveData<List<Pets>> {
        val coffeeShop =
            CoffeeDatabase.getInstance().coffeeShopDao().queryCoffeeLiveData(ArchiveRepository.id)
        return Transformations.switchMap(coffeeShop) { coffeeShop ->
            MutableLiveData(coffeeShop.pets)
        }
    }
}