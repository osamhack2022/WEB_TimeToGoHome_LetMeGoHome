import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function SharePage({ user, Logout }) {
  axios.defaults.headers.common["x-access-token"] =
    localStorage.getItem("token"); // setting token to axios header
  const [hashtagList, setHashtagList] = useState([]);
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
    <div className="w-full h-full font-StrongAF">
      <nav className="bg-primary w-full h-20 flex items-center justify-between">
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
        <div className="flex flex-col items-center justify-start text-2xl h-full w-[17%] bg-white">
          {hashtagList.map((tag) => (
            <div className="w-full">
              <button
                type="button"
                className="w-full h-20"
                onClick={() => {
                  setHashtag(tag);
                }}
              >
                <span className="mr-1 p-3"># {tag}</span>
              </button>
            </div>
          ))}
        </div>
        <div name="dashboard" className="bg-gray-200 w-full h-fit min-h-screen">
          {/* title, description, hashtag, image */}
          <div className="mx-5 overflow-y-auto">
            {todoLists.map((todo) => (
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
                    <span className="p-5 text-2xl">{todo.title}</span>
                  </div>
                  <div>
                    <span className="p-5 text-xl">{todo.description}</span>
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
