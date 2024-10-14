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
    <div class="main"></div>
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
}
</style>
