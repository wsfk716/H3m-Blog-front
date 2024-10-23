<template>
  <div class="box">
    <div class="login" v-if="flag">
      <div class="left">
        <img src="../assets/image/login-left.png" alt="login-left" />
      </div>

      <div class="right">
        <h2>✨ Kila Kila Blog ✨</h2>
        <div class="welcome">欢迎回来</div>
        <el-form
          :model="loginForm"
          class="loginForm"
          :rules="loginRuleForm"
          ref="loginFormRef"
          status-icon
        >
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName" placeholder="用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="密码"
              type="password"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 记住我 -->
          <el-form-item>
            <el-checkbox
              label="记住密码"
              name="rememberMe"
              v-model="loginForm.rememberMe"
            ></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onLogin"
              style="width: 90%; height: 40px; margin-top: 10px"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <div class="tips">
          还没有账号？
          <div class="change" @click="changeStatus">快来注册一个吧！</div>
        </div>
      </div>
    </div>
    <div class="register" v-else>
      <div class="left">
        <img src="../assets/image/login-left.png" alt="register-left" />
      </div>
      <div class="right">
        <h2>✨ Kila Kila Blog ✨</h2>
        <div class="welcome">请填写您的基本信息</div>
        <el-form
          :model="registerForm"
          class="registerForm"
          :rules="registerRuleForm"
          ref="registerFormRef"
          status-icon
        >
          <el-form-item label="" prop="userName">
            <el-input v-model="registerForm.userName" placeholder="用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="nickName">
            <el-input v-model="registerForm.nickName" placeholder="昵称">
              <template #prefix>
                <el-icon><Postcard /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="email">
            <el-input v-model="registerForm.email" placeholder="邮箱">
              <template #prefix>
                <el-icon><Promotion /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="registerForm.password" placeholder="密码">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              placeholder="确认密码"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onRegister"
              style="width: 90%; height: 2.5rem; margin-top: 10px"
              >开启博客之旅</el-button
            >
          </el-form-item>
        </el-form>
        <div class="tips">
          已有账号？
          <div class="change" @click="changeStatus">点我返回登录！</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { login, register, getIsAdmin } from "../api/user";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/useUserStore";

const { changeUser, user } = useUserStore();
const router = useRouter();

onMounted(() => {
  // 清除 token，user 信息
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // 清除 Pinia 中的 user 信息
  changeUser(null);

  // 如果localStorage中有用户名和密码，则自动填充到登录表单中
  const savedUserName = localStorage.getItem("userName");
  const savedPassword = localStorage.getItem("password");
  if (savedUserName && savedPassword) {
    loginForm.value.userName = savedUserName;
    loginForm.value.password = savedPassword;
    loginForm.value.rememberMe = true;
  }
});
// 登录注册切换
const flag = ref(true);
const changeStatus = () => {
  flag.value = !flag.value;
};
// 登录表单
const loginForm = ref({
  userName: "",
  password: "",
  rememberMe: false,
});
const loginFormRef = ref();
// 登录表单验证规则
const loginRuleForm = ref({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
// 登录
const onLogin = async () => {
  if (loginFormRef.value.validate()) {
    // console.log(loginForm.value);
    const res = await login(loginForm.value);
    // console.log(res);
    if (res.data.code === 1) {
      ElMessage.success("登录成功");

      // 保存用户信息到pinia中
      changeUser(res.data.data);
      console.log(user.currentUserInfo);

      // console.log(user.currentUserInfo.isAdmin);
      // 如果选择了记住密码，则将账号密码保存到localStorage中
      if (loginForm.value.rememberMe) {
        localStorage.setItem("userName", loginForm.value.userName);
        localStorage.setItem("password", loginForm.value.password);
      }
      // 跳转到首页
      router.push("/");
    } else {
      ElMessage.error("用户名或密码错误");
    }
  } else {
    ElMessage.error("登录失败");
  }
};

// 注册表单
const registerForm = ref({
  userName: "",
  nickName: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const registerFormRef = ref();
// 注册表单验证规则
const registerRuleForm = ref({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value === registerForm.value.password) {
          callback();
        } else {
          callback(new Error("两次输入密码不一致"));
        }
      },
      trigger: "blur",
    },
  ],
});
// 注册
const onRegister = async () => {
  if (registerFormRef.value.validate()) {
    // console.log(registerForm.value);
    const res = await register({
      userName: registerForm.value.userName,
      nickName: registerForm.value.nickName,
      email: registerForm.value.email,
      password: registerForm.value.password,
    });
    // console.log(res);
    if (res.data.code === 1) {
      ElMessage.success("注册成功");
      // 清空表单
      registerForm.value = {
        userName: "",
        nickName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
      // 跳转到登录组件
      flag.value = !flag.value;
    } else {
      ElMessage.error("注册失败");
    }
  } else {
    ElMessage.error("表单校验失败");
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/image/login-background.jpg");
  background-size: cover; /* 确保背景图片覆盖整个容器 */
  background-position: center; /* 确保背景图片居中 */
  h2 {
    font-family: "Kanit";
  }
  .login {
    display: flex;
    width: 42%;
    height: 60%;
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    top: 50%; /* 使登录框居中 */
    left: 50%; /* 使登录框居中 */
    justify-content: space-between;
    transform: translate(
      -50%,
      -50%
    ); /* 由于定位时是根据左上角来定位，为了让中心居中，这里我们将移动自身50%的宽高 */
    border-radius: 20px;
    transition: background 0.3s ease; /* 添加过渡效果 */
    &:hover {
      background: rgba(255, 255, 255, 0.7); /* 鼠标移入时改变透明度 */
    }
    .left {
      width: 45%;
      height: 100%;
      img {
        height: 95%;
        border-radius: 15px;
        margin: 15px;
      }
    }
    .right {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column; /* 使子元素垂直排列 */

      justify-content: center;
      position: relative; /* 使 .tips 相对于 .right 进行定位 */
      .welcome {
        width: 100%;
        font-size: 24px;
        color: #627d98;
        margin-bottom: 20px;
      }
      .loginForm {
        width: 100%;
        padding-left: 20px;
        .el-form-item {
          margin-bottom: 20px;
          height: 40px;
          .el-input {
            width: 90%;
            height: 100%;
          }
        }
      }
      .tips {
        display: flex;
        width: 100%;
        justify-content: center;
        color: #000;
        font-size: 18px;
        position: absolute; /* 绝对定位 */
        bottom: 20px; /* 距离底部 10px */
        .change {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }
  .register {
    display: flex;
    width: 42%;
    height: 60%;
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    top: 50%; /* 使登录框居中 */
    left: 50%; /* 使登录框居中 */
    justify-content: space-between;
    transform: translate(
      -50%,
      -50%
    ); /* 由于定位时是根据左上角来定位，为了让中心居中，这里我们将移动自身50%的宽高 */
    border-radius: 20px;
    transition: background 0.3s ease; /* 添加过渡效果 */
    &:hover {
      background: rgba(255, 255, 255, 0.7); /* 鼠标移入时改变透明度 */
    }
    .left {
      width: 45%;
      height: 100%;
      img {
        height: 95%;
        border-radius: 15px;
        margin: 15px;
      }
    }
    .right {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column; /* 使子元素垂直排列 */

      justify-content: center;
      position: relative; /* 使 .tips 相对于 .right 进行定位 */
      .welcome {
        width: 100%;
        font-size: 24px;
        color: #627d98;
        margin-bottom: 1.25rem;
      }
      .registerForm {
        width: 100%;
        padding-left: 1.25rem;
        .el-form-item {
          margin-bottom: 1.125rem;
          height: 2.5rem;
          .el-input {
            width: 90%;
            height: 100%;
          }
        }
      }
      .tips {
        display: flex;
        width: 100%;
        justify-content: center;
        color: #000;
        font-size: 1.125rem;
        position: absolute; /* 绝对定位 */
        bottom: 1.25rem; /* 距离底部 10px */
        .change {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
