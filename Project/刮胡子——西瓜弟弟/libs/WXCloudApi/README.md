# 微信小游戏数据库API


* [微信数据库API文档](https://developers.weixin.qq.com/minigame/dev/wxcloud/reference-client-api/database/)
* [H5数据库API文档](https://cloud.tencent.com/document/product/876/34662)


在微信小游戏环境，您可以直接使用微信的数据库API，如
```
wx.cloud.init({
  env: 'xxxx-yyy'
});
```

**注：如果您是在微信下直接调用 wx.cloud.xxx API，可以不使用本SDK库。**


在H5环境，您可以直接使用H5的数据库API，如 

```
const app = tcb.init({
  env: 'xxxx-yyy'
});
```

您也可以使用我们封装的 API，如`egret.wxCloud.cloud.init`。白鹭封装的 API包含了H5和微信小游戏API，会根据当前运行环境自动匹配。
需要注意的是，如果是H5环境，在调用`egret.wxCloud.cloud.init`初始化后需要立即调用`egret.wxCloud.cloud.auth`方法进行用户登录授权，参考[登录授权](https://cloud.tencent.com/document/product/876/34660)。如果是微信小游戏环境，在调用`egret.wxCloud.cloud.init`后会自动进行登录授权。