import React, { useState, useEffect, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/todo.css";

const Todo = ({ toast, todo, setTodo }) => {
  const [newItem, setNewItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  axios.defaults.withCredentials = true;

  const filteredItems = useMemo(() => {
    return todo.filter((eachItem) => {
      return eachItem.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [todo, searchQuery]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
    axios
      .get(`${process.env.REACT_APP_API_URL}/todo/getTodo`)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => console.log(err));
  }, [setTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newItem === "") {
      toast.error("Please type something");
      return;
    }
    const newTodoItem = {
      todoId: crypto.randomUUID(),
      title: newItem,
      status: false,
    };
    setTodo((current) => {
      return [...current, newTodoItem];
    });
    await axios
      .post(`${process.env.REACT_APP_API_URL}/todo/postTodo`, newTodoItem)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    toast.success("Added Successfully");
    setNewItem("");
  };

  function tickTodo(todoId, status) {
    setTodo((current) => {
      return current.map((todo) => {
        if (todo.todoId === todoId) {
          return { ...todo, status };
        }
        return todo;
      });
    });
    axios
      .patch(`${process.env.REACT_APP_API_URL}/todo/updateTodo/${todoId}`, {
        status: status,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    console.log(todo);
  }

  function deleteTodo(todoId) {
    axios.delete(`${process.env.REACT_APP_API_URL}/todo/deleteTodo/${todoId}`);
    setTodo((current) => {
      return current.filter((todo) => todo.todoId !== todoId);
    });
  }

  return (
    <div className="main-form" data-aos="zoom-in">
      <div className="search-bar">
        <h1>Todo's</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
        <button id="search-bt">
          <BiSearchAlt2 size={22} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form-row">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          className="todo-ip"
          placeholder="New Remainder"
        />
        <button id="add-todo">ADD </button>
      </form>
      <div className="item-list" data-aos="zoom-out">
        <ul>
          {todo.length === 0 && <h3 id="no-todo">No Remainders</h3>}
          {filteredItems.map((todo) => {
            return (
              <li key={todo.todoId}>
                <label htmlFor="" className="item-name">
                  <input
                    type="checkbox"
                    checked={todo.status}
                    onChange={(e) => tickTodo(todo.todoId, e.target.checked)}
                  />
                  {todo.title}
                </label>
                <button id="del-bt" onClick={() => deleteTodo(todo.todoId)}>
                  <AiFillDelete size={20} color="#FF6969" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
