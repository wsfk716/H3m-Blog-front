import axios from "axios";
/**
 * 上传图片
 * @param {FileList} file
 * @returns
 */
function uploadImage(file) {
  let formData = new FormData();
  formData.append("file", file);
  return axios.post("/image/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export { uploadImage };
