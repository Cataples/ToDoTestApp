import { useTasks } from "../../../hooks/useTasks";
import { PageContainer } from "../../reusables/pageContainer/PageContainer";
import { TaskItem } from "../taskItem/TaskItem";
import { useTags } from "../../../hooks/useTags";
import { CreateTaskItem } from "../createTaskItem/CreateTaskItem";

import "./TaskList.style.css";
import "../../reusables/styles/globalStyles.css";

export const TaskList = () => {
  const { tasks, error, createTask, toggleTaskDone, deleteTask, getTasks } =
    useTasks();
  const { tags, error: tagsError, assignTag, removeTag } = useTags();

  const displayedTaskList = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      assignTag={assignTag}
      removeTag={removeTag}
      deleteTask={deleteTask}
      toggleTaskDone={toggleTaskDone}
      tags={tags}
      getTasks={getTasks}
      showError={!!tagsError}
    />
  ));

  return (
    <PageContainer>
      <p className="list-heading">Task List:</p>
      {displayedTaskList}
      {(error || tagsError) && (
        <p className="error-message">{error || tagsError}</p>
      )}
      <CreateTaskItem createTask={createTask} error={error} />
    </PageContainer>
  );
};
