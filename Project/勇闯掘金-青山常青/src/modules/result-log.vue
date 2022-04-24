<!--
 * @掘金: 十里青山
 * @Date: 2022-04-05 18:00:11
 * @公众号: 百里青山
 * @掘金: 十里青山
 * @LastEditTime: 2022-04-12 00:46:26
 * @Descripttion: 结果弹窗
-->
<template>
<div class="result-wrap" v-show="status">
      <!-- <div class="result-content"></div> -->
      <div
        class="
          result-text
          success-text
          animate__animated animate__lightSpeedInLeft animate__faster
        "
        v-show="status === 'success'"
      >
        SUCCESS
      </div>
      <div
        class="
          result-text
          error-text
          animate__animated animate__lightSpeedInLeft animate__faster
        "
        v-show="status === 'fail'"
      >
        FAIL
      </div>
      <div
        class="result-btn animate__animated animate__slideInUp animate__faster"
        @click="$emit('goOn')"
        v-show="status === 'success' || status === 'fail'"
      >
        {{isEnd ? '下一关' : '下一轮'}}
      </div>
    </div>
</template>

<script>

export default {
  name: '',
  props: {
    status: {
      type: String,
      default: ''
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
}
</script>
<style scoped>
/* 提示弹框 */
.result-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
}
.result-text {
  font-family: 'douyu';
  font-size: 12vh;
  position: absolute;
  top: 30vh;
  width: 100%;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: #fff;
}
.success-text {
  color: #63d94f;
}
.error-text {
  color: #ff5656;
}

.result-btn {
  font-family: 'douyu';
  position: absolute;
  font-size: 8vh;
  top: 45vh;
  color: #1e80ff;
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .result-text {
    font-size: 8vh;
    height: 8vh;
  }
}
</style>