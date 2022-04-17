<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-10-27 18:13:32
 * @LastEditTime: 2021-10-28 16:47:57
 * @FilePath: \warbler-games\贪吃蛇\src\components\KeyBoard.vue
-->
<template>
  <div class='key-board-box'
       v-if="isLive === 2 && isMobile">
    <div class="up"
         @click='emit("changeDirection","Up")'></div>
    <div class="down"
         @click='emit("changeDirection","Down")'></div>
    <div class="left"
         @click='emit("changeDirection","Left")'></div>
    <div class="right"
         @click='emit("changeDirection","Right")'></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['changeDirection']);
const isMobile = document.documentElement.clientWidth < 700;
defineProps({
  isLive: {
    type: Number,
    default: 1,
  },
});
</script>

<style lang='scss'>
.key-board-box {
  width: 240px;
  height: 220px;
  background: url('../assets/keyboard.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  bottom: 30px;
  opacity: 0.1;
  .up {
    width: 75px;
    height: 75px;
    position: absolute;
    left: 80px;
    top: 0px;
  }
  .down {
    position: absolute;
    width: 75px;
    height: 75px;
    left: 80px;
    bottom: 15px;
  }
  .left {
    position: absolute;
    width: 75px;
    height: 75px;
    left: 0px;
    top: 68px;
  }
  .right {
    position: absolute;
    width: 75px;
    height: 75px;
    right: 0px;
    top: 68px;
  }
}
</style>
