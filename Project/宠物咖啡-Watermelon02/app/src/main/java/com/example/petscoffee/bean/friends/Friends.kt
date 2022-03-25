package com.example.petscoffee.bean.friends

import com.example.petscoffee.bean.CoffeeShop

/**
 * description ： 用于接收查询其他用户返回的list<CoffeeShop>，可能是因为java泛型擦除的原因所以没办法直接接收list<CoffeeShop>
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/3 17:21
 */

class Friends : ArrayList<CoffeeShop>()