# 安卓小游戏——开个宠物咖啡店吧！

文章链接https://juejin.cn/post/7078818057723838501

游玩方式，可以在https://github.com/Watermelon9999/PetsCoffee的Release中获取游戏最新版apk

## 介绍

​	这是一个模拟经营游戏——照顾培养你的宠物，使营业时能赚取更多钱钱（宠物的状态与天气（通过ip地址查询获取）会产生一定影响），并由此购买更多的道具，更多的宠物。与好友分享你的游戏进度，也可以访问好友的店铺留下你的留言。

​	

​	采用MVVM架构，实现了一些简单的自定义view（下拉刷新上拉加载，滑动嵌套，事件分发），有一个简单的后端来保存各种游戏数据，本地使用了room数据库，后端为spring boot+mongodb。

​	下面做一下功能的展示

## 1.登录界面

​	可以保存密码，注册与登录（因为服务器不太好，点登录可能登不进去，可以多点几次![Screenshot_2022-03-23-22-35-36-924_com.example.pe](/Users/xigua/Desktop/game-garden/game-garden/Project/宠物咖啡-Watermelon02/Screenshot_2022-03-23-22-35-36-924_com.example.pe.jpg)



## 2.游戏主界面

​	上面的游戏进度和钱是DataBinding,底部栏从左往右依次是背包，商店，营业，宠物，好友

![Screenshot_2022-03-23-22-35-49-189_com.example.pe](/Users/xigua/Desktop/game-garden/game-garden/Project/宠物咖啡-Watermelon02/Screenshot_2022-03-23-22-35-49-189_com.example.pe.jpg)

## 3.商店界面

​	花钱可以给宠物购买装备和食物，购买后有一个简单的动画

![Screenshot_2022-03-23-22-35-57-190_com.example.pe](/Users/xigua/Desktop/game-garden/game-garden/Project/宠物咖啡-Watermelon02/Screenshot_2022-03-23-22-35-57-190_com.example.pe.jpg)

![Screenshot_2022-03-23-22-36-08-387_com.example.pe](/Users/xigua/Desktop/game-garden/game-garden/Project/宠物咖啡-Watermelon02/Screenshot_2022-03-23-22-36-08-387_com.example.pe.jpg)

## 4.宠物界面

​	宠物可以抚摸（会有小💗冒出来），该界面是一个左右滑动的ViewPager。点击宠物可以洗澡（恢复清洁度）和投喂（恢复饱食度）

![Screenshot_2022-03-23-22-36-46-660_com.example.pe](/Users/xigua/Desktop/game-garden/game-garden/Project/宠物咖啡-Watermelon02/Screenshot_2022-03-23-22-36-46-660_com.example.pe.jpg)

## 5.营业开始

长按中间的![Screenshot_2022-03-23-22-37-15-320_com.example.pe](/Users/xigua/Desktop/game-garden/game-garden/Project/宠物咖啡-Watermelon02/Screenshot_2022-03-23-22-37-15-320_com.example.pe.jpg)open，待进度条满后营业开始，此处的宠物也可以抚摸



## 6.好友列表

好友列表可以查看好友和搜索用户，点击item查看用户信息。ItemTouchHelper实现的侧滑删除

![Screenshot_2022-03-23-22-37-23-430_com.example.pe](/Users/xigua/Desktop/game-garden/game-garden/Project/宠物咖啡-Watermelon02/Screenshot_2022-03-23-22-37-23-430_com.example.pe.jpg)

## 7.好友信息

​	可以添加好友和访问对方的咖啡店

![Screenshot_2022-03-23-22-37-33-244_com.example.pe](/Users/xigua/Desktop/game-garden/game-garden/Project/宠物咖啡-Watermelon02/Screenshot_2022-03-23-22-37-33-244_com.example.pe.jpg)

## 8.留言板功能

​	给好友留言，使用自定义View实现的下拉刷新，重写了CoordinatorLayout中的Behavior来实现上滑时折叠顶部栏。还有一个仿知乎的可以拖动吸附的Button

![Screenshot_2022-03-23-22-37-37-768_com.example.pe](/Users/xigua/Desktop/game-garden/game-garden/Project/宠物咖啡-Watermelon02/Screenshot_2022-03-23-22-37-37-768_com.example.pe.jpg)