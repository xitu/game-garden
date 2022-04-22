<template>
  <div
    class="
      relative
      flex flex-col
      w-full
      h-full
      lg:(w-600px
      h-700px
      border border-gray-500/50)
    "
  >
    <div class="flex-1 p-4 py-8">
      <!-- 游戏内容组件 -->
      <GameCnt
        v-if="!pass"
        @stepChange="stepChange"
        @gamePass="gamePass"
        ref="gameCnt"
      />
      <!-- 游戏通过组件 -->
      <GamePass v-else />
    </div>
    <!-- 游戏工具栏组件 -->
    <GameTool :step="step" @reStart="reStart" />
  </div>
  <!-- 提示组件 -->
  <Tip @click="clickTip" v-if="tipShow" />
</template>
<script setup>
import { ref } from "vue";
import Tip from "./components/Tip.vue";
import GameCnt from "./components/GameCnt.vue";
import GameTool from "./components/GameTool.vue";
import GamePass from "./components/GamePass.vue";
import { parseStringStyle } from "@vue/shared";

// 设置tip展示时间
const tipShowTime = 2000;
// 设置tip展示
const tipShow = ref(true);
// 设置步数
const step = ref(0);
// 监听游戏主体
const gameCnt = ref(null);
// 定时器
const timer = ref(null);
// 游戏是否通过
const pass = ref(false);

// 初始化
const init = () => {
  pass.value = false;
  tipShow.value = true;
  step.value = 0;
  showTip();
  // 如果存在gameCnt组件，则调用init方法
  gameCnt.value && gameCnt.value.init();
};

// 关闭提示
const showTip = () => {
  timer.value = setTimeout(() => {
    tipShow.value = false;
  }, tipShowTime);
};

// 设置点击即可手动关闭
const clickTip = () => {
  timer.value && clearTimeout(timer.value);
  tipShow.value = false;
};

// 步数改变
const stepChange = () => {
  step.value++;
};

// 游戏通过
const gamePass = () => {
  step.value = null;
  pass.value = true;
};
// 重新开始
const reStart = () => {
  init();
};

init();
</script>