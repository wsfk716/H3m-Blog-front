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
        <h3m-post-article-card
          :article-list="articleList"
        ></h3m-post-article-card>

        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="articleCount"
          :page-size="pageSize"
          id="pagination"
          @current-change="onCurrentPageChanged"
          v-if="articleCount > 0"
        ></el-pagination>
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

import { onMounted, ref } from "vue";
import { getArticleCount, getArticleList } from "@/api/article";
import { useUserStore } from "@/store/useUserStore";
import { ElMessage } from "element-plus";

const { user } = useUserStore();
const articleCount = ref(0);
const pageSize = 6; // 每页显示的文章数量, 这里我直接固定死了
const articleList = ref([]);
onMounted(() => {
  getCount(user.currentUserInfo.id);
  onCurrentPageChanged(1);
});

const getCount = async (userId) => {
  const res = await getArticleCount(userId);
  articleCount.value = res.data.data;
};

const onCurrentPageChanged = async (pageNum) => {
  const res = await getArticleList(user.currentUserInfo.id, pageNum, pageSize);
  if (res.data.code === 1) {
    articleList.value = res.data.data;
    // console.log(articleList.value);
  } else {
    ElMessage.error("获取文章列表失败");
  }
};
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
      .el-pagination {
        margin-top: 20px;
        justify-content: center;
      }
    }
  }
}
</style>
