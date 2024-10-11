import axios from "axios";
/**
 * 获取用户标签数量
 * @param {BigInteger} userId
 * @returns
 */
function getTagCount(userId) {
  return axios.get(`/api/tag/${userId}`);
}
export { getTagCount };
