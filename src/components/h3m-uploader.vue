<template>
  <div class="uploader">
    <input
      type="file"
      id="file-input"
      style="display: none"
      accept="image/*"
      @change="onImageAdded"
    />
    <!-- 上传图片的区域 -->
    <div
      class="card upload-card"
      @click="openFileDialog"
      v-if="!isThumbnailVisible"
    >
      <el-icon><Plus /></el-icon>
    </div>
    <!-- 上传成功后显示的内容 -->
    <div class="card thumbnail-card" v-show="isThumbnailVisible">
      <img
        :src="localImageUrl"
        alt="缩略图"
        class="thumbnail-image"
        id="thumbnail-image"
      />
      <!-- 图标 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhengque"></use>
      </svg>
      <!-- 当鼠标移动到图片上时，显示放大和删除两个图标 -->
      <div class="after-hover" v-show="isSuccessLabelVisible">
        <svg
          class="hover-icon"
          aria-hidden="true"
          @click="handleThumbnailMagnify"
        >
          <use xlink:href="#icon-fangda"></use>
        </svg>
        <svg
          class="hover-icon"
          aria-hidden="true"
          @click="handleThumbnailDelete"
        >
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
    </div>
    <!-- vue图片查看器 -->
    <vue-easy-lightbox
      :visible="isLightBoxVisible"
      :imgs="[localImageUrl]"
      @hide="isLightBoxVisible = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
const isThumbnailVisible = ref(false);
const isSuccessLabelVisible = ref(false);
const isLightBoxVisible = ref(false);
let localImageUrl = ref("");
const props = defineProps({
  imgUrl: {
    type: String,
    default: "",
  },
});
// onMounted(() => {
//   initThumbnail();
// });
// 监听imgUrl的变化
watch(
  () => props.imgUrl,
  (newVal) => {
    localImageUrl.value = newVal;
    isThumbnailVisible.value = true;
    isSuccessLabelVisible.value = true;
  }
);

const emit = defineEmits(["file-upload"]);

// // 初始化缩略图
// const initThumbnail = () => {
//   console.log("props.imgUrl", props.imgUrl);
//   if (props.imgUrl) {
//     localImageUrl.value = props.imgUrl;
//     isThumbnailVisible.value = true;
//     isSuccessLabelVisible.value = true;
//   }
// };

const openFileDialog = () => {
  document.getElementById("file-input").click();
};
// 上传图片
function onImageAdded() {
  let fileInput = document.getElementById("file-input");
  if (!fileInput || fileInput.files.length === 0) {
    console.error("No file selected or file input not found");
    return;
  }
  let file = fileInput.files[0];
  localImageUrl.value = URL.createObjectURL(file);

  isThumbnailVisible.value = true;
  isSuccessLabelVisible.value = true;
  // 将file传到父组件
  emit("file-upload", file);
}

// 放大缩略图
const handleThumbnailMagnify = () => {
  // console.log("放大缩略图");
  // 打开图片查看器
  isLightBoxVisible.value = true;
};
// 删除缩略图
const handleThumbnailDelete = () => {
  console.log("删除缩略图");
  localImageUrl.value = "";
  isThumbnailVisible.value = false;
  isSuccessLabelVisible.value = false;
};
</script>

<style lang="scss" scoped>
.uploader {
  display: flex;
  .card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    width: 148px;
    height: 148px;
    overflow: hidden;
  }

  .upload-card {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      border-color: #409eff;
      color: #409eff;
    }
    .el-icon {
      font-size: 32px;
    }
  }

  .thumbnail-card {
    border: 1px solid #c0ccda;
    position: relative;
    .thumbnail-image {
      display: block;
      width: 100%;
      height: auto;
    }
    .icon {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 32px;
    }

    .after-hover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      opacity: 0;
      transition: opacity 0.3s;
      .hover-icon {
        width: 32px;
        height: 32px;
        fill: white;
        border-radius: 50%;
        padding: 5px;
        cursor: pointer;
      }
    }
    &:hover .after-hover {
      opacity: 1;
    }
  }
}
</style>
