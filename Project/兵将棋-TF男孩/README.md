# 项目简介
本项目是一个棋牌类游戏，名称叫"兵将棋"，源于我幼时常见的一个民间土棋种类，由我搬上软件进行创作。

兵将棋是一个安卓App，支持Android 4.4及其以上版本。看这个版本就知道它是个老App了。

其实，刚开发出来它是支持Android 1.5的，但是现在找不到1.5的SDK了，从IDE就不支持了。

它软件的安装包只有1.5M大小。是的你没有听错，1.5M。

整个项目，除了Android SDK，它没有引用任何第三方包或者框架，全部是手敲代码。可谓是初学者的样板教科书。

开发环境：Android Studio。

# 体验方式
## 下载和安装
### 方式一：
到同级目录下寻找apk安装包，下载后，安装到安卓4.4及其以上版本的智能手机即可使用。
HelloAndroid/app/release/bingjiangqi.apk

### 方式二：
百度网盘下载apk安装包后，安装到安卓4.4及其以上版本的智能手机即可使用。
下载链接: https://pan.baidu.com/s/1q2_GSfM2SM8KRemcAoUSew?pwd=shbx 提取码: shbx

## 使用说明

游戏支持单人游戏（人机对战），多人游戏（人人对战），点击即可进入。可以通过开新局，选择玩家身份，以及地图。

![人机对战.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89ad61ecf5df43ccb547daaff31e2259~tplv-k3u1fbpfcp-watermark.image?)

### 走法和规则
因为将（白棋）少兵（黑棋）多，所以将（白棋）先走，作为开局。
#### 将（白棋）的走法
将（白棋）者，骑着战马，手持长矛，可远距离斩杀士兵（黑棋）。

规则上，只允许隔1个空格吃掉敌人。

![大炮吃子.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/439c8aef740046ed96b7362e55bfb41e~tplv-k3u1fbpfcp-watermark.image?)

在无兵可杀的时候，它每次只能移动1格。它最喜欢走一步出现两个击杀对象的情况。此招式土语叫：一拉两观子，表示往下一拉，一下看着两个棋子，对方顾此失彼，自己必胜无疑。

![一拉两观子.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/016b1800295a4062a01e5a5a88495a93~tplv-k3u1fbpfcp-watermark.image?)

将（白棋）的胜利在于将对方杀的片甲不留，吃掉对方所有棋子。

![将军胜利.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fb0efd55037456797b6b99aae5d7dc7~tplv-k3u1fbpfcp-watermark.image?)

#### 兵（黑棋）的走法
兵（黑棋）者，个体单薄，会被任意斩杀，但是可以形成人肉围墙，需要依靠团队的力量取胜。

兵（黑棋）每次只能移动1格，和将（白棋）紧贴在一起是没有危险的，把将（黑棋）围堵到无路可走视为胜利。

![士兵胜利.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91e6d54e5c59481ca0106ab5d77bef86~tplv-k3u1fbpfcp-watermark.image?)

# 项目实践和说明
详细说明见：https://juejin.cn/post/7086105725511925774