import useTasks from "../../../hooks/useTasks";
import { PageContainer } from "../../reusables/pageContainer/PageContainer";
import { TaskItem } from "../taskItem/TaskItem";
import { Loading } from "../../reusables/loading/Loading";
import useTags from "../../../hooks/useTags";
import { CreateTaskItem } from "../createTaskItem/CreateTaskItem";

export const TaskList = () => {
  const {
    tasks,
    loading,
    error,
    createTask,
    toggleTaskDone,
    deleteTask,
    getTasks,
  } = useTasks();
  const { tags, error: tagsError, assignTag, removeTag } = useTags();

  if (loading) {
    return <Loading />;
  }

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
      <p>Task List:</p>
      {displayedTaskList}
      {(error || tagsError) && (
        <p className="error-test">{error || tagsError}</p>
      )}
      <CreateTaskItem createTask={createTask} error={error} />
    </PageContainer>
  );
};
