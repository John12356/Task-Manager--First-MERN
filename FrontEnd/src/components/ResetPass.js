import React, { useState } from "react";
import "./styles/forgotpass.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPass = ({ toast }) => {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  function resetPass(e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/resetPassword/${id}/${token}`, {
        newPassword,
      })
      .then((res) => {
        if (res.data.Status === "success") {
          toast.success("Password updated successfully");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="forgot-con">
      <h3>reset password</h3>
      <label htmlFor="new pass">Enter your new password</label>
      <input
        type="password"
        name=""
        placeholder="Password"
        id=""
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={resetPass}>submit</button>
    </div>
  );
};

export default ResetPass;
