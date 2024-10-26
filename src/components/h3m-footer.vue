<template>
  <div class="footer">
    <div class="footer-image"></div>
    <div class="footer-box">
      <!-- 标语 -->
      <div class="footer-text">
        「开始时捱一些苦
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        栽种绝处的花」
      </div>
      <!-- 运行时间 -->
      <div class="blog-run-time">
        网站已经运行了 {{ runtime.day }} 天 {{ runtime.hour }} 小时
        {{ runtime.minute }} 分 {{ runtime.second }} 秒
        <div class="smileFace">ღゝ◡╹)ノ♡</div>
      </div>
      <!-- 版权 -->
      <div class="copyright">Copyright © 2024 我是浮夸。</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const runtime = ref({
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
});
const startTime = new Date("2024-10-01 00:00:00").getTime();
const updateRuntime = () => {
  const nowTime = new Date().getTime();
  const runTime = nowTime - startTime;
  runtime.value.day = Math.floor(runTime / (24 * 3600 * 1000));
  runtime.value.hour = Math.floor(
    (runTime % (24 * 3600 * 1000)) / (3600 * 1000)
  );
  runtime.value.minute = Math.floor((runTime % (3600 * 1000)) / (60 * 1000));
  runtime.value.second = Math.floor((runTime % (60 * 1000)) / 1000);
};

onMounted(() => {
  updateRuntime();
  setInterval(() => {
    updateRuntime();
  }, 1000);
});
</script>
<style lang="scss" scoped>
.footer {
  background: #232323;
  margin-top: 250px;
  padding: 15px 0 45px 0;
  width: 100%;
  color: rgb(133, 133, 133);
  text-align: center;
  position: absolute;
  .footer-image {
    width: 100%;
    height: 368px;
    background: url("@/assets/image/footer.webp") 50% center no-repeat;
    position: absolute;
    top: -293px;
    z-index: 999;
  }
  .footer-box {
    .footer-text {
      font-size: 24px;
      margin-bottom: 10px;
      font-family: "Long Cang";
    }
    .blog-run-time {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      .smileFace {
        margin-left: 10px;
        cursor: pointer;
        animation: bounce 0.3s infinite;
      }
    }
    .copyright {
      font-size: 12px;
      margin-top: 5px;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px); /* 向上移动 10 像素 */
    }
  }
}
</style>
