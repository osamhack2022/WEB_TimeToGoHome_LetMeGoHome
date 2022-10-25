import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "../calendar.css";
import dayjs from "dayjs";
import axios from "../utils/axios.util";

import AddTaskListImg from "../images/Add_1.png";
import AddTask from "../images/Add_2.png";
import TrashImg from "../images/Trash_1.png";
import AddTodo from "../images/AddList.png";
import EditBtnImg from "../images/Edit_fill.png";
import CheckBtnImg from "../images/Verified.png";

function LandingPage(props) {
  const { user, setUser, Logout } = props;
  const [todoLists, setTodolists] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date()); // 날짜 for calendar
  const [task, setTask] = useState({ id: "", content: "", datetime: "" }); // calendar에서 선택한 날짜의 task들을 저장하는 state
  const [taskList, setTaskList] = useState([]); // calendar에서 선택한 날짜의 task들을 저장하는 state

  // <-------------------axios get request-------------------->
  // getting todolists
  useEffect(() => {
    axios.get("/api/user/me").then((response) => {
      setUser({ ...response.data.payload });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    axios.get("/api/todo/me").then((response) => {
      setTodolists(response.data.payload);
      setCurrentList(response.data.payload[0]);
    });
  }, []);
  // getting tasks
  useEffect(() => {
    axios
      .get("/api/todo/task", {
        params: {
          todoId: currentList.id,
          date: dayjs(date).format("YYYY-MM-DD"),
        },
      })
      .then((response) => {
        setTaskList(response.data.payload);
      })
      .catch((err) => {});
  }, [currentList, date]);
  // <-------------------axios get request-------------------->

  const taskSubmitHandler = () => {
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
    if (inputTask) {
      setTask({
        ...task,
        content: inputTask,
        datetime: `${dayjs(date).format("YYYY-MM-DD")} ${time}`,
      });
    }
  }, [task, inputTask, date, time]);

  function handleAddTask(e) {
    e.preventDefault();

    if (!task.content || !inputTask) {
      // eslint-disable-next-line no-alert
      alert("할 일을 입력해주세요!");
      return;
    }
    const isTaskInList = taskList.some(
      (taskItem) =>
        taskItem.content.toLowerCase().replace(/\s/g, "") ===
        task.content.toLowerCase().replace(/\s/g, "")
    );
    if (isTaskInList) {
      // eslint-disable-next-line no-alert
      alert("이미 추가된 할 일입니다!");
      return;
    }
    taskSubmitHandler();
    document.getElementById("input_task").value = "";
    setTask({ id: "", content: "", datetime: "" });
    setTime("");
    document.getElementById("inputTaskModal").style.display = "none";
    document.getElementById("input_time").value = "";
  }

  useEffect(() => {
    if (editTask) {
      setTask({
        ...task,
        content: editTask,
        datetime: `${dayjs(date).format("YYYY-MM-DD")} ${time}`,
      });
    }
  }, [task, editTask, date, time]);

  function handleEditTask(e) {
    e.preventDefault();
    if (!editTask) {
      // eslint-disable-next-line no-alert
      alert("수정 할 일을 입력해주세요!");
      return;
    }
    const isTaskInList = taskList.some(
      (taskItem) =>
        taskItem.content.toLowerCase().replace(/\s/g, "") ===
          task.content.toLowerCase().replace(/\s/g, "") &&
        taskItem.datetime === task.datetime
    );
    if (isTaskInList) {
      // eslint-disable-next-line no-alert
      alert("이미 추가된 할 일입니다!");
      return;
    }
    const newTaskList = taskList;
    for (let i = 0; i < Object.keys(newTaskList).length; i += 1) {
      if (newTaskList[i].id === task.id) {
        newTaskList[i].content = task.content;
        newTaskList[i].datetime = task.datetime;
      }
    }
    setTaskList(newTaskList);
    document.getElementById("editTaskModal").style.display = "none";
  }

  function deleteTask(id) {
    const newTaskList = taskList.filter((TASK, i) => TASK.id !== id);
    setTaskList(newTaskList);
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
                className="flex flex-row items-center justify-center bg-white rounded-md mt-2 focus:border-b-2 focus:bg-primary focus:text-white"
                key={option.id}
                type="button"
                id={option.id}
                onClick={() => setCurrentList(option)}
              >
                <label
                  className="lg:text-2xl md:text-xl sm:text-base text-sm font-StrongAFBold focus:border-slate-500 hover:border-b-2 hover:border-slate-800 cursor-pointer"
                  htmlFor={option.id}
                >
                  {option.goal}
                </label>
              </button>
            ))}
          </div>
          <div
            id="addTodoListButton"
            className="flex flex-row content-between basis-1/6"
          >
            <button
              id="add-todolist-btn"
              type="button"
              className="flex flex-row items-center justify-center w-[80%] h-[50px] bg-white rounded-md mt-2"
            >
              <img
                src={AddTodo}
                alt="add-todolist"
                className="w-12 h-12 mr-2 mb-8"
              />
              <b
                htmlFor="add-todolist-btn"
                className="lg:text-2xl md:text-xl sm:text-base text-sm font-StrongAFBold hover:border-b-2 hover:border-slate-800 cursor-pointer"
              >
                TODOLIST 추가
              </b>
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
            <div
              id="tasklist"
              className="flex flex-col justify-center shrink-0 overflow-y-auto grow-0"
            >
              {taskList.map((option) => (
                <div key={option.id} className="form-check hover:bg-slate-200">
                  <input
                    className="form-check-input peer ml-3 h-6 w-6 border border-gray-300 rounded-sm focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    value=""
                    id={`task${option.id}`}
                    onClick={(e) => {
                      // eslint-disable-next-line no-param-reassign
                      option.is_done = e.target.checked;
                    }}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 xl:text-2xl text-xl font-StrongAF peer-checked:line-through peer-checked:text-gray-400"
                    htmlFor={`task${option.id}`}
                  >
                    {option.content}
                  </label>
                  <div className="ml-3 peer-checked:text-gray-400">
                    <label
                      className="font-StrongAF"
                      htmlFor={`task${option.id}`}
                    >
                      {dayjs(option.datetime).format("YYYY-MM-DD HH:mm")}
                    </label>
                    <button
                      type="button"
                      className="float-right mr-3"
                      onClick={() => deleteTask(option.id)}
                    >
                      <img
                        src={TrashImg}
                        alt="trash"
                        className="w-6 h-6 mt-auto"
                      />
                    </button>
                    <button
                      type="button"
                      className="float-right mr-3"
                      onClick={() => {
                        document.getElementById("editTaskModal").style.display =
                          "block";
                        setTask({
                          ...task,
                          id: option.id,
                          content: option.content,
                          datetime: option.datetime,
                        });
                        setEditTask(option.content);
                        document.getElementById("input_task_edit").value =
                          option.content;
                        document.getElementById("edit_time").value = dayjs(
                          option.datetime
                        ).format("HH:mm");
                      }}
                    >
                      <img
                        src={EditBtnImg}
                        alt="trash"
                        className="w-6 h-6 mt-auto"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute createButton flex justify-end order-last top-[calc(100%-70px)] right-[10px] w-full">
              <button
                type="button"
                className=""
                onClick={(e) => {
                  document.getElementById("inputTaskModal").style.display =
                    "block";
                }}
              >
                <img src={AddTaskListImg} alt="AddTask" />
              </button>
            </div>

            {/* Task 작성 모달창 */}
            <div
              id="inputTaskModal"
              className="modal bg-gray-700/30 hidden h-full overflow-auto fixed top-0 left-0 w-full z-10"
            >
              <div
                className="modal-content bg-white border-solid mx-auto p-5 mt-[10%] 
              mb-[15%] border-0 w-5/12 h-5/12 flex flex-col rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
              >
                <div className="flex flex-row items-center">
                  <h2 className="grow font-StrongAFBold text-3xl ml-5">
                    Task 추가
                  </h2>
                  <button
                    className="order-last"
                    type="button"
                    onClick={(e) => {
                      document.getElementById("inputTaskModal").style.display =
                        "none";
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
                        setInputTask(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      id="input_time"
                      className="w-4/6 h-12 border-2 border-gray-300 rounded-lg mt-5 p-5 font-StrongAF"
                      type="text"
                      placeholder="시간을 정해주세요!"
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                      onFocus={(e) => {
                        e.target.type = "time";
                      }}
                      onBlur={(e) => {
                        e.target.type = "text";
                      }}
                    />
                  </div>
                  <button
                    id="addTaskBtn"
                    type="button"
                    className="mx-auto w-[60px] h-[60px] mt-16"
                    onClick={handleAddTask}
                  >
                    <img src={AddTask} alt="Addtask" />
                  </button>
                </div>
              </div>
            </div>

            {/* Task 수정 모달창 */}
            <div
              id="editTaskModal"
              className="modal bg-gray-700/30 hidden h-full overflow-auto fixed top-0 left-0 w-full z-10"
            >
              <div
                className="modal-content bg-white border-solid mx-auto p-5 mt-[10%] 
              mb-[15%] border-0 w-5/12 h-5/12 flex flex-col rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
              >
                <div className="flex flex-row items-center">
                  <h2 className="grow font-StrongAFBold text-3xl ml-5">
                    Task 수정
                  </h2>
                  <button
                    className="order-last"
                    type="button"
                    onClick={(e) => {
                      document.getElementById("editTaskModal").style.display =
                        "none";
                    }}
                  >
                    <span className="close">&times;</span>
                  </button>
                </div>
                <div className="flex flex-col mt-12">
                  <span className="text-xl mx-auto font-semibold font-StrongAF">
                    당신의 할 일을 수정하세요!
                  </span>
                  <div className="flex justify-center">
                    <input
                      id="input_task_edit"
                      className="w-4/6 h-12 border-2 border-gray-300 rounded-lg mt-5 p-5 font-StrongAF"
                      type="text"
                      placeholder="ex) 운동하기"
                      onChange={(e) => {
                        setEditTask(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      id="edit_time"
                      className="w-4/6 h-12 border-2 border-gray-300 rounded-lg mt-5 p-5 font-StrongAF"
                      type="text"
                      placeholder="시간을 정해주세요!"
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                      onFocus={(e) => {
                        e.target.type = "time";
                      }}
                      onBlur={(e) => {
                        e.target.type = "text";
                      }}
                    />
                  </div>
                  <button
                    id="editTaskBtn"
                    type="button"
                    className="mx-auto mt-16"
                    onClick={handleEditTask}
                  >
                    <img
                      src={CheckBtnImg}
                      className="w-[35px] h-[35px]"
                      alt="Addtask"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="calendar"
            className="bg-white w-6/12 ml-14 rounded-t-2xl rounded-2xl mt-8 mb-8 mr-8"
          >
            <Calendar
              className="border-0"
              onChange={(Date) => setDate(Date)}
              value={date}
              formatDay={(locale, Date) => Date.getDate()} // remove '일' from day
              formatMonth={(locale, Date) => Date.getMonth() + 1} // remove '월' from month
            />
          </div>
        </div>
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    armyType: PropTypes.string.isRequired,
    armyRank: PropTypes.string.isRequired,
    enlistment: PropTypes.string.isRequired,
    discharge: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  Logout: PropTypes.func.isRequired,
};

export default LandingPage;
