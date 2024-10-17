<template>
  <div class="category-card">
    <div class="header">
      <div class="avatar">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duixiangfenlei"></use>
        </svg>
      </div>
      <div class="info">分类</div>
    </div>
    <router-link
      :to="`/category/${item.id}`"
      class="category-item"
      v-for="item in categoryList"
      :key="item.id"
    >
      <div class="left">{{ item.name }}</div>
      <div class="right">{{ item.count }}</div>
    </router-link>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/useUserStore";
import { getCategoryList } from "../api/category";
const router = useRouter();
const { user } = useUserStore();
const categoryList = ref([]);

onMounted(() => {
  getList();
});
const getList = async () => {
  const res = await getCategoryList(user.currentUserInfo.id);
  categoryList.value = res.data.data;
};
</script>
<style lang="scss" scoped>
.category-card {
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
    margin-bottom: 10px;
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
    .info {
      font-size: 18px;
      color: var(--text-color);
    }
  }
  .category-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
    transform: scale(1); /* 添加缩放效果 */
    &:hover {
      background: var(--theme-color);
    }
    .left,
    .right {
      font-size: 14px;
      color: var(--text-color);
      transition: transform 0.3s ease; /* 添加过渡效果 */
    }
    &:hover .left,
    &:hover .right {
      color: white;
      transform: scale(0.9); /* 悬停时文字内容缩放 */
    }
  }
}
</style>
