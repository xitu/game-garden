package com.example.petscoffee.utils.ipGetter

import java.net.NetworkInterface
import java.net.SocketException

/**
 * description ： 网上的获取ip地址方法，完全不知道原理，寄了，之后再来看（返回的是ipv6地址
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/17 15:44
 */
object IpGetter {
    fun getLocalIp(): String {
        try {
            val en = NetworkInterface.getNetworkInterfaces()
            while (en.hasMoreElements()) {
                val intf = en.nextElement()
                val enumIpAddr = intf.inetAddresses
                while (enumIpAddr.hasMoreElements()) {
                    val inetAddress = enumIpAddr.nextElement()
                    if (!inetAddress.isLoopbackAddress && !inetAddress.isLinkLocalAddress) return inetAddress.hostAddress.toString()
                }
            }
        } catch (e: SocketException) {
        }
        return "null"
    }
}