<template>
  <div class="checkpoint">
    <Header title="关卡选择" />

    <ul>
      <li v-for="(item, index) in list" :key="index" :class="{ pass: item.pass }" @click="handlePlay(item)" />
    </ul>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Checkpoint', // eslint-disable-line
  components: { Header },
  data() {
    return {}
  },
  computed: {
    list() {
      return this.$store.state.list
    },
  },
  methods: {
    handlePlay(item) {
      this.$store.commit('SET_CURRENT', item)
      this.$router.push('/play')
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  padding: 20px;

  li {
    display: inline-block;
    margin-right: 10px;
    border-radius: 5px;
    position: relative;
    width: 50px;
    height: 50px;
    border: 2px solid #dee1e6;
    background-image: url('@/assets/close.png');

    &.pass {
      border: 2px solid #00cc99;
      background-image: url('@/assets/pass.png');
    }

    img {
      width: 50px;
    }
  }
}
</style>
