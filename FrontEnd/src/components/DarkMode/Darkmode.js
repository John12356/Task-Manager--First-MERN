import React from "react";
import { IoMdSunny, IoIosMoon } from "react-icons/io";
import "./darkmode.css";

const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const changeTheme = (e)=>{
    if(e.target.checked) setDarkMode();
    else setLightMode();
  }

  return (
    <div className="dark_mode">
      <input className="dark_mode_input" type="checkbox" id="darkmode-toggle" onChange={changeTheme} />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <IoMdSunny color="#d8860b" size={16} />
        <IoIosMoon color="black" size={16} />
      </label>
    </div>
  );
};

export default DarkMode;
