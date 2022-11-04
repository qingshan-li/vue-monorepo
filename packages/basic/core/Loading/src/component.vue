<template>
  <Teleport to="body">
    <transition name="slide-fade">
      <div class="j-loading" v-show="show">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </transition>
  </Teleport>
</template>
<script setup lang='ts'>
import { ref } from "vue";
const show = ref(false);
const open = () => {
  show.value = true;
};
const close = () => {
  show.value = false;
};

defineExpose({
  open,
  close
})
</script>
<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
.j-loading {
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: #000000, $alpha: 0.5);
  ul {
    display: flex;
  }
  li {
    width: 20px;
    height: 20px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #ea3080;
    transition: all 0.3s;
    &:nth-of-type(1) {
      animation: magnify 1.2s linear infinite reverse;
    }
    &:nth-of-type(2) {
      animation: magnify 1.2s linear infinite reverse;
      animation-delay: 0.2s;
    }
    &:nth-of-type(3) {
      animation: magnify 1.2s linear infinite reverse;
      animation-delay: 0.4s;
    }
  }
  @keyframes magnify {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
