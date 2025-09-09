import React, { useState } from "react";
import "./TaskItem.css";
import useTasks from "../../../hooks/useTasks";
import useTags from "../../../hooks/useTags";

const TaskItem = ({
  task,
  tags,
  onToggleDone,
  onDelete,
  onAssignTag,
  onRemoveTag,
}) => {
  const [selectedTag, setSelectedTag] = useState("");

  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    createTask,
    toggleTaskDone,
  } = useTasks();

  const {
    tags: tagOptions,
    loading: tagsLoading,
    error: tagsError,
    assignTag,
    removeTag,
  } = useTags();

  const handleCheckbox = () => onToggleDone(task.id, !task.is_done);
  const handleDelete = () => onDelete(task.id);
  const handleAssignTag = () => {
    if (selectedTag) {
      onAssignTag(task.id, selectedTag);
      setSelectedTag("");
    }
  };
  const handleRemoveTag = (tagId) => {
    onRemoveTag(task.id, tagId);
  };

  return (
    <div className="task-container">
      <div className="task-row">
        <input
          type="checkbox"
          checked={task.is_done}
          onChange={handleCheckbox}
        />
        <span className={`task-name ${task.is_done ? "done" : ""}`}>
          {task.task_name}
        </span>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <div className="tag-row">
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">Select tag</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.text}
            </option>
          ))}
        </select>
        <button className="add-tag-button" onClick={handleAssignTag}>
          Add Tag
        </button>
      </div>

      <div className="tag-list">
        {task.tags &&
          task.tags.map((tag) => (
            <span
              key={tag.id}
              className="tag-item"
              onClick={() => handleRemoveTag(tag.id)}
              title="Click to remove"
            >
              {tag.text} &times;
            </span>
          ))}
      </div>
    </div>
  );
};

export default TaskItem;
