<template>
  <div v-if="showButton" class="box" @click="scrollToTop">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-huidaodingbu"></use>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showButton = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  showButton.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // 初始化时检查滚动位置
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  transition: all 0.3s;
  .icon {
    font-size: 48px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }
}
</style>
