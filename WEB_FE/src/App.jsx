/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Router from "./routers/router";
import LoginForm from "./container/LoginForm";
import RegisterForm from "./container/RegisterForm";

export default function App() {
  const adminUser = {
    email: "admin@admin.com",
    pw: "admin123",
    name: "Sean",
    army_type: "공군",
    army_rank: "일병",
  };

  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    armyType: "",
    armyRank: "",
    enlistment: "",
    discharge: "",
  });
  const [error, setError] = useState("");

  // setting axios default url
  axios.defaults.baseURL = "https://petercode.kro.kr";

  function Register(details) {
    const { email, password, name, armyType, armyRank, enlistment, discharge } =
      details;
    console.log(details);
    axios.post("/api/auth/register", details).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  const Login = (details) => {
    // eslint-disable-next-line no-console

    const { email: userEmail, password: userPassword } = details;

    axios
      .post("/api/auth/login", details)
      .catch((err) => {
        if (err.response.status === 400) {
          alert("아이디 또는 비밀번호가 틀렸습니다.");
        } else {
          alert("로그인에 실패했습니다.");
        }
      })
      .then((response) => {
        if (response.status === 200) {
          axios.defaults.headers.common["x-access-token"] = response.data.token; // setting token to axios header
          console.log("Logged In!!!");
          axios.get("/api/user/me").then((res) => {
            console.log("from app.jsx", res.data.data);
            setUser({ ...res.data.data});
            // {
            //   id: res.data.id,
            //   email: res.data.email,
            //   name: res.data.name,
            //   army_type: res.data.army_type,
            //   army_rank: res.data.army_rank,
            //   enlistment: res.data.enlistment,
            //   discharge: res.data.discharge,
            // });
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem('token', response.data.token);
          });
        } else {
          alert("details do not match");
        }
      });
  };
  const Logout = () => {
    console.log("Logout");
    setUser({
      id: "",
      email: "",
      name: "",
      armyType: "",
      armyRank: "",
      enlistment: "",
      discharge: "",
    });
    localStorage.clear();
  };

  return (
    <div>
      {useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, [])}
      <Router
        user={user}
        Logout={Logout}
        Login={Login}
        error={error}
        admin={adminUser}
        Register={Register}
      />
    </div>
  );
}
