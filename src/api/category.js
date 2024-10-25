import axios from "axios";
/**
 * 获取用户分类数量
 * @param {BigInteger} userId
 * @returns
 */
function getCategoryCount(userId) {
  return axios.get(`/api/category/count/${userId}`);
}
/**
 * 获取分类基本信息
 * @param {BigInteger} userId
 * @returns
 */
function getCategoryNameList(userId) {
  return axios.get(`/api/category/name/${userId}`);
}

/**
 * 添加分类
 * @param {object} category
 * @returns
 */
function addCategory(category) {
  return axios.post(`/api/category`, category);
}
export { getCategoryCount, getCategoryNameList, addCategory };
