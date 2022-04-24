<template>
  <!-- <img :src="myCat" alt=""> -->
  <div class="cnt relative h-full  grid gap-2 grid-cols-5">
    <img class="img absolute top-0 left-0 w-full h-full" :src="myCat" alt="">
    <div v-for="(item, index ) in lists" class="box rounded-md bg-red-300">
      <!-- {{item}} -->
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import myCat from '@/assets/myCat.jpg'
// 定义行个数
const rowLen = 5
// 定义数组
const lists = ref([])
lists.value = new Array(rowLen * rowLen).fill(0)
</script>
<style scoped>
.cnt {
  /* background: url('@/assets/myCat.jpg') no-repeat; */
  /* background-size: 100% 100%; */
}

.box {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  animation: animate 1.5s;
}

.img {
  animation: animate2 2s;
}

@keyframes animate {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;

  }
}

@keyframes animate2 {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
    z-index: 1;
  }
}
</style>