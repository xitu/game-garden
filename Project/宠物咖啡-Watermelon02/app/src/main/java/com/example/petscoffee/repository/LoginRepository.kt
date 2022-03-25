package com.example.petscoffee.repository

import com.example.petscoffee.repository.local.CoffeeDatabase
import com.example.petscoffee.repository.network.CoffeeNetwork

/**
 * description ： LoginActivity所需的repository层，负责从后端获取返回的登录结果,如果成功则同步数据，失败则返回错误
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 22:18
 */
object LoginRepository {
    suspend fun login(account: String, password: String): LoginResult {
        val mCoffeeShop = CoffeeNetwork.login(account, password)
        return if (mCoffeeShop.account == "error" && mCoffeeShop.password == "error") {//验证失败
            LoginResult.FALSE
        } else {//验证成功
            if (CoffeeDatabase.getInstance().coffeeShopDao().queryCoffee(account)==null){
                CoffeeDatabase.getInstance().coffeeShopDao().insertCoffee(mCoffeeShop)
            }else{
                CoffeeDatabase.getInstance().coffeeShopDao().upDateCoffee(mCoffeeShop)
            }
            ArchiveRepository.id = mCoffeeShop.id//Archive需要修改
            ArchiveRepository.account = mCoffeeShop.account
            LoginResult.SUCCESS
        }
    }
}

/**
 * description ： 登录结果枚举类，用于livedata进行observe
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 14:51
 */
enum class LoginResult {
    CONNECTING, FALSE, SUCCESS;
}