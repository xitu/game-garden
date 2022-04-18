<template>
  <div id="app">
    <!-- <transition name="fade"> -->
      <menu-wrap v-show="stage === 0" @changeSage="changeSage"></menu-wrap>
    <!-- </transition> -->
    <!-- <transition name="fade"> -->
      <stage-one v-show="stage === 1" @add="addScore" @changeSage="changeSage"></stage-one>
    <!-- </transition> -->
    <!-- <transition name="fade"> -->
      <stage-two v-show="stage === 2" @add="addScore" @changeSage="changeSage"></stage-two>
    <!-- </transition> -->
    <!-- <transition name="fade"> -->
      <stage-three v-show="stage === 3" @add="addScore" @changeSage="changeSage"></stage-three>
    <!-- </transition> -->
    <!-- <transition name="fade"> -->
      <stage-four v-show="stage === 4" @add="addScore" @changeSage="changeSage"></stage-four>
    <!-- </transition> -->
    <!-- <transition name="fade"> -->
      <stage-five v-show="stage === 5" @add="addScore" @changeSage="changeSage"></stage-five>
    <!-- </transition> -->
    <!-- <transition name="fade"> -->
      <result v-show="stage === 6" :total="total"></result>
    <!-- </transition> -->
    
    <!-- 总分 -->
    <!-- <div class="total">
      {{total.stage1 + total.stage2 + total.stage3 + total.stage4 + total.stage5}}
    </div> -->
    <!-- 分数牌 -->
    <!-- <div class="result-list">
      <div class="result-item">
        <div class="img">
          <img src="./assets/img/youhu.jpg" alt="">
        </div>
      </div>
    </div> -->
    <img class="mountain" src="./assets/icon/snowberg.svg" alt="">
  </div>
</template>

<script>
import menuWrap from './components/menu.vue'
import stageOne from './components/stage-one.vue'
import StageThree from './components/stage-three.vue'
import stageTwo from './components/stage-two.vue'
import stageFour from './components/stage-four.vue'
import stageFive from './components/stage-five.vue'
import result from '@/components/result'
export default {
  name: 'home',
  components: {
    menuWrap,
    stageOne,
    stageTwo,
    StageThree,
    stageFour,
    stageFive,
    result
  },
  data() {
    return {
      stage: 6,
      total: {
        stage1: 20,
        stage2: 0,
        stage3: 80,
        stage4: 0,
        stage5: 0
      }
    }
  },
  methods: {
    /**
     * @description: 改变游戏阶段
     * @param {*}
     * @return {*}
     */    
    changeSage (val) {
      this.stage = val
    },
    /**
     * @description: 加分
     * @param {*}
     * @return {*}
     */
    addScore ({name, val}) {
      this.total[name] += val
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
@font-face{
  font-family: 'douyu';
  src: url('./assets/font/douyu.ttf');
}
html {
  background: #dcebff;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  overflow: hidden;
  user-select: none;
}
img {
  display: block;
  width: 100%;
  pointer-events: none;
  border: none;
}
img[src=''],img:not([src]){
  opacity: 0;
}


.stage-wrap {
  width: 60%;
  margin: auto;
  position: relative;
}

.mountain {
  position: absolute;
  width: 100%;
  bottom: -10vh;
  z-index: -1;
  filter: grayscale(80%);
  opacity: .5;
}

/* .total {
  position: absolute;
  font-family: 'douyu';
  color: #1e80ff;
  font-size: 3vw;
  top: 3vh;
  right: 3vh;
} */

/* .result-list {
  position: absolute;
  top: 3vh;
  left: 3vw;
  width: 18vw;
  display: flex;
}
.result-item {
  width: 3vw;
}
.result-item img {
  width: 100%;
} */

@media screen and (max-width: 768px) {
  .mountain {
    width: 160vh;
    left: 50%;
    margin-left: -55vh;
  }
  .stage-wrap {
    width: 90%;
  }

  /* .result-item {
    width: 9vw;
  } */
  .total {
    font-size: 10vw;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s, transform 1s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(200px)
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-200px)
}
</style>
