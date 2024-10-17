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
    <div class="main" v-for="item in articleList" :key="item.id">
      <router-link
        :to="{ name: 'ArticleDetails', params: { id: item.id } }"
        class="img"
      >
        <img
          :src="item.thumbnail"
          @error="handleImageError"
          alt="文章缩略图"
          class="article-thumbnail"
        />
      </router-link>
      <div class="other-meta">
        <!-- 标题 -->
        <router-link
          :to="{ name: 'ArticleDetails', params: { id: item.id } }"
          class="title"
          >{{ item.title }}</router-link
        >
        <!-- 其他信息 -->
        <div class="desc">
          <div class="date">{{ formatDate(item.createTime) }}</div>
          <div class="readNumber">{{ item.viewCount }}次围观</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getArticleList } from "../api/article";
import { useUserStore } from "../store/useUserStore";

const router = useRouter();
const { user } = useUserStore();
const articleList = ref([]);

onMounted(() => {
  getList();
});

const getList = async () => {
  const res = await getArticleList(user.currentUserInfo.id, 1, 5);
  articleList.value = res.data.data;
  // console.log(articleList.value);
};

// 处理图片加载失败
const handleImageError = (e) => {
  e.target.src = require("@/assets/image/article-thumbnail.jpg"); // 设置为默认图片路径
};

// 格式化日期
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("zh-CN", options);
};
</script>
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
      flex: 1;
      .title {
        font-size: 13px;
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

        font-size: 12px;
        .date {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
