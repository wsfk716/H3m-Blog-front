<template>
  <div id="home">
    <!-- 页头 -->
    <h3m-header></h3m-header>
    <!-- 封面 -->
    <h3m-cover-other
      title="✨ 分类 ✨"
      text="天气不似预期 但要走 总要飞"
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
      <div class="category-list">
        <div class="category-item" v-for="item in categoryList" :key="item.id">
          <router-link
            :to="{
              name: 'CategoryDetails',
              params: { id: item.id, categoryName: item.name },
            }"
          >
            <div class="category-item-content">
              <div>{{ item.name }}</div>
              <div class="desc">{{ item.description }}</div>
            </div>
          </router-link>
        </div>
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
import H3mFooter from "@/components/h3m-footer.vue";
import H3mBackToTop from "@/components/h3m-back-to-top.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/useUserStore";
import { ElMessage } from "element-plus";
import { getCategoryNameList } from "../../api/category";
const { user } = useUserStore();

onMounted(() => {
  getList();
});
const categoryList = ref([]);
const getList = async () => {
  try {
    const res = await getCategoryNameList(user.currentUserInfo.id);
    categoryList.value = res.data.data;
  } catch (error) {
    ElMessage.error("获取分类列表失败");
  }
};
</script>
<style lang="scss" scoped>
#home {
  background-color: #fff;
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
    .category-list {
      width: 74%;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      height: 100%;

      .category-item {
        width: 100%;
        padding: 0 8px;
        &:nth-child(odd) a {
          color: #f731a4; /* 第一种颜色 */
        }
        &:nth-child(even) a {
          color: #36cc09; /* 第二种颜色 */
        }
        a {
          display: block;
          text-align: center;
          margin: 20px 0;
          font-size: 20px;
          text-decoration: none;

          &:hover {
            color: #409eff;
          }
        }
        .category-item-content {
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          .desc {
            width: 60%;
            text-align: right;
            color: #b5a9a9;
            flex-wrap: wrap;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
