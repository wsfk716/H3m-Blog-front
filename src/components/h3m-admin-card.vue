<template>
  <div class="admin-card">
    <el-avatar :size="120" :src="avatarUrl" />
    <div class="description">
      <h3>{{ user.currentUserInfo.nickName }}</h3>
      <p>{{ user.currentUserInfo.signature }}</p>
    </div>
    <!-- 文章信息 -->
    <div class="article-info-container">
      <div>
        <p>文章</p>
        <p>{{ articleCount }}</p>
      </div>
      <div>
        <p>分类</p>
        <p>{{ categoryCount }}</p>
      </div>
      <div>
        <p>标签</p>
        <p>{{ tagCount }}</p>
      </div>
    </div>
    <!-- 联系方式 -->
    <div class="concat">
      <el-button type="primary" class="followMe" @click="handleFollowMe">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
        Follow Me</el-button
      >
      <div class="other-concat">
        <a :href="concatCsdn()" target="_blank">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-csdn"></use>
          </svg>
        </a>
        <a :href="concatGithub()" target="_blank">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-github"></use>
          </svg>
        </a>
        <a :href="''" @click.prevent="showQQ">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-QQ"></use>
          </svg>
        </a>
        <!-- <a
          :href="'tencent://message/?uin=' + user.currentUserInfo.qq"
          target="_blank"
        >
          <i class="iconfont icon-QQ"></i>
        </a> -->
        <a :href="'mailto:' + concatEmail()" target="_blank">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youxiang"></use>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import avatarImage from "@/assets/image/avatar.jpg";
import { useUserStore } from "../store/useUserStore";
import { ElMessage } from "element-plus";
import { getArticleCount } from "@/api/article";
import { getCategoryCount } from "@/api/category";
import { getTagCount } from "@/api/tag";

onMounted(() => {
  ArticleCount();
  CategoryCount();
  TagCount();
});
const { user } = useUserStore();
const avatarUrl = ref(user.currentUserInfo.avatar || avatarImage);
// Follow Me
const handleFollowMe = () => {
  window.open(concatGithub(), "_blank");
};
// 显示QQ信息
const showQQ = () => {
  const qqNumber = user.currentUserInfo.qq;
  if (qqNumber) {
    ElMessage({
      message: `请添加 QQ 好友: ${qqNumber}`,
      type: "info",
    });
  } else {
    ElMessage({
      message: "暂无QQ联系方式",
      type: "warning",
    });
  }
};
// 联系GitHub
const concatGithub = () => {
  if (user.currentUserInfo.github) {
    return user.currentUserInfo.github;
  } else {
    ElMessage({
      message: "暂无GitHub联系方式",
      type: "warning",
    });
    return "";
  }
};
// 联系CSDN
const concatCsdn = () => {
  if (user.currentUserInfo.csdn) {
    return user.currentUserInfo.csdn;
  } else {
    ElMessage({
      message: "暂无CSDN联系方式",
      type: "warning",
    });
    return "";
  }
};
// 联系邮箱
const concatEmail = () => {
  if (user.currentUserInfo.email) {
    return user.currentUserInfo.email;
  } else {
    ElMessage({
      message: "暂无邮箱联系方式",
      type: "warning",
    });
    return "";
  }
};
//-------------------获取用户文章、分类、标签的数量------------------------
const articleCount = ref(0);
const categoryCount = ref(0);
const tagCount = ref(0);
// 获取文章数量
const ArticleCount = async () => {
  const res = await getArticleCount(user.currentUserInfo.id);
  if (res.data.code === 1) {
    articleCount.value = res.data.data;
  } else {
    ElMessage({
      message: "获取文章数量失败",
      type: "error",
    });
    articleCount.value = -1;
  }
};
// 获取分类数量
const CategoryCount = async () => {
  const res = await getCategoryCount(user.currentUserInfo.id);
  if (res.data.code === 1) {
    categoryCount.value = res.data.data;
  } else {
    ElMessage({
      message: "获取分类数量失败",
      type: "error",
    });
    categoryCount.value = -1;
  }
};
// 获取标签数量
const TagCount = async () => {
  const res = await getTagCount(user.currentUserInfo.id);
  if (res.data.code === 1) {
    tagCount.value = res.data.data;
  } else {
    ElMessage({
      message: "获取标签数量失败",
      type: "error",
    });
    tagCount.value = -1;
  }
};
</script>

<style lang="scss" scoped>
.admin-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: var(--card-box-shadow);
  height: 375px;
  .description {
    text-align: center;
    h3 {
      font-size: 24px;
      color: #333;
      margin: 5px 0;
    }
    p {
      font-size: 16px;
      color: #666;
      margin: 5px 0;
    }
  }
  .article-info-container {
    display: flex;
    justify-content: space-between;
    padding: 0 8%;

    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 0;
      margin-top: 8%;
    }
  }
  .concat {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5% auto;

    .followMe {
      width: 100%;
      .icon {
        font-size: 18px;
        margin: 0 10px;
        color: #fff;
      }
    }
    .other-concat {
      display: flex;
      justify-content: center;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        color: #666;
        cursor: pointer;
        transition: transform 0.2s ease-in-out; /* 添加过渡效果 */
      }

      /* 确保浮动效果仅在鼠标悬停时显示 */
      a:hover {
        color: #10bdf2;
        transform: translateY(-5px);
        animation: float 1s infinite;
      }

      .icon {
        font-size: 22px;
      }
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px); /* 轻微上浮 */
    }
  }
}
</style>
