<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-10-27 10:38:07
 * @LastEditTime: 2021-10-28 16:37:34
 * @FilePath: \warbler-games\贪吃蛇\src\components\Controller.vue
-->
<template>
  <!-- 过渡动画  添加了0.3s的淡入淡出  显得更加平滑 -->
  <transition name="base">
    <!-- 遮罩层 -->
    <div class="controller-box"
         v-if="isLive !== 2">
      <!-- 游戏未开始 -->
      <div v-if="isLive === 1"
           class="show-btns"
           @click='emit("start")'>
        <img src="../assets/snake.png"
             class="limit">
        <img src="../assets/start.png">
        <div class="options-tips">
          <p>手机玩家请点击屏幕进行操作;</p>
          <p>电脑玩家请通过按键 ↑ ↓ ← → 进行操作;</p>
        </div>
      </div>
      <!-- 游戏结束,再来一局 -->
      <div v-if="isLive === 3"
           class="show-btns"
           @click='emit("replay")'>
        <img src="../assets/gameover.png"
             class="limit">
        <img src="../assets/replay.png">
      </div>
    </div>
  </transition>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['start', 'replay']);

defineProps({
  isLive: {
    type: Number,
    default: 1,
  },
});
</script>

<style lang='scss'>
.controller-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  // 模糊滤镜
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;

  .show-btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .limit {
      width: 300px;
    }
  }

  .options-tips {
    color: #f0d095;
    font-size: 12px;
    p {
      padding: 5px 0;
    }
  }
}
//淡入淡出
.base-enter-active,
.base-leave-active {
  transition: all 0.3s ease;
}
.base-enter-to,
.base-leave-from {
  opacity: 1;
}
.base-enter-from,
.base-leave-to {
  opacity: 0;
}
</style>
