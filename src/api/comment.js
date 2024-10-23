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

/**
 * 添加评论
 * @param {object} comment
 * @returns
 */
function addComment(comment) {
  return axios.post("/api/comment", comment);
}
/**
 * 修改评论
 * @param {object} comment
 * @returns
 */
function updateComment(comment) {
  return axios.put("/api/comment", comment);
}

/**
 * 删除评论
 * @param {BigInteger} commentId
 * @returns
 */
function deleteComment(commentId) {
  return axios.delete(`/api/comment/${commentId}`);
}
export { getCommentList, addComment, updateComment, deleteComment };
