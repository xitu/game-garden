<template>
    <el-drawer
            v-model="manMachineList"
            title="人机榜TOP20"
            :direction="direction"
    >
        <span>
            <el-table :data="manMachineTableData" stripe style="width: 100%">
                <el-table-column type="index" width="50"/>
                <el-table-column prop="username" label="用户名">
                   <template #default="scope">
                    <el-icon v-if="scope.$index === 0" size="20" color="gold"><medal/></el-icon>
                        <el-icon v-else-if="scope.$index === 1" size="20" color="silver"><medal/></el-icon>
                         <el-icon v-else-if="scope.$index === 2" size="20" color="#F7BE81"><medal/></el-icon>
                         <el-icon v-else size="20"></el-icon>
                       {{scope.row.username}}
                    </template>
                </el-table-column>
                <el-table-column prop="integral" label="积分"/>
             </el-table>
        </span>
    </el-drawer>

    <el-drawer
            v-model="onlineList"
            title="天梯榜TOP20"
    >
        <el-table :data="onlineTableData" stripe style="width: 100%">
            <el-table-column type="index" width="50"/>
            <el-table-column prop="username" label="用户名">
                <template #default="scope">
                    <el-icon v-if="scope.$index === 0" size="20" color="gold">
                        <medal/>
                    </el-icon>
                    <el-icon v-if="scope.$index === 1" size="20" color="silver">
                        <medal/>
                    </el-icon>
                    <el-icon v-if="scope.$index === 2" size="20" color="#F7BE81">
                        <medal/>
                    </el-icon>
                    {{scope.row.username}}
                </template>
            </el-table-column>
            <el-table-column prop="integral" label="积分"/>
        </el-table>
    </el-drawer>
    <div class="common-layout" id="parentIndex">
        <el-container v-show="showIndex">
            <el-main>
                <img alt="Vue logo" src="../assets/gobang.png">

                <h1> 五子棋大作战 </h1>

                <h3>模式选择</h3>
                <ul>
                    <li>
                        <el-button type="success" round @click="manMachineModel('manAndComputer')">人机模式</el-button>
                    </li>
                    <li>
                        <el-button type="success" round @click="toOnlinePlay()">对战模式</el-button>
                    </li>
                </ul>

                <h3>排行榜</h3>
                <ul>
                    <li>
                        <el-link @click="getManMachineList()">
                            <el-icon size="20" color="gold">
                                <medal/>
                            </el-icon>
                            人机榜
                        </el-link>
                    </li>
                    <li>
                        <el-link @click="getOnlineList()">
                            <el-icon size="20" color="gold">
                                <medal/>
                            </el-icon>
                            天梯榜
                        </el-link>
                    </li>
                </ul>
            </el-main>
        </el-container>

        <el-container v-show="showDetail" style="background: #F7F2E0">
            <el-container style="margin-top:80px">
                <el-aside width="300px">
                    <div>
                        <el-avatar :size="100" id="myimg"
                                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        />
                    </div>
                    <el-footer>
                        <h4>玩家：{{ username }}</h4>
                        <h4>执黑子</h4>

                        <el-main v-show="black">
                            <h3>倒计时：<span style="color: #42b983">{{ seconds}}</span> 秒</h3>
                        </el-main>


                    </el-footer>
                </el-aside>

                <el-main>
                    <canvas width="750" height="800" ref="canvas" id="canvas"
                            @mousedown="canvasDown($event)"
                    ></canvas>
                </el-main>
                <el-aside width="300px">

                    <el-header height="500px">
                        <div>
                            <el-avatar :size="100"
                                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            />
                        </div>
                        <h4>电脑</h4>
                        <h4>执白子</h4>

                        <el-main v-show="white">
                            <h3>倒计时：<span style="color: #42b983">{{ seconds}}</span> 秒</h3>
                        </el-main>


                    </el-header>
                    <el-main>
                        <el-row>
                            <el-col>
                                <el-button type="primary" @click="restart()">重开一局</el-button>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 20px">
                            <el-col>
                                <el-button type="success" @click=" returnIndex">返回首页</el-button>
                            </el-col>
                        </el-row>


                    </el-main>
                </el-aside>
            </el-container>

        </el-container>

    </div>

    <el-dialog v-model="showLogin" title="欢迎登陆"
               width="15%"
               top="350px">
       <span class="dialog-footer">

           <el-form ref="loginForm" :model="form" :rules="rules" v-loading="loading" class="login-box"
                    style="display: inline-block">
              <el-form-item prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
              </el-form-item>

               <el-button type="primary" v-on:click="onSubmit('loginForm')" style="width:100%">登录</el-button>
               <div style="float:left;">
                   <el-link type="primary" @click="register">注册</el-link>
               </div>
            </el-form>
          </span>
    </el-dialog>

    <el-dialog v-model="showRegister" title="欢迎注册"
               width="15%"
               top="350px">
       <span class="dialog-footer">

           <el-form ref="registerForm" :model="regForm" :rules="regRules" v-loading="loading"
                    style="display: inline-block">
              <el-form-item prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="regForm.username"/>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="regForm.password"/>
              </el-form-item>

               <el-button type="primary" v-on:click="registerSubmit('registerForm')" style="width:100%">注册</el-button>
            </el-form>
          </span>
    </el-dialog>

    <el-dialog v-model="checkFirstOrAfter" title="选择先后手"
               width="15%"
               top="350px"
               :close-on-click-modal="false"
               :show-close="false"
               :close-on-press-escape="false">
       <span class="dialog-footer">

            <el-button type="success" @click="firstOrAfter('first')">先手</el-button>
            <el-button type="success" @click="firstOrAfter('after')">后手</el-button>
          </span>
    </el-dialog>

    <el-dialog v-model="result" title="对局结束"
               width="15%"
               top="350px"
               :close-on-click-modal="false">
        {{ resultMsg}}
    </el-dialog>
</template>

<script>
    import {Medal} from '@element-plus/icons-vue'
    import {login, register} from '../apis/login'
    import {getToken, getUsername, setToken, setUsername} from "../utils/auth";
    import {ElMessageBox, ElNotification} from 'element-plus'
    import {robot} from "../apis/chess";
    import router from "../router";
    import {pageList, updateIntegral} from "../apis/integral";

    export default {
        components: {
            Medal
        },
        data() {
            return {
                manMachineTableData: [],
                onlineTableData: [],
                direction: 'ltr',
                manMachineList: false,
                onlineList: false,
                // online: false,
                currentWhiteChessColor: "#CEF6F5",
                whiteChessX: null,
                whiteChessY: null,
                whiteChessColor: "#FAFAFA",
                timer: null,
                model: '',
                resultMsg: '',
                successMsg: '恭喜您，获得胜利，获得100积分',
                failedMsg: '很遗憾，请再接再厉，扣除10积分',
                result: false,
                currentChess: null, // 1 黑 2 白
                black: false,
                white: false,
                seconds: 30,
                username: getUsername(),
                firstOrAfterFlag: '',
                checkFirstOrAfter: false,
                chessPosition: [],
                chessPositionArr: [],
                ctx: null,
                showDetail: false,
                showIndex: true,
                showLogin: false,
                showRegister: false,
                loading: false,
                form: {
                    username: '',
                    password: ''
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                },
                regForm: {
                    username: '',
                    password: ''
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                regRules: {
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                },
            }
        },
        mounted() {
            let container = document.getElementById("canvas");
            this.ctx = container.getContext("2d");
            window.addEventListener('load', () => { // 滚动事件变为 scroll
                let parentIndex = document.getElementById("parentIndex");
                parentIndex.style.display = "";
                router.push("/")
            })

            // this.init()
        },
        methods: {

            getManMachineList() {
                this.manMachineList = true;
                pageList({type: "manMachine", page: 1, limit: 20}).then((res) => {
                    if (res.code === 0) {
                        this.manMachineTableData = res.data.records
                        console.log(this.manMachineTableData)
                    }
                })
            },
            getOnlineList() {
                this.onlineList = true;
                pageList({type: "online", page: 1, limit: 20}).then((res) => {
                    if (res.code === 0) {
                        this.onlineTableData = res.data.records
                        console.log(this.manMachineTableData)
                    }
                })
            },
            init() {
                if (getToken() && getUsername()) {
                    this.username = getUsername();
                    this.showIndex = false;
                    this.showDetail = true;
                    this.checkFirstOrAfter = true;
                    this.draw();
                }
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
            canvasDown(e) {
                if (this.currentChess === '1') {
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
                    }else{
                        return;
                    }

                    let y = canvasY % 50
                    if (y < 25) {
                        canvasY = canvasY - y;
                    } else if (y > 25) {
                        canvasY = canvasY + (50 - y);
                    }else{
                        return;
                    }
                    if (this.chessPosition.indexOf(canvasX + ',' + canvasY) < 0) {
                        this.chessPosition.push(canvasX + ',' + canvasY)
                        this.chessPositionArr[canvasX / 50][canvasY / 50] = this.currentChess;
                        if (this.currentChess === '1') {
                            this.drawBlackChess(canvasX, canvasY)
                            this.checkFiveChess(canvasX, canvasY);
                            this.currentChess = '2'
                            this.seconds = 30;
                            this.black = false;
                            this.white = true;

                        } else {
                            this.drawWhiteChess(canvasX, canvasY, this.currentWhiteChessColor)
                            this.checkFiveChess(canvasX, canvasY);
                            this.currentChess = '1'
                            this.seconds = 30;
                            this.black = true;
                            this.white = false;
                        }
                        // ai操作
                        if (this.currentChess === '2') {
                            this.robot();
                        }
                    } else {
                        console.log("当前位置已被占据")
                    }
                }
            },
            robot() {
                robot({"chessPosition": this.chessPositionArr}).then((res) => {
                    if (res.code === 0) {
                        let s = res.data;
                        if (!s) {
                            s = res.data;
                        }
                        if (!this.checkFirstOrAfter) {
                            // ElNotification({
                            //     title: 'Success',
                            //     message: "玩家回合",
                            //     type: 'success',
                            // })

                            let split = s.split(",");
                            this.chessPosition.push(split[0] * 50 + ',' + split[1] * 50)
                            this.chessPositionArr[split[0]][split[1]] = this.currentChess;
                            this.drawWhiteChess(split[0] * 50, split[1] * 50, this.currentWhiteChessColor)
                            this.checkFiveChess(split[0] * 50, split[1] * 50);
                            this.currentChess = '1'
                            this.seconds = 30;
                            this.black = true;
                            this.white = false;
                        }
                    }
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
                if (this.whiteChessX !== null && this.whiteChessY !== null) {
                    this.drawWhiteChess(this.whiteChessX, this.whiteChessY, this.whiteChessColor)
                }
            },
            drawWhiteChess(x, y, color) {
                // 画白棋子
                this.ctx.beginPath();
                this.ctx.fill();
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.strokeStyle = color;
                this.ctx.arc(x + 25, y + 25, 12, 0 * Math.PI, 2 * Math.PI, true);
                this.ctx.fill();
                this.ctx.lineWidth = 10;
                this.ctx.stroke();
                this.whiteChessX = x;
                this.whiteChessY = y;
            },
            register() {
                this.showLogin = false;
                this.showRegister = true;
            },
            manMachineModel(s) {
                if (!getToken("token") || !getUsername("_username")) {
                    this.showLogin = true;
                } else {
                    this.model = s;
                    this.init()
                }
            },
            onSubmit(formName) {
                // 为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        login(this.form).then((res) => {
                            if (res.code === 0) {
                                this.showLogin = false;
                                setToken(res.data.token);
                                setUsername(res.data.username);
                                ElNotification({
                                    title: 'Success',
                                    message: res.msg,
                                    type: 'success',
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });

            },
            registerSubmit(formName) {
                // 为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        register(this.regForm).then((res) => {
                            if (res.code === 0) {
                                this.showRegister = false;
                                setToken(res.data.token);
                                setUsername(res.data.username);
                                ElNotification({
                                    title: 'Success',
                                    message: res.msg,
                                    type: 'success',
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });

            },
            setCountdown() {
                if (this.seconds > 0) {
                    this.seconds -= 1;
                } else {
                    // 对方获胜
                    clearInterval(this.timer)
                    this.whiteChessX = null;
                    this.whiteChessY = null;
                    this.black = false;
                    this.white = false;
                    this.seconds = 30;
                    this.chessPositionArr = []
                    this.chessPosition = []
                    // this.result = true;
                    if (this.currentChess == 1) {
                        this.resultMsg = "时间到，您输了";
                        updateIntegral({username: this.username, type: "manMachine", integral: -10}).then((res) => {
                            if (res.code === 0) {

                            }
                        })
                    } else {
                        this.resultMsg = "时间到，恭喜您赢了";
                        updateIntegral({username: this.username, type: "manMachine", integral: 100}).then((res) => {
                            if (res.code === 0) {

                            }
                        })
                    }
                    ElMessageBox.confirm(
                        '您想要再来一局吗？',
                        this.resultMsg,
                        {
                            confirmButtonText: '再来一局',
                            cancelButtonText: '返回首页',
                            type: 'success',
                        }
                    )
                        .then(() => {
                            this.draw();
                            this.checkFirstOrAfter = true;
                        })
                        .catch(() => {
                            //返回首页
                            location.reload()
                        })
                }
            },
            firstOrAfter(s) {
                this.firstOrAfterFlag = s;
                this.checkFirstOrAfter = false;
                // 玩家先手
                if (s === 'first') {
                    this.currentChess = '1',
                        this.black = true;
                    this.timer = setInterval(this.setCountdown, 1000);
                } else {
                    this.currentChess = '2',
                        this.white = true;
                    this.timer = setInterval(this.setCountdown, 1000);

                    this.drawWhiteChess(350, 350, this.currentWhiteChessColor)
                    this.chessPosition.push(350 + ',' + 350)
                    this.chessPositionArr[7][7] = this.currentChess;
                    this.currentChess = '1'
                    this.seconds = 30;
                    this.black = true;
                    this.white = false;
                }
            },
            checkFiveChess(x, y) {
                x = x / 50;
                y = y / 50;
                // 纵向胜利
                let row = this.chessPositionArr[x].join('')
                if (row.indexOf("22222") > -1 || row.indexOf("11111") > -1) {
                    this.win();
                }
                // 横向胜利
                let col = [];
                for (let i = 0; i < 15; i++) {
                    col.push(this.chessPositionArr[i][y]);
                }
                col = col.join('')
                if (col.indexOf("22222") > -1 || col.indexOf("11111") > -1) {
                    this.win();
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
                if (backSlash.indexOf("22222") > -1 || backSlash.indexOf("11111") > -1) {
                    this.win();
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
                if (slash.indexOf("22222") > -1 || slash.indexOf("11111") > -1) {
                    this.win();
                }
            },
            win() {
                clearInterval(this.timer)
                this.black = false;
                this.white = false;
                this.seconds = 30;
                this.chessPositionArr = []
                this.chessPosition = []
                this.whiteChessY = null
                this.whiteChessX = null
                if (this.currentChess === "1") {
                    this.resultMsg = this.successMsg;
                    //更新积分
                    updateIntegral({username: this.username, type: "manMachine", integral: 100}).then((res) => {
                        if (res.code === 0) {

                        }
                    })
                } else {
                    this.resultMsg = this.failedMsg;
                    //更新积分
                    updateIntegral({username: this.username, type: "manMachine", integral: -10}).then((res) => {
                        if (res.code === 0) {

                        }
                    })
                }
                ElMessageBox.confirm(
                    '您想要再来一局吗？',
                    this.resultMsg,
                    {
                        confirmButtonText: '再来一局',
                        cancelButtonText: '返回首页',
                        type: 'success',
                    }
                )
                    .then(() => {
                        this.draw();
                        this.checkFirstOrAfter = true;
                    })
                    .catch(() => {
                        //返回首页
                        location.reload()
                    })
            },
            restart() {
                clearInterval(this.timer)
                this.black = false;
                this.white = false;
                this.seconds = 30;
                this.chessPositionArr = []
                this.chessPosition = []
                this.whiteChessY = null
                this.whiteChessX = null
                this.whiteChessX = null
                this.whiteChessY = null
                this.draw();
                this.checkFirstOrAfter = true;
            },
            returnIndex() {
                //返回首页
                location.reload()
            },
            toOnlinePlay() {
                if (!getToken("token") || !getUsername("_username")) {
                    this.showLogin = true;
                } else {
                    this.showIndex = "false";
                    // router.push("/OnlinePlay");
                    router.push({name: 'OnlinePlay', params: {flag: true}})
                }


            }
        },
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

</style>
