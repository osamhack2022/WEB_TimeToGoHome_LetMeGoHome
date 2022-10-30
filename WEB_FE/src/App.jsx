import React, { useState, useEffect, createContext } from "react";
import axios from "./utils/axios.util";
import Router from "./routers/router";
import "./App.css";

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
      .then((res) => {
        localStorage.setItem("token", res.data.payload.token);
        axios.defaults.headers.common["x-access-token"] =
          res.data.payload.token; // setting token to axios header
        axios.get("/api/user/me").then((response) => {
          setUser({ ...response.data.payload });
          localStorage.setItem("user", JSON.stringify(response.data.payload));
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
    // navigate("/");
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
