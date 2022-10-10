/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line import/no-absolute-path
import React, { useState } from "react";
import axios from "axios";
import eye from "../images/eye.png";
import eyeSlash from "../images/eyeSlash.png";

// eslint-disable-next-line react/prop-types
function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [eyeImage, setEye] = useState(eyeSlash);

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  function switchImage() {
    if (eyeImage === eye) {
      setEye(eyeSlash);
      document.getElementById("passwords").type = "password";
    } else {
      setEye(eye);
      document.getElementById("passwords").type = "text";
    }
  }

  return (
    <div>
      <span className="logo">이젠 돌아갈 때</span>
      <form onSubmit={submitHandler} className="relative h-screen flex flex-row-reverse">
        <div className="relative bg-white lg:w-[45%] w-screen flex-wrap rounded-l-2xl mb-5 mt-6 flex-col content-between">
          <div className="login-label">
            <span>Login</span>
          </div>
          {/* Error */}
          <div className="form-group">
            <input
              type="email"
              className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors ease-in-out"
              name="email"
              id="email"
              placeholder="e-mail"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
          </div>
          <div className="form-group mt-12">
            <input
              type="password"
              className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors"
              name="passwords"
              id="passwords"
              placeholder="Password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
            />

            <img
              className="absolute left-[482px] bottom-[7px]"
              src={eyeImage}
              alt="this ain't gonna work"
              onClick={switchImage}
            />
          </div>

          <button
            type="submit"
            id="login-btn"
            className="bg-primary hover:bg-teal-500 shadow-lg hover:shadow-sm shadow-teal-700/50 hover:shadow-teal-600 transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <span id="login-btn-text">Login</span>
          </button>
          <span className="absolute left-[188px] top-[79vh] text-slate-300 text-bg">
            Don&apos;t have an account?{" "}
            <a className="text-greenish" href="./register">
              Register
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
