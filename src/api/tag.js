import axios from "axios";
/**
 * 获取用户标签数量
 * @param {BigInteger} userId
 * @returns
 */
function getTagCount(userId) {
  return axios.get(`/api/tag/count/${userId}`);
}

function getTagNameList(userId) {
  return axios.get(`/api/tag/name/${userId}`);
}
export { getTagCount, getTagNameList };
