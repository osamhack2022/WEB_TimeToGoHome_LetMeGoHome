import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.util";
import eye from "../images/eye.png";
import eyeSlash from "../images/eyeSlash.png";
import triangle from "../images/triangle.png";

function RegisterForm() {
  const nav = useNavigate();
  const [eyeImage, setEye] = useState(eyeSlash);
  const [isRankActive, setRankActive] = useState(false);
  const [isMilitaryActive, setMilitaryActive] = useState(false);
  const [selectedRank, setSelectedRank] = useState("계급");
  const [selectedMilitary, setSelectedMilitary] = useState("군");
  const [details, setDetails] = useState({
    email: "",
    password: "",
    name: "",
    armyType: "",
    armyRank: "",
    enlistment: "",
    discharge: "",
    profileImage: undefined,
  });
  const military = ["육군", "해군", "공군"];
  const rank = ["이병", "일병", "상병", "병장"];

  const Register = () => {
    const formData = new FormData();
    for (const key in details) {
      formData.append(key, details[key]);
    }
    axios
      .post("/api/auth/register", formData)
      .then((res) => {
        alert("회원가입되었습니다.");
        nav("/");
      })
      .catch((err) => {
        alert("회원가입에 실패했습니다.");
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: 빈 텍스트 있을 경우 오류 메세지 띄우도록!
    Register(details);
  };

  function switchImage(e, idx) {
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
      setDetails({ ...details, armyType: e.target.textContent });
      setMilitaryActive(!isMilitaryActive);
    } else if (e.target.id === "rank") {
      setSelectedRank(e.target.textContent);
      setDetails({ ...details, armyRank: e.target.textContent });
      setRankActive(!isRankActive);
    }
  }

  return (
    <div className="bg font-StrongAF">
      <span className="logo font-StrongAFBold">이젠 돌아갈 때</span>
      <div className="relative h-screen flex flex-row-reverse">
        <div className="relative bg-white lg:w-[45%] w-screen flex-wrap rounded-l-3xl mb-5 mt-6 flex-col content-between">
          <div className="login-label">Register</div>
          <form encType="multipart/form-data" onSubmit={submitHandler}>
            <div className="form-group-register">
              <input
                type="text"
                className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors"
                name="name"
                id="name"
                placeholder="Nickname"
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
              />
            </div>
            <div className="form-group-register mt-12">
              <input
                type="text"
                className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors"
                name="email"
                id="email"
                placeholder="E-mail"
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
              />
            </div>
            <div className="form-group-register mt-24">
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
              <button
                type="button"
                className="absolute left-[482px] bottom-[7px]"
                onClick={switchImage}
                onKeyPress={switchImage}
              >
                <img src={eyeImage} alt="click to show or hide password" />
              </button>
            </div>
            <div className="dropdown relative flex flex-row form-group-register mt-36 group w-[400px] select-none cursor-pointer">
              <div
                role="tablist"
                tabIndex={0}
                id="military"
                className="dropdown-btn rounded-md absolute w-2/5 flex justify-between p-[10px] bg-[#fff] shadow-[3px_3px_10px_6px_rgba(0,0,0,0.06)] items-center"
                onClick={(e) => setMilitaryActive(!isMilitaryActive)}
                onKeyPress={(e) => setMilitaryActive(!isMilitaryActive)}
              >
                <span>{selectedMilitary}</span>
                <div className="traingle box-border w-[11px] h-[11px]">
                  <img
                    src={triangle}
                    alt="click to show military types"
                    className="src"
                  />
                </div>
              </div>
              {isMilitaryActive && (
                <div className="dropdown-content bg-slate-50 rounded-md absolute top-[45px] p-[15px] shadow-bx w-2/5 z-10 transition-all">
                  {military.map((option) => (
                    <div
                      role="tab"
                      tabIndex={0}
                      key={option}
                      id="military"
                      className="dropdown-item p-[10px] hover:bg-slate-100 z-10"
                      onClick={handleDropdown}
                      onKeyPress={handleDropdown}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

              <div
                role="tablist"
                tabIndex={0}
                className="dropdown-btn rounded-md absolute w-2/5 left-1/2 flex justify-between p-[10px] bg-[#fff] shadow-[3px_3px_10px_6px_rgba(0,0,0,0.06)] items-center"
                onClick={(e) => setRankActive(!isRankActive)}
                onKeyPress={(e) => setRankActive(!isRankActive)}
              >
                <span>{selectedRank}</span>
                <div className="traingle box-border w-[11px] h-[11px]">
                  <img
                    src={triangle}
                    alt="click to show rank types"
                    className="src"
                  />
                </div>
              </div>
              {isRankActive && (
                <div className="dropdown-content bg-slate-50 rounded-md absolute top-[45px] left-1/2 p-[15px] shadow-bx w-2/5 z-10">
                  {rank.map((option) => (
                    <div
                      role="tab"
                      tabIndex={0}
                      key={option}
                      id="rank"
                      className="dropdown-item p-[10px] hover:bg-slate-100"
                      onClick={handleDropdown}
                      onKeyPress={handleDropdown}
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
                onChange={(e) =>
                  setDetails({ ...details, enlistment: e.target.value })
                }
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
                onChange={(e) =>
                  setDetails({ ...details, discharge: e.target.value })
                }
              />
            </div>
            <div className="form-group-register" style={{ marginTop: "21rem" }}>
              <label
                htmlFor="profile-image-input"
                className="lnline-block w-[502px] h-[35px] bg-inherit border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors text-gray-400"
              >
                Profile Image
                {details.profileImage ? ": " : ""}
                <span className="italic">
                  {details.profileImage ? details.profileImage.name : ""}
                </span>
                <input
                  id="profile-image-input"
                  type="file"
                  name="profile-image"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    setDetails({ ...details, profileImage: e.target.files[0] });
                  }}
                />
              </label>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
