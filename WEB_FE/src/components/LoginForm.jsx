import React, { useState } from 'react';
import axios from "axios";

// eslint-disable-next-line react/prop-types
function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({email: "", password: ""});

  const submitHandler = e => {
    e.preventDefault();
    axios.post('/api/login', JSON.stringify(details))
    // eslint-disable-next-line prefer-arrow-callback
    .then(function (response) {
      console.log(response);
    })
  }

  return (
    <div>
      <span className="logo">이젠 돌아갈 때</span>
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <div className="login-label mt-2">
            <span>Login</span>
          </div>
          {/* Error */}
          <div className="form-group card m-2">
            <input type="text" name="email" id="email" placeholder="e-mail" onChange={e => setDetails({...details, email: e.target.value})} />
          </div>
          <div className="form-group mt-4 card m-2">
            <input type="text" name="passwords" id="passwords" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} />
          </div>
          
          <input type="submit" value="Login" id="login-btn"/>
          
          
        </div>
      </form>
    </div>
  )
}

export default LoginForm;