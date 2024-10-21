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
/**
 * 根据id获取文章详情
 * @param {BigInteger} id
 * @returns
 */
function getArticleDetail(id) {
  return axios.get(`/api/article/detail/${id}`);
}
/**
 * 获取上一篇和下一篇的文章信息
 * 传入参数为当前文章的id以及用户的id，返回上一篇和下一篇文章的信息。
 * @param {BigInteger} articleId
 * @param {BigInteger} userId
 * @returns
 */
function getPreviousNextArticle(articleId, userId) {
  return axios.get(
    `/api/article/previousNextArticle?articleId=${articleId}&userId=${userId}`
  );
}
export {
  getArticleCount,
  getArticleList,
  getArticleDetail,
  getPreviousNextArticle,
};
