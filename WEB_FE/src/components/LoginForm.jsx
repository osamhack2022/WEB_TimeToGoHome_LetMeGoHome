// eslint-disable-next-line import/no-absolute-path
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
        <div className="form-container">
          <div className="login-label mt-2">
            <span>Login</span>
          </div>
          {/* Error */}
          <div className="form-group">
            <input type="text" className="w-[502px] h-[35px] border-b focus:outline-0 focus:border-slate-600" name="email" id="email" placeholder="e-mail" onChange={e => setDetails({...details, email: e.target.value})} />
          </div>
          <div className="form-group mt-12">
            <input type="text" className="w-[502px] h-[35px] border-b focus:outline-0 focus:border-slate-600" name="passwords" id="passwords" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} />
          </div>
          
          <button type="submit" id="login-btn" className="bg-primary shadow-lg shadow-teal-700/50"><span id="login-btn-text">Login</span></button>
          <span className="absolute left-[188px] top-[79vh] text-slate-300 text-bg">Don&apos;t have an account? <a className="text-greenish" href="./register">Register</a></span>
          
          
          
        </div>
      </form>
    </div>
  )
}

export default LoginForm;