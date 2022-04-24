/********************************* MGOBE 服务的封装层，待扩展 ************************************/
declare namespace egret {
    class Mgobe {
        /**
        * @name 房间对象
        * @description 管理的MGOBE.Room实例
        */
        private room;
        /**
        * @name 创建房间的游戏信息
        * @description MGOBE.types.GameInfoPara
        */
        private readonly gameInfo;
        /**
        * @name MGOBE引擎参数配置信息
        * @description MGOBE.types.ConfigPara
        */
        private readonly config;
        /**
        * @name 表达本次应用启动的唯一标志
        * @description 标记端，不标记玩家
        */
        readonly clientid: string;
        /**
        * @name MGOBE的playerid
        * @description
        */
        playerid: string;
        /**
        * @name 是否作为主机？
        * @description 创建房间的人，就是主机
        */
        isHost: boolean;
        /**
        * @name 记录startFrameSync完成
        * @description
        */
        startFrameSyncSuccess: boolean;
        /**
        * @name 帧同步的“帧数设置”
        * @description
        */
        frameRate: number;
        /**
        * @name 接收到的帧数据
        * @description
        */
        readonly frames: MGOBE.types.Frame[];
        /**
         * @name 构造器
         * @description 实例化本对象，需要MGOBE.types.GameInfoPara，MGOBE.types.ConfigPara和对本次运行的唯一标示
         * @param {MGOBE.types.GameInfoPara} gameInfo 创建房间的游戏信息
         * @param {MGOBE.types.ConfigPara} config MGOBE引擎参数配置信息
         * @param {string} clientid 表达本次应用启动的唯一标志
         * @returns {void}
         */
        constructor(gameInfo: MGOBE.types.GameInfoPara, config: MGOBE.types.ConfigPara, clientid: string);
        /**
         * @name 初始化
         * @description 实例化之后，必须调用
         * @returns {Promise<MGOBE.types.ResponseEvent<null>>}
         */
        init(): Promise<MGOBE.types.ResponseEvent<null>>;
        /**
         * @name 创建房间
         * @description 创建房间
         * @param {MGOBE.types.CreateRoomPara} createRoomPara 创建参数
         * @returns {Promise<MGOBE.types.ResponseEvent<MGOBE.types.CreateRoomRsp>>}
         */
        createRoom(createRoomPara: MGOBE.types.CreateRoomPara): Promise<MGOBE.types.ResponseEvent<MGOBE.types.CreateRoomRsp>>;
        /**
         * @name 获得当前运行的房间列表
         * @description 获得当前运行的房间列表
         * @param {MGOBE.types.GetRoomListPara} getRoomListPara 获取目标参数
         * @returns {Promise<MGOBE.types.ResponseEvent<MGOBE.types.GetRoomListRsp>>}
         */
        getRoomList(getRoomListPara: MGOBE.types.GetRoomListPara): Promise<MGOBE.types.ResponseEvent<MGOBE.types.GetRoomListRsp>>;
        /**
         * @name 加入房间
         * @description 加入房间
         * @param {string} roomid 房间唯一标志
         * @param {MGOBE.types.JoinRoomPara} joinRoomPara 加入的玩家信息
         * @returns {Promise<MGOBE.types.ResponseEvent<MGOBE.types.JoinRoomRsp>>}
         */
        joinRoom(roomid: string, joinRoomPara: MGOBE.types.JoinRoomPara): Promise<MGOBE.types.ResponseEvent<MGOBE.types.JoinRoomRsp>>;
        /**
         * @name 启动帧同步
         * @description 启动帧同步
         * @param {(event: MGOBE.types.BroadcastEvent<MGOBE.types.RecvFrameBst>) => any} outOnRecvFrameCallback 给外部调用的回调函数
         * @returns {Promise<MGOBE.types.ResponseEvent<MGOBE.types.StartFrameSyncRsp>>}
         */
        startFrameSync(outOnRecvFrameCallback: (event: MGOBE.types.BroadcastEvent<MGOBE.types.RecvFrameBst>) => any): Promise<MGOBE.types.ResponseEvent<MGOBE.types.StartFrameSyncRsp>>;
        /**
         * @name 将数据压入发送队列
         * @description 压入数据，等MGOBE定时发送
         * @param {any} frame 发送数据
         * @returns {void}
         */
        sendFrame(frame: any): void;
    }
}
