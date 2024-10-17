import axios from "axios";

/**
 * 获取用户归档信息
 * @param {BigInteger} userId
 * @returns
 */
function getArchiveList(userId) {
  return axios.get(`/api/archive/${userId}`);
}

export { getArchiveList };
