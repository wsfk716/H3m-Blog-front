import axios from "axios";
/**
 * 获取用户文章数量
 * @param {BigInteger} userId
 * @returns
 */
function getArticleCount(userId) {
  return axios.get(`/api/article/${userId}`);
}
export { getArticleCount };
