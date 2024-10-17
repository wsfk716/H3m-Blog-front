<template>
  <div class="post-article-card" v-for="item in articleList" :key="item.id">
    <!-- 缩略图 -->
    <router-link
      :to="{ name: 'ArticleDetails', params: { id: item.id } }"
      class="img"
    >
      <img :src="item.thumbnail" alt="文章缩略图" class="article-thumbnail" />
    </router-link>
    <!-- 文章信息 -->
    <div class="info">
      <router-link
        :to="{ name: 'ArticleDetails', params: { id: item.id } }"
        class="title"
        >标题</router-link
      >
      <!-- 其他元数据 -->
      <div class="meta-data-wrap">
        <div class="date">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-rili"></use>
          </svg>
          发表于 {{ formatDate(item.createTime) }} |
        </div>
        <div class="category">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wenjianguidang"></use>
          </svg>
          分类 {{ item.categoryName }} |
        </div>
        <div class="readNumber">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yueduxiao"></use>
          </svg>
          阅读 {{ item.viewCount }}
        </div>
      </div>
      <!-- 摘要 -->
      <div class="summary">{{ item.content }}</div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useUserStore } from "../store/useUserStore";

const router = useRouter();
const articleList = ref([]);
const props = defineProps({
  articleList: {
    type: Array,
    required: true,
  },
});

// 观察 articleList 变化
watch(
  () => props.articleList,
  (newVal) => {
    // console.log(newVal); // 检查 articleList 的值
    articleList.value = newVal;
  },
  { immediate: true }
);

// 格式化日期
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("zh-CN", options);
};
</script>
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
  margin-bottom: 20px;
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
