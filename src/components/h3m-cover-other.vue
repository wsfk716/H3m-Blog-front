<template>
  <div class="cover">
    <div class="title particletext bubbles" v-if="title">
      {{ title }}
    </div>
    <div class="slot particletext bubbles" v-else>
      <slot></slot>
    </div>
    <div class="text">{{ text }}</div>
  </div>
</template>
<script setup>
import createParticles from "@/utils/text-effect";
import { onMounted, defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});

onMounted(() => {
  createParticles();
});
</script>
<style lang="scss" scoped>
.cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100vw;
  background-image: url("@/assets/image/other-cover.png");
  background-repeat: repeat;
  background-size: cover;
  background-position: center;
  position: relative; /* 设置父容器为相对定位 */
  animation: fadeIn 1.5s ease-in-out; /* 应用渐进式加载动画 */
  .title {
    display: flex;
    font-family: "kanit";
    justify-content: center;
    align-items: center;
    font-size: 65px;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加立体阴影效果 */
  }
  .slot {
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "kanit";
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加立体阴影效果 */
  }
  .text {
    font-family: "Long Cang";
    font-size: 24px;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加立体阴影效果 */
  }
  .el-icon {
    font-size: 58px;
    color: rgb(255, 255, 255, 0.3);
    position: absolute; /* 设置为绝对定位 */
    bottom: 20px; /* 距离底部20px */
    animation: bounce 2s infinite;
    &:hover {
      color: rgb(255, 255, 255, 0.8);
      // 停止动画
      animation-play-state: paused;
    }
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
