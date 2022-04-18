<!--
 * @Author: 掘金：十里青山
 * @Date: 2022-04-06 22:12:28
 * 公众号：百里青山
 * @LastEditors: 掘金：十里青山
 * @LastEditTime: 2022-04-12 23:45:08
 * @Descripttion: 关卡四-思宇
-->
<template>
  <div class='stage-wrap'>
    <!-- 规则及守关运营区 -->
    <rule-wrap :stage="4" @begin="begin"></rule-wrap>
    <!-- 游戏区 -->
    <div class="game-wrap" v-show="round">
      <!-- 得分 -->
      <div class="result-list">
        <div class="result-list">
          <div
            class="result-item"
            :class="{ active: item }"
            v-for="(item, key) in resultList"
            :key="key"
          ></div>
        </div>
      </div>
      <div class="susliks-list">
        <div class="susliks-item" v-for="item in 9" :key="item">
          <div class="hole" v-show="active !== item"></div>
          <div class="hamster" v-show="active === item" @click="countEnd">
            <img src="../assets/img/hamster.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 结果弹窗 -->
    <result-log :status="status" :isEnd="round >= 5" @goOn="goOn"></result-log>
  </div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
      active: 1,
      refreshTimer: null, // 刷新地鼠定时器
      resultList: [],
      round: 0,
      canClick: true,
      status: ''
    }
  },
  methods: {
    begin () {
      this.canClick = true
      this.resultList = []
      this.refreshHamster()
    },
    goOn () {
      this.$emit('changeSage', 5)
    },
    // 刷新地鼠
    refreshHamster () {
      if (this.round >= 20) {
        this.canClick = false
        this.active = 0
        setTimeout(() => {
          this.status = 'success'
        }, 2000)
        return
      }
      this.round++
      // 从1-9之间随机取一个数，不和active相同
      let active = Math.floor(Math.random() * 9) + 1
      while (active === this.active) {
        active = Math.floor(Math.random() * 9) + 1
      }
      this.active = active

      // this.active = Math.floor(Math.random() * 9) + 1
      this.refreshTimer = setTimeout(() => {
        this.resultList.push(0)
        this.refreshHamster()
      }, 700)
    },
    // 打中得分
    countEnd () {
      if (!this.canClick) {
        return
      }
      this.resultList.push(1)
      clearTimeout(this.refreshTimer)
      this.refreshHamster()
      this.$emit('add', {
        name: 'stage4',
        val: 1
      })
    }
  }
}
</script>
<style scoped>
.susliks-list {
  width: 60vh;
  height: 60vh;
  margin: 5vh auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.susliks-item {
  width: 30%;
  height: 30%;
  display: flex;
  align-items: flex-end;
  /* background: rgb(240, 240, 240); */
}
.hole {
  width: 100%;
  height: 10vh;
  border-radius: 50%;
  background: rgb(170, 170, 170);
  box-shadow: 0 0 76px 10px rgb(0 0 0 / 50%) inset;
}
.score-wrap {
  font-size: 5vw;
  font-family: 'douyu';
  color: #1e80ff;
  text-align: right;
}

.result-list {
  display: flex;
  min-height: 1vw;
}
.result-item {
  width: 1vw;
  height: 1vw;
  background: #ff5656;
  border-radius: 50%;
  margin-right: 1vw;
}
.result-item.active {
  background: #63d94f;
}
@media screen and (max-width: 768px) {
  .susliks-list {
    width: 90vw;
    height: 90vw;
  }
  .score-wrap {
    font-size: 8vh;
  }
  .result-item {
    width: 1.5vh;
    height: 1.5vh;
  }
}
</style>