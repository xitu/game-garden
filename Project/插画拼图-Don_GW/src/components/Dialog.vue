<template>
  <transition v-if="visible" name="fade">
    <div class="dialog">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dialog', // eslint-disable-line
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.dialog {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
