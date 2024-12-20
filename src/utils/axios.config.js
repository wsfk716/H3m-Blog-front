import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";
import { useUserStore } from "../store/useUserStore"; // 引入 Pinia 的 user store
import router from "../router"; // 引入路由实例
let loading;
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 如果有 token，就加到请求头 authorization 中
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = token;
    }
    // 如果是上传图片，则重新设置token
    if (config.url.includes("/image")) {
      config.headers.authorization =
        "Bearer 7|GkrEwwP8TvyyYKFeMZqdOEjQ2XxAKuiwLvQEcavd";
    }

    loading = ElLoading.service({ fullscreen: true });
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 如果有 token，就存储到 localStorage 中
    response.headers.authorization &&
      localStorage.setItem("token", response.headers.authorization);
    loading && loading.close();
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    loading && loading.close();
    console.log(error.response);
    if (error.response.status === 401) {
      ElMessage.error("登录状态失效，请重新登录");
      // 使用 Vue Router 进行跳转到登录页
      router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);
