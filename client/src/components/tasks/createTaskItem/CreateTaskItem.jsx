import { useState } from "react";
import classNames from "classnames";

import "./CreateTaskItem.style.css";
import "../../reusables/styles/globalStyles.css";

export const CreateTaskItem = ({ createTask, error }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");

  const handleAddTask = () => {
    if (taskTitle) {
      createTask(taskTitle, taskContent);
      setTaskContent("");
      setTaskTitle("");
    }
  };

  return (
    <div className="add-item-container">
      <div className="inputs-container">
        <input
          className="add-item-title title-grow"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="title"
        />
        <input
          className="simple-input text-grow"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          placeholder="text"
        />
        <button
          className={classNames("simple-button", {
            disabled: !taskTitle.length,
          })}
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
