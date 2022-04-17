# 五子棋大作战

# 项目简介：
* 前端使用 VUE +element-plus 完成用户交互
* 后台使用java完成基础服务开发，提供前端接口，逻辑运算。
* 采用mysql、redis做数据持久化

# 快速体验地址
在线体验地址：http://122.112.181.245/

## 操作简介

访问[五子棋大作战](http://122.112.181.245/)，直接进入到首页：


## 2.1 首页
访问[五子棋大作战](http://122.112.181.245/)，直接进入到首页：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee35c0d6b02c4eedb676cfc8fc49b234~tplv-k3u1fbpfcp-watermark.image?)

可以进行模式选择：
* 人机模式
* 对战模式

可以查看排行榜：
* 人机榜
* 天梯榜

## 2.2 登录注册
此处的登录注册功能，主要是为了记录玩家的得分情况。所以账号可以直接使用中文，账号即昵称，直观体现。

### 2.2.1 登录
当我们点击**人机模式**或**对战模式**，会弹出提示框，提示我们登录：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79cacf13a0c048a3b043cf4bde2b66db~tplv-k3u1fbpfcp-watermark.image?)

### 2.2.2 注册
首次进来的玩家，需要进行注册，点击上图左下角的注册按钮即可：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/004386ff4963499fb4242d32da708f47~tplv-k3u1fbpfcp-watermark.image?)

我们输入自己的账号和密码，点击注册，同时会直接登入游戏。



## 2.3 人机对战
### 2.3.1 先手 后手
完成前面的登录注册，再次点击首页的**人机对战**按钮，即可进入游戏界面，第一步您需要选择**先手或者后手**：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cb60a395615499c88bce98fd51f6884~tplv-k3u1fbpfcp-watermark.image?)

### 2.3.2 超时
我们此处点击先手，即可开始游戏，需要注意，您有**30秒**的思考时间，超时即**判输**：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/532145c05e094e99812101830f3dcfb8~tplv-k3u1fbpfcp-watermark.image?)

电脑落子需要一定的思考时间，取决于当前机器的性能，基本不会超过4到5s，电脑是不会超时的：


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee2553296abf45a9a3bde4ebca8a533b~tplv-k3u1fbpfcp-watermark.image?)

### 2.3.3 输赢提示
当您赢下此局、或失败后，会给出如下提示：
* **返回首页**则退出当前模式；
* **再来一局**，游戏重新开始，再次开始选择**先手或者后手**。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe615671b79649da9aa2e26819262e7d~tplv-k3u1fbpfcp-watermark.image?)


如果您获胜了，会得到**100积分**，输了会相应扣除**10积分**。

另外界面提供**返回首页**，和**重开一局**按钮，此两种不扣除积分。

## 2.4 在线对战
### 2.4.1 匹配
点击**对战模式**按钮，会直接进入到匹配界面：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a089ddad83c14bfe90b2290738ecd41c~tplv-k3u1fbpfcp-watermark.image?)

此过程点击**取消匹配**，则退出该模式，返回首页。

当另外玩家进入到匹配过程当中，双方会进行配对，成功后开始游戏：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/777efc6477d0460e8c22300e9c8d763d~tplv-k3u1fbpfcp-watermark.image?)

### 2.4.2 超时
进入界面后，会看到当前是黑子回合，还是白子回合，提供**倒计时提示**


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29481ae443de49afbfc5ef0f1cf239ef~tplv-k3u1fbpfcp-watermark.image?)

如若**超时**未落子，则己方输，**扣除10积分**


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e199a3b32c84f0b91dbcea40dbaa507~tplv-k3u1fbpfcp-watermark.image?)

相应的，**对方获胜**，获得**100积分**：
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27304d3fb4cb4ec1baa069834d8f5ec7~tplv-k3u1fbpfcp-watermark.image?)

### 2.4.3 认输
提供**认输**按钮：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0425f87e3bb4287ae6ad52fe3d4e6cc~tplv-k3u1fbpfcp-watermark.image?)

**认输方**，扣除**10积分**：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af9c0a50c7c146a38c0a13ee197155b3~tplv-k3u1fbpfcp-watermark.image?)

相应的，对方获得**100积分**：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25a4a90293234ca8bc052aa7d58697d6~tplv-k3u1fbpfcp-watermark.image?)

### 2.4.4 输赢提示

当前模式下，无论输赢，点击提示的**确定**，则会返回首页，想要继续，可再次点击**对战模式**进行匹配。



## 2.5 积分模块

此模块用来记录玩家的得分情况，增加游戏乐趣。

首页能看有两个超链接：


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/121307cfdfe04fe49cbf44eb1838c665~tplv-k3u1fbpfcp-watermark.image?)
### 2.5.1 人机榜
选择人机榜，则会从左侧弹出**TOP20**榜单：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab2bc6afe103472388cc3772bba0dae6~tplv-k3u1fbpfcp-watermark.image?)

### 2.5.2 天梯榜

选择天梯榜，则会从右侧弹出**TOP20**榜单：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82cd0b4831a4419aaedf0560ff93140c~tplv-k3u1fbpfcp-watermark.image?)


# 项目实践细节

https://juejin.cn/post/7084581591938252808
