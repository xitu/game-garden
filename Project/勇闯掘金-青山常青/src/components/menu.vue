<!--
 * @Author: 十里青山
 * @Date: 2022-03-30 23:19:29
 * @公众号: 百里青山
 * @LastEditors: 掘金：十里青山
 * @LastEditTime: 2022-04-13 00:13:42
 * @Descripttion: 菜单
-->
<template>
  <div class='menu-wrap'>
    <div class="title">勇闯掘金</div>
    <div class="logo">
      <img src="../assets/img/logo-2-mini.gif" alt="">
    </div>
    <div class="begin" @click="begin">开始游戏</div>
  </div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
      read: false
    }
  },
  methods: {
    begin() {
      this.$emit('changeSage', 1)
    }
  }
}
</script>
<style scoped>
.menu-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.title {
  font-size: 5vw;
  color: #1e80ff;
  text-align: center;
  margin-top: 10vh;
  letter-spacing: 2vw;
  font-family: 'douyu';
}
.logo {
  width: 30vw;
  margin: auto;
}
.logo img {
  width: 100%;
}
.begin {
  font-family: 'douyu';
  position: absolute;
  bottom: 10vh;
  left: 50%;
  font-size: 2.5vw;
  cursor: pointer;
  color: #1e80ff;
  transform: translateX(-50%);
}
.rule-text {
  position: absolute;
  bottom: 1vh;
  width: 100%;
  left: 0;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 15vw;
    letter-spacing: 1vw;
  }
  .logo {
    width: 90vw;
  }
  .begin {
    font-size: 8vw;
  }
}
</style>