import React, { useState, useEffect, createContext } from "react";
import axios from "./utils/axios.util";
import Router from "./routers/router";
import "./App.css";
import LoginForm from "./container/LoginForm";
import RegisterForm from "./container/RegisterForm";

export default function App() {
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    armyType: "",
    armyRank: "",
    enlistment: "",
    discharge: "",
  });

  const [error, setError] = useState({ code: undefined, msg: "", at: "" });

  const Login = (details) => {
    const { email: userEmail, password: userPassword } = details;
    axios
      .post("/api/auth/login", details)
      .catch((err) => {
        if (err.response.status === 400) {
          // eslint-disable-next-line no-alert
          setError({
            code: err.response.status,
            msg: "아이디 또는 비밀번호가 틀렸습니다.",
            at: "Login",
          });
        }
      })
      .then((response) => {
        axios.defaults.headers.common["x-access-token"] =
          response.data.payload.token; // setting token to axios header
        axios.get("/api/user/me").then((res) => {
          setUser({ ...res.data.payload });
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("token", response.data.payload.token);
        });
        setError({
          code: undefined,
          msg: "",
          at: "",
        });
      });
  };

  const Logout = () => {
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
        error={error}
        setUser={setUser}
        Login={Login}
        Logout={Logout}
      />
    </div>
  );
}
