/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */


import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "../calendar.css";

import AddTaskListImg from "../images/Add_1.png";
import AddTodo from "../images/Add_2.png";
import TrashImg from "../images/Trash_1.png";
import AddListImg from "../images/AddList.png";

function LandingPage({ user, Logout }) {
  const [todoLists, setTodolists] = useState(["3대350", "3대400"]);
  const [inputTodo, setInput] = useState("");
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState({ id: "", content: "", datetime: "" });
  const locale = "en-US"; // en-US, ko-KR, ja-JP, zh-CN, zh-TW
  const [taskList, setTaskList] = useState([
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

  useEffect(() => {
    axios.get("/api/todo/me").then((response) => {
      console.log(response);
      setTodolists(response.data.payload);
    });
  }, []);

  const submitHandler = () => {
    setTaskList([
      ...taskList,
      {
        id: taskList.length + 1,
        content: task.content,
        datetime: task.datetime,
        is_done: false,
      },
    ]);
  };

  useEffect(() => {
    if (inputTodo) {
      setTask({ ...task, content: inputTodo });
    }
    console.log(inputTodo);
  }, [inputTodo]);

  function handleAddTask(e) {
    e.preventDefault();

    if (!task.content) {
      // eslint-disable-next-line no-alert
      alert("할 일을 입력해주세요!");
      return;
    }
    const isTodoInList = taskList.some(
      (taskItem) =>
        taskItem.content.toLowerCase().replace(/\s/g, "") ===
        task.content.toLowerCase().replace(/\s/g, "")
    );
    if (isTodoInList) {
      // eslint-disable-next-line no-alert
      alert("이미 추가된 할 일입니다!");
      return;
    }

    submitHandler();
    document.getElementById("input_task").value = "";
    setTask({ id: "", content: "", datetime: "" });
    document.getElementById("myModal").style.display = "none";
  }
  function deleteTodoList(id) {
    const newTodoList = taskList.filter((TASK, i) => TASK.id !== id);
    setTaskList(newTodoList);
  }

  return (
    <div>
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
        <div className="flex flex-col items-center justify-center h-[91.5vh] w-[17%] bg-white">
          <h1 className="xl:text-4xl md:text-2xl text-xl font-StrongAF mt-6">
            강력한
          </h1>
          <h1 className="xl:text-4xl md:text-2xl text-xl font-StrongAF">
            {user.name}
          </h1>
          <div className="grow flex flex-col justify-center w-full">
            {todoLists.map((option) => (
              <button
                className="flex flex-row items-center justify-center w-full h-[50px] bg-white rounded-md mt-2"
                key={option.id}
                type="button"
                id="todolist-btn"
              >
                <label
                  className="lg:text-2xl md:text-xl sm:text-base text-sm font-StrongAFBold hover:border-b-2 hover:border-slate-800 cursor-pointer"
                  htmlFor="todolist-btn"
                >
                  {option.goal}
                </label>
              </button>
            ))}
          </div>
          <div id="addTodoListButton" className="flex flex-row content-between basis-1/6">
            <button
              type="button"
              className="flex flex-row items-center justify-center w-[80%] h-[50px] bg-white rounded-md mt-2"
              id="add-todolist-btn"
            >
              <img
                src={AddListImg}
                alt="add-todolist"
                className="w-12 h-12 mr-2 mb-8"
              />
              <label
                className="lg:text-2xl md:text-xl sm:text-base text-sm font-StrongAFBold hover:border-b-2 hover:border-slate-800 cursor-pointer"
                htmlFor="add-todolist-btn"
              >
                TODOLIST 추가
              </label>
            </button>
          </div>
        </div>

        <div className="dashboard flex flex-row bg-gray-200 w-screen">
          <div className="relative taskList bg-white w-5/12 ml-14 rounded-2xl flex flex-col mt-8 mb-8 content-between">
            <nav className="bg-primary h-[3rem] rounded-t-2xl flex items-center justify-center">
              <h1 className="xl:text-xl md:text-lg text-base text-white font-StrongAFBold">
                {dayjs(date).format("MM월 DD일")}
              </h1>
            </nav>
            <div id="tasklist" className="flex flex-col justify-center shrink-0 overflow-y-auto grow-0">
              {taskList.map((option) => (
                <div key={option.id} className="form-check hover:bg-slate-200">
                  <input
                    className="form-check-input ml-3 appearance-none h-6 w-6 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    value=""
                    id={option.id}
                    onClick={(e) => {
                      e.target.checked
                        ? (option.is_done = true)
                        : (option.is_done = false);
                    }}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 xl:text-2xl text-xl font-StrongAF"
                    htmlFor={option.id}
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
                <img src={AddTaskListImg} alt="AddTodoList" />
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
                  <h2 className="grow font-StrongAFBold text-3xl ml-5">
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
                  <span className="text-xl mx-auto font-semibold font-StrongAF">
                    당신의 할 일을 추가하세요!
                  </span>
                  <div className="flex justify-center">
                    <input
                      id="input_task"
                      className="w-4/6 h-12 border-2 border-gray-300 rounded-lg mt-5 p-5 font-StrongAF"
                      type="text"
                      placeholder="ex) 운동하기"
                      onChange={(e) => {
                        setInput(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="mx-auto w-[60px] h-[60px] mt-16"
                    onClick={handleAddTask}
                  >
                    <img src={AddTodo} alt="Addtask" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="calendar" className="bg-white w-6/12 ml-14 rounded-t-2xl rounded-2xl mt-8 mb-8 mr-8">
            {/* <nav className="bg-primary h-12 rounded-t-2xl flex items-center justify-center font-['Lato']">
              <h1 className="xl:text-2xl md:text-xl text-lg text-white font-bold">
                {dayjs(date).format("YYYY년 MM월 DD일")}
              </h1>
            </nav> */}
            <Calendar
              className="border-0"
              onChange={(Date) => setDate(Date)}
              value={date}
              formatDay={(locale, date) => date.getDate()} // remove '일' from day
              formatMonth={(locale, date) => date.getMonth() + 1} // remove '월' from month
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
