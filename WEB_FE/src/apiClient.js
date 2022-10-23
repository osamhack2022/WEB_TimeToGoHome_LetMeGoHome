import axios from "axios";
// import * as dotenv from 'dotenv';

// dotenv.config()

const instance = axios.create({
  baseURL: "https://petercode.kro.kr",
});

export default instance;
// instance.defaults.headers.common.Authorization = AUTH_TOKEN;