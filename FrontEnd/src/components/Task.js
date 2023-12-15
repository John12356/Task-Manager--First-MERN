import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import "./styles/task.css";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";

const Task = ({ toast, tasks, setTasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState({
    taskName: "",
    priority: "",
    deadline: "",
  });

  axios.defaults.withCredentials = true;
  useEffect(() => {
    Aos.init({ duration: 1000 });
    axios
      .get(`${process.env.REACT_APP_API_URL}/task/getTask`)
      .then((res) => {
        let temp = res.data.filter((obj) => obj.done);
        setTasks(res.data);
        setCompletedTasks(temp);
      })
      .catch((err) => console.log(err));
  }, [setTasks]);

  function handleOnchange(e) {
    e.preventDefault();
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  const addTask = () => {
    if (task.taskName.trim() === "" || task.deadline === "") {
      toast.error("Please enter task and deadline");
      return;
    }
    const selectedDate = new Date(task.deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      toast.error("Please select a valid date");
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      task,
      done: false,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/task/postTask`, newTask)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks([...tasks, newTask]);
    toast.success("Added Successfully");
    setTask({ taskName: "", priority: "top", deadline: "" });
  };

  const addToComplete = (id) => {
    const updatedTasks = tasks.map((eachTask) =>
      eachTask.id === id ? { ...eachTask, done: true } : eachTask
    );
    setTasks(updatedTasks);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/task/updateTask/${id}`, {
        done: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const completed = tasks.find((eachTask) => eachTask.id === id);
    if (completed) setCompletedTasks([...completedTasks, completed]);
  };

  const removeTask = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/task/deleteTask/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks(tasks.filter((eachTask) => id !== eachTask.id));
    setCompletedTasks(completedTasks.filter((eachTask) => id !== eachTask.id));
  };

  const upcomingTasks = tasks.filter((eachTask) => !eachTask.done);

  const comingFilteredItems = useMemo(() => {
    return upcomingTasks.filter((eachItem) => {
      return eachItem.task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [upcomingTasks, searchQuery]);

  const comingCompletedItems = useMemo(() => {
    return completedTasks.filter((eachItem) => {
      return eachItem.task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, completedTasks]);

  return (
    <div className="home-body-conatiner" data-aos="zoom-in">
      <header className="search-bar">
        <h1>Task's</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
        <button id="search-bt">
          <BiSearchAlt2 size={22} />
        </button>
      </header>
      <div className="add-div">
        <input
          type="text"
          placeholder="Enter task"
          name="taskName"
          value={task.taskName || ""}
          onChange={(e) => handleOnchange(e)}
        />
        <select
          name="priority"
          placeholder="Select Priority"
          value={task.priority}
          onChange={(e) => handleOnchange(e)}
        >
          <option value="top">Top priority</option>
          <option value="average">Average priority</option>
          <option value="low">Low priority</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={(e) => handleOnchange(e)}
        />
        <button id="add-bt" onClick={addTask}>
          Add
        </button>
      </div>
      <main className="task-body" data-aos="zoom-out">
        <h3>current tasks</h3>
        <div className="cur-task-list" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>Prioriy</th>
                <th>deadline</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {comingFilteredItems.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    {!eachTask.done && (
                      <button
                        id="done-bt"
                        onClick={() => addToComplete(eachTask.id)}
                      >
                        done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Completed tasks</h3>
        <div className="completed-task" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>priority</th>
                <th>deadline</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {comingCompletedItems.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    <button
                      id="task-remove"
                      onClick={() => removeTask(eachTask.id)}
                    >
                      <AiFillDelete size={20} color="#FF6969" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Task;
