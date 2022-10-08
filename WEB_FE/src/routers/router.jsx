import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function router({ user, Login, error }) {
  return (
    <Router>
      {user.email !== "" ? (
        // <Routes>
        <div className="welcome">
          <h1>Welcome, {user.email}</h1>
        </div>
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
