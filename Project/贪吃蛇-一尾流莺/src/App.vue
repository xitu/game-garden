<!--
 * @Author: 一尾流莺
 * @Description:根节点
 * @Date: 2021-10-19 16:51:48
 * @LastEditTime: 2021-10-28 14:49:41
 * @FilePath: \warbler-games\贪吃蛇\src\App.vue
-->
<template>
  <div class='app-content'>
    <Map :map='state.map'></Map>
    <Controller :is-live='isLive'
                @start='start'
                @replay='replay'></Controller>
    <KeyBoard :is-live='isLive'
              @changeDirection='change'></KeyBoard>
    <audio controls
           ref="audio"
           class="audio"
           loop
           autoplay>
      <source src="https://img.tukuppt.com/newpreview_music/09/01/69/5c8a0553e18db46234.mp3"
              type="audio/mpeg" />
    </audio>

  </div>
</template>

<script lang='ts' setup>
import { startGame, replayGame, changeDirection } from './game';
import Map from '@/components/Map.vue';
import Controller from './components/Controller.vue';
import KeyBoard from './components/KeyBoard.vue';
import { initGame } from '@/game';
import { reactive, ref } from 'vue';
import { StateType } from './types';

const audio = ref(null);

// 地图
const state = reactive<StateType>({
  map: [],
});

// 游戏状态 1未开始 2进行中 3已结束
const isLive = ref(1);

// 开始游戏
const start = () => {
  startGame();
  // @ts-ignore
  audio.value.play();
};
// 再来一局
const replay = () => {
  replayGame();
};
// 修改方向
const change = (direction: string) => {
  changeDirection(direction);
};

// 初始化游戏
initGame(state.map, isLive);
</script>

<style lang='scss'>
html,
body {
  background: #000;
  padding: 0;
  overflow: hidden;
  background: url('./assets/background-b.jpg');
  background-size: cover;
  background-repeat: space;
  @media screen and (max-width: 750px) {
    background: url('./assets/background-c.jpg');
    background-size: contain;
  }
}
body {
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app-content {
  margin: auto;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
}
.audio {
  position: absolute;
  z-index: -1;
  visibility: hidden;
}
</style>
