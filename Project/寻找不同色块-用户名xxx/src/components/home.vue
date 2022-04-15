<template>
  <el-container class="full-height home-container">
    <el-header height="60px">
      <h3 class="tip">找出所有色块里颜色不同的一个</h3>
    </el-header>
    <el-main>
      <div class="home-content">
        <div class="wrap">
          <div class="clearfix box" v-if="view === 'gameing'">
            <div class="fl box-item-wrap"
                 :style="[itemStyle]"
                 v-for="(n, i) in rectCount"
                 @click="pickColor(n, i + 1)"
                 :key="i">
              <div class="box-item"
                   :style="[{ filter: `drop-shadow(${itemStyle.width} 0 0 ${(i + 1) === randomNum ? backColor : activeColor})`,
                    transform: `translateX(-${itemStyle.width})` } ]"
              ></div>
            </div>
          </div>
          <div class="game-box game-over" v-show="view === 'ending'">
            <h2>游戏结束</h2>
            <h3>得分: {{score}}</h3>
          </div>
          <div class="game-box game-pause" v-show="view === 'pause'">
            <h2>暂停</h2>
            <el-button type="primary" @click="continueGame">继续</el-button>
            <el-button type="primary" @click="reStart">重新开始</el-button>
          </div>
          <div class="game-start game-box" v-show="view === 'start'">
            <el-button type="primary" @click="reStart">开始</el-button>
          </div>
        </div>
        <div class="other">
          <p>时间: <span>{{deadTime}}</span>秒</p>
          <p class="score">分数: <span>{{score}}</span>分</p>
        </div>
        <el-button class="btn-pause" type="primary" @click="pause">暂停</el-button>
        <el-button class="left-btn" type="primary" @click="reStart">重新开始</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {defineComponent, reactive, toRefs, computed, onMounted} from "vue";
import { getRandomColors } from '../utils/color';

export default defineComponent({
  name: 'home',
  setup() {
    const data = reactive({
      rowRect: 2, // 初始为2
      backColor: '#fff',
      activeColor: '#fff',
      opacity: 0.75, // 透明度
      randomNum: 12, // 随机数
      score: 0,
      deadTime: 60,
      isPause: true, // 是否暂停
      view: 'start',
    });
    onMounted(() => {
      getColor();
      getRandomNum();
    });
    // 总数
    const rectCount = computed(() => {
      return data.rowRect * data.rowRect;
    })
    /**
     * 获取随机数
     */
    function RandomNumBoth(Min, Max){
      const Range = Max - Min;
      const Rand = Math.random();
      return Min + Math.round(Rand * Range); // 四舍五入
    }
    // 获取随机数
    const getRandomNum = () => {
      const max = data.rowRect * data.rowRect
      data.randomNum = RandomNumBoth(1, max);
    };
    const itemStyle = computed(() => {
      const margin = (data.rowRect - 1) * 10;
      const n = (600 - margin) / data.rowRect;
      return {
        width: `${n}px`,
        height: `${n}px`,
      }
    });
    const getColor = () => {
      const colorObj = getRandomColors(data.opacity);
      data.backColor = colorObj.color;
      data.activeColor = colorObj.similarityColor;
    };
    let loop = null;
    /**
     * 倒计时
     */
    const countDown = () => {
      clearTimeout(loop);
      loop = setTimeout(() => {
        if (data.deadTime > 0) {
          data.deadTime -= 1;
          countDown();
        } else {
          data.rowRect = 0;
          data.view = 'ending';
        }
      }, 1000);
    };
    /**
     * 点击事件
     */
    const pickColor = (n, index) => {
      if (data.rowRect === 2) {
        data.deadTime -= 1;
        countDown();
      }
      if (data.randomNum === index) { // 寻找成功
        if (data.rowRect <= 10) {
          data.rowRect += 1;
        }
        data.score += 10;
        getRandomNum();
        getColor();
      }
    };
    const continueGame = () => {
      data.view = 'gameing';
      countDown();
    };
    const pause = () => {
      data.view = 'pause'
      clearTimeout(loop);
    }
    /**
     * 重新开始
     */
    const reStart = () => {
      data.view = 'gameing';
      data.rowRect = 2;
      data.score = 0;
      data.deadTime = 60;
      getRandomNum();
      getColor();
      clearTimeout(loop);
    };
    return {
      ...toRefs(data),
      rectCount,
      itemStyle,
      reStart,
      getColor,
      pickColor,
      continueGame,
      pause,
    }
  }
});
</script>

<style scoped>
.home-container{
  background: linear-gradient(#114cec,#568fff);
}
.tip {
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  font-weight: bold;
}
.home-content {
  position: relative;
  width: 730px;
  margin: 0 auto;
}
.other {
  position: absolute;
  top: 200px;
  left: -200px;
  color: #fff;
}
.left-btn {
  position: absolute;
  left: -200px;
  bottom: 20px;
}
.btn-pause {
  position: absolute;
  left: -272px;
  bottom: 20px;
}
.score {
  margin-top: 20px;
}
.wrap {
  width: 600px;
  height: 600px;
  margin: 0 auto;
  padding: 10px;
  background-color: #eee;
  border-radius: 10px;
}
.box {
  margin-top: -10px;
  margin-left: -10px;
}
.box-item-wrap {
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
}
.box-item {
  width: 100%;
  height: 100%;
  background-color: transparent;
  background-image: url("../assets/yoyo.png");
  background-size: contain;
}
.game-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  text-align: center;
}
.game-over {
  background-color: #00baff;
}
.game-start, .game-pause {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.game-pause {
  background-color: #fff;
}
.game-box h2 {
  margin-top: 100px;
}
.game-box h3 {
  margin-top: 80px;
}
</style>
