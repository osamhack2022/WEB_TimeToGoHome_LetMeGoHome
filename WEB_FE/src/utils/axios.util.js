import axios from "axios";

const instance = axios.create({
  baseURL: "https://petercode.kro.kr/",
});

instance.defaults.headers.common["x-access-token"] =
  localStorage.getItem("token");

instance.interceptors.request.use(
  (config) => config,
  (error) => {
    if (error.response.status === 419) {
      alert("인증이 만료되었습니다. 다시 로그인해 주십시오."); // TODO: refreshToken 사용하도록 수정할 것!
    }
    return Promise.reject(error);
  }
);

export default instance;
