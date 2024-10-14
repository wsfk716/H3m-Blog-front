<template>
  <div class="archive-card">
    <div class="header">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-nav_wodeguidang"></use>
        </svg>
        <div class="info">标签</div>
      </div>
      <div class="right">
        <el-icon><ArrowRightBold /></el-icon>
      </div>
    </div>
    <router-link to="/" class="archive-item">
      <div class="item-left">2022 年 3 月</div>
      <div class="item-right">12035</div>
    </router-link>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.archive-card {
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: var(--card-box-shadow);
  padding: 20px 24px;
  width: 100%;
  margin-top: 25px;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      .icon {
        margin-right: 10px;
      }
      .info {
        font-size: 18px;
        color: var(--text-color);
      }
    }
    .right {
      align-items: center;
      justify-content: center;
    }
  }
  .archive-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
    transform: scale(1); /* 添加缩放效果 */
    &:hover {
      background: var(--theme-color);
    }
    .item-left,
    .item-right {
      font-size: 14px;
      color: var(--text-color);
      transition: transform 0.3s ease; /* 添加过渡效果 */
    }
    &:hover .item-left,
    &:hover .item-right {
      color: white;
      transform: scale(0.9); /* 悬停时文字内容缩放 */
    }
  }
}
</style>
