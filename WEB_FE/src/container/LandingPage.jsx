/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import AddTodoListImg from "../images/Add_1.png";
import AddTodo from "../images/Add_2.png";
import TrashImg from "../images/Trash_1.png";

function LandingPage({ user, Logout }) {
  console.log(user);
  const [todo, setTodo] = useState({ id: "", content: "", datetime: "" });
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      content: "덤벨 프레스 5set",
      datetime: "2021-08-01 12:00",
      is_done: false,
    },
    {
      id: 2,
      content: "벤치 프레스 12set",
      datetime: "2021-08-01 13:00",
      is_done: false,
    },
    {
      id: 3,
      content: "덤벨 플라이 5set",
      datetime: "2021-08-01 14:00",
      is_done: false,
    },
  ]);

  const submitHandler = () => {
    
    setTodoList([
      ...todoList,
      {
        id: todoList.length + 1,
        content: todo.content,
        datetime: todo.datetime,
        is_done: false,
      },
    ]);
  }

  function deleteTodoList(id) {
    const newTodoList = todoList.filter((todo, i) => todo.id !== id);
    setTodoList(newTodoList);
  }

 
  return (
    <div>
      <nav className="bg-primary h-20 flex items-center justify-between">
        <h1 className="font-bold text-4xl ml-[45px] text-white">
          이젠 돌아갈 때
        </h1>
        <button
          type="button"
          className="order-last mr-6 border-2 p-3 rounded-md"
          onClick={Logout}
        >
          <span className="text-white">Logout</span>
        </button>
      </nav>
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-start h-[91.5vh] grow-0 w-[330px]">
          <h1 className="text-4xl font-bold mt-6">Welcome</h1>
          <h1 className="text-4xl font-bold">{user.name}</h1>
        </div>

        <div className="dashboard flex flex-row ml-10 bg-gray-200 w-screen">
          <div className="relative todoList bg-white w-3/12 ml-28 rounded-2xl flex flex-col mt-8 mb-8 content-between">
            <nav className="bg-primary h-12 rounded-t-2xl flex items-center justify-center">
              <h1 className="text-2xl font-bold text-white">10월11일</h1>
            </nav>
            <div className="flex flex-col justify-center">
              {todoList.map((option) => (
                <div key={option.id} className="form-check hover:bg-slate-200">
                  <input
                    className="form-check-input ml-3 appearance-none h-6 w-6 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onClick={(e) => {
                      e.target.checked
                        ? (option.is_done = true)
                        : (option.is_done = false);
                    }}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 text-2xl"
                    htmlFor="flexCheckDefault"
                  >
                    {option.content}
                  </label>
                  <button
                    type="button"
                    className="float-right mr-3 mt-1"
                    onClick={() => deleteTodoList(option.id)}
                  >
                    <img
                      src={TrashImg}
                      alt="trash"
                      className="w-6 h-6 mt-auto"
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="absolute createButton flex justify-end order-last top-[calc(100%-70px)] right-[10px] w-full">
              <button
                type="button"
                className=""
                onClick={(e) => {
                  document.getElementById("myModal").style.display = "block";
                }}
              >
                <img src={AddTodoListImg} alt="AddTodoList" />
              </button>
            </div>

            <div
              id="myModal"
              className="modal bg-gray-700/30 hidden h-full overflow-auto fixed top-0 left-0 w-full z-10"
            >
              <div
                className="modal-content bg-white border-solid mx-auto p-5 mt-[10%] 
              mb-[15%] border-0 w-5/12 h-5/12 flex flex-col rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
              >
                <div className="flex flex-row items-center">
                  <h2 className="grow font-semibold text-3xl ml-5">
                    TODO-LIST 추가
                  </h2>
                  <button
                    className="order-last"
                    type="button"
                    onClick={(e) => {
                      document.getElementById("myModal").style.display = "none";
                    }}
                  >
                    <span className="close">&times;</span>
                  </button>
                </div>
                <div className="flex flex-col mt-12">
                  <span className="text-xl mx-auto font-semibold font-['Inter']">
                    당신의 할 일을 추가하세요!
                  </span>
                  <div className="flex justify-center">
                    <input
                      id="input_todo"
                      className="w-4/6 h-12 border-2 border-gray-300 rounded-lg mt-5 p-5"
                      type="text"
                      placeholder="ex) 운동하기"
                    />
                  </div>
                  <button
                    type="button"
                    className="mx-auto w-[60px] h-[60px] mt-16"
                    onClick={(e) => {
                      setTodo({
                        content: document.getElementById("input_todo").value,
                        datetime: new Date(),
                        is_done: false,
                      });
                      // need fixing

                      if (todo.content === "") {
                        // eslint-disable-next-line no-alert
                        alert("할 일을 입력해주세요!");
                        return;
                      }
                      // check if the todo is already in the list ignore space and case sensitivity and space between words
                      const isTodoInList = todoList.some(
                        (todoItem) =>
                          todoItem.content
                            .toLowerCase()
                            .replace(/\s/g, "") ===
                          todo.content.toLowerCase().replace(/\s/g, "")
                      );
                      if (isTodoInList) {
                        // eslint-disable-next-line no-alert
                        alert("이미 추가된 할 일입니다!");
                        return;
                      }
                      
                      submitHandler();
                      document.getElementById("input_todo").value = "";
                      document.getElementById("myModal").style.display = "none";
                    }}
                  >
                    <img src={AddTodo} alt="Addtodo" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="calandar bg-white w-6/12 ml-28 rounded-2xl mt-8 mb-8">
            <nav className="bg-primary h-12 rounded-t-2xl flex items-center justify-center font-['Lato']">
              <h1 className="text-2xl font-bold text-white">2022년 10월</h1>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
