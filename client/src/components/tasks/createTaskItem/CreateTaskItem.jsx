import { useState } from "react";

import "./CreateTaskItem.style.css";
import classNames from "classnames";

export const CreateTaskItem = ({ createTask, error }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");

  const handleAddTask = () => {
    if (taskTitle) createTask(taskTitle, taskContent);
  };

  return (
    <div className="add-item-container">
      <div className="inputs-container">
        <input
          className="add-item-title"
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="title"
        />
        <input
          className="add-item-content"
          onChange={(e) => setTaskContent(e.target.value)}
          placeholder="text"
        />
        <button
          className={classNames("add-item-button", {
            disabled: !taskTitle.length,
          })}
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
