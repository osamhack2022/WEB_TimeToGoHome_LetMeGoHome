import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from "../container/LoginForm";
import RegisterForm from "../container/RegisterForm";
import LandingPage from "../container/LandingPage";

function router({ user, error, setUser, Login, Logout }) {
  return (
    <Router>
      {user.email !== "" ? (
        // <Routes>
        <LandingPage user={user} setUser={setUser} Logout={Logout} />
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
