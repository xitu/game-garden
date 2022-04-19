<!--
 * @Author: 十里青山
 * @Date: 2022-03-31 22:50:34
 * @公众号: 百里青山
 * @LastEditors: 掘金：十里青山
 * @LastEditTime: 2022-04-11 00:22:12
 * @Descripttion: 关卡一-优弧
-->
<template>
  <div class="stage-wrap">
    <!-- 规则及守关运营区 -->
    <rule-wrap :stage="1" @begin="begin"></rule-wrap>
    <!-- 成绩及倒计时 -->
    <div class="progress-bar" v-show="round > 0">
      <div class="result-list">
        <div
          class="result-item"
          :class="{active: item}"
          v-for="(item, key) in resultList"
          :key="key"
        ></div>
      </div>
      <div class="count-time">{{ countText }}</div>
    </div>
    <!-- 游戏区域 -->
    <div class="game-wrap">
      <div class="block-list">
        <div
          class="block-item"
          :class="{
            active: item,
            right: item === '掘金',
            error: item === '倔金',
          }"
          v-for="(item, key) in blockList"
          :key="key"
          @click="countEnd(item)"
        ></div>
      </div>
    </div>
    <!-- 结果弹窗 -->
    <result-log :status="status" :isEnd="round >= 5" @goOn="goOn"></result-log>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      round: 0,
      blockList: [],
      resultList: [],
      status: '',
      countTime: 0,
      countInterval: null
    }
  },
  mounted () {
    // this.reset()
  },
  computed: {
    countText () {
      return this.countTime / 1000
    }
  },
  methods: {
    begin () {
      this.reset()
    },
    goOn () {
      if (this.round >= 5) {
        this.$emit('changeSage', 2)
      } else {
        this.status = ''
        this.reset()
      }
    },
    // 开始倒计时
    startCount () {
      this.countTime = 10000
      this.countDown()
    },
    // 倒计时
    countDown () {
      this.countInterval = setInterval(() => {
        this.countTime -= 100
        if (this.countTime <= 0) {
          this.countTime = 0
          this.countEnd()
        }
      }, 100)
    },
    // 倒计时结束
    countEnd (val = '倔金') {
      clearInterval(this.countInterval)
      this.check(val)
    },
    // 重置表格
    reset () {
      this.blockList = new Array(25)
      let index = 0
      let interval = setInterval(() => {
        if (index < 25) {
          this.$set(this.blockList, index, '6')
          index++
        } else {
          clearInterval(interval)
          this.round++
          let newArr = new Array(25).fill('倔金')
          let random = Math.floor(Math.random() * 25)
          newArr[random] = '掘金'
          this.blockList = newArr
          this.startCount()
        }
      }, 50)
    },
    check (val) {
      if (val !== '掘金' && val !== '倔金') return
      this.blockList = []
      if (val === '掘金') {
        this.status = 'success'
        this.$emit('add', {
          name: 'stage1',
          val: 4
        })
        this.resultList.push(1)
      } else {
        this.status = 'fail'
        this.resultList.push(0)
      }
    }
  }
}
</script>
<style scoped>
.block-list {
  width: 50vh;
  height: 50vh;
  max-width: 90%;
  position: absolute;
  left: 50%;
  top: 25vh;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.block-item {
  opacity: 0;
  width: 18.5%;
  background: #1e80ff;
  color: #fff;
  margin: 0.28vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 2vw;
}
.block-item.active {
  opacity: 0.5;
}
.block-item.active:hover {
  opacity: 1;
}
.block-item.error::after {
  content: '倔金';
}
.block-item.right::after {
  content: '掘金';
}



.progress-bar {
  display: flex;
  width: 50vh;
  max-width: 90%;
  margin: 0 auto;
  margin-top: 5vh;
  justify-content: space-between;
  align-items: center;
}
.result-list {
  display: flex;
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
.count-time {
  font-family: 'douyu';
  font-size: 3vw;
  /* text-align: center; */
  color: #1e80ff;
}

@media screen and (max-width: 768px) {
  .result-text {
    font-size: 8vh;
    height: 6vh;
  }
  .block-item {
    font-size: 5vw;
  }
  .result-item {
    width: 3vw;
    height: 3vw;
    margin-right: 2vw;
  }
  .count-time {
    font-size: 9vw;
  }
}
</style>