import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from "../container/LoginForm";
import RegisterForm from "../container/RegisterForm";
import LandingPage from "../container/Mypage";

function router({ user, Login, error, admin, Logout }) {
  return (
    <Router>
      {user.email !== "" ? (
        // <Routes>
        <LandingPage
          user={
            user.email === admin.email && user.password === admin.pw
              ? admin
              : user
          }
          Logout={Logout}
        />
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm Login={Login} error={error} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      )}
    </Router>
  );
}

export default router;
