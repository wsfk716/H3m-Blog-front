import axios from "axios";
/**
 * 获取用户标签数量
 * @param {BigInteger} userId
 * @returns
 */
function getTagCount(userId) {
  return axios.get(`/api/tag/count/${userId}`);
}

/**
 * 获取标签基本信息
 * @param {BigInteger} userId
 * @returns
 */
function getTagNameList(userId) {
  return axios.get(`/api/tag/name/${userId}`);
}

/**
 * 添加标签
 * @param {object} tag
 * @returns
 */
function addTag(tag) {
  return axios.post(`/api/tag`, tag);
}
export { getTagCount, getTagNameList, addTag };
