<template>
  <div class="home">
    <!-- 页头 -->
    <h3m-header></h3m-header>
    <!-- 封面 -->
    <h3m-cover-other>
      <template v-slot:default>
        <div class="box">
          <div class="title">
            <div>{{ articleDetails.title }}</div>
            <router-link :to="`/article/${articleDetails.id}/edit`">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-piliangxiugai"></use>
              </svg>
            </router-link>
          </div>
          <!-- 其他元数据 -->
          <div class="meta-data-wrap">
            <div class="date">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-rili"></use>
              </svg>
              发表于
              {{ formatDate(articleDetails.createTime) }} &nbsp&nbsp&nbsp&nbsp;|
            </div>
            <div class="category">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wenjianguidang"></use>
              </svg>
              分类 {{ articleDetails.categoryName }} &nbsp&nbsp&nbsp&nbsp|
            </div>
            <div class="readNumber">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yueduxiao"></use>
              </svg>
              阅读 {{ articleDetails.viewCount }}
            </div>
          </div>
        </div>
      </template>
    </h3m-cover-other>
    <div class="container">
      <!-- 侧边栏 -->
      <div class="side-content">
        <h3m-admin-card></h3m-admin-card>
        <h3m-catalog-card></h3m-catalog-card>
        <h3m-hot-article-card></h3m-hot-article-card>
      </div>
      <!-- 文章详情 -->
      <div class="article-details">
        <!-- 文章内容 -->
        <div class="article-content" v-html="renderedMarkdown"></div>
        <!-- 版权声明 -->
        <div class="article-signature">
          <img :src="user.currentUserInfo.avatar" alt="头像" />
          <div class="copyright">
            <div class="copyright-item">
              <span class="copyright-title">文章作者：</span>
              <span class="copyright-content">
                <a href="#/">{{ user.currentUserInfo.nickName }}</a>
              </span>
            </div>
            <div class="copyright-item">
              <span class="copyright-title">文章链接：</span>
              <span class="copyright-content">
                <a :href="currentUrl">{{ currentUrl }}</a>
              </span>
            </div>
            <div class="copyright-item">
              <span class="copyright-title">版权声明：</span>
              <span class="copyright-content">
                本博客所有文章除特别声明外，均采用
                <a
                  href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                  target="_blank"
                  >BY-NC-SA</a
                >
                许可协议。转载请注明出处！
              </span>
            </div>
          </div>
        </div>
        <!-- 标签 -->
        <div class="article-tags">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gf-tags3"></use></svg
          >标签：
          <router-link
            :to="`/tag/${item.id}`"
            class="article-tags-item"
            v-for="item in articleDetails.tags"
            :key="item.id"
          >
            <el-tag>{{ item.name }}</el-tag>
          </router-link>
        </div>
        <!-- 上一篇和下一篇 -->
        <div class="previous-next-article">
          <div
            class="previous-article"
            v-if="previousArticle"
            :style="{ width: nextArticle ? '50%' : '100%' }"
          >
            <router-link :to="`/article/${previousArticle.id}`">
              <img :src="previousArticle.thumbnail" alt="上一篇文章的缩略图" />
              <div class="previous-article-info">
                <div class="label"><< 上一篇</div>
                <div class="title">{{ previousArticle.title }}</div>
              </div>
            </router-link>
          </div>

          <div
            class="next-article"
            v-if="nextArticle"
            :style="{ width: previousArticle ? '50%' : '100%' }"
          >
            <router-link :to="`/article/${nextArticle.id}`">
              <img :src="nextArticle.thumbnail" alt="下一篇文章的缩略图" />
              <div class="next-article-info">
                <div class="label">下一篇 >></div>
                <div class="title">{{ nextArticle.title }}</div>
              </div>
            </router-link>
          </div>
        </div>
        <!-- 文章描述 -->
        <div class="article-desc">
          <span>发布于 @ {{ formatDate(articleDetails.createTime) }}</span
          >&nbsp;&nbsp;
          <span>作者: {{ user.currentUserInfo.nickName }}</span> &nbsp;&nbsp;
          <span>阅读: {{ articleDetails.viewCount }}</span> &nbsp;&nbsp;
          <span>评论: {{ commentCount }}</span> &nbsp;&nbsp;
          <router-link :to="`/article/${articleDetails.id}/edit`"
            >编辑</router-link
          >
        </div>
        <!-- 评论区域 -->
        <div class="comment-area">
          <div class="comment-area-title">
            <!-- 图标 -->
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun1"></use>
            </svg>
            <!-- 标题 -->
            <span>评论区</span>
          </div>
          <!-- 评论 -->
          <div class="comment-items">
            <h3m-comment-item-card
              v-for="(item, index) in commentList"
              :key="item.id"
              :comment="item"
              :index="index + pageSize * (currentPageNum - 1)"
              @reply="handleReplyComment"
              @update="handleUpdateComment"
              @delete="handleDeleteComment"
            ></h3m-comment-item-card>
          </div>

          <!-- 分页 -->
          <el-pagination
            background
            :current-page="currentPageNum"
            layout="prev, pager, next"
            :total="commentCount"
            :page-size="pageSize"
            @current-change="onCurrentCommentPageChanged"
            v-if="commentCount > 0"
            class="comment-pagination"
          >
          </el-pagination>
        </div>
        <!-- 发表评论 -->
        <div class="comment-form">
          <div class="comment-form-title">✏️ 发表评论</div>
          <div class="comment-editor">
            <mavon-editor
              v-model="newCommentContent"
              class="mavon"
              codeStyle="atom-one-dark"
              :autofocus="false"
              :boxShadow="false"
              @imgAdd="onImageAdded"
              ref="mavonRef"
              placeholder="发表一条伟大的评论吧~"
              defaultOpen="edit"
              :toolbars="mavonToolbarOption"
              :subfield="false"
            />
            <button class="comment-submit-btn" @click="submitComment">
              {{ isInEditMode ? "修改评论" : "提交评论" }}
            </button>
          </div>
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
import H3mFooter from "@/components/h3m-footer.vue";
import H3mBackToTop from "@/components/h3m-back-to-top.vue";
import H3mCatalogCard from "../../components/h3m-catalog-card.vue";
import { onMounted, ref, nextTick, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { getArticleDetail, getPreviousNextArticle } from "@/api/article";
import markdownIt from "@/utils/markdown-it";
import { initMathJax, renderByMathjax } from "@/utils/mathjax";
import buildCodeBlock from "@/utils/code-block";
import { useUserStore } from "../../store/useUserStore";
import {
  getCommentList,
  addComment,
  updateComment,
  deleteComment,
} from "@/api/comment";
import H3mCommentItemCard from "../../components/h3m-comment-item-card.vue";
import { ElMessageBox } from "element-plus";
import { uploadImage } from "@/api/image";
const route = useRoute();
const articleId = ref(route.params.id);
const articleDetails = ref({});
const renderedMarkdown = ref("");
const { user } = useUserStore();
// 获取当前url
const currentUrl = window.location.href;
onMounted(() => {
  getArticleDetails();
  PreviousNextArticle();
  onCurrentCommentPageChanged(1);
});

// 监听路由变化
watch(
  () => route.params.id,
  (newVal) => {
    articleId.value = newVal;
    getArticleDetails();
    PreviousNextArticle();
    onCurrentCommentPageChanged(1);
  }
);

// 获取文章详情
const getArticleDetails = async () => {
  const res = await getArticleDetail(articleId.value);
  if (res.data.code === 1) {
    articleDetails.value = res.data.data;
    renderedMarkdown.value = markdownIt.render(res.data.data.content);
    nextTick(() => {
      initMathJax({}, () => {
        renderByMathjax(".article-content");
        renderByMathjax(".comment-item-content");
      });
      buildCodeBlock(".article-content");
      // articleLoaded.value = true;
    }).then(() => {
      // lightBoxRef.value.addImageClickedListener();
    });
  } else {
    ElMessage.error(res.data.msg);
  }
};

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

// 获取上一篇和下一篇文章
const previousArticle = ref({});
const nextArticle = ref({});
const PreviousNextArticle = async () => {
  const res = await getPreviousNextArticle(
    articleId.value,
    user.currentUserInfo.id
  );
  if (res.data.code === 1) {
    // console.log(res.data.data);
    previousArticle.value = res.data.data.previous;
    nextArticle.value = res.data.data.next;
    // console.log(previousArticle.value);
    // console.log(nextArticle.value);
  } else {
    ElMessage.error(res.data.msg);
  }
};

// 获取评论列表
const commentList = ref([]);
const pageSize = ref(5);
const commentCount = ref(0);
const currentPageNum = ref(1);
// 分页
const onCurrentCommentPageChanged = async (pageNum) => {
  currentPageNum.value = pageNum;
  const res = await getCommentList(articleId.value, pageNum, pageSize.value);
  if (res.data.code === 1) {
    commentList.value = res.data.data;
    commentCount.value = commentList.value[0].total;
    // console.log(commentList.value);
    nextTick(() => {
      renderByMathjax(".comment-item-content");
      buildCodeBlock(".comment-item-content");
    });
  } else {
    ElMessage.error(res.data.msg);
  }
};

// ---------------------富文本编辑器的功能------------------------
// 添加评论
let mavonToolbarOption = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: true, // 全屏编辑
  help: true, // 帮助
  navigation: true, // 导航目录
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  subfield: true, // 单双栏模式
  preview: true, // 预览
};
const mavonRef = ref(null);
function onImageAdded(pos, file) {
  uploadImage(file)
    .then((res) => {
      if (res.data.status === true) {
        const url = res.data.data.links.url;
        mavonRef.value.$img2Url(pos, url);
      } else {
        ElMessage.error(res.data.msg);
      }
    })
    .catch(() => {
      ElMessage.error("图片上传失败");
    });
}

// ----------------------------------评论的添加、删除、编辑----------------------------------------------
const isInEditMode = ref(false);
const editedComment = ref({});
const newCommentContent = ref("");
// 处理提交评论的点击事件
const submitComment = () => {
  if (isInEditMode.value) {
    updateCommentContent();
  } else {
    addNewComment();
  }
};
// 处理回复评论的点击事件
const handleReplyComment = (comment) => {
  newCommentContent.value = `@${comment.nickName}\n>${comment.content.replace(
    /\n/g,
    "\n>"
  )}\n\n`;
};

// 处理修改评论的点击事件

const handleUpdateComment = (comment) => {
  newCommentContent.value = comment.content;
  isInEditMode.value = true;
  editedComment.value = comment;
};

// 处理删除评论的点击事件
const handleDeleteComment = (comment) => {
  ElMessageBox.confirm("前辈确定删除这条评论吗？", "一条友善的提示", {
    confirmButtonText: "你在教我做事？",
    cancelButtonText: "我再想想",
    type: "warning",
  }).then(() => {
    deleteComment(comment.id).then(() => {
      ElMessage.success("删除评论成功~");
      currentPageNum.value = 1;
      onCurrentCommentPageChanged(currentPageNum.value);
    });
  });
};

// 发表评论

const addNewComment = async () => {
  const res = await addComment({
    articleId: articleId.value,
    content: newCommentContent.value,
    createBy: user.currentUserInfo.id,
    updateBy: user.currentUserInfo.id,
  });
  if (res.data.code === 1) {
    ElMessage.success(res.data.msg);
    newCommentContent.value = "";
    currentPageNum.value = 1;
    onCurrentCommentPageChanged(currentPageNum.value);
  } else {
    ElMessage.error(res.data.msg);
  }
};
// 修改评论
const updateCommentContent = async () => {
  const res = await updateComment({
    id: editedComment.value.id,
    articleId: articleId.value,
    content: newCommentContent.value,
    updateBy: user.currentUserInfo.id,
  });
  if (res.data.code === 1) {
    ElMessage.success("修改评论成功~");
    newCommentContent.value = "";
    // 重新获取评论列表
    // currentPageNum.value = 1;
    // onCurrentCommentPageChanged(currentPageNum.value);
    // 刷新页面
    window.location.reload();
    // 退出编辑模式
    isInEditMode.value = false;
  } else {
    ElMessage.error("修改评论失败~");
  }
};
</script>
<style lang="scss" scoped>
.home {
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
    .article-details {
      text-align: left;
      width: 74%;
      background: white;
      border-radius: 8px;
      box-shadow: var(--card-box-shadow);
      padding: 30px 40px;
      box-sizing: border-box;
      :deep(.article-content) {
        img {
          display: block;
          margin: 15px auto 15px;
          border-radius: 6px;
          width: 100%;
          cursor: pointer;
          cursor: zoom-in;
          box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15),
            0 0 1px rgba(106, 115, 125, 0.35);
        }

        h1 code,
        h2 code,
        h3 code,
        h4 code,
        h5 code,
        h6 code,
        p > code,
        li > code,
        table code {
          color: #c7254e;
          line-height: 1.2;
          font-family: consolas !important;
          vertical-align: middle;
          margin: 0 3px;
          background-color: #f9f2f4 !important;
          font-size: 14px !important;
          padding: 0.2em 0.3em !important;
          border-radius: 3px !important;
          border: 1px solid #f9f2f4 !important;
        }

        p {
          color: var(--text-color);
          font-size: 15px;
          line-height: 28px;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          overflow: hidden;

          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          color: #1f2d3d;
          transition: all 0.2s ease-out;
        }

        h4,
        h5,
        h6 {
          font-size: 16px;
        }

        h1 {
          font-size: 24px;
          margin: 10px 0;
        }

        h2 {
          font-size: 20px;
        }

        h3 {
          font-size: 17px;
        }

        /* 代码样式 */
        pre {
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
            font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
              monospace !important;
            line-height: 21px;
          }
        }

        kbd {
          background-color: #f7f7f7;
          color: #222325;
          border-radius: 0.25rem;
          border: 1px solid #cbcccd;
          box-shadow: 0 2px 0 1px #cbcccd;
          cursor: default;
          font-family: Arial, sans-serif;
          font-size: 0.75em;
          line-height: 1;
          min-width: 0.75rem;
          padding: 2px 5px;
          position: relative;
          top: -1px;

          &:hover {
            box-shadow: 0 1px 0 0.5px #cbcccd;
            top: 1px;
          }
        }

        a {
          color: #2d8cf0;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;

          &::after {
            content: "";
            display: block;
            width: 0;
            height: 1px;
            position: absolute;
            left: 0;
            bottom: -2px;
            background: #2d8cf0;
            transition: all 0.3s ease-in-out;
          }

          &:hover::after {
            width: 100%;
          }
        }

        hr {
          position: relative;
          margin: 20px 0;
          border: 2px dashed #bfe4fb;
          width: 100%;
          box-sizing: content-box;
          height: 0;
          overflow: visible;
          box-sizing: border-box;
        }

        hr::before {
          position: absolute;
          top: -11px;
          left: 2%;
          z-index: 1;
          color: #bfe4fb;
          content: "✂";
          font-size: 21px;
          line-height: 1;
          -webkit-transition: all 1s ease-in-out;
          -moz-transition: all 1s ease-in-out;
          -o-transition: all 1s ease-in-out;
          -ms-transition: all 1s ease-in-out;
          transition: all 1s ease-in-out;
        }

        hr:hover::before {
          left: calc(98% - 20px);
        }

        table {
          font-size: 15px;
          width: 100%;
          margin: 15px 0px;
          display: block;
          overflow-x: auto;
          border: none;
          border-collapse: collapse;
          border-spacing: 0;

          &::-webkit-scrollbar {
            height: 4px !important;
          }

          th {
            background: #bfe4fb;
            border: 1px solid #a6d6f5;
            white-space: nowrap;
            font-weight: 400;
            padding: 6px 15px;
            min-width: 100px;
          }

          td {
            border: 1px solid #a6d6f5;
            padding: 6px 15px;
            min-width: 100px;
          }
        }

        ul,
        ol {
          li {
            margin: 4px 0px;
          }
        }

        ul li {
          list-style: circle;

          &::marker {
            transition: all 0.4s;
            /* color: #49b1f5; */
            color: var(--theme-color);
            font-weight: 600;
            font-size: 1.05em;
          }

          &:hover::marker {
            color: #ff7242;
          }
        }

        blockquote {
          border: none;
          margin: 15px 0px;
          color: inherit;
          border-radius: 4px;
          padding: 1px 15px;
          border-left: 4px solid var(--theme-color);
          background-color: #f8f8f8;
        }
      }
      .article-signature {
        border: 1px solid #ddd;
        position: relative;
        overflow: hidden;
        margin: 30px 5px 10px 5px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding: 12px;
        transition: all 0.4s;
        img {
          width: 90px;
          height: 90px;
        }
        .copyright {
          padding-left: 20px;
          .copyright-item {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;

            -webkit-box-orient: vertical;
            line-height: 28px;
            font-size: 15px;
            color: var(--text-color);
            .copyright-title {
              font-weight: bold;
              color: #19b1f5;
            }
            a {
              color: #99a9bf;
              transition: all 0.4s;
              cursor: pointer;
              &:hover {
                color: #19b1f5;
              }
            }
          }
        }

        &:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }
      }
      .article-tags {
        align-items: center;
        display: flex;
        margin-top: 20px;
        .icon {
          margin: 0 5px;
        }
        .article-tags-item {
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .previous-next-article {
        width: 100%;
        margin-top: 50px;
        overflow: hidden;
        background: black;
        display: flex;
        border-radius: 9px;

        .previous-article,
        .next-article {
          width: 50%;

          a {
            height: 150px;
            overflow: hidden;
            display: block;
            position: relative;

            img {
              height: 100%;
              width: 100%;
              position: absolute;
              object-fit: cover;
              opacity: 0.5;
              transition: all 0.6s ease-in-out;

              &:hover {
                transform: scale(1.1);
                opacity: 0.8;
              }
            }

            .previous-article-info,
            .next-article-info {
              pointer-events: none;
              position: absolute;
              top: 50%;
              width: 100%;
              padding: 20px 40px;
              transform: translate(0, -50%);
              color: white;
              line-height: 28px;
              box-sizing: border-box;

              .label {
                font-size: 13px;
              }

              .title {
                font-weight: 500;
                font-size: 14px;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;

                -webkit-box-orient: vertical;
              }
            }

            .next-article-info {
              text-align: right;
            }
          }
        }
      }
      .article-desc {
        text-align: right;
        margin-top: 5px;
        a {
          color: #213547;
          transition: all 0.4s;
          cursor: pointer;
          &:hover {
            color: #ff7242;
          }
        }
      }
      .comment-area {
        margin-top: 50px;

        .comment-area-title {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          font-size: 24px;
          .icon {
            font-size: 36px;
            margin-right: 10px;
          }
        }

        .comment-pagination {
          margin-top: 20px;
          justify-content: center;
        }
      }

      .comment-form {
        .comment-form-title {
          font-size: 20px;
          margin: 40px 0 20px;
          color: var(--text-color);
        }

        .comment-editor {
          .mavon {
            border-color: #eef2f8;
          }

          .comment-submit-btn {
            color: white;
            background-color: var(--theme-color);
            border: 1px solid var(--theme-color);
            border-radius: 5px;
            cursor: pointer;
            padding: 7px 17px;
            font-size: 13px;
            margin: 10px 0;
            transition: all 0.3s ease-out;

            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
  .box {
    display: flex;
    flex-direction: column;
    /* 为图标添加样式 */
    .title {
      display: flex;
      .icon {
        font-size: 48px; /* 设置图标大小 */
        color: white; /* 默认颜色为白色 */
        transition: fill 0.3s ease; /* 添加过渡效果 */
      }

      .icon:hover {
        font-size: 48px; /* 设置图标大小 */
        color: orange; /* 悬停时颜色为橙色 */
        cursor: pointer; /* 鼠标悬停时显示手型光标 */
      }
    }
    .meta-data-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
      .date,
      .category,
      .readNumber {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: var(--text-color-light);
        margin-right: 15px;
        .icon {
          font-size: 18px;
          margin-right: 5px;
        }
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
