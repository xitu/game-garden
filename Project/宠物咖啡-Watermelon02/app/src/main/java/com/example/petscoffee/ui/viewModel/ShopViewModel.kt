package com.example.petscoffee.ui.viewModel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.repository.ArchiveRepository.id
import com.example.petscoffee.repository.local.CoffeeDatabase.Companion.getInstance

class ShopViewModel(application: Application) : AndroidViewModel(application) {
    var coffeeShopLiveData: LiveData<CoffeeShop> = getInstance().coffeeShopDao().queryCoffeeLiveData(id)

}