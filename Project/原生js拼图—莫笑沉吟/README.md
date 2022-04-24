拼图游戏

项目简介：

名称：拼图小游戏

技术：HTML、CSS、JavaScript

通过js将图片分割然后通过拖动来实现分割块的位置交换

## 先看成品
### 游戏初始化界面

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1b960b25d944d698af2fd3866ed2c10~tplv-k3u1fbpfcp-watermark.image?)
### 轻松模式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4808b1a3c7c04f008bf0ce92f47c2398~tplv-k3u1fbpfcp-watermark.image?)
### 高级模式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0acfe3a7282c47bf90de7b97bd1d1a8e~tplv-k3u1fbpfcp-watermark.image?)
### 困难模式

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07408983aefd4d9096420c2b1be05c10~tplv-k3u1fbpfcp-watermark.image?)
## 思路
### 布局
- 将界面分为两块左边为参考图片和按钮，右边为打乱的图片块
### 选择难度
- 通过按钮选择三种难度然后根据选择的难度把图片打乱成不同的小块
    - 初级为3*3 9块
    - 高级为4*4 16块
    - 困难为6*6 36块

### 打乱图片
- 通过调用选择难度然后循环生成指定的块数然是根据块数将图片的x，y坐标打乱
### 交换图片
- 拖动判断是否下面有图片有的话交换两张图片的位置