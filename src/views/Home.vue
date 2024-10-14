<template>
  <div id="home">
    <!-- 页头 -->
    <h3m-header></h3m-header>
    <!-- 封面 -->
    <h3m-cover></h3m-cover>
    <div class="container">
      <!-- 侧边栏 -->
      <div class="side-content">
        <h3m-admin-card></h3m-admin-card>
        <h3m-hot-article-card></h3m-hot-article-card>
        <h3m-category-card></h3m-category-card>
        <h3m-tag-card></h3m-tag-card>
        <h3m-archive-card></h3m-archive-card>
      </div>
      <!-- 文章列表 -->
      <div class="post-article-list">
        <h3m-post-article-card></h3m-post-article-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import H3mHeader from "@/components/h3m-header.vue";
import H3mCover from "@/components/h3m-cover.vue";
import H3mAdminCard from "@/components/h3m-admin-card.vue";
import H3mHotArticleCard from "@/components/h3m-hot-article-card.vue";
import H3mCategoryCard from "@/components/h3m-category-card.vue";
import H3mTagCard from "@/components/h3m-tag-card.vue";
import H3mArchiveCard from "@/components/h3m-archive-card.vue";
import H3mPostArticleCard from "@/components/h3m-post-article-card.vue";
</script>
<style lang="scss" scoped>
#home {
  .container {
    display: flex;
    justify-content: space-between;
    max-width: 1300px;
    padding: 40px 15px;
    margin: 0 auto;
    .side-content {
      width: 25%;
      margin-right: 20px;
      .card {
        margin-bottom: 20px;
      }
    }
    .post-article-list {
      width: calc(100% - 320px);
    }
  }
}
</style>
