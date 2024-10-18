import axios from "axios";
/**
 * 获取用户分类数量
 * @param {BigInteger} userId
 * @returns
 */
function getCategoryCount(userId) {
  return axios.get(`/api/category/count/${userId}`);
}

function getCategoryNameList(userId) {
  return axios.get(`/api/category/name/${userId}`);
}
export { getCategoryCount, getCategoryNameList };
