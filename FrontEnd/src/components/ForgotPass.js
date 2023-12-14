import React, { useState } from "react";
import "./styles/forgotpass.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPass = ({ toast }) => {
  const [email, setEmail] = useState();
  // const navigate = useNavigate();
  // axios.defaults.withCredentials = true;
  const getNewPassLink = (e) => {
    console.log(email);
    axios
      .post("http://localhost:8080/forgotpass", { email })
      .then((res) => {
        if (res.data.Status === "success") {
          toast.success("Check your email for reset link");
        } else {
          setEmail("");
          toast.error("Enter the registered email");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="forgot-con">
        <h3>Forgot Your password?</h3>
        <h3>Just relax!</h3>
        <label htmlFor="email">Enter your registered email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" Email"
        />
        <button onClick={getNewPassLink}>submit</button>
      </div>
    </>
  );
};

export default ForgotPass;
