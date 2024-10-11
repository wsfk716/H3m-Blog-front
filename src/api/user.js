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
export { login, register };
