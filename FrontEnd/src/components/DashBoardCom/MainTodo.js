import React, { useEffect } from "react";
import { FaHandPointDown } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

const MainTodo = ({ todo, setTodo }) => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/todo/getTodo`)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => console.log(err));
  }, [setTodo]);

  return (
    <div className="dash-todo-con">
      <div className=" todo-scroll">
        <div className="content-todo scroller-inner">
          <div className="scroller-con">
            <div className="dots">
              <p id="one"></p>
              <p id="two"></p>
              <p id="three"></p>
            </div>
            <span id="scroller-con-col">" Efficiency at Your Fingertips."</span>
            <br />
            <br />
            Welcome to Todo, your go-to todo app for seamless task management.
          </div>
          <div className="scroller-con">
            <div className="dots">
              <p id="one"></p>
              <p id="two"></p>
              <p id="three"></p>
            </div>
            User friendly interface.
            <br />
            <br />
            Dive into productivity in a minute.
          </div>
          <div className="scroller-con">
            <div className="dots">
              <p id="one"></p>
              <p id="two"></p>
              <p id="three"></p>
            </div>
            Add, Edit and Delete your tasks effortlessly.
            <br />
            <br />
            <span id="scroller-con-col">" Anytime, Anywhere Access." </span>
          </div>
          <div className="scroller-con">
            <div className="dots">
              <p id="one"></p>
              <p id="two"></p>
              <p id="three"></p>
            </div>
            Robust encryptoin measures.
            <br />
            <br />
            <span id="scroller-con-col">
              " Your task todo's in safe hands."
            </span>
          </div>
          <div className="scroller-con">
            <div className="dots">
              <p id="one"></p>
              <p id="two"></p>
              <p id="three"></p>
            </div>
            <span id="scroller-con-col">ThemeOptions.</span> <br />
            <br />
            Minimalist layout and user friendly navigations.
          </div>
          <div className="scroller-con">
            <div className="dots">
              <p id="one"></p>
              <p id="two"></p>
              <p id="three"></p>
            </div>
            Some of your readonly Todo's...
            <br />
            <br />
            <FaHandPointDown size={30} style={{ marginLeft: "45%" }} />
          </div>
        </div>
      </div>
      <ul id="lists">
        {todo.length === 0 && <h3 id="no-todo">No Remainders</h3>}
        {todo.map((todo) => {
          return (
            <li key={todo.todoId}>
              <label htmlFor="" className="item-name">
                <input type="checkbox" checked={todo.status} readOnly />
                {todo.title}
              </label>
              <button id="del-bt">
                <AiFillDelete size={20} color="#FF6969" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainTodo;
