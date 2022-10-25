import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../utils/axios.util";
import eye from "../images/eye.png";
import eyeSlash from "../images/eyeSlash.png";

function LoginForm(props) {
  const { Login, error } = props;
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
    <div className="bg w-[100vw] h-[100vh] font-StrongAF">
      <span className="logo font-StrongAFBold">이젠 돌아갈 때</span>
      <form
        onSubmit={submitHandler}
        className="relative h-screen flex flex-row-reverse"
      >
        <div className="relative bg-white lg:w-[45%] w-screen flex-wrap rounded-l-3xl mb-5 mt-6 flex-col content-between">
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
            <div className="text-red-600">{error.msg}</div>
            <button
              type="button"
              className="absolute left-[482px] bottom-[7px]"
              onClick={switchImage}
              onKeyPress={switchImage}
            >
              <img src={eyeImage} alt="click to show or hide password" />
            </button>
          </div>

          <button
            type="submit"
            id="login-btn"
            className="bg-primary hover:bg-teal-500 shadow-lg hover:shadow-sm shadow-teal-700/50 hover:shadow-teal-600 transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <span id="login-btn-text">Login</span>
          </button>
          <span className="absolute left-[168px] top-[79vh] text-slate-300 text-bg">
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

LoginForm.propTypes = {
  Login: PropTypes.func.isRequired,
  error: PropTypes.shape({
    code: PropTypes.number.isRequired,
    msg: PropTypes.string,
    at: PropTypes.string.isRequired,
  }).isRequired,
};

export default LoginForm;
