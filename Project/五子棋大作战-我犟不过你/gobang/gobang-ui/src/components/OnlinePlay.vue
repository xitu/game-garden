<template>
    <el-container style="background: #F7F2E0">
        <el-container >
            <el-aside width="300px">
                <el-header height="120px" >

                </el-header>
                <div>
                    <el-avatar :size="100" id="myimg"
                               src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                </div>
                <el-footer>
                    <h4>我：{{ username }}</h4>
                    <h4>{{ chessColor}}</h4>



                </el-footer>
            </el-aside>

            <el-main>


                <el-row style="margin-top: 20px">
                    <el-col :span="12">
                        <h2><span style="color: #42b983">{{currentChess === '1' ? "黑方":"白方"}} </span> 倒计时：<span style="color: #42b983">{{ seconds}}</span> 秒</h2>

                    </el-col>
                    <el-col :span="12">
                        <el-main>

                            <el-button type="success" @click=" returnIndex">认输</el-button>
                        </el-main>
                    </el-col>
                </el-row>
                <canvas width="750" height="800" ref="canvas" id="canvas"
                        @mousedown="canvasDown($event)"
                ></canvas>
            </el-main>
            <el-aside width="300px">

                    <el-header height="120px" >

                    </el-header>
                    <div>
                        <el-avatar :size="100"
                                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        />
                    </div>
                    <h4>对手：{{ playerUsername }}</h4>
                    <h4>{{ playerChessColor}}</h4>
            </el-aside>
        </el-container>
        <el-dialog v-model="showMatch" title="正在为您匹配玩家，请稍候..."
                   width="20%"
                   top="350px"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :close-delay="1000"
                   :show-close="false">
                           <span class="dialog-footer">
                              <el-main v-loading="matchLoading">
                                  <h3>{{matchMsg}}</h3>
                              </el-main>
                              </span>
            <el-button @click="cancelMatch">取消匹配</el-button>
        </el-dialog>
    </el-container>


</template>

<script>

    import {getMurmur, getToken, getUsername, setMurmur} from "../utils/auth";
    import {ElMessageBox, ElNotification} from "element-plus";
    import router from "../router";
    import {matching} from "../apis/online";
    import {updateIntegral} from "../apis/integral";
    import Fingerprint2 from 'fingerprintjs2';

    export default {
        data() {
            return {
                timer: null,
                websocket: null,
                msg: {
                    canvasX: null,
                    canvasY: null,
                    playerUsername: null,
                    currentChess: null,
                    returnIndex: null,
                    murmur: getMurmur()
                },
                chessColor: "执黑子",
                playerChessColor: "执白子",
                first: "",
                matchMsg: "匹配中",
                playerUsername: "",
                matchLoading: false,
                showMatch: true,
                webSocketUrl: process.env.VUE_APP_WEBSOCKET_URL,
                whiteChessColor: "#FAFAFA",
                currentWhiteChessColor: "#CEF6F5",
                resultMsg: '',
                successMsg: '恭喜您，获得胜利，获得100积分',
                failedMsg: '很遗憾，请再接再厉，扣除10积分',
                result: false,
                currentChess: null, // 1 黑 2 白
                black: false,
                white: false,
                seconds: 30,
                username: getUsername(),
                chessPosition: [],
                chessPositionArr: [],
                ctx: null,
            }
        },
        mounted() {
            this.getMurmur();
            if (!getUsername() || !getToken()) {
                // router.push({ path: '/', query: { showIndex: 'true'  }}).
                router.push("/home")
            }
            if (this.$route.params.flag){
                let parentIndex = document.getElementById("parentIndex");
                parentIndex.style.display = "none";
                // this.initWebSocket();
                this.matchPlayer();
            }
            clearInterval(this.timer)



        },
        methods: {
            //获取浏览器唯一标识
            getMurmur() {
                Fingerprint2.get(function (components) {
                    const values = components.map(function (component, index) {
                        if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
                            return component.value.replace(/\bNetType\/\w+\b/, '')
                        }
                        return component.value
                    })
                    // 生成最终id murmur
                    setMurmur(Fingerprint2.x64hash128(values.join(''), 31))
                });
            },
            cancelMatch() {
                this.websocket.close();
                router.push("/home")
            },
            matchPlayer() {
                matching({username: getUsername()}).then((res) => {
                    if (res.code === 0 && res.data === 201) {
                        this.matchLoading = true;
                        let container = document.getElementById("canvas");
                        this.ctx = container.getContext("2d");
                        this.draw();
                        this.currentChess = "1";
                        this.initWebSocket();
                    }
                })
            },
            draw() {
                // 画棋盘
                this.ctx.beginPath();
                this.ctx.fillStyle = "#F7BE81";
                this.ctx.rect(0, 0, 750, 750);
                this.ctx.fill();
                for (let i = 0; i < 15; i++) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = "#2E2E2E";
                    this.ctx.lineWidth = 2;
                    this.ctx.moveTo(25 + i * 50, 25); //垂直方向画15根线，相距30px;
                    this.ctx.lineTo(25 + i * 50, 725);
                    this.ctx.stroke();
                    this.ctx.moveTo(25, 25 + i * 50); //水平方向画15根线，相距30px;
                    this.ctx.lineTo(725, 25 + i * 50);
                    this.ctx.stroke();

                    this.chessPositionArr.push(new Array(15).fill(0));
                }
            },
            returnIndex() {
                ElMessageBox.confirm(
                    '确定要将胜利拱手送人吗? 会扣除您10积分！',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                )
                    .then(() => {
                        updateIntegral({username: this.username,type: "online",integral: -10}).then((res) => {
                            if (res.code === 0) {
                                //返回首页
                                clearInterval(this.timer)
                                this.msg.playerUsername = this.playerUsername;
                                this.msg.returnIndex = true;
                                this.websocketsend(JSON.stringify(this.msg));
                                this.websocket.close();
                                router.push("/home")
                            }
                        })
                    })
                    .catch(() => {
                    })

            },
            drawBlackChess(x, y) {
                // 画黑棋子
                this.ctx.beginPath();
                this.ctx.fill();
                this.ctx.fillStyle = "#060000";
                this.ctx.beginPath();
                this.ctx.strokeStyle = "#060000";
                this.ctx.shadowBlur = 15;
                this.ctx.arc(x + 25, y + 25, 12, 0 * Math.PI, 2 * Math.PI, true);
                this.ctx.fill();
                this.ctx.lineWidth = 10;
                this.ctx.stroke();

            },
            drawWhiteChess(x, y) {
                // 画白棋子
                this.ctx.beginPath();
                this.ctx.fill();
                this.ctx.fillStyle = this.whiteChessColor;
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.whiteChessColor;
                this.ctx.arc(x + 25, y + 25, 12, 0 * Math.PI, 2 * Math.PI, true);
                this.ctx.fill();
                this.ctx.lineWidth = 10;
                this.ctx.stroke();
            },
            canvasDown(e) {
                if (this.first + "" === this.username + "") {
                    let canvasX = e.offsetX;
                    let canvasY = e.offsetY;

                    if (canvasY < 25 || canvasX < 25 || canvasY > 725 || canvasX > 725) {
                        return;
                    }
                    canvasX -= 25;
                    canvasY -= 25;
                    let x = canvasX % 50
                    if (x < 25) {
                        canvasX = canvasX - x;
                    } else if (x > 25) {
                        canvasX = canvasX + (50 - x);
                    }

                    let y = canvasY % 50
                    if (y < 25) {
                        canvasY = canvasY - y;
                    } else if (y > 25) {
                        canvasY = canvasY + (50 - y);
                    }
                    if (this.chessPosition.indexOf(canvasX + ',' + canvasY) < 0) {
                        this.chessPosition.push(canvasX + ',' + canvasY)
                        this.chessPositionArr[canvasX / 50][canvasY / 50] = this.currentChess;
                        if (this.currentChess === '1') {
                            this.drawBlackChess(canvasX, canvasY)
                            this.first = this.playerUsername;

                            this.msg.canvasX = canvasX;
                            this.msg.canvasY = canvasY;
                            this.msg.playerUsername = this.playerUsername;
                            this.msg.currentChess = '2';
                            this.websocketsend(JSON.stringify(this.msg));
                            this.currentChess = '2'
                            this.checkFiveChess(canvasX, canvasY);
                            this.seconds = 30;
                            this.black = false;
                            this.white = true;
                        } else {
                            this.drawWhiteChess(canvasX, canvasY)
                            this.first = "";
                            this.msg.canvasX = canvasX;

                            this.msg.canvasY = canvasY;
                            this.msg.playerUsername = this.playerUsername;
                            this.msg.currentChess = '1';
                            this.websocketsend(JSON.stringify(this.msg));
                            this.currentChess = '1'
                            this.checkFiveChess(canvasX, canvasY);
                            this.seconds = 30;
                            this.black = true;
                            this.white = false;
                        }
                    } else {
                        console.log("当前位置已被占据")
                    }
                } else {
                    ElNotification({
                        title: 'Success',
                        message: "对方回合",
                        type: 'success',
                    })
                }
            },
            checkFiveChess(x, y) {
                x = x / 50;
                y = y / 50;
                // 纵向胜利
                let row = this.chessPositionArr[x].join('')
                if (row.indexOf("22222") > -1) {
                    this.win("2");
                }
                if (row.indexOf("11111") > -1) {
                    this.win("1")
                }
                // 横向胜利
                let col = [];
                for (let i = 0; i < 15; i++) {
                    col.push(this.chessPositionArr[i][y]);
                }
                col = col.join('')
                if (col.indexOf("22222") > -1) {
                    this.win("2");
                }
                if (col.indexOf("11111") > -1) {
                    this.win("1")
                }
                //反斜杠胜利
                let backSlash = [];
                for (let j = 0; j < 15; j++) {
                    if (x - j >= 0 && y - j >= 0) { // 左上角
                        backSlash.unshift(this.chessPositionArr[x - j][y - j]);
                    }
                    if (j > 0 && x + j < 15 && y + j < 15) { // 右下角
                        backSlash.push(this.chessPositionArr[x + j][y + j]);
                    }
                }
                backSlash = backSlash.join('');
                if (backSlash.indexOf("22222") > -1) {
                    this.win("2");
                }
                if (backSlash.indexOf("11111") > -1) {
                    this.win("1")
                }
                //斜杠胜利
                let slash = [];
                for (let j = 0; j < 15; j++) {
                    if (x + j < 15 && y - j >= 0) { // 右上角
                        slash.unshift(this.chessPositionArr[x + j][y - j]);
                    }
                    if (j > 0 && x - j >= 0 && y + j < 15) { // 左下角
                        slash.push(this.chessPositionArr[x - j][y + j]);
                    }
                }
                slash = slash.join('');
                if (slash.indexOf("22222") > -1) {
                    this.win("2");
                }
                if (slash.indexOf("11111") > -1) {
                    this.win("1")
                }
            },
            win(s) {
                clearInterval(this.timer)
                this.black = false;
                this.white = false;
                this.seconds = 30;
                this.chessPositionArr = []
                this.chessPosition = []
                if (s === this.currentChess) {
                    this.resultMsg = this.failedMsg;
                    updateIntegral({username: this.username,type: "online",integral: -10}).then((res) => {
                        if (res.code === 0) {

                        }
                    })
                } else {
                    this.resultMsg = this.successMsg;
                    updateIntegral({username: this.username,type: "online",integral: 100}).then((res) => {
                        if (res.code === 0) {

                        }
                    })
                }
                ElMessageBox.alert('点击确定将返回首页', this.resultMsg, {
                    confirmButtonText: 'OK',
                    callback: () => {
                        clearInterval(this.timer)
                        this.websocket.close();
                        router.push("/home")
                    },
                })
            },
            //初始化websocket
            initWebSocket() {
                const wsUri = this.webSocketUrl + this.username;
                this.websock = new WebSocket(wsUri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
                this.websocket = this.websock;
            },
            websocketonopen() { //连接建立之后执行send方法发送数据
                // let actions = {"用户账号": getUsername()};
                // this.websocketsend(JSON.stringify(actions));
            },
            websocketonerror() {//连接建立失败重连
                this.initWebSocket();
            },
            websocketonmessage(e) {
                const redata = JSON.parse(e.data);
                console.log(redata)
                if (redata.playerUsername) {
                    //对方认输
                    if (redata.returnIndex){
                        updateIntegral({username: this.username,type: "online",integral: 100}).then((res) => {
                            if (res.code === 0) {

                            }
                        })
                        clearInterval(this.timer)
                        ElMessageBox.alert('点击确定将返回首页', '对方认输了，恭喜您获得胜利，获得100积分', {
                            confirmButtonText: 'OK',
                            callback: () => {
                                this.websocket.close();
                                router.push("/home")
                            },
                        })
                    }else {
                        this.first = this.username;
                        if (this.currentChess === "1") {

                            this.drawBlackChess(redata.canvasX, redata.canvasY);
                            this.chessPositionArr[redata.canvasX / 50][redata.canvasY / 50] = this.currentChess;
                            this.chessPosition.push(redata.canvasX + ',' + redata.canvasY)
                            this.checkFiveChess(redata.canvasX, redata.canvasY);
                            this.seconds = 30;

                        } else {
                            this.drawWhiteChess(redata.canvasX, redata.canvasY);
                            this.chessPositionArr[redata.canvasX / 50][redata.canvasY / 50] = this.currentChess;
                            this.chessPosition.push(redata.canvasX + ',' + redata.canvasY)
                            this.checkFiveChess(redata.canvasX, redata.canvasY);
                            this.seconds = 30;

                        }
                        this.currentChess = redata.currentChess;
                        if (this.currentChess === "1") {

                            this.seconds = 30;
                            this.black = true;
                            this.white = false;

                        }else {
                            this.seconds = 30;
                            this.black = false;
                            this.white = true;
                        }
                    }
                } else {
                    if (redata.code === 0) {
                        let user = redata.data.user;
                        this.first = redata.data.first;
                        if (this.first + "" !== this.username + "") {
                            this.chessColor = "执白子";
                            this.playerChessColor = "执黑子";
                        }
                        for (let i = 0; i < 2; i++) {
                            if (this.username+"" !== user[1][i] + "") {
                                this.playerUsername = user[1][i] + "";
                            }
                        }
                        this.matchLoading = false;
                        this.matchMsg = "匹配成功,开始游戏";
                        this.showMatch = false;
                        this.timer = setInterval(this.setCountdown, 1000);
                    }
                }
            },
            websocketsend(Data) {//数据发送
                this.websock.send(Data);
            },
            websocketclose(e) {  //关闭
                console.log('断开连接', e);
            },
            setCountdown() {
                if (this.seconds > 0) {
                    this.seconds -= 1;
                } else {
                    // 对方获胜
                    clearInterval(this.timer)
                    this.black = false;
                    this.white = false;
                    this.seconds = 30;
                    this.chessPositionArr = []
                    this.chessPosition = []
                    // this.result = true;
                    if (this.first + "" !== this.username + "") {
                        this.resultMsg = "时间到，恭喜您赢了，获得100积分";
                        updateIntegral({username: this.username,type: "online",integral: 100}).then((res) => {
                            if (res.code === 0) {

                            }
                        })
                    }else {
                        this.resultMsg = "时间到，您输了，扣除10积分";
                        updateIntegral({username: this.username,type: "online",integral: -10}).then((res) => {
                            if (res.code === 0) {

                            }
                        })
                    }
                    ElMessageBox.alert('点击确定将返回首页', this.resultMsg, {
                        confirmButtonText: 'OK',
                        callback: () => {
                            this.websocket.close();
                            router.push("/home")
                        },
                    })
                }
            },
        }
    }


</script>

