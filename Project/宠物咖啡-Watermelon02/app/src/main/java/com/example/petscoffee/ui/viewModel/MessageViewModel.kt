package com.example.petscoffee.ui.viewModel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.bean.friends.Messages
import com.example.petscoffee.repository.network.MessageNetwork
import kotlinx.coroutines.launch

/**
 * description ： MessageActivity对应的viewModel,需要实现分页获取数据的功能
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/5 10:56
 */
class MessageViewModel : ViewModel() {
    val messages = ArrayList<Messages>()
    val newMessages = MutableLiveData<List<Messages>>()
    private val pageSize = 5//每页的数据条数
    private var pageIndex = 1//当前页数
    lateinit var coffeeShop :CoffeeShop


    fun getMessages() {
        viewModelScope.launch {
            val msg = MessageNetwork.select(
                coffeeShop.account,
                pageIndex,
                pageSize
            )
            if (msg.isNotEmpty()){
                newMessages.postValue(msg)
                pageIndex++
            }else{
                newMessages.postValue(listOf())
            }
        }
    }

    fun refreshMessages(){
        messages.clear()
        pageIndex = 1
        getMessages()
    }
}