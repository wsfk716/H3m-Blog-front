import axios from "axios";

/**
 * 获取文章的所有评论
 * @param {BigInteger} articleId
 * @param {BigInteger} pageNum
 * @param {BigInteger} pageSize
 * @returns
 */
function getCommentList(articleId, pageNum, pageSize) {
  return axios.get(
    `/api/comment/${articleId}?pageNum=${pageNum}&pageSize=${pageSize}`
  );
}

export { getCommentList };
