
## 前言

本文将实现一个网页版贪吃蛇小游戏，技术栈选用当前热门的 `Vite` + `Vue3` + `Ts`。

👉👉 [在线试玩](http://game.duwanyu.com/GreedySnake/index.html) 👉👉 [源码地址](https://github.com/alanhzw/warbler-games)

建议结合源码阅读本文，效果更佳哦 ~

## 游戏截图


![未标题-1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96f72b09f419428eb3196df2092f705a~tplv-k3u1fbpfcp-watermark.image?)


![61.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6f9d0ceb196419e91b327b4b7d3beda~tplv-k3u1fbpfcp-watermark.image?)


![11.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9890cf853384d229d6bc94ecd900925~tplv-k3u1fbpfcp-watermark.image?)

## 目录结构
```js
├── src
     ├── assets      // 存放静态资源
     ├── components  // vue组件
     │    ├── Cell.vue         // 每一个小方块
     │    ├── Controller.vue   // 游戏控制器
     │    ├── KeyBoard.vue     // 移动端软键盘
     │    └── Map.vue          // 地图组件
     ├── game       // 游戏核心逻辑
     │    ├── GameControl.ts  // 控制器类
     │    ├── Food.ts         // 食物类
     │    ├── Snake.ts        // 蛇类
     │    ├── hit.ts          // 碰撞的逻辑
     │    ├── render.ts       // 渲染视图的逻辑
     │    ├── map.ts          // 跟地图相关的逻辑
     │    └── index.ts        // 主流程
     ├── types      // TS类型
     ├── utils      // 工具函数
     ├── main.ts    // 主入口文件
     └── App.vue    // vue根组件

         ......
```

## 项目实践细节

[【游戏创意大赛】Vue3 + TS 实现贪吃蛇 (可玩)](https://juejin.cn/editor/drafts/7085970673780129823)


## 结语

喜欢的小伙伴不要忘了点赞和 **star** 哦 ~
