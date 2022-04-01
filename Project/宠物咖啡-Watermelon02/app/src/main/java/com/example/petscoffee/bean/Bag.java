package com.example.petscoffee.bean;

import com.example.petscoffee.bean.goods.Goods;

import java.util.List;

public class Bag {//背包list操作类

    public static int search(List<Goods> bag, String name) {// 仓库物品搜索功能,返回物品在数组中的索引
        int index = -1;
        for (int i = 0; i < bag.size(); i++) {
            if (bag.get(i).getName().equals(name)) {
                index = i;
                break;
            }
        }
        return index;
    }


    public static float addGood(List<Goods> bag, String name, int number) throws Exception {// 新增物品功能,返回物品的价格，方便商店扣费
        float price;
        int index = search(bag, name);//search查找物品是否存在，如果存在返回其序号
        if (index != -1) {// 如果仓库里已经有该物品，增加该物品数量
            bag.get(index).setNumber(number);// 增加该物品数量
            price = bag.get(index).getPrice();// 设置物品价格
        } else {//如果仓库中没有该物品
            bag.add(factory(name));// 调用工厂类
            bag.get(bag.size() - 1).setNumber(number);//设置物品数量
            price = bag.get(bag.size() - 1).getPrice();// 设置物品价格
        }
        return price;
    }

    public static float reduce(List<Goods> bag, String name, int number) throws Exception {// 减少物品功能,可用于商场贩卖道具，或是日常消耗道具；返回物品的价格，方便商店增加金钱
        float price;
        int index = search(bag, name);//search查找物品是否存在，如果存在返回其序号
        if (bag.get(index).getNumber() >= number) {//如果该物品数量大于减少数量
            bag.get(index).setNumber(-number);
            price = bag.get(index).getPrice() / 2;//贩卖价格减半；
        } else {
            throw new Exception(name + "不足，不能进行此操作");//抛出异常
        }
        return price;
    }

    public static Goods factory(String name) throws Exception {// 工厂类，当增加新商品时，修改此方法
        Goods goods = null;
        goods = (Goods) Class.forName(Goods.class.getName().replace("Goods", name)).getConstructor().newInstance();
        return goods;
    }

}
