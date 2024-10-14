<template>
  <div class="tag-card">
    <div class="header">
      <div class="avatar">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaoqian"></use>
        </svg>
      </div>
      <div class="info">标签</div>
    </div>
    <div class="main">
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
      <router-link to="/" class="tag-item"> Vue </router-link>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.tag-card {
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
      i {
        font-size: 20px;
        color: red;
      }
    }
    .info {
      font-size: 18px;
      color: var(--text-color);
    }
  }
  .main {
    text-align: left;
    .tag-item {
      text-decoration: none;
      display: inline-block;
      transition: all 0.4s;
      padding: 0 4px;
      overflow-wrap: break-word;
      line-height: 2;
      color: var(--text-color);
      &:hover {
        color: var(--theme-color);
      }
    }
  }
}
</style>
