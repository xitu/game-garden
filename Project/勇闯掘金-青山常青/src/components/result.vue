<!--
 * @Author: 掘金：十里青山
 * @Date: 2022-04-10 20:41:58
 * 公众号：百里青山
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-04-13 23:55:29
 * @Descripttion: 结果页
-->
<template>
  <div class="stage-wrap end-wrap">
    <div class="result-list">
      <div class="result-item">
        <img src="../assets/img/youhu.jpg" alt="" />
        <div class="point">{{ total.stage1 }}</div>
      </div>
      <div class="result-item">
        <img src="../assets/img/troy.jpg" alt="" />
        <div class="point">{{ total.stage2 }}</div>
      </div>
      <div class="result-item">
        <img src="../assets/img/captain.jpg" alt="" />
        <div class="point">{{ total.stage3 }}</div>
      </div>
      <div class="result-item">
        <img src="../assets/img/zoe.jpg" alt="" />
        <div class="point">{{ total.stage4 }}</div>
      </div>
      <div class="result-item">
        <img src="../assets/img/baoer.jpg" alt="" />
        <div class="point">{{ total.stage5 }}</div>
      </div>
    </div>
    <div class="total-wrap">
      {{ totalVal }}
    </div>
    <div class="fail-wrap" v-show="totalVal < 60">
      <div class="result-text fail-text">
        很遗憾，您的分数少于60，不及格，请再接再厉！
      </div>
    </div>
    <div class="success-wrap" v-show="totalVal >= 60">
      <div class="result-text success-text">
        恭喜您，闯关成功，快点击下面按钮填写愿望获取证书，听说分享到沸点愿望可能会实现！
      </div>
      <div class="sunmit-btn" @click="writeDesire = true">填写愿望</div>
    </div>
    <!-- 愿望弹窗 -->
    <div class="desire-wrap" v-show="writeDesire">
      <div class="desire-content">
        <input type="text" placeholder="请填写您的称呼" v-model="username" maxlength="6">
        <textarea maxlength="40" placeholder="请填写您的愿望，用于生成证书，请认真填写哦" v-model="desireText"></textarea>
        <div class="sunmit-btn" @click="createCert">生成证书</div>
      </div>
    </div>
    <!-- 证书弹窗 -->
    <div class="cert-wrap" v-show="showCert">
      <div class="cert-card" ref="certCard">
        <img class="background" src="../assets/icon/logo.svg" alt="">
        <img class="qrcode" src="../assets/img/qrcode.png" alt="">
        <div class="title">
          头号玩家
        </div>
        <div class="card-num">证书编号：{{ cardNum }}</div>
        <div class="result-list">
          <div class="result-item">
            <img src="../assets/img/youhu.jpg" alt="" />
            <div class="point">{{ total.stage1 }}</div>
          </div>
          <div class="result-item">
            <img src="../assets/img/troy.jpg" alt="" />
            <div class="point">{{ total.stage2 }}</div>
          </div>
          <div class="result-item">
            <img src="../assets/img/captain.jpg" alt="" />
            <div class="point">{{ total.stage3 }}</div>
          </div>
          <div class="result-item">
            <img src="../assets/img/zoe.jpg" alt="" />
            <div class="point">{{ total.stage4 }}</div>
          </div>
          <div class="result-item">
            <img src="../assets/img/baoer.jpg" alt="" />
            <div class="point">{{ total.stage5 }}</div>
          </div>
        </div>
        <div class="total">
          {{total.stage1 + total.stage2 + total.stage3 + total.stage4 + total.stage5}}
        </div>
        <div class="user-name">{{username || '掘金玩家'}}</div>
        <div class="desire-text">玩家愿望：{{ desireText || '无' }}</div>
        <div class="remark">本证书仅为「勇闯掘金」小游戏娱乐效果，与掘金无关</div>
      </div>
      <img :src="certSrc" class="certImg" alt="">
      <div class="btn-wrap">
        <div class="sunmit-btn" @click="downloadImg">保存图片</div>
        <div class="sunmit-btn" @click="goFeidian">前往沸点</div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas"
export default {
  name: '',
  props: {
    total: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    totalVal () {
      return this.total.stage1 + this.total.stage2 + this.total.stage3 + this.total.stage4 + this.total.stage5
    }
  },
  data () {
    return {
      writeDesire: false,
      showCert: true,
      username: '',
      desireText: '',
      certSrc: '',
      cardNum: new Date().getTime()
    }
  },
  mounted () {
    this.getCert()
  },
  methods: {
    // 生成证书
    createCert () {
      this.writeDesire = false
      this.showCert = true
      setTimeout(() => {
        this.getCert()
      }, 500)
    },
    // 获取证书
    getCert () {
      html2canvas(this.$refs.certCard).then(canvas => {
        let img = canvas.toDataURL('image/png')
        this.certSrc = img
        // this.$refs.certCard.setAttribute('src', img)
      })
    },
    // 跳转沸点
    goFeidian () {
      window.open('https://juejin.cn/pin/club/6931914335023267853')
    },
    downloadImg () {
      // let img = this.$refs.certCard.getElementsByTagName('img')[0]
      let src = this.certSrc
      let a = document.createElement('a')
      a.href = src
      a.download = '掘金玩家证书'
      a.click()
    },
  }
}
</script>
<style scoped>
.result-list {
  display: flex;
  margin-top: 3vh;
  justify-content: space-between;
}
.result-item {
  display: flex;
  font-size: 3vw;
  align-items: center;
}
.result-item img {
  width: 4vw;
}
.point {
  font-family: 'douyu';
  color: #0047a3;
  margin-left: 1vw;
}
.total-wrap {
  font-family: 'douyu';
  color: #1e80ff;
  font-size: 15vh;
  text-align: center;
  margin-top: 10vh;
}
.result-text {
  font-family: 'douyu';
  font-size: 5vh;
  text-align: center;
  margin-top: 10vh;
}
.fail-text {
  background: linear-gradient(159deg, #c2c2c2 16%, #888888 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.success-text  {
  background: linear-gradient(159deg, #fbe622, #dc0000 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.sunmit-btn {
  font-family: 'douyu';
  width: 15vh;
  height: 4vh;
  background: linear-gradient(180deg,#ffb46f 15.1%,#ef7d13);
  line-height: 4.8vh;
  cursor: pointer;
  color: #fff;
  user-select: none;
  text-align: center;
  margin: 3vh  auto 0;
  box-shadow: 0px 8px 0 0 #d25f00,
  0 10px 5px 0 rgba(0, 0, 0, .5);
  border-radius: 5px;
  transform: translateY(-8px);
}
.sunmit-btn:active {
  transform: translateY(0);
  box-shadow: 0 0
}
.desire-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.desire-content {
  background: #fff;
  padding: 1vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.desire-content input {
  width: 30vh;
  font-size: 2vh;
  font-family: 'Microsoft YaHei';
  border: 2px solid #ddd;
  padding: 10px;
  outline: none;
  border-radius: 5px;
}
.desire-content textarea {
  resize: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #ddd;
  padding: 10px;
  width: 30vh;
  height: 10vh;
  margin-top: 10px;
  font-size: 2vh;
  font-family: 'Microsoft YaHei';
}
.cert-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cert-card {
  position: absolute;
  left: -200vw;
  width: 600px;
  height: 900px;
  background: #fff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  border: 5px solid #9fc9ff;
}
.certImg {
  width: 600px;
  max-width: 100%;
  transform: translateY(-20%);
  pointer-events: initial;
}
.background {
  width: 200%;
  opacity: .1;
  left: -50%;
  position: absolute;
}
.qrcode {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 100px;
  height: 100px;
}
.logo {
  width: 50px;
  position: absolute;
  left: 30px;
  top: 30px;
}
.cert-card .title{
  font-size: 46px;
  color: #1e80ff;
  font-family: 'douyu';
  text-align: center;
  margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.card-num {
  margin-top: 10px;
  text-align: center;
}
.cert-card .result-list {
  padding: 0 30px;
}
.cert-card .result-list .result-item{
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cert-card .result-list .result-item img{
  width: 50px;
}
.cert-card .result-list .result-item .point{
  font-size: 20px;
  margin: 10px 0 0 0;
}
.user-name {
  width: 80%;
  font-size: 60px;
  text-align: center;
  margin: 0 auto 30px;
  font-weight: bold;
  line-height: 2.5;
  border-bottom: 3px solid #000;
}
.total {
  font-family: 'douyu';
  color: #ffd350;
  text-align: center;
  font-size: 80px;
  margin-top: 30px;
  /* background: linear-gradient(to bottom, #ffdf8c, #ff6d00);
  background-clip: text;
  -webkit-text-fill-color: transparent; */
  /* filter: drop-shadow(0 2px 2px rgb(255, 101, 29)); */
}
.desire-text {
  width: 90%;
  margin: auto;
  font-size: 30px;
}
.remark {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  color: #aaa;
}
.btn-wrap {
  width: 500px;
  max-width: 100%;
  position: fixed;
  bottom: 50px;
  display: flex;
  justify-content: space-around;
}
@media screen and (max-width: 768px) {
  .result-item{
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .result-item img{
    width: 10vw;
  }
  .point {
    margin-left: -.5vw;
    margin-top: 1vh;
    font-size: 5vw;
  }
  .result-text {
    font-size: 3vh;
  }
  .total-wrap {
    font-size: 30vw;
  }
  .result-text {
    font-size: 7vw;
  }
  .desire-content {
    padding: 2vw;
  }
  .desire-content input {
    width: 60vw;
    font-size: 5vw;
  }
  .desire-content textarea {
    width: 60vw;
    font-size: 5vw;
  }
  .sunmit-btn {
    width: 30vw;
    height: 8vw;
    line-height: 10vw;
    font-size: 5vw;
    transform: translateY(-8px);
  }
}
</style>