<template>
  <div class="post-article-card">
    <!-- 缩略图 -->
    <router-link to="/" class="img">
      <img src="../assets/image/login-background.jpg" alt="" />
    </router-link>
    <!-- 文章信息 -->
    <div class="info">
      <router-link to="/" class="title">标题</router-link>
      <!-- 其他元数据 -->
      <div class="meta-data-wrap">
        <div class="date">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-rili"></use>
          </svg>
          发表于 2021-09-01 |
        </div>
        <div class="category">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wenjianguidang"></use>
          </svg>
          分类 markdown |
        </div>
        <div class="readNumber">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yueduxiao"></use>
          </svg>
          阅读 100
        </div>
      </div>
      <!-- 摘要 -->
      <div class="summary">摘要</div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.post-article-card {
  height: 252px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: white;
  border-radius: 8px;
  box-shadow: var(--card-box-shadow);

  .img {
    width: 40%;
    height: 100%;
    overflow: hidden;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;

      &:hover {
        transform: scale(1.1); /* 悬停时略微放大 */
      }
    }
  }
  .info {
    width: 60%;
    padding: 20px;
    text-align: left;
    .title {
      font-size: 24px;
      font-weight: bold;
      color: var(--text-color-dark);
      transition: color 0.3s ease;
      &:hover {
        color: var(--theme-color);
      }
    }
    .meta-data-wrap {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .date,
      .category,
      .readNumber {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--text-color-light);
        margin-right: 10px;
        .icon {
          font-size: 14px;
          margin-right: 5px;
        }
      }
    }
    .summary {
      font-size: 14px;
      color: var(--text-color);
      line-height: 1.5;
    }
  }
}
</style>
