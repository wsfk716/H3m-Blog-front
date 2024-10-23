<template>
  <div :class="['comment-item', { 'comment-item-admin': comment.isAdmin }]">
    <!-- 头像 -->
    <div class="comment-item-avatar">
      <img :src="comment.avatar" alt="用户头像" />
    </div>
    <!-- 评论体 -->
    <div class="comment-item-body">
      <!-- 评论头 -->
      <div :class="['comment-item-header']">
        <!-- 评论信息 -->
        <div class="comment-item-info">
          <a href="">#{{ index + 1 }}楼</a>&nbsp;&nbsp;
          <span>{{ formatDate(comment.createTime) }}</span
          >&nbsp;&nbsp;
          <span>{{ comment.nickName }}</span>
        </div>
        <!-- 评论操作 -->
        <div class="comment-item-actions">
          <!-- 表情 -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-biaoqing"></use>
          </svg>
          <!-- 更多 -->
          <el-dropdown trigger="click" @command="handleMenuCommand">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gengduo"></use>
            </svg>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="reply">回复</el-dropdown-item>
                <el-dropdown-item command="update" v-if="canModify"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item command="delete" v-if="canModify"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <!-- 评论内容 -->
      <div class="comment-item-content" v-html="content"></div>
    </div>
  </div>
</template>
<script setup>
import markdownIt from "@/utils/markdown-it";
import { onMounted, ref, watchEffect } from "vue";
import { useUserStore } from "../store/useUserStore";
import { getIsAdmin } from "../api/user";
const { user } = useUserStore();
const props = defineProps({
  comment: Object,
  index: Number,
});
// 父组件传来的事件
const emit = defineEmits(["reply", "update", "delete"]);

const isAdmin = ref(0);
const canModify = ref(false);
// 判断当前用户是否是管理员
const checkAdminStatus = async () => {
  if (user.currentUserInfo && user.currentUserInfo.id) {
    try {
      const res = await getIsAdmin(user.currentUserInfo.id);
      isAdmin.value = res.data.data;
      // console.log(isAdmin.value);
    } catch (error) {
      console.error("获取管理员状态失败:", error);
    }
  } else {
    console.error("用户信息未初始化");
  }
};

onMounted(async () => {
  await checkAdminStatus();
});

// 使用 watchEffect 自动重新计算 canModify
watchEffect(() => {
  canModify.value =
    isAdmin.value === 1 || user.currentUserInfo.id === props.comment.createBy;
});

// 格式化日期
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("zh-CN", options);
};

// markdown 转换为 html
let content = markdownIt.render(props.comment.content);

// 监听评论内容变化
function handleMenuCommand(command) {
  emit(command, props.comment);
}
</script>
<style lang="scss" scoped>
.comment-item {
  display: flex;
  padding: 15px 0 15px 0;
  position: relative;

  .comment-item-avatar {
    img {
      height: 40px;
      width: 40px;
      transition: all 0.6s ease-out;
      box-shadow: 0 0 0 1px rgba(27, 31, 36, 0.15);
      border-radius: 50%;

      &:hover {
        transform: rotate(360deg);
      }
    }
  }

  .comment-item-body {
    border: 1px solid #d0d7de;
    border-radius: 6px;
    width: 100%;
    margin-left: 20px;
    z-index: 1;
    flex: 1;
    min-width: 0;

    .comment-item-header {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      color: var(--text-color);
      color: #586069;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background-color: #f6f8fa;
      border-bottom: 1px solid #d0d7de;
      padding: 9px 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;

      .comment-item-info {
        a {
          color: var(--text-color);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;

          &::after {
            content: "";
            display: block;
            width: 0;
            height: 1px;
            position: absolute;
            left: 0;
            bottom: -2px;
            background: var(--theme-color);
            transition: all 0.3s ease-in-out;
          }

          &:hover {
            color: var(--theme-color);

            &::after {
              width: 100%;
            }
          }
        }

        span {
          margin: 0 3px;
        }
      }

      .comment-item-actions {
        display: flex;
        align-items: center;

        svg {
          cursor: pointer;
          margin-left: 10px;
          // fill: #586069;
          transition: all 0.3s ease;
          font-size: 20px;
          align-items: center;
          justify-content: center;
          &:hover {
            fill: var(--theme-color);
          }
        }
      }

      /*气泡三角形*/
      &::before,
      &::after {
        top: 11px;
        right: 100%;
        left: -16px;
        width: 0;
        height: 0;
        content: " ";
        border-style: solid solid outset;
        position: absolute;
        display: block;
        pointer-events: none;
        border-color: transparent #d0d7de transparent transparent;
        border-width: 8px;
      }

      &::after {
        border-color: transparent;
        margin-top: 1px;
        margin-left: 2px;
        border-width: 7px;
        border-right-color: #f6f8fa;
      }

      // /* 弹出菜单 */
      // :deep(.el-dropdown) {
      //   left: -13px;
      //   top: 10px;
      // }
    }

    :deep(.comment-item-content) {
      padding: 16px;
      font-size: 14px;
      background-color: white;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;

      a {
        color: var(--theme-color);
        position: relative;
        text-decoration: none;

        &:after {
          content: "";
          display: block;
          width: 0;
          height: 1px;
          position: absolute;
          left: 0;
          bottom: -2px;
          background: var(--theme-color);
          transition: all 0.3s ease-in-out;
        }

        &:hover {
          &::after {
            width: 100%;
          }
        }
      }

      p {
        margin: 0 0;

        /* 代码块 */
        & > code {
          color: #c7254e;
          font-family: consolas !important;
          vertical-align: middle;
          margin: 0 3px;
          background-color: #f9f2f4 !important;
          font-size: 13px !important;
          border-radius: 3px !important;
          border: 1px solid #f9f2f4 !important;
          padding: 0.2em 0.3em !important;
          word-break: break-all;
        }
      }

      pre {
        margin: 10px 0;
        white-space: pre;
        position: relative;
        border-radius: 7px;
        color: #bababa;
        background-color: #282c34;
        font-size: 14px;
        padding: 0;

        code {
          border: none;
          border-radius: 7px;
          font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace !important;
          line-height: 21px;
        }
      }

      img {
        margin: 10px 0;
        max-width: 100% !important;
        max-height: 400px;
      }

      /* 引用 */
      blockquote {
        padding: 0 1em;
        color: #57606a;
        border: none;
        border-left: 0.25em solid #d0d7de;
        margin: 10px 0;

        p {
          line-height: 1.8;

          a {
            color: #57606a;
            transition: all 0.3s ease;

            &:hover {
              color: var(--theme-color);
            }
          }
        }
      }
    }
  }

  // 连接线
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 90px;
    display: block;
    z-index: 0;
    width: 2px;
    content: "";
    background-color: #d8dee4;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
}
.comment-item-admin {
  .comment-item-body {
    border: 1px solid #bbdfff;

    .comment-item-header {
      background-color: #ddf4ff;
      border-bottom: 1px solid #bbdfff;

      &::before,
      &::after {
        border-color: transparent #bbdfff transparent transparent;
      }

      &::after {
        border-right-color: #ddf4ff;
      }
    }
  }
}
</style>
