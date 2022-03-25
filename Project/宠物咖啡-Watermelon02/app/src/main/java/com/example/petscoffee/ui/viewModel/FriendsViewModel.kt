package com.example.petscoffee.ui.viewModel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.repository.ArchiveRepository
import com.example.petscoffee.repository.network.CoffeeNetwork
import kotlinx.coroutines.launch

/**
 * description ： FriendsActivity对应的viewModel,用于根据账号或者用户名查找好友
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/29 21:02
 */
class FriendsViewModel : ViewModel() {
    val friendsLiveData = MutableLiveData<List<CoffeeShop>>()
    val coffeeShop = MutableLiveData<CoffeeShop>()

    fun friends() {//进入好友界面时，首先调用此方法，根据coffeeShop.friends查询已经添加的好友
        ArchiveRepository.loadCoffee { coffeeShop ->
            run {
                val list = ArrayList<CoffeeShop>()
                viewModelScope.launch {
                    for (friend in coffeeShop.friends) {
                        list.add(CoffeeNetwork.singleQuery(friend.account))
                    }
                    friendsLiveData.postValue(list)
                }
            }
        }
    }

    fun query(name: String) {
        viewModelScope.launch { friendsLiveData.postValue(CoffeeNetwork.query(name)) }
    }

    fun getCoffeeShop(){
        ArchiveRepository.loadCoffee { this.coffeeShop.postValue(it) }
    }
}