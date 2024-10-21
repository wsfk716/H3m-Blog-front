<template>
  <div id="home">
    <!-- 页头 -->
    <h3m-header></h3m-header>
    <!-- 封面 -->
    <h3m-cover-other
      title="✨ 归档 ✨"
      text="雄关漫道真如铁，而今迈步从头越"
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
      <div class="timeline-article-list">
        <el-timeline class="timeline">
          <el-timeline-item
            center
            :timestamp="`历史文章 - ${articleCount}`"
            placement="top"
            class="archive-title"
            type="primary"
            size="large"
            hollow="true"
          >
          </el-timeline-item>

          <el-timeline-item
            v-for="(item, index) in archiveList"
            :key="index"
            :timestamp="item.year"
            placement="top"
            class="archive-item"
            hollow="true"
            type="warning"
          >
            <div
              class="main"
              v-for="article in item.articles"
              :key="article.id"
            >
              <router-link
                :to="{ name: 'ArticleDetails', params: { id: article.id } }"
                class="img"
              >
                <img
                  :src="article.thumbnail"
                  @error="handleImageError"
                  alt="文章缩略图"
                  class="article-thumbnail"
                />
              </router-link>
              <div class="other-meta">
                <!-- 标题 -->
                <router-link
                  :to="{ name: 'ArticleDetails', params: { id: article.id } }"
                  class="title"
                  >{{ article.title }}</router-link
                >
                <!-- 其他信息 -->
                <div class="desc">
                  <div class="date">{{ formatDate(article.createTime) }}</div>
                  <div class="readNumber">{{ article.viewCount }}次围观</div>
                </div>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>

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
import H3mFooter from "@/components/h3m-footer.vue";
import H3mBackToTop from "@/components/h3m-back-to-top.vue";
import { onMounted, ref } from "vue";
import { getArticleCount } from "@/api/article";
import { useUserStore } from "@/store/useUserStore";
import { ElMessage } from "element-plus";
import { getArchiveList } from "@/api/archive";
const { user } = useUserStore();
const articleCount = ref(0);
const pageSize = 10; // 每页显示的文章数量, 这里我直接固定死了
const archiveList = ref([]);
onMounted(() => {
  getCount(user.currentUserInfo.id);
  onCurrentPageChanged(1);
});
// 获取历史文章数量
const getCount = async (userId) => {
  const res = await getArticleCount(userId);
  articleCount.value = res.data.data;
};
// 翻页
const onCurrentPageChanged = async (pageNum) => {
  const res = await getArchiveList(user.currentUserInfo.id, pageNum, pageSize);
  if (res.data.code === 1) {
    archiveList.value = res.data.data;
    console.log(archiveList.value);
  } else {
    ElMessage.error("获取文章归档列表失败");
  }
};

// 格式化日期
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("zh-CN", options);
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
    .timeline-article-list {
      width: calc(100% - 320px);
      .timeline {
        width: 100%;
        border-radius: 8px;
        box-shadow: var(--card-box-shadow);
        padding: 50px 40px;
        margin: 20 0;

        .archive-item {
          .main {
            display: flex;
            margin-top: 20px;
            .img {
              width: 80px;
              height: 80px;
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
              flex: 1;
              .title {
                font-size: 15px;
                color: var(--text-color);
                margin-bottom: 10px;
                word-break: break-all;
                word-wrap: break-word;
                &:hover {
                  color: var(--theme-color);
                }
              }
              .desc {
                display: flex;

                font-size: 13px;
                .date {
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }

      .el-pagination {
        margin-top: 20px;
        justify-content: center;
      }
    }
  }
}

/* 使用更高优先级的选择器覆盖默认样式 */
:deep(.el-timeline-item__timestamp) {
  text-align: left;
  font-size: 24px !important; /* 设置字体大小 */
  color: #000 !important; /* 示例颜色 */
}
</style>
