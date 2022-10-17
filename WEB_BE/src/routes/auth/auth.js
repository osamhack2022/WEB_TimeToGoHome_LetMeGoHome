import express from "express";

import * as authCtrl from "./auth.ctrl.js";

const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body);
  //요청된 이메일이 데이터 베이스의 있는지 찾는다.
  //요청된 이메일이 DB의 있다면 비밀번호가 맞는지 확인한다.
  //비밀번호까지 맞다면 User에게 토큰을 부여한다.
});

router.get("/test", (req, res) => {
  const data = authCtrl.test();
  res.send(data);
});

router.post("/register", (req, res) => {
  const user = req.body; // 회원가입의 필요한 정보를 client에서 가져다 주면
  authCtrl.encryption(user); // password를 암호화 시킨다.
  const data = authCtrl.register(user); // DB안에 넣어준다.
  console.log(data);
});

export default router;
