<template>
  <div class="archive-card">
    <div class="header">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-nav_wodeguidang"></use>
        </svg>
        <div class="info">归档</div>
      </div>
      <div class="right">
        <el-icon @click="gotoArchive" class="clickable-icon"
          ><ArrowRightBold
        /></el-icon>
      </div>
    </div>
    <router-link
      :to="`/archive/${item.year}/${item.month}`"
      class="archive-item"
      v-for="(item, index) in archiveList"
      :key="index"
    >
      <div class="item-left">{{ item.year }} 年 {{ item.month }} 月</div>
      <div class="item-right">{{ item.archiveCount }}</div>
    </router-link>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getArchiveList } from "@/api/archive";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/useUserStore";
const { user } = useUserStore();
const router = useRouter();
const gotoArchive = () => {
  router.push("/archive");
};
const archiveList = ref([]);

onMounted(() => {
  getList();
});
const getList = async () => {
  const res = await getArchiveList(user.currentUserInfo.id);
  if (res.data.code == 1) {
    archiveList.value = res.data.data;
  } else {
    ElMessage.error(res.data.msg);
  }
};
</script>
<style lang="scss" scoped>
.archive-card {
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
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      .icon {
        margin-right: 10px;
      }
      .info {
        font-size: 18px;
        color: var(--text-color);
      }
    }
    .right {
      align-items: center;
      justify-content: center;
      .clickable-icon {
        cursor: pointer; /* 鼠标变成小手 */
        transition: move 0.5s infinite alternate; /* 添加动画效果 */
      }

      .clickable-icon:hover {
        animation: move 0.5s infinite alternate; /* 鼠标悬停时左右来回移动 */
      }
    }
  }
  .archive-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
    transform: scale(1); /* 添加缩放效果 */
    &:hover {
      background: var(--theme-color);
    }
    .item-left,
    .item-right {
      font-size: 14px;
      color: var(--text-color);
      transition: transform 0.3s ease; /* 添加过渡效果 */
    }
    &:hover .item-left,
    &:hover .item-right {
      color: white;
      transform: scale(0.9); /* 悬停时文字内容缩放 */
    }
  }

  @keyframes move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(5px);
    }
  }
}
</style>
