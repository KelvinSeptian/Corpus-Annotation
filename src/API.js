const axios = require("axios"); 

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "4f8bd8e07b574fbcbac6ee4b13fb4458",
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});

export const uploadFile = (file) => {
    assembly
      .post("/upload", file)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
}