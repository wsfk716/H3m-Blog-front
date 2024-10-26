<template>
  <div id="box">
    <!-- 页头 -->
    <h3m-header></h3m-header>
    <!-- 封面 -->
    <h3m-cover-other
      title="✨ 个人中心 ✨"
      text="人群是那么像羊群"
    ></h3m-cover-other>
    <div class="user-info-card">
      <!-- 封面 -->
      <div class="user-cover">
        <img src="@/assets/image/user-cover.png" alt="" />
      </div>

      <!-- 用户信息 -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="user-form"
        status-icon
      >
        <div class="user-avatar">
          <img :src="ruleForm.avatar" alt="头像" id="avatar" />
          <div
            class="user-avatar-editor"
            v-show="changeStatus"
            @click="openFileDialog"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangji"></use>
            </svg>
            <div>编辑头像</div>
          </div>
          <input
            type="file"
            id="file-input"
            style="display: none"
            accept="image/*"
            @change="uploadAvatar"
          />
        </div>
        <div class="info-item">
          <div class="title">用户名</div>
          <!-- <el-form-item class="content" prop="userName" v-show="changeStatus">
            <el-input size="large" v-model="ruleForm.userName" />
          </el-form-item> -->
          <div class="content">
            {{ user.currentUserInfo.userName }}
          </div>
        </div>

        <div class="info-item">
          <div class="title">昵称</div>
          <el-form-item class="content" prop="nickName" v-show="changeStatus">
            <el-input size="large" v-model="ruleForm.nickName" />
          </el-form-item>
          <div class="content" v-show="!changeStatus">
            {{ user.currentUserInfo.nickName }}
          </div>
        </div>

        <div class="info-item">
          <div class="title">性别</div>
          <el-form-item class="content" prop="sex" v-show="changeStatus">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio value="0">女</el-radio>
              <el-radio value="1">男</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="content" v-show="!changeStatus">
            {{ user.currentUserInfo.sex === "0" ? "女" : "男" }}
          </div>
        </div>

        <div class="info-item">
          <div class="title">个性签名</div>
          <el-form-item class="content" prop="signature" v-show="changeStatus">
            <el-input size="large" v-model="ruleForm.signature" />
          </el-form-item>
          <div class="content" v-show="!changeStatus">
            {{ user.currentUserInfo.signature }}
          </div>
        </div>
        <div class="info-item">
          <div class="title">电子邮箱</div>
          <el-form-item class="content" prop="email" v-show="changeStatus">
            <el-input size="large" v-model="ruleForm.email" />
          </el-form-item>
          <div class="content" v-show="!changeStatus">
            {{ user.currentUserInfo.email }}
          </div>
        </div>
        <div class="info-item">
          <div class="title">手机号码</div>
          <el-form-item
            class="content"
            prop="phonenumber"
            v-show="changeStatus"
          >
            <el-input size="large" v-model="ruleForm.phonenumber" />
          </el-form-item>
          <div class="content" v-show="!changeStatus">
            {{ user.currentUserInfo.phonenumber }}
          </div>
        </div>
        <div class="info-item">
          <div class="title">QQ</div>
          <el-form-item class="content" prop="qq" v-show="changeStatus">
            <el-input size="large" v-model="ruleForm.qq" />
          </el-form-item>
          <div class="content" v-show="!changeStatus">
            {{ user.currentUserInfo.qq }}
          </div>
        </div>
        <div class="info-item">
          <div class="title">CSDN</div>
          <el-form-item class="content" prop="csdn" v-show="changeStatus">
            <el-input size="large" v-model="ruleForm.csdn" />
          </el-form-item>
          <div class="content" v-show="!changeStatus">
            {{ user.currentUserInfo.csdn }}
          </div>
        </div>
        <div class="info-item">
          <div class="title">GitHub</div>
          <el-form-item class="content" prop="github" v-show="changeStatus">
            <el-input size="large" v-model="ruleForm.github" />
          </el-form-item>
          <div class="content" v-show="!changeStatus">
            {{ user.currentUserInfo.github }}
          </div>
        </div>
      </el-form>
      <!-- 操作 -->
      <div class="card-footer">
        <el-button type="primary" @click="editForm" v-show="!changeStatus">
          编辑信息
        </el-button>
        <el-button type="primary" @click="handleEditForm" v-show="changeStatus">
          保存
        </el-button>
        <el-button type="danger" @click="Handlelogout" v-show="!changeStatus">
          退出登录
        </el-button>
        <el-button type="danger" @click="cancel" v-show="changeStatus">
          取消
        </el-button>
      </div>
    </div>

    <!-- 页脚 -->
    <h3m-footer></h3m-footer>
  </div>
</template>

<script setup>
import H3mHeader from "@/components/h3m-header.vue";
import H3mCoverOther from "@/components/h3m-cover-other.vue";
import H3mFooter from "@/components/h3m-footer.vue";
import { ref } from "vue";
import { useUserStore } from "@/store/useUserStore";
import { ElMessage } from "element-plus";
import { logout, updateUserInfo } from "../api/user";
import { uploadImage } from "@/api/image.js";
let changeStatus = ref(false);
const { user } = useUserStore();
const ruleFormRef = ref(null);
const ruleForm = ref({
  avatar: user.currentUserInfo.avatar,
  userName: user.currentUserInfo.userName,
  nickName: user.currentUserInfo.nickName,
  sex: user.currentUserInfo.sex,
  signature: user.currentUserInfo.signature,
  email: user.currentUserInfo.email,
  phonenumber: user.currentUserInfo.phonenumber,
  qq: user.currentUserInfo.qq,
  github: user.currentUserInfo.github,
  csdn: user.currentUserInfo.csdn,
});

const rules = ref({
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  signature: [{ required: true, message: "请输入个性签名", trigger: "blur" }],
  email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
  phonenumber: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
  qq: [{ required: true, message: "请输入QQ", trigger: "blur" }],
  github: [{ required: true, message: "请输入github", trigger: "blur" }],
  csdn: [{ required: true, message: "请输入csdn", trigger: "blur" }],
});

// 编辑信息点击事件
const editForm = () => {
  changeStatus.value = !changeStatus.value;
};

// 退出登录点击事件
const Handlelogout = async () => {
  try {
    await logout();
    // 跳转到登录页面
    window.location.href = "/login";
    ElMessage.success("退出成功");
  } catch (e) {
    console.log(e);
    ElMessage.error("退出失败");
  }
};

// 取消点击事件
const cancel = () => {
  changeStatus.value = !changeStatus.value;
  ruleForm.value = {
    avatar: user.currentUserInfo.avatar,
    userName: user.currentUserInfo.userName,
    nickName: user.currentUserInfo.nickName,
    sex: user.currentUserInfo.sex,
    signature: user.currentUserInfo.signature,
    email: user.currentUserInfo.email,
    phonenumber: user.currentUserInfo.phonenumber,
    qq: user.currentUserInfo.qq,
    github: user.currentUserInfo.github,
    csdn: user.currentUserInfo.csdn,
  };
};

// 修改头像
const openFileDialog = () => {
  // 触发input的点击事件，这是因为input元素设置了display: none，所以无法直接点击
  // 通过js触发点击事件，就可以打开文件选择框。
  document.getElementById("file-input").click();
};

const uploadAvatar = async () => {
  let fileInput = document.getElementById("file-input");
  if (fileInput.files.length == 0) {
    return;
  }
  // 尽管我们只上传一个文件，但是FileList 对象是一个类数组对象，所以我们需要通过索引来访问文件。
  let file = fileInput.files[0];
  // 预览头像
  // 使用 URL.createObjectURL(file) 创建一个指向用户选择的文件的临时 URL。
  // 将临时 URL 赋值给 img 元素的 src 属性，以便在页面上预览用户选择的文件。
  document.getElementById("avatar").src = URL.createObjectURL(file);

  try {
    const res = await uploadImage(file);
    if (res.data.data.links.url) {
      // 存入头像地址
      ruleForm.value.avatar = res.data.data.links.url;
      ElMessage.success("头像上传成功"); // 此时只是将图像传到了服务器，但是没有保存到数据库
    } else {
      ElMessage.error("头像上传失败");
    }
  } catch (error) {
    console.log(error);
    ElMessage.error("上传头像时发生错误");
  }
};

// 保存点击事件
const handleEditForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await updateUserInfo({
        id: user.currentUserInfo.id,
        ...ruleForm.value,
      });
      if (res.data.code === 1) {
        ElMessage.success("保存成功");
        changeStatus.value = !changeStatus.value;
        user.currentUserInfo = {
          id: user.currentUserInfo.id,
          ...ruleForm.value,
        };
      } else {
        ElMessage.error("保存失败" + res.data.msg);
      }
    } else {
      ElMessage({
        message: "保存失败",
        type: "error",
      });
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
#box {
  background: #fff;
  .user-info-card {
    display: flex;
    width: 60%;
    margin: 20px auto;

    border-radius: 10px;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    .user-cover {
      width: 100%;
      height: 250px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .user-avatar {
      height: 130px;
      width: 130px;
      margin-left: 35px;
      padding: 5px;
      transform: translateY(-50%);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      background: white;
      border: transparent;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .user-avatar-editor {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 14px;
        cursor: pointer;
        svg {
          font-size: 18px;
          margin-right: 5px;
        }
      }
    }
    .user-form {
      .info-item {
        margin: -30px 8% 20px;
        border-bottom: 1px solid #ebebeb;
        padding: 15px 0;
        line-height: 36px;
        display: flex;

        align-items: center;
        .title {
          position: absolute;
          font-size: 17px;
          font-weight: bold;
        }
        .content {
          padding: 0 64px 0 180px;
          font-size: 16px;
          overflow: hidden;
          margin-bottom: 0px;
          display: -webkit-box;
          text-overflow: ellipsis;

          -webkit-box-orient: vertical;
          align-items: center;
          .el-input {
            width: 35vw;
          }
        }
      }
    }
    .card-footer {
      display: flex;
      justify-content: right;
      padding-bottom: 20px;
      padding-right: 20px;
      margin-top: 20px;
      .el-button {
        margin: 0 10px;
      }
    }
  }
}
</style>
