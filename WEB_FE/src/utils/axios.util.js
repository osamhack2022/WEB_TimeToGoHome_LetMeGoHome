import axios from "axios";

const instance = axios.create({
  baseURL: "https://petercode.kro.kr/",
});

instance.defaults.headers.common["x-access-token"] = localStorage.getItem("token");

export default instance;
