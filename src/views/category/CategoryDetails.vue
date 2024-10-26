<template>
  <div class="home">
    <!-- 页头 -->
    <h3m-header></h3m-header>
    <!-- 封面 -->
    <h3m-cover-other
      :title="title"
      text="只能说我输了，也许是你怕了"
    ></h3m-cover-other>
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
      <div class="category-article-list">
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

    <!-- 页脚 -->
    <h3m-footer></h3m-footer>

    <!-- 滚动到顶部按钮 -->
    <h3m-back-to-top></h3m-back-to-top>
  </div>
</template>
<script setup>
import H3mHeader from "@/components/h3m-header.vue";
import H3mCoverOther from "../../components/h3m-cover-other.vue";
import H3mAdminCard from "@/components/h3m-admin-card.vue";
import H3mHotArticleCard from "@/components/h3m-hot-article-card.vue";
import H3mCategoryCard from "@/components/h3m-category-card.vue";
import H3mTagCard from "@/components/h3m-tag-card.vue";
import H3mArchiveCard from "@/components/h3m-archive-card.vue";
import H3mPostArticleCard from "@/components/h3m-post-article-card.vue";
import H3mFooter from "@/components/h3m-footer.vue";
import H3mBackToTop from "@/components/h3m-back-to-top.vue";
import { onMounted, ref, watch } from "vue";
import { getArticleListByTagOrCategoryOrDate } from "@/api/article";
import { useUserStore } from "@/store/useUserStore";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";

const route = useRoute();
const categoryId = route.params.id;
const { user } = useUserStore();
const articleCount = ref(0);
const pageSize = 10; // 每页显示的文章数量, 这里我直接固定死了
const articleList = ref([]);
const title = ref("");

onMounted(() => {
  onCurrentPageChanged(1);
  title.value = "✨" + route.params.categoryName + "✨";
});

watch(
  () => route.params,
  () => {
    // 刷新页面
    window.location.reload();
  }
);
const onCurrentPageChanged = async (pageNum) => {
  const res = await getArticleListByTagOrCategoryOrDate(
    user.currentUserInfo.id,
    0,
    categoryId,
    "",
    pageNum,
    pageSize
  );
  if (res.data.code === 1) {
    if (res.data.data.total === 0) {
      ElMessage.warning("暂无文章");
    }
    articleCount.value = res.data.data.total;
    articleList.value = res.data.data.rows;
  } else {
    ElMessage.error("获取文章列表失败");
  }
};
</script>
<style lang="scss" scoped>
.home {
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
    .category-article-list {
      width: calc(100% - 320px);
      .el-pagination {
        margin-top: 20px;
        justify-content: center;
      }
    }
  }
}
</style>
