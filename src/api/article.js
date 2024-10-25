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

/**
 * 根据标签或者分类获取文章列表, 传入参数为用户id，标签id，分类id，页码，每页数量。
 * 如果是根据标签获取文章列表，则传入的分类id为0，反之亦然。
 * @param {BigInteger} userId
 * @param {BigInteger} tagId
 * @param {BigInteger} categoryId
 * @param {string} date
 * @param {BigInteger} pageNum
 * @param {BigInteger} pageSize
 *
 * @returns
 */
function getArticleListByTagOrCategoryOrDate(
  userId,
  tagId,
  categoryId,
  date,
  pageNum,
  pageSize
) {
  return axios.get(
    `/api/article/articleList/${userId}?tagId=${tagId}&categoryId=${categoryId}&date=${date}&pageNum=${pageNum}&pageSize=${pageSize}`
  );
}
/**
 * 发布博客
 * @param {object} data
 * @returns
 */
function addArticle(data) {
  return axios.post(`/api/article`, data);
}

/**
 * 更新博客
 * @param {object} data
 * @returns
 */
function updateArticle(data) {
  return axios.put(`/api/article`, data);
}

/**
 * 删除博客
 * @param {BigInteger} id
 * @returns
 */
function deleteArticle(id) {
  return axios.delete(`/api/article/${id}`);
}
export {
  getArticleCount,
  getArticleList,
  getArticleDetail,
  getPreviousNextArticle,
  getArticleListByTagOrCategoryOrDate,
  addArticle,
  updateArticle,
  deleteArticle,
};
