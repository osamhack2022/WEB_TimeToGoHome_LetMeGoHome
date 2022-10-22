/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import eye from "../images/eye.png";
import eyeSlash from "../images/eyeSlash.png";
import triangle from "../images/triangle.png";

function RegisterForm() {
  const [eyeImage, setEye] = useState(eye);
  const [isRankActive, setRankActive] = useState(false);
  const [isMilitaryActive, setMilitaryActive] = useState(false);
  const [selectedRank, setSelectedRank] = useState("계급");
  const [selectedMilitary, setSelectedMilitary] = useState("군");

  const military = ["육군", "해군", "공군"];
  const rank = ["이병", "일병", "상병", "병장"];

  function switchImage() {
    if (eyeImage === eye) {
      setEye(eyeSlash);
      document.getElementById("passwords").type = "password";
    } else {
      setEye(eye);
      document.getElementById("passwords").type = "text";
    }
  }

  function handleDropdown(e) {
    if (e.target.id === "military") {
      setSelectedMilitary(e.target.textContent);
      setMilitaryActive(!isMilitaryActive);
    } else if (e.target.id === "rank") {
      setSelectedRank(e.target.textContent);
      setRankActive(!isRankActive);
    }
  }

  return (
    <div className="bg font-StrongAF">
      <span className="logo font-StrongAFBold">이젠 돌아갈 때</span>
      <form className="relative h-screen flex flex-row-reverse">
        <div className="relative bg-white lg:w-[45%] w-screen flex-wrap rounded-l-3xl mb-5 mt-6 flex-col content-between">
          <div className="login-label">
            <span>Register</span>
          </div>
          <div className="form-group-register">
            <input
              type="text"
              className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors"
              name="name"
              id="name"
              placeholder="Full Name"
            />
          </div>
          <div className="form-group-register mt-12">
            <input
              type="text"
              className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors"
              name="email"
              id="email"
              placeholder="e-mail"
            />
          </div>
          <div className="form-group-register mt-24">
            <input
              type="text"
              className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors"
              name="passwords"
              id="passwords"
              placeholder="Password"
            />
            <img
              className="absolute left-[482px] bottom-[7px]"
              src={eyeImage}
              alt="this ain't gonna work"
              onClick={switchImage}
            />
          </div>

          {/* <div className="dropdown form-group-register mt-36 group" data-dropdown>
            <button className="link flex text-grey hover:text-slate-500 focus:text-slate-800 w-full text-left ml-3 peer" type="button" data-dropdown-button onClick={handleDropdown}>육군</button>
            <div className="dropdown-menu absolute left-0 top-full bg-white p-[.75rem] shadow-bx opacity-0 peer-focus:opacity-100 
            transition-[opacity,transform] ease-in-out duration-150 -translate-y-[10px] peer-focus:translate-y-0 pointer-events-none peer-focus:pointer-events-auto">
              <div>육군</div>
              <div>해군</div>
              <div>공군</div>
            </div>
          </div> */}
          {/* <div className = "absolute w-[500px] h-[35px] left-[178px] top-[30vh] mt-36">
            <div className="dropdown absolute w-2/5 h-0 left-0 top-0">
              <div className="select">
                <span className="selected">육군</span>
                <div className="caret"></div>
              </div>
              <ul className="menu">
                <li className="active">육군</li>
                <li>해군</li>
                <li>공군</li>
              </ul>
            </div>
            
            <div className="dropdown absolute w-2/5 h-0 left-1/2 top-0 box-border">
              <div className="select bg-[#e2e8f0]">
                <span className="selected">이병</span>
                <div className="caret"></div>
              </div>
              <ul className="menu">
                <li className="active">이병</li>
                <li>일병</li>
                <li>상병</li>
                <li>병장</li>
              </ul>
            </div>
          </div> */}
          <div className="dropdown relative flex flex-row form-group-register mt-36 group w-[400px] select-none cursor-pointer">
            <div
              id="military"
              className="dropdown-btn rounded-md absolute w-2/5 flex justify-between p-[10px] bg-[#fff] shadow-[3px_3px_10px_6px_rgba(0,0,0,0.06)] items-center"
              onClick={(e) => setMilitaryActive(!isMilitaryActive)}
            >
              <span>{selectedMilitary}</span>
              <div className="traingle box-border w-[11px] h-[11px]">
                <img src={triangle} alt="Triangle img" className="src" />
              </div>
            </div>
            {isMilitaryActive && (
              <div className="dropdown-content bg-slate-50 rounded-md absolute top-[45px] p-[15px] shadow-bx w-2/5 z-10 transition-all">
                {military.map((option) => (
                  <div
                    key={option}
                    id="military"
                    className="dropdown-item p-[10px] hover:bg-slate-100 z-10"
                    onClick={handleDropdown}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}

            <div
              className="dropdown-btn rounded-md absolute w-2/5 left-1/2 flex justify-between p-[10px] bg-[#fff] shadow-[3px_3px_10px_6px_rgba(0,0,0,0.06)] items-center"
              onClick={(e) => setRankActive(!isRankActive)}
            >
              <span>{selectedRank}</span>
              <div className="traingle box-border w-[11px] h-[11px]">
                <img src={triangle} alt="Triangle img" className="src" />
              </div>
            </div>
            {isRankActive && (
              <div className="dropdown-content bg-slate-50 rounded-md absolute top-[45px] left-1/2 p-[15px] shadow-bx w-2/5 z-10">
                {rank.map((option) => (
                  <div
                    key={option}
                    id="rank"
                    className="dropdown-item p-[10px] hover:bg-slate-100"
                    onClick={handleDropdown}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group-register mt-60">
            <input
              type="text"
              className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors"
              name="입영일"
              id="입영일"
              placeholder="입영일"
              onFocus={(e) => {
                e.target.type = "date";
                const today = new Date();
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1;
                let dd = today.getDate();

                if (dd < 10) dd = `0${dd}`;
                if (mm < 10) mm = `0${mm}`;
                e.target.max = `${yyyy}-${mm}-${dd}`;
                e.target.min = "2010-01-01";
              }}
              onBlur={(e) => {
                e.target.type = "text";
              }}
            />
          </div>
          <div className="form-group-register mt-72">
            <input
              type="text"
              className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors"
              name="전역일"
              id="전역일"
              placeholder="전역일"
              onFocus={(e) => {
                e.target.type = "date";
                e.target.max = "9999-12-31";
                e.target.min = "2010-01-01";
              }}
              onBlur={(e) => {
                e.target.type = "text";
              }}
            />
          </div>

          <button
            type="submit"
            id="login-btn"
            className="bg-primary hover:bg-teal-500 shadow-lg hover:shadow-sm shadow-teal-700/50 hover:shadow-teal-600 transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <span id="login-btn-text">Create Account</span>
          </button>

          <span className="absolute left-[168px] top-[79vh] text-slate-300 text-bg">
            Already have an account?{" "}
            <a className="text-greenish" href="./">
              Login
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
