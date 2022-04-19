<template>
  <div class="home">
    <div class="content">
      <p class="title">插画拼图</p>
      <p class="desc">PUZZLE</p>
      <button @click="toCheck">开始游戏</button>
      <button class="about" @click="toAbout">关于</button>
    </div>

    <Dialog :visible.sync="visible">
      <div class="info" @click="visible = false">
        <div>
          <img src="@/assets/haha.png" alt="" />
          <p>Powered by <a href="https://github.com/dongwei1125" target="_blank">Don_GW</a></p>
        </div>
      </div>
    </Dialog>

    <img src="@/assets/home.jpg" alt="" />
  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'Home', // eslint-disable-line
  components: {
    Dialog,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    toCheck() {
      this.$router.push('/checkpoint')
    },

    toAbout() {
      this.visible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  height: 100%;
}

.content {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);

  .title {
    font-size: 30px;
    font-weight: 600;
    color: #fff;
  }

  .desc {
    color: #fff;
    text-align: center;
    font-family: DejaVu Sans Mono, Ubuntu Mono, Anonymous Pro, Droid Sans Mono, Menlo, Monaco, Consolas,
      Inconsolata, Courier, monospace, PingFang SC, Microsoft YaHei, sans-serif;
    margin: 10px 0;
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 38px;
    background: rgb(0, 204, 153);
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
  }
}

img {
  width: 100%;
  height: 100%;
}

.about {
  margin-top: 10px;
}

.info {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  img {
    width: 48px;
    height: 48px;
  }

  p {
    color: #fff;
    font-family: DejaVu Sans Mono, Ubuntu Mono, Anonymous Pro, Droid Sans Mono, Menlo, Monaco, Consolas,
      Inconsolata, Courier, monospace, PingFang SC, Microsoft YaHei, sans-serif;
    font-weight: 600;
    margin-top: 10px;
  }
}
</style>
