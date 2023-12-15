import Toggler from "./components/Toggler";
import Task from "./components/Task";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Todo from "./components/Todo";
import Dashboard from "./components/Dashboard";
import Notes from "./components/Notes";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [todo, setTodo] = useState([]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Toggler toast={toast} />}></Route>
        <Route path="/ForgotPass" element={<ForgotPass toast={toast} />} />
        <Route
          path="/ResetPass/:id/:token"
          element={<ResetPass toast={toast} />}
        />
        <Route path="/Home" element={<Home tasks={tasks} />}>
          <Route
            index
            element={
              <Dashboard
                notes={notes}
                setNotes={setNotes}
                tasks={tasks}
                setTasks={setTasks}
                todo={todo}
                setTodo={setTodo}
              />
            }
          />
          <Route
            path="/Home/todos"
            element={<Todo toast={toast} todo={todo} setTodo={setTodo} />}
          />
          <Route
            path="/Home/notes"
            element={<Notes notes={notes} setNotes={setNotes} toast={toast} />}
          />
          <Route
            path="/Home/task"
            element={<Task toast={toast} tasks={tasks} setTasks={setTasks} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
