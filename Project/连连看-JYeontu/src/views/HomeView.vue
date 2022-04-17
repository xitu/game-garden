<template>
    <div class="line-block-body">
        <div id="game-content" class="game-content"></div>
        <div class="game-menu">
            <div class="game-menu-content">
                <div class="game-menu-time game-menu-item">{{ getPlayTime }}</div>
                <div class="game-menu-start game-menu-item btn" @click="startGame()">
                    {{ !setTimeFlag ? "开始" : "暂停" }}
                </div>
                <div class="game-menu-start game-menu-item btn" @click="resetGame()">
                    重新开始
                </div>
                <div class="game-menu-item username"
                    title="用户名" 
                    contenteditable="true" 
                    @blur="usernameInput" 
                    v-html="username"></div>
                <div class="game-menu-item juejin" 
                    title="掘金主页" 
                    contenteditable="true" 
                    @blur="juejinpageInput" 
                    v-html="juejinpage"></div>
            </div>
        </div>
        <div class="game-score">
          <div class="game-score-title">排行榜</div>
          <div class="game-score-table">
            <div class="game-score-tr">
              <span class="">用戶名</span>
              <span class="score">成绩</span>
              <span class="submittime">提交时间</span>
            </div>
            <div class="game-score-tr" v-for="(item,index) in scoreList" :key="'score'+index">
              <span title="去他主页" @click="goJunjin(item.juejinpage)">
                <span :style="getColor(index+1)">{{index+1}}</span>
                <span class="username">{{item.username}}</span>
              </span>
              <span class="score">{{item.score}}</span>
              <span class="submittime">{{item.submittime}}</span>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {getToday} from '../utils/dateTool'
export default {
    name: "home",
    props: {},
    data() {
        return {
            row: 10,
            column: 10,
            blockList: [],
            blockMap: [],
            imgList: [
                "https://img2.baidu.com/it/u=134769530,4268043097&fm=253&fmt=auto&app=138&f=JPEG?w=533&h=333",
                "https://img1.baidu.com/it/u=2580690117,2413329602&fm=253&fmt=auto&app=138&f=JPEG?w=642&h=500",
                "https://img2.baidu.com/it/u=3133697304,2308274678&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
                "https://img1.baidu.com/it/u=2539150145,3709425073&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711",
                "https://img2.baidu.com/it/u=3772577665,2044310843&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=727",
                "https://img0.baidu.com/it/u=3966731730,957573008&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500",
                "https://img2.baidu.com/it/u=3440095388,1687551735&fm=253&fmt=auto&app=120&f=JPEG?w=1363&h=614",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201701%2F17%2F20170117163054_C3ydM.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651752631&t=65ba649ba066495acb0bbd112920eabb",
                "https://img1.baidu.com/it/u=2912396327,2474337263&fm=253&fmt=auto&app=138&f=JPEG?w=347&h=500",
                "https://img1.baidu.com/it/u=1568155621,1811293689&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=495",
                "https://img2.baidu.com/it/u=461269782,2772059667&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
                "https://img1.baidu.com/it/u=2599508183,3079977410&fm=253&fmt=auto&app=138&f=JPEG?w=416&h=499",
                "https://img1.baidu.com/it/u=857618379,3899031461&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
                "https://img1.baidu.com/it/u=1702938387,792201763&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=447",
                "https://img1.baidu.com/it/u=1539021674,3840242491&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=246",
                "https://img0.baidu.com/it/u=3159006221,3574011460&fm=253&fmt=auto&app=120&f=JPEG?w=1067&h=800",
                "https://img2.baidu.com/it/u=451082639,696249795&fm=253&fmt=auto&app=138&f=JPEG?w=720&h=405",
                "https://img2.baidu.com/it/u=1444438974,3214886495&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img0.baidu.com/it/u=754308036,2423815123&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
                "https://img0.baidu.com/it/u=1811280816,2994744388&fm=253&fmt=auto&app=138&f=JPG?w=659&h=452",
                "https://img1.baidu.com/it/u=3819643902,1000613763&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img1.baidu.com/it/u=1303707706,2356690886&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img0.baidu.com/it/u=573627639,3491865163&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img1.baidu.com/it/u=2552181951,114177955&fm=253&fmt=auto&app=138&f=PNG?w=502&h=500",
                "https://img0.baidu.com/it/u=1688278494,1421949150&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=3149693868,1058312070&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=2003437735,1374592373&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img0.baidu.com/it/u=4068300737,290575386&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=1328092326,573376744&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img0.baidu.com/it/u=1280320387,1585665801&fm=253&fmt=auto&app=138&f=JPEG?w=368&h=368",
                "https://img0.baidu.com/it/u=1403512971,1919400898&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img0.baidu.com/it/u=707869343,3146161581&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img1.baidu.com/it/u=1473510751,3362722835&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img0.baidu.com/it/u=751714707,705901550&fm=253&fmt=auto&app=138&f=JPEG?w=559&h=500",
                "https://img2.baidu.com/it/u=3288691327,4041002989&fm=253&fmt=auto&app=138&f=JPEG?w=304&h=303",
                "https://img1.baidu.com/it/u=2172054385,2684839842&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img1.baidu.com/it/u=1879107733,3573789717&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=1720323410,218932174&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img1.baidu.com/it/u=2479779032,1379361694&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img1.baidu.com/it/u=537208727,895387248&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img1.baidu.com/it/u=3310720258,943543712&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=2165957654,3023194084&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img0.baidu.com/it/u=1446729335,4267600834&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=2922694860,2270800253&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img0.baidu.com/it/u=595403291,2269048245&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img0.baidu.com/it/u=1164365158,2722332607&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=9876582,1040648435&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            ],
            firstClick: {},
            setTimeFlag: null,
            playTime: 0,
            removeNums: 0,
            lineLists: [],
            speed: 0.2,
            baseUrl:'http://localhost:3003',
            scoreList:[],
            username:'',
            juejinpage:''
        };
    },
    created() {
        this.initData();
    },
    mounted() {
        this.initPage();
    },
    computed: {
        //将秒数转换为时分秒
        getPlayTime() {
            let playTime = this.playTime;
            let h = 0,
                m = 0,
                s = 0;
            h = Math.floor(playTime / 3600);
            playTime -= 3600 * h;
            h = h > 9 ? h : "0" + h;
            m = Math.floor(playTime / 60);
            playTime -= 60 * m;
            m = m > 9 ? m : "0" + m;
            s = playTime > 9 ? playTime : "0" + playTime;
            return h + ":" + m + ":" + s;
        }
    },
    methods: {
        //用户名绑定
        usernameInput(e){
            this.username = e.target.innerHTML;
            localStorage.setItem('lineBlockUserName',e.target.innerHTML)
        },
        //掘金主页绑定
        juejinpageInput(e){
            this.juejinpage = e.target.innerHTML;
            localStorage.setItem('lineBlockJuejinPage',e.target.innerHTML)
        },
        //获取排名颜色
        getColor(index){
            let color = 'black';
            if(index == 1) color = 'gold';
            else if(index == 2) color = 'beige';
            else if(index == 3) color = 'brown';
            return `color:${color}`
        },
        //跳转到掘金主页
        goJunjin(url){
            window.open(url,'blank')
        },
        //从数据库获取排行榜数据
        async getScoreList(){
            let res = await this.httpGet('/getscorelist');
            this.scoreList = res.data || [];
        },
        //完成游戏添加记录
        async addScore(params = {}){
            let res = await this.httpPost('/addscore',params);
        },
        //封装http.get
        async httpGet(path,params = {}){
            let res = await this.$http.get(this.baseUrl + path ,params,{emulateJSON:true});
            return res.body;
        },
        //封装http.post
        async httpPost(path,params = {}){
            let res = await this.$http.post(this.baseUrl + path, params, { emulateJSON: true });
            return res.body;
        },
        //时间计算
        setTime() {
            this.playTime++;
            this.setTimeFlag = setTimeout(() => {
                this.setTime();
            }, 1000);
        },
        //重新开始游戏
        resetGame(){
          if(confirm("确定重新开始吗？")){ 
            this.initData();
            this.initPage();
          }
        },
        //开始或暂停游戏
        startGame() {
          if(this.username.trim() == ''){
            alert('请输入用户名');
            return;
          }
          if(this.juejinpage.trim() == ''){
            alert('请输入掘金主页');
            return;
          }
            if (this.setTimeFlag) {
                clearTimeout(this.setTimeFlag);
                this.setTimeFlag = null;
            } else {
                this.setTime();
            }
        },
        //BFS找出路径
        getPath(startX, startY, targetX, targetY) {
            let dx = [0, 1, 0, -1],
                dy = [1, 0, -1, 0];
            let queue = [[startX, startY]];
            let flag = new Array(this.blockMap.length); //标记走过的路径
            let step = new Array(this.blockMap.length); //存储走过的步数
            for (let i = 0; i < flag.length; i++) {
                flag[i] = new Array(this.blockMap[i].length).fill(false);
                step[i] = new Array(this.blockMap[i].length).fill(Infinity);
            }
            step[startX][startY] = 0;
            flag[startX][startY] = true;
            while (queue.length) {
                let p = queue.shift();
                let x = p[0],
                    y = p[1];
                if (x == targetX && y == targetY) break;
                for (let i = 0; i < 4; i++) {
                    let nx = x + dx[i],
                        ny = y + dy[i];
                    if (
                        nx < 0 ||
                        nx >= this.blockMap.length ||
                        ny >= this.blockMap[0].length ||
                        ny < 0 ||
                        (
                            ((nx != targetX || ny != targetY) &&
                                !this.blockMap[nx][ny]) ||
                            flag[nx][ny] == true
                        )
                    ) {
                        continue;
                    }
                    flag[nx][ny] = true;
                    step[nx][ny] = step[x][y] + 1;
                    queue.push([nx, ny]);
                    if (nx == targetX && ny == targetY) {
                        return this.getStep(step, startX, startY, targetX, targetY);
                    }
                }
            }
            return false;
        },
        //找出最短路径
        getStep(step, startX, startY, targetX, targetY) {
            let steps = [];
            let dx = [0, 1, 0, -1],
                dy = [1, 0, -1, 0];
            steps.unshift([targetX, targetY]);
            while (targetX != startX || targetY != startY) {
                for (let i = 0; i < 4; i++) {
                    let x = targetX + dx[i],
                        y = targetY + dy[i];
                    if (
                        x < 0 ||
                        x >= step.length ||
                        y < 0 ||
                        y >= step[0].length
                    )
                        continue;
                    if (step[x][y] == step[targetX][targetY] - 1) {
                        targetX = x;
                        targetY = y;
                        steps.unshift([x, y]);
                    }
                }
            }
            let lines = this.getLine(steps);
            const content = document.getElementById("game-content");
            while (this.lineLists.length > 0) {
                content.removeChild(this.lineLists.pop());
            }
            for (let i = 0; i < lines.length; i++) {
                setTimeout(() => {
                    this.drawLine(
                        [lines[i].startX, lines[i].startY],
                        [lines[i].endX, lines[i].endY]
                    );
                    if (i == lines.length - 1) {
                        setTimeout(() => {
                            const firstImg = document.getElementById(
                                "img-" + lines[0].startX + "-" + lines[0].startY
                            );
                            const secondImg = document.getElementById(
                                "img-" + lines[i].endX + "-" + lines[i].endY
                            );
                            firstImg.src = require("./img/remove.png");
                            secondImg.src = require("./img/remove.png");
                            this.removeNums += 2;
                            if (this.removeNums == this.blockList.length) {
                              let params = {
                                username:this.username,
                                juejinpage:this.juejinpage,
                                score:this.getPlayTime,
                                submittime:getToday("yyyy-mm-dd hh:MM:ss")
                              };
                              this.addScore(params);
                                alert(
                                    "您已全部消除，您的成绩为" +
                                        this.getPlayTime
                                );
                                this.initData();
                                this.initPage();
                            }
                        }, this.speed * 1000);
                    }
                }, i * this.speed * 1000);
            }
            return lines;
        },
        //获取连线集合
        getLine(steps) {
            let lines = [];
            let temp = {
                startX: steps[0][0],
                startY: steps[0][1]
            };
            let flag = "";
            for (let i = 1; i < steps.length; i++) {
                if (
                    (steps[i][0] != steps[i - 1][0] && flag == "x") ||
                    (steps[i][1] != steps[i - 1][1] && flag == "y")
                ) {
                    temp.endX = steps[i - 1][0];
                    temp.endY = steps[i - 1][1];
                    flag = "";
                    lines.push({ ...temp });
                    temp = {
                        startX: steps[i - 1][0],
                        startY: steps[i - 1][1]
                    };
                }
                if (steps[i][0] == temp.startX) flag = "x";
                if (steps[i][1] == temp.startY) flag = "y";
            }
            let len = steps.length - 1;
            temp.endX = steps[len][0];
            temp.endY = steps[len][1];
            lines.push({ ...temp });
            return lines;
        },
        //绘制连线
        drawLine(p1, p2) {
            const content = document.getElementById("game-content");
            const div = document.createElement("div");
            const img1 = document.getElementById(`row-${p1[0]}-${p1[1]}`);
            const img2 = document.getElementById(`row-${p2[0]}-${p2[1]}`);
            div.style.top = img1.offsetTop + 20 + "px";
            let flag = "";
            if (img1.offsetTop > img2.offsetTop) {
                flag = "h";
                div.style.transform = "rotateZ(180deg)";
                div.style.transformOrigin = "top";
            }
            div.style.left = img1.offsetLeft + 20 + "px";
            if (img1.offsetLeft > img2.offsetLeft) {
                flag = "w";
                div.style.transform = "rotateZ(180deg)";
                div.style.transformOrigin = "left";
            }
            const width = Math.abs(img1.offsetLeft - img2.offsetLeft);
            const height = Math.abs(img1.offsetTop - img2.offsetTop);
            if (width == 0) div.style.transition = `height ${this.speed}s`;
            else div.style.transition = `width ${this.speed}s`;
            div.classList.add("line-style");
            content.appendChild(div);
            setTimeout(() => {
                let h = 0,
                    w = 0;
                if (flag == "h") h = 4;
                else if (flag == "w") w = 4;
                div.style.width = width - w + "px";
                div.style.height = height - h + "px";
            }, 0);
            this.lineLists.push(div);
        },
        //初始化数据
        initData() {
            this.getScoreList();
            this.firstClick = {};
            clearTimeout(this.setTimeFlag);
            this.setTimeFlag = null;
            this.playTime = 0;
            this.removeNums = 0;
            this.blockList = [];
            this.lineLists = [];
            this.username = localStorage.getItem('lineBlockUserName') || '';
            this.juejinpage = localStorage.getItem('lineBlockJuejinPage') || '';

            const row = this.row;
            const column = this.column;
            const imgList = this.imgList;
            let blockList = this.blockList;
            this.blockMap = new Array(column + 2);
            for (let i = 0; i < this.blockMap.length; i++) {
                let temp = [];
                for (let j = 0; j < row + 2; j++) {
                    if (i == 0 || j == 0 || i == column + 1 || j == row + 1)
                        temp.push(true);
                    else temp.push(false);
                }
                this.blockMap[i] = temp;
            }

            let nums = row * column;
            if (nums % 2 == 1) {
                alert("个数不能为单数");
                return;
            }
            while (nums / 2 > blockList.length) {
                const dif = nums / 2 - blockList.length;
                blockList.push(...imgList.slice(0, dif));
            }
            blockList.push(...blockList);
            blockList = this.randomSort(blockList);
        },
        //初始化页面
        initPage() {
            const row = this.row,
                column = this.column;
            const content = document.getElementById("game-content");
            content.innerHTML = "";
            for (let i = 0; i <= parseInt(column) + 1; i++) {
                const columnDom = document.createElement("div");
                columnDom.classList.add("column");
                columnDom.id = `column-${i}`;
                for (let j = 0; j <= parseInt(row) + 1; j++) {
                    const rowDom = document.createElement("div");
                    rowDom.classList.add("row");
                    rowDom.id = `row-${i}-${j}`;
                    const img = document.createElement("img");
                    img.id = `img-${i}-${j}`;
                    img.classList.add("img-block");
                    if (i == 0 || j == 0 || i == column + 1 || j == row + 1) {
                        img &&
                            img.setAttribute(
                                "src",
                                require("./img/remove.png")
                            );
                    } else {
                        img &&
                            img.setAttribute(
                                "src",
                                this.blockList[(i - 1) * row + j - 1]
                            );
                        img.onclick = () => {
                            this.imgClick(i, j);
                        };
                    }
                    rowDom.appendChild(img);
                    columnDom.appendChild(rowDom);
                }
                content.appendChild(columnDom);
            }
            for (let i = 1; i <= column; i++) {
                for (let j = 1; j <= row; j++) {
                    const img = document.getElementById(i + "-" + j);
                    img &&
                        img.setAttribute(
                            "src",
                            this.blockList[(i - 1) * row + j - 1]
                        );
                }
            }
        },
        //数组打乱
        randomSort(arr) {
            return arr.sort((a, b) => {
                return Math.random() - 0.5;
            });
        },
        //图片点击事件
        imgClick(i, j) {
            if(this.username.trim() == ''){
                alert('请输入用户名');
                return;
            }
            if(this.juejinpage.trim() == ''){
                alert('请输入掘金主页');
                return;
            }
            if (this.playTime == 0) {
                this.setTime();
            }
            const row = this.row;
            const blockList = this.blockList;
            let firstClick = this.firstClick;
            if (!firstClick.id) {
                firstClick.id = "img-" + i + "-" + j;
                firstClick.i = i;
                firstClick.j = j;
                firstClick.src = blockList[(i - 1) * row + j - 1];
                const firstImg = document.getElementById("img-" + i + "-" + j);
                firstImg.classList.add("selected");
            } else {
                const firstImg = document.getElementById(firstClick.id);
                const secondImg = document.getElementById("img-" + i + "-" + j);
                firstImg.classList.remove("selected");
                if ("img-" + i + "-" + j == firstClick.id) {
                    this.firstClick = {};
                    return;
                }
                if (firstClick.src == blockList[(i - 1) * row + j - 1]) {
                    const path = this.getPath(firstClick.i, firstClick.j, i, j);
                    if (!path) {
                        this.firstClick = {};
                        return;
                    }
                    this.blockMap[firstClick.i][firstClick.j] = true;
                    this.blockMap[i][j] = true;
                    firstClick = {};
                } else {
                    firstClick.id = "img-" + i + "-" + j;
                    firstClick.src = blockList[(i - 1) * row + j - 1];
                    firstClick.i = i;
                    firstClick.j = j;
                    secondImg.classList.add("selected");
                }
            }
            this.firstClick = firstClick;
        }
    }
};
</script>
<style>
.game-content {
    flex: 1;
}
.column {
    display: flex;
}
.row {
    position: relative;
}
.img-block {
    border: solid grey 2px;
    width: 40px;
    height: 40px;
}
.selected {
    border: solid yellow 2px;
}
.line-style {
    position: absolute;
    border: solid skyblue 2px;
    background-color: skyblue;
    width: 0;
    height: 0;
}
</style>
<style lang="scss" scoped>
.line-block-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .game-content {
        flex: 1;
        margin-left: 5em;
        .column {
            display: flex;
            .row {
                position: relative;
                .img-block {
                    border: solid grey 2px;
                    width: 40px;
                    height: 40px;
                }
                .selected {
                    border: solid yellow 2px;
                }
            }
        }
    }
    .game-menu {
        flex: 1;
        text-align: center;
        padding: 2em;
        .game-menu-content {
            .game-menu-start {
                cursor: pointer;
            }
            .game-menu-item{
              padding: 0.5rem;
              margin: auto;
              margin-top:0.5rem;
              background-color: palevioletred;
              width: 50%;
            }
            .game-menu-time{
              background-color: rgb(241, 209, 150);
            }
            .btn{
              background-color: rgb(32, 137, 179);
            }
            .game-menu-score{
                cursor: pointer;
            }
            .username:empty:before{ 
                content: '用户名'; 
                color: gray; 
            } 
            .username:focus:before{
                content:none;
            }
            .juejin:empty:before{ 
                content: '掘金主页'; 
                color: gray; 
            } 
            .juejin:focus:before{
                content:none;
            }
        }
    }
    .game-score{
      flex: 1;
      background-color: skyblue;
      .game-score-title{
          padding-bottom: 1em;
          font-size: large;
          font-weight: bold;
          color: rgb(170, 125, 10);
      }
      .game-score-table{
        .game-score-tr{
          display: flex;
          span{
            flex: 1;
            margin-top: 0.5em;
          }
          .submittime{
            flex: 2;
          }
          .username{
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
}
</style>
