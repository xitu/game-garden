## 项目简介
使用vue2结合BFS算法完成连连看游戏开发。
## 体验地址
JYeontuGame在线体验地址:[http://jyeontu.xyz/JYeontuGame/#/](http://jyeontu.xyz/JYeontuGame/#/)
## 本地搭建
### 1、克隆项目
将项目代码克隆到本地。
```shell
git clone 项目地址
```
### 2、安装依赖
JYeontu_Game目录和sever目录均需要安装相关依赖。
切换到对应地址执行`npm i`即可
```shell
npm i
```
### 3、导入sql
将sql目录中的sql文件导入数据库
### 4、启动服务器
需要先修改数据库配置参数，serve目录下dbConfig.js文件
修改成自己数据库对应的参数
```shell
node index.js
```
### 5、启动前端项目
```shell
npm run start
```
## 项目实现细节
[使用学过的算法做个游戏很酷的好吗](https://juejin.cn/post/7085933111308976158/)