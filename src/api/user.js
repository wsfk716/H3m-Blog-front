import axios from "axios";
/**
 * 用户登录
 * @param {string} userName
 * @param {string} password
 * @returns
 */
function login(data) {
  return axios.post("/api/login", {
    userName: data.userName,
    password: data.password,
  });
}
/**
 * 注册用户
 * @param {User} data
 * @returns
 */
function register(data) {
  return axios.post("/api/user/register", data);
}

/**
 * 退出登录
 */
function logout() {
  return axios.post("/api/logout");
}

/**
 * 更新用户信息
 * @param {User} data
 * @returns
 */
function updateUserInfo(data) {
  return axios.put("/api/user", data);
}

/**
 * 判断是否是管理员
 * @param {BigInteger} userId
 * @returns
 */
function getIsAdmin(userId) {
  return axios.get(`/api/user/isAdmin/${userId}`);
}
export { login, register, logout, updateUserInfo, getIsAdmin };
