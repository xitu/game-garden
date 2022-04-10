<template>
  <div class="container flex flex-col items-center">
    <div class="h-10 text-xl">得分:{{ score }}</div>
    <!-- <div class="w-80 h-80 main"></div> -->
    <div class="flex">
      <div
        class="w-80 h-80 absolute bg-red-500 -z-10 transition-all"
        style="border-radius: 50%"
        :class="wrongScale"
      ></div>
      <svg
        width="320"
        height="320"
        class="svg"
        :style="{
          'stroke-dasharray': dasharray_num,
          'stroke-dashoffset': dashoffset_num,
        }"
      >
        <circle
          cx="160"
          cy="160"
          r="160"
          stroke="#1e80ff"
          stroke-width="15"
          fill="#8a919f"
        ></circle>
      </svg>
      <div
        class="w-80 h-80 absolute scale-95 overflow-hidden"
        :style="{ 'border-radius': '50%' }"
      >
        <!-- 
            内容
              * 文字第一位，颜色第二位，！为非符号
             -->
        <div
          class="
            w-full
            h-full
            text-6xl text-center text-white
            flex
            justify-center
            content-center
          "
          :style="{ background: color, 'line-height': '320px' }"
        >
          {{ specialFont + "  " }}
          <img :src="buttonFont" style="height: 50%; margin-top: 25%" />
        </div>
      </div>
    </div>

    <div class="start-button" v-if="startShow" @click="startClick">开始!</div>
    <div class="end-button" v-if="endShow">
      {{ end_text }}
    </div>
    <div class="h-10"></div>
    <!-- @media (min-width: 640px) { flex } -->
    <div class="flex responsive">
      <div class="fix-width">
        <div class="button" style="background: #24dfb0" @click="buttonClick(0)">
          Click
        </div>
      </div>
      <div class="w-5"></div>
      <div class="fix-width">
        <div class="button" style="background: #207ffe" @click="buttonClick(1)">
          Yoyo
        </div>
      </div>
      <div class="w-5"></div>
      <div class="fix-width">
        <div class="button" style="background: #fe8c21" @click="buttonClick(2)">
          Hawking
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
const score = ref(0);
const dasharray_num = ref(1005);
const dashoffset_num = ref(1005);
const startShow = ref(true);
const startClick = () => {
  startShow.value = false;
  getQuestion();
  runTime();
};
const endShow = ref(false);
const end_text = ref("结束!");
const endTime = () => {
  color.value = "";
  endShow.value = true;
  setTimeout(() => {
    end_text.value = `得分:${score.value}`;
  }, 2400);
};
const timer = ref();
const runTime = () => {
  timer.value = setInterval(() => {
    dashoffset_num.value--;
    if (dashoffset_num.value == 0) {
      clearInterval(timer.value);
      endTime();
    }
  }, 29.8);
};
// 按钮事件
const buttonClick = (index: number) => {
  if (index == 0) {
    updateScore("#24dfb0", Click);
  } else if (index == 1) {
    updateScore("#207ffe", Yoyo);
  } else {
    updateScore("#fe8c21", Hawking);
  }
};
const updateScore = (updateColor: string, updateFont: string) => {
  if (!startShow.value && !endShow.value) {
    if (specialFont.value == "!") {
      // no的情况
      if (buttonFont.value == "") {
        // 如果文字为空则用颜色判断
        if (updateColor == color.value) {
          clickWrong();
        } else {
          score.value++;
        }
      } else {
        // 如果文字为有则用文字判断
        if (updateFont == buttonFont.value) {
          clickWrong();
        } else {
          score.value++;
        }
      }
    } else {
      // yes的情况
      if (buttonFont.value == "") {
        // 如特殊为空且文字为空则使用颜色判断
        if (updateColor == color.value) {
          score.value++;
        } else {
          clickWrong();
        }
      } else {
        // 如特殊为空且文字为有则使用文字判断
        if (updateFont == buttonFont.value) {
          score.value++;
        } else {
          clickWrong();
        }
      }
    }
    getQuestion();
  }
};
// 方块逻辑
import Yoyo from "@/assets/Yoyo.png";
import Hawking from "@/assets/Hawking.png";
import Click from "@/assets/Click.png";
const colorArr = ["#24dfb0", "#207ffe", "#fe8c21"];
const specialArr = ["", "", "!"];
const fontArr = [Click, Yoyo, Hawking, ""];
const color = ref("");
const specialFont = ref("");
const buttonFont = ref("");
const getQuestion = () => {
  if (wrongCount.value != 3) {
    color.value = colorArr[Math.ceil(Math.random() * 3) - 1];
    specialFont.value = specialArr[Math.ceil(Math.random() * 3) - 1];
    buttonFont.value = fontArr[Math.ceil(Math.random() * 4) - 1];
  }
};
const clickWrong = () => {
  wrongCount.value++;
  if (wrongCount.value == 1) {
    wrongScale.value = "scale-105";
  } else if (wrongCount.value == 2) {
    wrongScale.value = "scale-150";
  } else {
    clearInterval(timer.value);
    endTime();
    wrongScale.value = "scale-0";
  }
};
const wrongScale = ref("scale-100");
const wrongCount = ref(0);
</script>
<style lang="postcss" scoped>
* {
  user-select: none;
}
.svg {
  border-radius: 50%;
  transform: rotatez(-90deg);
}
.start-button {
  width: 310px;
  height: 310px;
  background: #1e80ff;
  text-align: center;
  line-height: 310px;
  border-radius: 50%;
  color: white;
  font-size: 60px;
  position: absolute;
  top: 45px;
  cursor: pointer;
  transition: all 0.3s;
}
.start-button:hover {
  font-size: 80px;
}
.start-button:active {
  font-size: 60px;
}
@keyframes endAnimation {
  5% {
    font-size: 60px;
  }
  50% {
    font-size: 60px;
  }
  53% {
    font-size: 0px;
  }
  60% {
    font-size: 0px;
  }
  63% {
    font-size: 60px;
  }
  100% {
    font-size: 60px;
  }
}
.end-button {
  width: 310px;
  height: 310px;
  text-align: center;
  line-height: 310px;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: 45px;
  font-size: 0px;
  transition: all 0.3s;
  /* 动画 */
  animation: endAnimation 4s;
  animation-fill-mode: forwards;
}
.container {
  position: absolute;
  inset: 0;
  width: fit-content;
  margin: 30px auto;
}
.fix-width {
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.button {
  width: 150px;
  height: 50px;
  border-radius: 8px;
  text-align: center;
  line-height: 50px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.1s;
}
.button:active {
  width: 130px;
  height: 40px;
  line-height: 40px;
}
@media (max-width: 640px) {
  .responsive {
    flex-direction: column;
  }
}
</style>