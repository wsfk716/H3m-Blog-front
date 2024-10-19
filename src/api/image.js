import axios from "axios";

// /**
//  * 生成上传图片的临时token
//  * @returns
//  */
// function generateToken() {
//   return axios.post("/image/images/tokens", {
//     num: 1,
//     seconds: 2626560,
//   });
// }

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
