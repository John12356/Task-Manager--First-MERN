import React, { useState } from "react";
import "../App.css";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mainpage({ toast, signIn, user }) {
  const [users, setUsers] = useState({ userName: "", email: "", password: "" });
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/google`, "_self");
  };

  const fbAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/facebook`, "_self");
  };
  const openForgotPass = () => {
    navigate("/forgotpass");
  };

  function handleOnchange(e) {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  }

  function handleUserLogin(e) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }
  axios.defaults.withCredentials = true;
  const handleLogin = (e) => {
    e.preventDefault();
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("Enter the details");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, userLogin)
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          toast.success("Login successfully");
          user = false;
          navigate("/Home");
        } else {
          toast.error("Enter the correct details");
          setUserLogin({ email: "", password: "" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setUserLogin({ email: "", password: "" });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, users)
      .then((result) => {
        console.log(result);
        if (result.data !== "Already Registerd") {
          toast.success("Registered Successfully..");
          setUsers({ userName: "", email: "", password: "" });
          signIn();
        } else {
          toast.error(result.data);
          setUsers({ userName: "", email: "", password: "" });
          signIn();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="form-container sign-up">
        <form method="POST" action="/" onSubmit={(e) => handleRegister(e)}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Username"
            id="userName"
            name="userName"
            value={users.userName}
            onChange={(e) => handleOnchange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={users.email}
            onChange={(e) => handleOnchange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={users.password}
            onChange={(e) => handleOnchange(e)}
          />
          <button className="bt" type="submit">
            Sign Up
          </button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form method="POST" action="/" onSubmit={(e) => handleLogin(e)}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email and password</span>
          <input
            type="email"
            name="email"
            value={userLogin.email}
            onChange={(e) => handleUserLogin(e)}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={userLogin.password}
            onChange={(e) => handleUserLogin(e)}
            placeholder="Password"
          />
          <a onClick={openForgotPass} href="/forgotpass">
            Forget your password?
          </a>
          <button className="bt" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
