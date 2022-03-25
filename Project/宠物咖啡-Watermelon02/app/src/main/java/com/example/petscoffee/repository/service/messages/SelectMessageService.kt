package com.example.petscoffee.repository.service.messages

import com.example.petscoffee.bean.friends.MessageList
import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： 查询message
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/5 11:15
 */
interface SelectMessageService {
    @RetrofitBuilder.GET("select?recipientAccount={recipientAccount}&pageNum={pageNum}&pageSize={pageSize}")
    fun select(@RetrofitBuilder.Path("recipientAccount")recipientAccount: String,@RetrofitBuilder.Path("pageNum") pageNum: Int,@RetrofitBuilder.Path("pageSize") pageSize: Int):Call<MessageList>
}