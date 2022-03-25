package com.example.petscoffee.bean

class Message(
    var content: String, //消息内容
    var msgType: Int//消息种类（左边还是右边）
) {

    companion object {
        //firstActivity界面的message类
        const val LEFT_MSG = 1
        const val RIGHT_MSG = 2
    }
}