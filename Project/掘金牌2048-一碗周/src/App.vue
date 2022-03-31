<template>
  <div
    class="warp h-screen lg:w-[480px] md:w-screen m-auto flex flex-col justify-center items-center select-none"
  >
    <div>
      <h4
        class="font-bold text-2xl mb-5 flex bg-[rgba(30,128,255,.8)] rounded-full text-white pt-3 pr-10 pb-2 pl-6"
      >
        <!-- 矿石图标 -->
        <OreIcon />
        ：{{ score }}
      </h4>
    </div>
    <div
      class="container bg-[#D6E8FF] w-full lg:h-[680px] md:h-[520px] grid grid-cols-4 grid-rows-4 gap-4 p-4 rounded-lg"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <span v-for="(item, index) in dataArray" :key="index" class="grid-item">
        <div v-for="inx in n2048" :key="inx">
          <img
            v-if="item === inx"
            :src="getImageUrl(item)"
            class="w-full he-full user-drag animate-scale"
          />
        </div>
      </span>
    </div>
    <div class="mt-2 text-left w-full p-4 text-white">
      <p>说明：矿石兑换凭截图找托尼老师，不兑换可不怪我哦~</p>
      <p>游戏玩法：PC端按下上左右、H5你就在手机上来回的划拉就好~</p>
    </div>
    <!-- 将游戏结束的弹框 -->
    <GameOverDialogVue v-model="show" :score="score" @restart="handleReStart" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import GameOverDialogVue from 'cpns/GameOverDialog.vue'
import OreIcon from 'cpns/OreIcon.vue'
const getImageUrl = (item: number) => {
  return new URL(`./assets/image/block_${item}.png`, import.meta.url).href
}
const n2048 = ref<number[]>([
  0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768,
])
const over = ref(false)
const dataArray = ref<number[]>([
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
])
const score = ref(0)
const show = ref(false)
type DirectionType = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown'
// 四个方向每一次需要使用的索引
const DATA_PROPS = {
  ArrowLeft: [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
  ],
  ArrowUp: [
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
  ],
  ArrowRight: [
    [3, 2, 1, 0],
    [7, 6, 5, 4],
    [11, 10, 9, 8],
    [15, 14, 13, 12],
  ],
  ArrowDown: [
    [12, 8, 4, 0],
    [13, 9, 5, 1],
    [14, 10, 6, 2],
    [15, 11, 7, 3],
  ],
}

const DirectionArr: DirectionType[] = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
]
document.addEventListener('keyup', (e: KeyboardEvent) => {
  if (DirectionArr.find(item => item === e.key)) {
    run(e.key as unknown as DirectionType)
  }
})
// 记录触摸开始和结束的位置
const moveXY = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
}
const handleTouchStart = (e: TouchEvent) => {
  e.preventDefault()
  // 获取开始的位置
  moveXY.startX = e.touches?.[0].pageX
  moveXY.startY = e.touches?.[0].pageY
}
const handleTouchEnd = (e: TouchEvent) => {
  e.preventDefault()
  // 获取结束的位置
  moveXY.endX = e.changedTouches?.[0].pageX
  moveXY.endY = e.changedTouches?.[0].pageY
  // 获取滑动距离
  const distanceX = moveXY.endX - moveXY.startX
  const distanceY = moveXY.endY - moveXY.startY
  // 判断滑动方向
  if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
    run('ArrowLeft')
  } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
    run('ArrowRight')
  } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY < 0) {
    run('ArrowUp')
  } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 0) {
    run('ArrowDown')
  }
}
const run = (direction: DirectionType) => {
  // over 用于记录游戏是否结束
  if (over.value) return

  ArrComputed(dataArray.value, direction)
  gameOver(dataArray.value)
  create(dataArray.value)
}
const _2048 = (arr: number[], boo = true) => {
  const newArr: number[] = []
  for (let i = 0; i < arr.length; i++) {
    // 如果当前的数值为0直接跳出本次循环
    if (!arr[i]) continue
    // 当出现 32768 表示游戏结束（因为没有比32768更大的图了）
    if (arr[i] === 32768) {
      // TODO 游戏结束 win
      gameOverBox()
      return []
    }
    let j = i + 1

    for (; j < arr.length; j++) {
      if (arr[j] !== 0) break
    }

    // 比较是否相等，将结果push到新数组中
    if (arr[i] === arr[j]) {
      if (boo) {
        score.value += arr[i]
      }
      newArr.push(arr[i] + arr[j])
      i++
    } else {
      newArr.push(arr[i])
    }
  }

  // 补0
  return [0, 0, 0, 0].map((v, i) => newArr[i] || v)
}
const setArrayVal = (arr: number[], index: number[], value: number[]) => {
  index.forEach((val, index) => {
    arr[val] = value[index]
  })
}
const ArrComputed = (arr: number[], direction: DirectionType, bool = true) => {
  DATA_PROPS[direction].forEach(_ => {
    const newArr = _2048([arr[_[0]], arr[_[1]], arr[_[2]], arr[_[3]]], bool)
    setArrayVal(arr, _, newArr)
  })
}

// 创建
const create = (arr: number[]) => {
  // 查找数组中未0的索引，将其保存到一个数组中
  const val0Arr = findIndexAll(arr, 0)

  const random = Math.floor(Math.random() * val0Arr.length)
  const index = val0Arr[random]
  const newArr = [2, 4, 8]
  arr[index] = newArr[Math.floor(Math.random() * newArr.length)]
}
// 在数组中查找所有出现的x，并返回一个包含匹配索引的数组
const findIndexAll = (arr: number[], x: number) => {
  const results = [],
    len = arr.length
  let pos = 0
  while (pos < len) {
    pos = arr.indexOf(x, pos)
    if (pos === -1) {
      //未找到就退出循环完成搜索
      break
    }
    results.push(pos) //找到就存储索引
    pos += 1 //并从下个位置开始搜索
  }
  return results
}
// 游戏结束的判断
const gameOver = (arr: number[]) => {
  const oldArr = JSON.stringify(arr)

  const testArr = JSON.parse(JSON.stringify(arr))
  // 计算四个方向
  const _res: string[] = []
  DirectionArr.forEach(item => {
    ArrComputed(testArr, item, false)
    _res.push(JSON.stringify(testArr))
  })

  if (_res.filter(i => i === oldArr).length == 4) {
    // 游戏结束
    over.value = true
    // 打开游戏结束的弹框组件
    gameOverBox()
  }
}
// 数组重置的函数
const restart = () => {
  const arr = Array.apply(null, Array(16)).map(Number.prototype.valueOf, 0)
  const random1 = Math.floor(Math.random() * arr.length)
  const random2 = Math.floor(Math.random() * arr.length)
  arr[random1] = 2
  arr[random2] = 4
  return arr
}

const gameOverBox = () => {
  // 游戏结束 打开弹框
  show.value = true
}
// 重新开始
const handleReStart = () => {
  show.value = false
  dataArray.value = restart()
  score.value = 0
  over.value = false
}
</script>
<style>
@keyframes scale {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
.animate-scale {
  animation: scale 0.2s ease;
}
</style>
