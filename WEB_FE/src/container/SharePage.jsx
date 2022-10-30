import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import dayjs from "dayjs";

import CheckBtnImg from "../images/Verified.png";
import CloneImg from "../images/clone.png";

function SharePage({ user, Logout }) {
  axios.defaults.headers.common["x-access-token"] =
    localStorage.getItem("token"); // setting token to axios header
  const [hashtagList, setHashtagList] = useState([]);
  const [shareLists, setShareLists] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [share, setShare] = useState({
    id: undefined,
    start: "",
  });

  useEffect(() => {
    axios.get("/api/share/tags").then((res) => {
      setHashtagList(["", ...res.data.payload]);
    });
    axios.get("/api/share").then((res) => {
      setShareLists([...res.data.payload]);
    });
  }, []);

  useEffect(() => {
    axios
      .get("/api/share", {
        params: {
          tag: hashtag,
        },
      })
      .then((res) => {
        setShareLists([...res.data.payload]);
      });
  }, [hashtag]);

  const handleCloneShare = () => {
    if (share.id === undefined) {
      // eslint-disable-next-line no-alert
      alert("시작일을 입력하세요.");
      return;
    }
    axios
      .post("/api/todo/clone", {
        id: share.id,
        start: share.start,
      })
      .then((res) => {});
    document.getElementById("input_start_time").value = "";
    document.getElementById("CloneModal").style.display = "none";
  };

  return (
    <div className="w-full h-full font-StrongAF">
      <nav className="bg-primary w-full h-20 flex items-center justify-between">
        <h1 className="font-StrongAFBold text-4xl ml-[45px] text-white">
          <a href="./">이젠 돌아갈 때</a>
        </h1>
        <button
          type="button"
          className="order-last mr-6 border-2 p-3 rounded-md"
          onClick={Logout}
        >
          <span className="text-white font-StrongAF">Logout</span>
        </button>
      </nav>
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-start lg:text-3xl md:text-2xl sm:text-base h-full w-[17%] bg-white">
          {hashtagList.map((tag) => (
            <div
              className={`w-full mt-3 ${
                hashtag === tag ? "bg-primary text-white" : ""
              }`}
            >
              <button
                type="button"
                className="w-full h-fit py-2"
                onClick={(e) => {
                  setHashtag(tag);
                }}
              >
                <span className="mr-1 p-3">
                  # {tag !== "" ? tag : "전체보기"}
                </span>
              </button>
            </div>
          ))}
        </div>
        <div name="dashboard" className="bg-gray-200 w-full h-fit min-h-screen">
          {/* title, description, hashtag, image */}
          <div className="mx-5 overflow-y-auto">
            {shareLists.map((todo) => (
              <div className="mx-auto my-5 max-w-[1200px]">
                <div>
                  <img
                    className="object-cover"
                    src={todo.image}
                    alt="shareImage"
                  />
                </div>
                <div className="bg-white w-full h-fit p-3">
                  <div>
                    <span className="p-5 lg:text-3xl md:text-2xl sm:text-xl text-base">
                      {todo.title}
                    </span>
                  </div>
                  <div>
                    <span className="p-5 lg:text-2xl md:text-xl sm:text-base text-sm">
                      {todo.description}
                    </span>
                  </div>
                  <div>
                    <span className="p-5 text-l text-gray-600">
                      {dayjs(todo.postTime).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
                    <button
                      id="addTodoBtn"
                      type="button"
                      className="mx-auto w-8 h-8 float-right"
                      onClick={() => {
                        document.getElementById("CloneModal").style.display =
                          "block";
                      }}
                    >
                      <img src={CloneImg} alt="cloneImg" />
                    </button>
                  </div>
                </div>
                <div
                  id="CloneModal"
                  className="modal bg-gray-700/30 hidden h-full overflow-auto fixed top-0 left-0 w-full z-10"
                >
                  <div
                    className="modal-content bg-white border-solid mx-auto p-5 mt-[10%] 
              mb-[15%] border-0 w-5/12 h-5/12 flex flex-col rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                  >
                    <div className="flex flex-row items-center">
                      <h2 className="grow font-StrongAFBold text-3xl ml-5">
                        TODOLIST 복사
                      </h2>
                      <button
                        className="order-last"
                        type="button"
                        onClick={(e) => {
                          document.getElementById("input_start_time").value =
                            "";
                          document.getElementById("CloneModal").style.display =
                            "none";
                        }}
                      >
                        <span className="close">X</span>
                      </button>
                    </div>
                    <div className="flex flex-col mt-12">
                      <span className="text-xl mx-auto font-semibold font-StrongAF">
                        TODOLIST를 복사하시겠습니까?
                      </span>
                      <div className="flex justify-center">
                        <input
                          id="input_start_time"
                          type="text"
                          className="w-[502px] h-[35px] border-b focus:outline-0 border-slate-400 focus:border-slate-600 hover:border-slate-600 hover:transition-colors"
                          name="설정일"
                          placeholder="시작일"
                          onFocus={(e) => {
                            e.target.type = "date";
                            e.target.max = "9999-12-31";
                            e.target.min = "2010-01-01";
                          }}
                          onBlur={(e) => {
                            e.target.type = "text";
                          }}
                          onChange={(e) => {
                            setShare({
                              ...share,
                              id: todo.todoId,
                              start: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <button
                        id="addTodoBtn"
                        type="button"
                        className="mx-auto w-[60px] h-[60px] mt-16"
                        onClick={handleCloneShare}
                      >
                        <img src={CloneImg} alt="Addtask" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

SharePage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    armyType: PropTypes.string.isRequired,
    armyRank: PropTypes.string.isRequired,
    enlistment: PropTypes.string.isRequired,
    discharge: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  Logout: PropTypes.func.isRequired,
};

export default SharePage;
