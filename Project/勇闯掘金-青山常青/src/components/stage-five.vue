<template>
  <div class='stage-wrap'>
    <!-- 规则及守关运营区 -->
    <rule-wrap :stage="5" @begin="begin"></rule-wrap>
    <!-- 抽奖 -->
    <div class="turntable-wrap" v-show="INGAME">
      <div class="blocks">
        <div class="block-item" :class="{active: active === key}" v-for="(item,key) in blockData" :key="key">
          <img src="../assets/img/kuangshi.png" alt="">
          <div class="block-value">{{item.value}}分</div> 
        </div>
      </div>
      <div class="sunmit-btn" @click="start">一发入魂</div>
    </div>
    <!-- 结果 -->
    <div class="result-log" v-show="resultLog">
      <div class="currentPoint">{{blockData[active].value}}</div>
      <div class="sunmit-btn" @click="next">获取总分</div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
      INGAME: false,
      active: 0,
      resultLog: false,
      canClick: true,
      blockData: [
        {
          value: 10
        },
        {
          value: 12
        },
        {
          value: 14
        },
        {
          value: 16
        },
        {
          value: 18
        },
        {
          value: 20
        },
        {
          value: 18
        },
        {
          value: 16
        },
        {
          value: 14
        }
      ]
    }
  },
  methods: {
    begin () {
      this.INGAME = true
    },
    next () {
      this.$emit('changeSage', 6)
    },
    // 开始抽奖
    start () {
      if (!this.canClick) return
      this.canClick = false
      this.showTurntable = true
      this.turntable()
    },
    // 抽奖
    turntable () {
      let active = Math.floor(Math.random() * 9) + 1
      this.active = active
      // 获取80到110的随机数
      let time = Math.floor(Math.random() * (110 - 80 + 1) + 80)
      let func = (time) => {
        setTimeout(() => {
          time = time * 1.1
          let active = this.active
          active++
          if (active > 8) {
            active = 0
          }
          this.active = active
          if (time < 600) {
            func(time)
          } else {
            this.$emit('add', {
              name: 'stage5',
              val: this.blockData[active].value
            })
            this.resultLog = true
          }
        }, time)
      }
      func(time)
    }
  }
}
</script>
<style scoped>
.turntable-wrap {
  position: absolute;
  background: #fadd95;
  padding: 2vh;
  left: 50%;
  top: 20vh;
  transform: translateX(-50%);
}
.blocks {
  width: 50vh;
  height: 50vh;
  justify-content: space-around;
  align-content: space-around;
  display: flex;
  flex-wrap: wrap;
  background: #e37815;
  box-sizing: border-box;
  padding: 1vh;
  border-radius: 10px;
}
.block-item {
  width: 30%;
  height: 30%;
  border-radius: 10px;
  background: #fdf3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #d25f00;
  font-size: 1.5vw;
  font-family: 'douyu';
}
.block-item.active {
  background: #ffcf8b;
}
.block-item img {
  width: 70%;
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

.result-log {
  font-family: 'douyu';
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  padding: 3vw 5vw;
  border-radius: 10px;
  box-shadow: 0 0 10px #c2c2c2;
}
.currentPoint {
  font-size: 5vw;
  color: #fcaa5f;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .turntable-wrap {
    padding: 5vw;
  }
  .blocks {
    width: 85vw;
    height: 85vw;
  }
  .block-value {
    font-size: 3vw;
  }
}
</style>