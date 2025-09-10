import { useState } from "react";
import classNames from "classnames";
import { getTagNameByid, returnTagsAsArray } from "./utils";

import "./TaskItem.style.css";

export const TaskItem = ({
  task,
  toggleTaskDone,
  deleteTask,
  assignTag,
  removeTag,
  tags,
  getTasks,
  showError,
}) => {
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const handleCheckbox = () => toggleTaskDone(task.id, !task.is_done);

  const handleDelete = async () => deleteTask(task.id);

  const handleAssignTag = async (e) => {
    setIsErrorVisible(false);
    try {
      await assignTag(task.id, Number(e.target.value));
      getTasks();
    } catch {
      setIsErrorVisible(true);
    }
  };

  const handleRemoveTag = async (tagId) => {
    setIsErrorVisible(false);
    try {
      await removeTag(task.id, tagId);
      getTasks();
    } catch {
      setIsErrorVisible(true);
    }
  };

  return (
    <div
      className={classNames("task-container", {
        "has-error": isErrorVisible && showError,
      })}
    >
      <div className="task-row">
        <div className="task-text" onClick={handleCheckbox}>
          <input
            type="checkbox"
            checked={task.is_done}
            onChange={handleCheckbox}
          />
          <span className={`task-name ${task.is_done ? "done" : ""}`}>
            <b>{task.task_name}:</b> {task.description}
          </span>
        </div>

        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <div className="tag-row">
        <select value={""} onChange={(e) => handleAssignTag(e)}>
          <option value="">Select tag to add</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.text}
            </option>
          ))}
        </select>
        <div className="tag-list">
          {task.tags &&
            returnTagsAsArray(task.tags).map((tag) => (
              <span
                key={tag}
                className="tag-item"
                onClick={() => handleRemoveTag(tag)}
                title="Click to remove"
              >
                {getTagNameByid(tags, tag)}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
