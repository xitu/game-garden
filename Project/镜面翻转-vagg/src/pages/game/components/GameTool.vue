<template>
  <div class="p-2 flex tool">
    <!-- 左侧监听步数 -->
    <div class="w-full-1/2 text-center">
      {{ computedStep }}
    </div>
    <!-- 右侧重新开始 -->
    <div class="w-full-1/2 text-center btn" @click="clickReStart">
      重新开始
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

// 接收入参
const props = defineProps({
  step: {
    type: [Number, Object],
    default: 0
  }
})
// 定义传参方法
const emit = defineEmits(['reStart'])

// 计算步数输出
const computedStep = computed(() => {
  if (props.step === null) {
    return `您已经成功啦`
  }
  if (props.step) {
    return `您已经移动${props.step}次`
  }
  return '您还没开始移动'
})

// 点击重新开始
const clickReStart = () => {
  emit('reStart')
}
</script>
<style scoped>
.tool {
  border-top: 1px solid #ccc;
}

.tool .btn {
  border-left: 1px solid #ccc;
}
</style>