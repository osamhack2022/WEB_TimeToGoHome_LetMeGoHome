import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from "../container/LoginForm";
import RegisterForm from "../container/RegisterForm";
import LandingPage from "../container/LandingPage";

function router({ user, Login, error, admin, Logout, Register }) {
  return (
    <Router>
      {user.email !== "" ? (
        // <Routes>
        <LandingPage
          user={user}
          Logout={Logout}
        />
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm Login={Login} error={error} />} />
          <Route path="/register" element={<RegisterForm Register={Register}/>} />
        </Routes>
      )}
    </Router>
  );
}

export default router;
