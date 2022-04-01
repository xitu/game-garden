package com.example.petscoffee.repository

import android.util.Log
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.repository.local.CoffeeDatabase
import com.example.petscoffee.repository.network.CoffeeNetwork

/**
 * description ： 注册用户所需的repository层，负责从后端获取返回的用户id,本地room创建新用户的逻辑,返回注册是否成功
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 14:51
 */
object RegisterRepository {
    suspend fun register(account: String, name: String, password: String): RegisterResult {
        return try {
            val id = CoffeeNetwork.register(account, name, password)
            val newCoffeeShop = CoffeeShop(account, name, password, id)
            CoffeeDatabase.getInstance().coffeeShopDao().insertCoffee(newCoffeeShop)//本地保存该新用户
            RegisterResult.SUCCESS
        } catch (e: Exception) {
            Log.d("testTag", "registerRepository: ${e.message.toString()}")
            RegisterResult.FALSE
        }
    }
}
/**
 * description ： 注册用户结果枚举类，用于livedata进行observe
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 14:51
 */
enum class RegisterResult {
    CONNECTING,FALSE,SUCCESS;
}