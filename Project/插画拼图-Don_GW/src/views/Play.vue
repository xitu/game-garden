<template>
  <div class="puzzle">
    <Header :title="current.title" show-fresh @on-fresh="onFresh" />

    <Puzzle ref="Puzzle" :size="current.size" :src="current.src" @on-pass="onPass" />

    <Dialog :visible.sync="visible">
      <div class="content">
        <img src="@/assets/congratulations.png" alt="" />
        <p class="desc">恭喜通关！！！</p>
        <button v-if="passAll" @click="toHome">返回首页</button>
        <button v-else @click="onNext">下一关</button>
      </div>
    </Dialog>

    <button class="tip" @click="handleTip">查看提示</button>
    <Dialog :visible.sync="tip">
      <div class="photo" @click="tip = false">
        <img :src="current.src" alt="" />
      </div>
    </Dialog>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Puzzle from '@/components/Puzzle.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Play', // eslint-disable-line
  components: { Header, Puzzle, Dialog },
  data() {
    return {
      visible: false,
      tip: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.list
    },
    current() {
      return this.$store.state.current
    },
    passAll() {
      return this.list.every(el => el.pass)
    },
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },

    onFresh() {
      this.$refs.Puzzle && this.$refs.Puzzle.fresh()
    },

    onNext() {
      // 修复连续点击的跳关的问题
      if (!this.visible) return

      const index = this.list.findIndex(el => el === this.current)

      this.$store.commit('SET_CURRENT', this.list[index + 1])
      this.$refs.Puzzle && this.$refs.Puzzle.fresh()
      this.visible = false
    },

    onPass() {
      this.$store.commit('SET_PASS_CURRENT')
      this.visible = true
    },

    handleTip() {
      this.tip = true
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  width: 50%;
  height: 38px;
  background: rgb(0, 204, 153);
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.tip {
  width: calc(100% - 40px);
  margin-left: 20px;
}

.content {
  width: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .desc {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    margin: 10px 0;
  }

  img {
    width: 100%;
  }
}

.photo {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 20px;
  padding-top: 70px;

  img {
    width: 100%;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  }
}
</style>
