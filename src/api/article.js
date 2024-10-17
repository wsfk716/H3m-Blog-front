import axios from "axios";
/**
 * 获取用户文章数量
 * @param {BigInteger} userId
 * @returns
 */
function getArticleCount(userId) {
  return axios.get(`/api/article/count/${userId}`);
}
/**
 *
 * @param {BigInteger} userId
 * @returns 返回用户文章信息列表，主要包含一些文章的基本信息。
 */
function getArticleList(userId, pageNum, pageSize) {
  return axios.get(
    `/api/article/${userId}?pageNum=${pageNum}&pageSize=${pageSize}`
  );
}
export { getArticleCount, getArticleList };
