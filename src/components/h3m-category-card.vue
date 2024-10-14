<template>
  <div class="category-card">
    <div class="header">
      <div class="avatar">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duixiangfenlei"></use>
        </svg>
      </div>
      <div class="info">分类</div>
    </div>
    <router-link to="/" class="category-item">
      <div class="left">markdown</div>
      <div class="right">12312</div>
    </router-link>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.category-card {
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
    margin-bottom: 10px;
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
    .info {
      font-size: 18px;
      color: var(--text-color);
    }
  }
  .category-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
    transform: scale(1); /* 添加缩放效果 */
    &:hover {
      background: var(--theme-color);
    }
    .left,
    .right {
      font-size: 14px;
      color: var(--text-color);
      transition: transform 0.3s ease; /* 添加过渡效果 */
    }
    &:hover .left,
    &:hover .right {
      color: white;
      transform: scale(0.9); /* 悬停时文字内容缩放 */
    }
  }
}
</style>
