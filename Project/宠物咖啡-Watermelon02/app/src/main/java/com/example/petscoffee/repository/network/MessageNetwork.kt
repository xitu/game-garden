package com.example.petscoffee.repository.network

import com.example.petscoffee.bean.friends.MessageList
import com.example.petscoffee.bean.friends.Messages
import com.example.petscoffee.repository.service.messages.InsertMessageService
import com.example.petscoffee.repository.service.messages.MessageServiceCreator
import com.example.petscoffee.repository.service.messages.SelectMessageService

/**
 * description ： messages相关的网络请求
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/5 14:50
 */
object MessageNetwork {
    suspend fun select(recipientAccount: String, pageNum: Int, pageSize: Int):MessageList{
        return MessageServiceCreator.create<SelectMessageService>().select(recipientAccount, pageNum, pageSize).await()
    }

    suspend fun insert(senderAccount: String, recipientAccount: String, title: String, content: String){
        MessageServiceCreator.create<InsertMessageService>().insert(senderAccount, recipientAccount, title, content).await<Messages>()
    }
}