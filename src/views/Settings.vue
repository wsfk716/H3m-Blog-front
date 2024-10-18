<template>
  <div id="box">
    <!-- 页头 -->
    <h3m-header></h3m-header>
    <!-- 封面 -->
    <h3m-cover-other
      title="个人中心"
      text="雄关漫道真如铁，而今迈步从头越"
    ></h3m-cover-other>
    <div class="user-info-card">
      <!-- 封面 -->
      <div class="user-cover">
        <img src="@/assets/image/user-cover.jpg" alt="" />
      </div>
      <div class="user-avatar">
        <img src="@/assets/image/avatar.jpg" alt="" />
      </div>
      <!-- 用户信息 -->
      <div class="user-form">
        <div class="info-item">
          <div class="title">用户名</div>
          <div class="content">{{ user.currentUserInfo.userName }}</div>
        </div>
        <div class="info-item">
          <div class="title">昵称</div>
          <div class="content">{{ user.currentUserInfo.nickName }}</div>
        </div>
        <div class="info-item">
          <div class="title">性别</div>
          <div class="content">{{ user.currentUserInfo.sex }}</div>
        </div>
        <div class="info-item">
          <div class="title">个性签名</div>
          <div class="content">{{ user.currentUserInfo.signature }}</div>
        </div>
        <div class="info-item">
          <div class="title">电子邮箱</div>
          <div class="content">{{ user.currentUserInfo.email }}</div>
        </div>
        <div class="info-item">
          <div class="title">手机号码</div>
          <div class="content">{{ user.currentUserInfo.phonenumber }}</div>
        </div>
        <div class="info-item">
          <div class="title">QQ</div>
          <div class="content">{{ user.currentUserInfo.qq }}</div>
        </div>
      </div>
      <!-- 操作 -->
      <div class="card-footer">
        <el-button type="primary"> 编辑信息 </el-button>
        <el-button type="danger"> 退出登录 </el-button>
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
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/useUserStore";
import { ElMessage } from "element-plus";

const { user } = useUserStore();
</script>

<style lang="scss" scoped>
#box {
  .user-info-card {
    display: flex;
    width: 60%;
    margin: 20px auto;
    padding: 20px;
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
    }
    .user-form {
      border-radius: 15px;
      margin: -50px 8% 20px;

      .info-item {
        border-bottom: 1px solid #ebebeb;

        padding: 15px 0;
        line-height: 36px;
        display: flex;

        .title {
          position: absolute;
          font-size: 17px;
          font-weight: bold;
        }
        .content {
          padding: 0 64px 0 180px;
          font-size: 16px;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
    .card-footer {
      display: flex;
      justify-content: right;

      margin-top: 20px;
      .el-button {
        margin: 0 10px;
      }
    }
  }
}
</style>
