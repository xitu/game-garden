
## 项目简介

**速算王者**，也可叫**心算王者**，一个uniapp开发的微信小游戏，随机给你一些数字进行加减乘除速算，尽可能花最短时间完成全部作答，并且可以向好友发送战绩进行挑战！

## 如何快速体验

扫描下面的小程序二维码即可体验速算王者小游戏。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ada8fba1e6143879ad47f8a0a145f49~tplv-k3u1fbpfcp-watermark.image?)


既然是用于好友间的放松小游戏，整个游戏的流程就不建议设计的太复杂，而且本身小游戏重点在于社交娱乐，所以游戏的思路大致如下。

1. 玩法模式
   
   速算也叫心算，是指利用数与数之间的特殊关系进行较快的加减乘除运算，用一种思维，一种方法快速准确地掌握任意数加、减、乘、除的速算方法。考虑到娱乐性，暂时只开放了**两位数的加法**、**两位数的减法**、**两位数的乘法**以及**三位数的加法**四种游戏模式（毕竟除法和三位数的乘法对正常人来说太复杂...）每次游戏的计算数量暂定为**10个**。   
   

    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/815f4369afe84bae8d60365b926f7ab9~tplv-k3u1fbpfcp-watermark.image?)


2. 题目数据

   为保证游戏的公平性，游戏内用于速算的题目数据都来自于随机生成的数字并且不重复。

3. 游戏规则

   选择好模式进入游戏后，即可看到速算界面，你需要快速计算屏幕上给出的题目并且输入正确答案再按 OK 键，如果你的输入答案是正确的则会自动进入下一题，如果计算失败则会自动清空你的错误输入并需要你重新进行计算。如果输入有误可以点击左下角的C键进行清空。游戏右上角会记录当前耗时时长。
   
   ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b8f7986e4714d9bb39e4181f5746397~tplv-k3u1fbpfcp-watermark.image?)
   

4. 好友玩法

   在正常进行完速算游戏后，可以看到自己的完成时间，你可以分享给你自己任意的微信好友或者微信群组，在好友点击邀请链接进入游戏后即可看到他所需要挑战的时间，好友速算的题目和你的题目是一样的，并且游戏右上角会出现你需要挑战的目标时间，挑战失败后可以再次重新挑战，直到挑战成功为止。
   
    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/012411a3b8b5489d8363abef3efe6aab~tplv-k3u1fbpfcp-watermark.image?)
   

## 效果图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb1875493fc8463c82898ef26968c57a~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93b2ef65752849d39226231ac9d65bdb~tplv-k3u1fbpfcp-watermark.image?)

## 项目实践细节

[「速算王者」 简约速算小游戏，比比谁更快](https://juejin.cn/post/7083774393762971678)
