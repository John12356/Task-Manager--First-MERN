import React, { useEffect } from "react";
import "./notification.css";
import Aos from "aos";
import "aos/dist/aos.css";

const Notification = ({ closeNotifi, upcomingTasks }) => {
  console.log(upcomingTasks);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div
      className="not-div"
      data-aos="zoom-in"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="not-header">
        <h3>Today's Tasks</h3>
        <button onClick={closeNotifi}>X</button>
      </div>
      <div className="not-items">
        {upcomingTasks.length === 0 && (
          <h4 id="no-tasks">No Tasks for Today</h4>
        )}

        {upcomingTasks.map((eachTask) => (
          <div key={eachTask.id} className="not-each-item">
            <h4>{eachTask.task.taskName}</h4>
            <h4>Priority : {eachTask.task.priority}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
