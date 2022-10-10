/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */

import React from "react";

function LandingPage({ user, Logout }) {
  console.log(user);
  return (
    <div>
      <nav className="bg-primary h-20 flex items-center justify-between">
        <h1 className="font-bold text-4xl ml-[45px]">이젠 돌아갈 때</h1>
        <button
          type="button"
          className="order-last mr-6 border-2 p-3 rounded-md"
          onClick={Logout}
        >
          Logout
        </button>
      </nav>
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-start h-[91.5vh] grow-0 w-[330px]">
          <h1 className="text-4xl font-bold mt-6">Welcome</h1>
          <h1 className="text-4xl font-bold">{user.name}</h1>
        </div>
        <div className="dashboard flex flex-row ml-10 bg-gray-200 w-screen">
          <div className="todoList bg-white w-3/12 ml-28 rounded-2xl mt-8 mb-8">
            <h1 className="text-4xl font-bold">ToDoList</h1>
          </div>
          <div className="calandar bg-white w-6/12 ml-28 rounded-2xl mt-8 mb-8">
            <h1 className="text-4xl font-bold">Calandar</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
