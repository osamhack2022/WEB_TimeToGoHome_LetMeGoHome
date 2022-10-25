/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";

import bg from "../images/bg.jpg";

function SharePage({ user, Logout }) {
  axios.defaults.headers.common["x-access-token"] =
    localStorage.getItem("token"); // setting token to axios header
  const [hashtagList, setHashtagList] = useState([
    "운동",
    "자격증",
    "공부",
    "음악",
  ]);
  const [todoLists, setTodoLists] = useState([]);
  const [hashtag, setHashtag] = useState("");
  useEffect(() => {
    axios.get("/api/share/tags").then((res) => {
      setHashtagList([...res.data.payload]);
    });
    axios.get("/api/share").then((res) => {
      setTodoLists([...res.data.payload]);
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
        setTodoLists([...res.data.payload]);
      });
  }, [hashtag]);

  return (
    <div className="w-[100vw] h-[100vh] font-StrongAF">
      <nav className="bg-primary h-20 flex items-center justify-between">
        <h1 className="font-StrongAFBold xl:text-4xl md:text-2xl text-xl ml-[45px] text-white">
          이젠 돌아갈 때
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
        <div className="flex flex-col items-center justify-start text-2xl h-[91.5vh] w-[17%] bg-white">
          {hashtagList.map((tag) => (
            <div className="w-full flex justify-center">
              <button
                type="button"
                className="w-full h-20 flex justify-center items-center"
                onClick={() => {
                  setHashtag(tag);
                }}
              >
                <span className="mr-1 p-3"># {tag}</span>
              </button>
            </div>
          ))}
        </div>
        <div className="dashboard flex flex-row bg-gray-200 w-screen h-screen">
          {/* title, description, hashtag, image */}
          <div className="flex flex-col items-center text-2xl mx-auto">
            {todoLists.map((todo) => (
              <div>
                <div>
                  <img
                    className="pb-[30px] px-[300px]"
                    src={todo.image}
                    alt="shareImage"
                  />
                </div>
                <div className="bg-white flex flex-row justify-between  w-[840px] h-[100px]">
                  <div>
                    <span className="p-5">{todo.title}</span>
                  </div>
                  <div>
                    <span className="p-5">{todo.description}</span>
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

export default SharePage;
