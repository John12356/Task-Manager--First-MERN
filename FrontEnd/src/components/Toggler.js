import React, { useState } from "react";
import Mainpage from "./Mainpage";
import "../App.css";

export default function Toggler({ toast }) {
  const [isActive, setIsActive] = useState(false);

  const signUp = () => {
    setIsActive(true);
  };
  const signIn = () => {
    setIsActive(false);
  };

  return (
    <div className="whole">
      <h1 id="body-head">Task manager</h1>
      <div className={`container${isActive ? " active" : ""}`} id="container">
        <Mainpage toast={toast} signIn={signIn} />
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel left">
              <h1>Welcome back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden bt" id="login" onClick={signIn}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel right">
              <h1>Hello There!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hidden bt" id="egister" onClick={signUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
