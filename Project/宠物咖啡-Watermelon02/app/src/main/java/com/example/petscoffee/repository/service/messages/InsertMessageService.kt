package com.example.petscoffee.repository.service.messages

import com.example.petscoffee.bean.friends.Messages
import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： 写message
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/5 11:25
 */
interface InsertMessageService {
    @RetrofitBuilder.GET("insert/senderAccount={senderAccount}&recipientAccount={recipientAccount}&title={title}&content={content}")
    fun insert(@RetrofitBuilder.Path("senderAccount")senderAccount: String, @RetrofitBuilder.Path("recipientAccount")recipientAccount: String, @RetrofitBuilder.Path("title") title: String, @RetrofitBuilder.Path("content")content: String):Call<Messages>
}