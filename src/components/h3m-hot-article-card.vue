<template>
  <div class="article-card">
    <div class="header">
      <div class="avatar">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-remen"></use>
        </svg>
      </div>
      <div class="info">热门文章</div>
    </div>
    <div class="main">
      <router-link to="/" class="img">
        <img src="../assets/image/article-thumbnail.jpg" alt="" />
      </router-link>
      <div class="other-meta">
        <!-- 标题 -->
        <router-link to="/" class="title">标题</router-link>
        <!-- 其他信息 -->
        <div class="desc">
          <div class="date">2024-12-12</div>
          <div class="readNumber">222次围观</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.article-card {
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
    display: flex;
    margin-top: 20px;
    .img {
      width: 58px;
      height: 58px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        transition: transform 0.4s ease;
        &:hover {
          transform: scale(1.1); /* 悬停时略微放大 */
        }
      }
    }
    .other-meta {
      margin-left: 10px;
      text-align: left;
      .title {
        font-size: 18px;
        color: var(--text-color);
        margin-bottom: 10px;
        &:hover {
          color: var(--theme-color);
        }
      }
      .desc {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .date {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
