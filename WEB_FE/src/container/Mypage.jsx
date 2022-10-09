/* eslint-disable react/prop-types */

import React from "react";

function LandingPage({ user, Logout }) {
  console.log(user);
  return (
    <div className="welcome">
      <h1>Welcome, {user.name}</h1>
      <button type="button" className="" onClick={Logout} >Logout</button>
    </div>
  );
}

export default LandingPage;
