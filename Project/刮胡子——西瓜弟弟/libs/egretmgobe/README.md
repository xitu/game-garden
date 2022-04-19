# 小游戏联机对战引擎 MGOBE


* [对战引擎文档](https://cloud.tencent.com/product/mgobe/developer)

目前小游戏对战引擎仅支持在微信小游戏环境内使用。

您可以直接使用对战引擎的API，如 `MGOBE.Listener.init()`，但是在 Html5 环境下会报错。

您也可以使用我们封装的 API，`egret.Mgobe`。

白鹭封装的主要有以下方法，详细参数可以查看 `egretmgobe.d.ts`


#### init()：Promise
* 实例化之后，必须先调用该方法

#### createRoom(createRoomPara)：Promise
* 创建房间

#### getRoomList(getRoomListPara)：Promise
* 获取房间列表

#### joinRoom(roomid, joinRoomPara)：Promise
* 加入某个房间

#### startFrameSync(outOnRecvFrameCallback)：Promise
* 启动帧同步

#### sendFrame(frame)：Promise
* 将数据压入发送队列

#### clientid：string
* 本次应用启动的唯一标志

#### playerid：string
* MGOBE 的 playerid

#### isHost: boolean;
* 是否作为主机

#### frames: [];
* 是接收到的帧数据