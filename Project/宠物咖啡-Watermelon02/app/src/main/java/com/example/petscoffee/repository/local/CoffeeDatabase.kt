package com.example.petscoffee.repository.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.bean.friends.FriendConverter
import com.example.petscoffee.bean.friends.MessageConverter

/**
 * description ： 本地room数据库，单例设计模式
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/24 10:50
 */

@Database(entities = [CoffeeShop::class], version = 1, exportSchema = false)
@TypeConverters(FriendConverter::class,MessageConverter::class)
abstract class CoffeeDatabase : RoomDatabase() {
    abstract fun coffeeShopDao(): CoffeeShopDao //Database access object

    companion object {
        private lateinit var database: CoffeeDatabase

        /**网上很多都是将此方法与getInstance写在一起，但是那样每次获取数据库实例都需要传递context，
         * 又因为数据库访问贯穿整个app的生命周期，于是用该方法在loginActivity获取applicationContext创建数据库,
         * 之后获取数据库实例时就不再需要传递context*/
        @JvmStatic
        fun createInstance(context: Context) {
            database = Room.databaseBuilder(
                context.applicationContext,
                CoffeeDatabase::class.java,
                "coffeeDatabase"
            ).build()
        }

        @JvmStatic
        @Synchronized
        fun getInstance(): CoffeeDatabase {
            return database
        }
    }
}