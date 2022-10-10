/* eslint-disable react/prop-types */

import React from "react";

function LandingPage({ user, Logout }) {
  console.log(user);
  return (
    <div className="welcome">
      <div className="nav-bar">
        <div className="nav-bar_logo">
          <h1>이젠 돌아갈 때</h1>
        </div>
        <div className="nav-bar_menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </ul>
        </div>
      </div>
      <h1>Welcome, {user.name}</h1>
      <button type="button" className="" onClick={Logout} >Logout</button>
    </div>
  );
}

export default LandingPage;
