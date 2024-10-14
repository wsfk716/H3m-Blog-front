<template>
  <div class="header">
    <div class="left">
      <router-link to="/">✨ Kila Kila Blog ✨</router-link>
    </div>
    <div class="right">
      <ul>
        <li>
          <router-link to="/">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouye"></use>
            </svg>
            首页</router-link
          >
        </li>
        <li>
          <router-link to="/archive">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-guidang"></use>
            </svg>
            归档</router-link
          >
        </li>
        <li>
          <router-link to="/category">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenlei"></use>
            </svg>
            分类</router-link
          >
        </li>
        <li>
          <router-link to="/tag">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tags"></use>
            </svg>
            标签</router-link
          >
        </li>
        <li>
          <router-link to="/article/add">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-suibi"></use>
            </svg>
            新随笔</router-link
          >
        </li>
        <li>
          <router-link to="/user/settings">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghu"></use></svg
            >个人中心</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  color: #fff;
  align-items: center;
  padding: 0 3%;
  position: absolute; /* 固定在页面顶部 */
  top: 0;
  left: 0;
  z-index: 999;
  .left {
    // router-link 实际上渲染一个a标签，所以我们这里设置a标签的样式
    a {
      font-family: "Kanit";
      font-size: 24px;
      color: #fff;
      text-decoration: none;
    }
  }
  .right {
    .icon {
      color: #fff; /* 设置图标颜色为白色 */
      font-size: 16px; /* 设置图标大小 */
    }
    ul {
      display: flex;
      list-style: none;
      li {
        margin: 0 10px;
        cursor: pointer;
        align-items: center;
        position: relative; /* 为了定位下划线 */
        &::after {
          content: "";
          position: absolute;
          bottom: -2px; /* 下划线的位置 */
          left: 50%;
          width: 0;
          height: 2px; /* 下划线的高度 */
          background-color: var(--theme-color); /* 下划线的颜色 */

          transition: width 0.3s ease, left 0.3s ease; /* 添加过渡效果 */
        }
        &:hover::after {
          width: 100%; /* 悬停时宽度为100% */
          left: 0; /* 悬停时左边距为0 */
        }
        i {
          margin-right: 5px;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
