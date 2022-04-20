<template>
  <div class="cnt h-full grid gap-2 grid-cols-5">
    <div
      v-for="(item, index) in lists"
      class="box rounded-md"
      :class="!item ? 'bg-blue-300 my' : 'bg-red-300 mx'"
      @click="boxClick(index)"
    >
      <!-- {{item}} -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 定义传参方法
const emit = defineEmits(["gamePass", "stepChange"]);
// 定义行个数
const rowLen = 5;
// 定义数组
const lists = ref([]);
// 初始化
const init = () => {
  lists.value = [];
  lists.value = new Array(rowLen * rowLen).fill(0);
};
// 点击box时
const boxClick = (index) => {
  // 步数改变
  emit("stepChange");
  // 改变值
  const changeVal = (index) => {
    return lists.value[index] ? 0 : 1;
  };
  // 实现该元素值变换
  lists.value[index] = changeVal(index);

  // 改变该元素之上的值
  let topInxdex = index - rowLen;
  topInxdex > -1 && (lists.value[topInxdex] = changeVal(topInxdex));

  // 改变该元素之下的值
  let botInxdex = index + rowLen;
  botInxdex < lists.value.length &&
    (lists.value[botInxdex] = changeVal(botInxdex));

  // 改变该元素之左的值
  let leftInxdex = index - 1;
  leftInxdex > -1 &&
    parseInt(index / rowLen) === parseInt(leftInxdex / rowLen) &&
    (lists.value[leftInxdex] = changeVal(leftInxdex));

  // 改变该元素之右的值
  let rightInxdex = index + 1;
  rightInxdex < lists.value.length &&
    parseInt(index / rowLen) === parseInt(rightInxdex / rowLen) &&
    (lists.value[rightInxdex] = changeVal(rightInxdex));

  // 是否都成功
  const getIsAllOk = () => {
    return lists.value.some((item) => item === 0);
  };
  // 判断是否都成功了
  const flag = getIsAllOk();
  if (!flag) {
    gamePass();
  }
};

// 测试代码
// setTimeout(() => {
//   for (let i = 0; i < lists.value.length; i++) {
//     lists.value[i] = 1;
//   }
//   lists.value[0] = 0;
//   lists.value[1] = 0;
//   lists.value[5] = 0;
//   // emit('gamePass')
// }, 2500);

// 成功调用的方法
const gamePass = () => {
  emit("gamePass");
};
// 执行初始化
init();
// 暴露init
defineExpose({
  init,
});
</script>

<style scoped>
/* .cnt {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3) inset;
} */
.box {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}
.box.mx {
  transform: rotateY(-180deg);
}
.box.my {
  transform: rotateY(0deg);
}
</style>