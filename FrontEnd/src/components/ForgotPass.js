import React, { useState } from "react";
import "./styles/forgotpass.css";
import axios from "axios";

const ForgotPass = ({ toast }) => {
  const [email, setEmail] = useState();
  axios.defaults.withCredentials = true;
  const getNewPassLink = (e) => {
    console.log(email);
    axios
      .post(`${process.env.REACT_APP_API_URL}/forgotpass`, { email })
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
