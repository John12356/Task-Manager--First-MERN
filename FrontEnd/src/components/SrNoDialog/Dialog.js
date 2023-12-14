import React from "react";
import "./dialog.css";

const Dialog = ({ areYouSure }) => {
  return (
    <div className="dialog-div" onClick={(e) => e.stopPropagation()}>
      <h3 className="dialog-text">Are you sure want to delete?</h3>
      <div className="dialog-btn">
        <button onClick={() => areYouSure(true)} className="dialog-bt">
          Yes
        </button>
        <button onClick={() => areYouSure(false)} className="dialog-bt">
          No
        </button>
      </div>
    </div>
  );
};

export default Dialog;
