import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progress, color }) => {
   return (
      <div className="progress-bar">
         <div
            className="bar"
            style={{ width: progress + "%", backgroundColor: color }}
         ></div>
         {/* <span className="bar-label">{progress + "%"}</span> */}
      </div>
   );
};

export default ProgressBar;
