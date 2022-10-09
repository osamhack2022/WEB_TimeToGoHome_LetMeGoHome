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

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    // eslint-disable-next-line no-console

    const { email: userEmail, password: userPassword } = details;

    axios
      .post("/api/login", details)

      .then((response) => {
        // later on if statement will be done in backend, response contains user information
        if (userEmail === adminUser.email && userPassword === adminUser.pw) {
          console.log("Logged In!!!");
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          console.log("details do not match");
        }
      });
  };
  const Logout = () => {
    console.log("Logout");
    setUser({
      email: "",
      password: "",
    });
    localStorage.clear();
  };

  return (
    <div className="bg">
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
      />
    </div>
  );
}
