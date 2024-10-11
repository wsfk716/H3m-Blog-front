import axios from "axios";
/**
 * 获取用户分类数量
 * @param {BigInteger} userId
 * @returns
 */
function getCategoryCount(userId) {
  return axios.get(`/api/category/${userId}`);
}
export { getCategoryCount };
