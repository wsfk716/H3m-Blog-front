<template>
  <div class="articleEdit">
    <!-- 页头 -->
    <H3mHeader></H3mHeader>
    <!-- 封面 -->
    <H3mCoverOther
      title="✨ 新随笔 ✨"
      text="雄关漫道真如铁，而今迈步从头越"
    ></H3mCoverOther>
    <!-- 编辑表单 -->
    <div class="edit-card">
      <!-- 标题 -->
      <h1 class="h3m-blog-title">✨ Kila Kila Blog ✨</h1>
      <!-- 表单 -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <!-- 标题 -->
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="好的标题有助于吸引更多的人噢~"
            size="large"
          />
        </el-form-item>
        <!-- 摘要 -->
        <el-form-item label="摘要" prop="summary">
          <el-input
            v-model="ruleForm.summary"
            type="textarea"
            placeholder="简单介绍一下博客的内容吧~"
            size="large"
          />
        </el-form-item>
        <div class="inline-form-row">
          <!-- 分类 -->
          <el-form-item
            label="分类"
            prop="categoryId"
            inline
            style="width: 35%"
          >
            <el-select
              v-model="ruleForm.categoryId"
              placeholder="给博客分个类吧~"
              size="large"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- 标签 -->
          <el-form-item label="标签" prop="tagIds" inline style="width: 60%">
            <el-select
              v-model="ruleForm.tagIds"
              multiple
              placeholder="给博客贴几个标签吧~"
              size="large"
            >
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </div>

        <!-- 编辑器 -->
        <el-form-item prop="content" label="内容">
          <mavon-editor
            v-model="ruleForm.content"
            id="mavon"
            codeStyle="atom-one-dark"
            :autofocus="false"
            :boxShadow="false"
            @imgAdd="onImageAdded"
            ref="mavonRef"
          />
        </el-form-item>

        <!-- 缩略图 -->
        <el-form-item prop="thumbnail" label="缩略图">
          <h3m-uploader @file-upload="handleFileUpLoaded"></h3m-uploader>
        </el-form-item>
      </el-form>
      <!-- 提交按钮 -->
      <el-form-item class="submitButton">
        <el-button type="primary" @click="onSubmitForm">立刻发布</el-button>
        <el-button @click="onCancelForm">取消</el-button>
      </el-form-item>
    </div>
    <!-- 页脚 -->
    <h3m-footer></h3m-footer>
  </div>
</template>
<script setup>
import H3mHeader from "@/components/h3m-header.vue";
import H3mCoverOther from "../../components/h3m-cover-other.vue";
import H3mFooter from "@/components/h3m-footer.vue";
import H3mUploader from "@/components/h3m-uploader.vue";
import { onMounted, ref } from "vue";
import { uploadImage } from "@/api/image";
import { ElMessage, ElMessageBox } from "element-plus";
import { getCategoryNameList } from "@/api/category";
import { getTagNameList } from "@/api/tag";
import { useUserStore } from "@/store/useUserStore";
import { addArticle } from "@/api/article";
import { useRouter } from "vue-router";
const router = useRouter();
const ruleFormRef = ref(null);
const ruleForm = ref({
  title: "", // 标题
  summary: "", // 摘要
  categoryId: "", // 分类id
  tagIds: [], // 标签id数组
  content: "", // 文章内容
  thumbnail: "", // 缩略图url
  createBy: "", // 创建者
  updateBy: "", // 更新者
});
const { user } = useUserStore();
onMounted(() => {
  getCategoryList();
  getTagList();
});

// ---------------------表单验证规则------------------------
const rules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  categoryId: [{ required: true, message: "请选择分类", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
};
// ---------------------富文本编辑器的功能------------------------

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

// ---------------------上传缩略图------------------------
const imageFile = ref(null);
const handleFileUpLoaded = (file) => {
  // console.log(file);
  imageFile.value = file;
};
// -------------------获取分类和标签列表-------------------------
const categoryList = ref([]);
const tagList = ref([]);
const getCategoryList = async () => {
  const res = await getCategoryNameList(user.currentUserInfo.id);
  categoryList.value = res.data.data;
};

const getTagList = async () => {
  const res = await getTagNameList(user.currentUserInfo.id);
  tagList.value = res.data.data;
};

// -------------------提交表单-------------------------

// 提交表单
const onSubmitForm = () => {
  // 设置创建者、更新者
  ruleForm.value.createBy = user.currentUserInfo.id;
  ruleForm.value.updateBy = user.currentUserInfo.id;
  // 验证并提交表单
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      // 上传图片到图床
      const res = await uploadImage(imageFile.value);
      if (res.data.status === true) {
        const url = res.data.data.links.url;
        ruleForm.value.thumbnail = url;
      } else {
        ElMessage.error("上传失败", res.data.msg);
        return; // 如果上传失败，停止执行
      }
      // 提交表单
      console.log(ruleForm.value);
      const addArticleRes = await addArticle(ruleForm.value);
      if (addArticleRes.data.code === 1) {
        ElMessage.success("发布成功");
        router.push("/");
      } else {
        ElMessage.error("发布失败", addArticleRes.data.msg);
        return false;
      }
    } else {
      ElMessage.error("请检查表单是否填写正确");
      return false;
    }
  });
};
// 取消表单
const onCancelForm = () => {
  ElMessageBox.confirm(
    "前辈已经想好要取消这篇博客的发表了吗？",
    "一条友善的提示",
    {
      confirmButtonText: "你在教我做事？",
      cancelButtonText: "我再想想",
      type: "warning",
    }
  ).then(() => {
    router.push("/");
  });
};
</script>
<style lang="scss" scoped>
.edit-card {
  background: white;
  border-radius: 8px;
  box-shadow: var(--card-box-shadow);
  padding: 10px 30px;
  width: 70%;
  margin: 50px auto 0;
  box-sizing: border-box;
  animation: fadeInUp 1s;
  .h3m-blog-title {
    text-align: center;
    font-size: 26px;
    font-family: "Kanit";
    color: #4679fa;
  }
  .inline-form-row {
    display: flex;
    justify-content: space-between;
  }
  .submitButton {
    margin-bottom: 20px;
    margin-left: 55px;
  }

  #mavon {
    width: 100%;
    max-height: 600px;
    border-color: #d9d9d9;

    &:focus {
      border-color: var(--el-color-primary);
    }

    .v-note-op {
      border-bottom-color: #d9d9d9;
    }
  }

  .el-button {
    transition: all 0.4s;
  }
}
@keyframes fadeInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
