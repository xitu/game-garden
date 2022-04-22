# 项目简介


## 它是什么

游戏讲述的是一个小女生被恶魔诅咒找不到家了，她听说收集七龙珠可以召唤神龙，神龙可是帮她实现回家的愿望，于是她开启了她的冒险故事

所以此项目是基于这个故事做成的 3D 冒险游戏，可以通过控制人物来寻找龙珠，召唤神龙


## 技术栈


这个游戏使用了以下技术
1. `vite` + `React`+ `jsx`
2. 基于 `Three.js` 的 `lingo3d` 

以及使用了以下工具：
1. `sketchfab`： 3D模型下载
2. `mixamo`：3D人物动作绑定及动画
3. `readyplayer`：3D角色生产工具
4. `gltf.report`：模型压缩
5. `polyhaven`：hdr素材库(环境贴图)
6. `textures`：材质贴图素材




# 快速体验

1. 下载项目：git clone https://github.com/xitu/game-garden.git
2. 安装依赖：在项目的根目录下，运行命令`yarn`
3. 启动项目：运行`yarn dev`

即可进入：http://localhost:3000/

在游戏中可以通过w、s键以及鼠标灵活控制人物的移动来寻找龙珠，当找到一颗龙珠后，可以单击鼠标点亮龙珠，当所有龙珠被找到，神龙就就会出现，点击神龙即可带你回家。详细过程如下：


# 游戏过程
## 1. 通过按键和鼠标控制角色移动
### w键：向前跑


![20.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f52e114a2c934f49b708d172e9b6e156~tplv-k3u1fbpfcp-watermark.image?)

### s键：向后走


![21.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1468bfc5b3aa4eb5a22ae9f88ad011bd~tplv-k3u1fbpfcp-watermark.image?)


### 鼠标：移动鼠标可控制方向


![23.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/794b6080a95b415cb4dc51d2d55911e4~tplv-k3u1fbpfcp-watermark.image?)

### 空格：跳跃


![22.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64e1858e4c1d4889a10351726c37d7e8~tplv-k3u1fbpfcp-watermark.image?)

## 2. 寻找七龙珠
当看到龙珠时，对准并按下鼠标即可标记此龙珠已经找到，然后继续找下一颗


![24.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe371e8781914d8ab1e52a4a38224387~tplv-k3u1fbpfcp-watermark.image?)

当所有龙珠被找到时，会提示地图某处会出现龙

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/987d4504cb0e435a83ec3ef9a6744c67~tplv-k3u1fbpfcp-watermark.image?)


## 3. 寻找龙

当提示地图某处出现龙时，就去寻找龙

此龙如图所示


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86f00ce14e75479f80dc40acbdad4894~tplv-k3u1fbpfcp-watermark.image?)

但是到这没有结束，此龙非真的神龙

## 4. 真神龙出现
点击小龙，小龙会消失，真的神龙出现


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/234c02c1c383489ea8a8ada53b260178~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c51e329da28844089541a25531c28929~tplv-k3u1fbpfcp-watermark.image?)

点击神龙，一会就会实现回家的愿望

## 5. 回到家

到这就会回到家了，如下


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1e1718f41ee44e09544bb00d2bcaa0a~tplv-k3u1fbpfcp-watermark.image?)


而且家附近会出现我们找到的龙珠


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80cfa538eed343f5b5e5dcd0f6c6bfda~tplv-k3u1fbpfcp-watermark.image?)

## 最后
 最后能回到家，肯定开心啦
 
 所以按住d键，开始跳舞吧
 
 
# 项目实践细节

具体实践细节见下文：


[别卷了，快来玩 | React+Three.js 实现一个超好玩的3D游戏：美女与龙珠](https://juejin.cn/post/7087730315531141128)
