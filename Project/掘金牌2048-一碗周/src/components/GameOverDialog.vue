<script setup lang="ts">
import { withDefaults } from 'vue'
import { useVModel } from '@vueuse/core'
import OreIcon from './OreIcon.vue'
interface Props {
  modelValue: boolean
  score: number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  score: 0,
})
const emits = defineEmits(['update:modelValue', 'restart'])
const show = useVModel(props, 'modelValue', emits)
const handleReStart = () => {
  emits('restart')
}
</script>

<template>
  <div v-show="show" class="w-screen h-screen fixed inset-0">
    <div class="mask bg-black opacity-50 absolute inset-0"></div>
    <div
      class="h-60 w-[420px] bg-white rounded-3xl absolute inset-0 m-auto p-6 flex flex-col"
    >
      <div class="text-center text-xl">游戏结束</div>
      <span class="text-2xl flex justify-center mt-3 flex-grow items-center"
        >获得
        {{ props.score }}

        <OreIcon />
      </span>
      <el-button
        type="primary"
        size="large"
        round
        class="w-full mt-2"
        @click="handleReStart"
        >重新开始</el-button
      >
    </div>
  </div>
</template>
