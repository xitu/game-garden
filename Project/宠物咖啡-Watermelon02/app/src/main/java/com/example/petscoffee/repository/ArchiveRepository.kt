package com.example.petscoffee.repository

import android.util.Log
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.repository.local.CoffeeDatabase
import com.example.petscoffee.repository.local.GsonInstance
import com.example.petscoffee.repository.network.CoffeeNetwork
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * description ： 读取和保存数据，读取数据通过本地room，保存数据同时操作room和远程数据库
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/02 12:37
 */

object ArchiveRepository {
    private val gson = GsonInstance.getGsonInstance()

    @JvmStatic
    var id //登录的用户id
            : Long = 0

    var account:String = ""

    //持久化保存和读取方法,
    // 通过room数据库进行异步存储和读取，
    @JvmStatic
    fun loadCoffee(loadListener: (coffeeShop: CoffeeShop) -> Unit) {
        //通过数据库读取数据时，需要通过回调来返回读取到的数据和进行接下来的操作
        Thread {
            val coffeeShop = CoffeeDatabase.getInstance().coffeeShopDao().queryCoffee(id)
            loadListener(coffeeShop)
        }.start()
    }

    @JvmStatic
    fun saveCoffee(coffee: CoffeeShop) {
        CoroutineScope(Dispatchers.IO).launch {//协程作用域，app运行期间一直都需要存储数据，所以不关也没事
            try {
                CoffeeDatabase.getInstance().coffeeShopDao().upDateCoffee(coffee)
                CoffeeNetwork.save(gson.toJson(coffee))
            }catch (e:Exception){
                Log.d("testTag", "ArchiveRepository:${e} ")
            }
        }
    }
}