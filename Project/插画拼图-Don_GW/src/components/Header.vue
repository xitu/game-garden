<template>
  <div class="header">
    {{ title }}

    <div v-if="!hiddenBack" class="leftIcon" @click="$router.go(-1)">
      <img src="@/assets/back.png" alt="" />
    </div>

    <div v-if="showFresh" class="rightIcon" @click="$emit('on-fresh')">
      <img src="@/assets/fresh.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header', // eslint-disable-line
  props: {
    title: {
      type: String,
      default: '',
    },
    hiddenBack: {
      type: Boolean,
      default: false,
    },
    showFresh: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  background: rgb(0, 204, 153);
  padding: 0 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  position: relative;
}

.leftIcon,
.rightIcon {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 30px;
  }
}

.rightIcon {
  right: 0;
  left: initial;
}
</style>
