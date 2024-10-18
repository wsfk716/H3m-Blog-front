import axios from "axios";

/**
 * 获取用户归档数量信息
 * @param {BigInteger} userId
 * @returns
 */
function getArchiveCountList(userId) {
  return axios.get(`/api/archive/count/${userId}`);
}

/**
 *
 * @param {获取归档列表} userId
 * @returns
 */
function getArchiveList(userId, pageNum, pageSize) {
  return axios.get(
    `/api/archive/${userId}?pageNum=${pageNum}&pageSize=${pageSize}`
  );
}
export { getArchiveCountList, getArchiveList };
