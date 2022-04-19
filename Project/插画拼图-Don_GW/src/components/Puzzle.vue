<template>
  <div class="puzzle">
    <div class="content">
      <ul class="ul">
        <li v-for="li in lis" :key="li.id" :style="setLiStyles(li.curIndex)" @click="handleMove(li)">
          <img :src="src" :style="setPhotoStyles(li.prevIndex)" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 乱序次数
const count = 300

export default {
  name: 'Puzzle', // eslint-disable-line
  props: {
    size: {
      type: [Number, String],
      default: 3,
    },
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      lis: [],
      empty: {},
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const len = this.size * this.size

      // 由于 li 有样式过渡，默认用 index 作为 key 值将触发 vue 的元素重用优化
      // 导致初始图片过渡时移动，因此以随机 id 作为 key 值，避免触发优化
      var lis = new Array(len - 1).fill(0).map((li, index) => ({
        prevIndex: index,
        curIndex: index,
        id: Date.now() + index,
      }))
      this.empty = {
        prevIndex: len - 1,
        curIndex: len - 1,
      }
      // 打乱
      for (var i = 0; i < count; i++) {
        this.outOfOrder(lis)
      }
      this.lis = lis

      const ul = document.querySelector('ul')
      const { width } = window.getComputedStyle(ul)

      ul.style.height = width
    },

    fresh() {
      this.$nextTick(() => {
        this.init()
      })
    },

    handleMove(li) {
      const { rowIndex, colIndex } = this.getLocation(li.curIndex)
      const { rowIndex: eRowIndex, colIndex: eColIndex } = this.getLocation(this.empty.curIndex)
      // 点击元素与空位在同一行，相邻列
      const x = rowIndex === eRowIndex && Math.abs(colIndex - eColIndex) === 1
      // 点击元素与空位在同一列，相邻行
      const y = colIndex === eColIndex && Math.abs(rowIndex - eRowIndex) === 1

      if (x || y) {
        ;[li.curIndex, this.empty.curIndex] = [this.empty.curIndex, li.curIndex]

        const pass = this.lis.every(li => li.prevIndex === li.curIndex)

        pass && this.$emit('on-pass')
      }
    },

    outOfOrder: (function (prev) {
      var prev = null

      return function (lis) {
        const { rowIndex: eRowIndex, colIndex: eColIndex } = this.getLocation(this.empty.curIndex)
        const result = lis.reduce((pre, cur) => {
          const { rowIndex, colIndex } = this.getLocation(cur.curIndex)
          const x = rowIndex === eRowIndex && Math.abs(colIndex - eColIndex) === 1
          const y = colIndex === eColIndex && Math.abs(rowIndex - eRowIndex) === 1

          if (x || y) {
            // 避免元素重复点击
            cur !== prev && pre.push(cur)
          }

          return pre
        }, [])
        const random = this.getRandom(0, result.length - 1)
        const current = (prev = result[random])

        ;[current.curIndex, this.empty.curIndex] = [this.empty.curIndex, current.curIndex]
      }
    })(),

    setPhotoStyles(index) {
      const width = this.getLiWidth()
      const { rowIndex, colIndex } = this.getLocation(index)

      return {
        left: `-${colIndex * width}px`,
        top: `-${rowIndex * width}px`,
        width: `${this.size * 100}%`,
      }
    },

    setLiStyles(index) {
      const width = this.getLiWidth()
      const { rowIndex, colIndex } = this.getLocation(index)

      return {
        left: `${colIndex * width}px`,
        top: `${rowIndex * width}px`,
        width: `${width}px`,
        height: `${width}px`,
      }
    },

    getLocation(index) {
      return {
        rowIndex: ~~(index / this.size),
        colIndex: index % this.size,
      }
    },

    getLiWidth() {
      const ul = document.querySelector('.ul')
      const { width } = window.getComputedStyle(ul)

      return Number.parseInt(width) / this.size
    },

    getRandom(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)

      return Math.floor(Math.random() * (max - min + 1)) + min
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px;
}

.ul {
  position: relative;

  li {
    overflow: hidden;
    position: absolute;
    transform: translateZ(0);
    transition: left 0.4s, top 0.4s;

    img {
      position: absolute;
    }
  }
}
</style>
