import { useState } from "react";
import Layout from "./components/Layout";
import TaskListContainer from "./components/TaskListContainer";
import type { Task } from "./components/TaskCard";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";
import { useTasks } from "./hooks/useTasks";
import { useCreateTask, useUpdateTask } from "./hooks/useTaskMutations";

type Mode = "create" | "edit";

const App = () => {
  const { data: tasks, isLoading, isError, error } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<Mode>("create");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openCreateTask = () => {
    setMode("create");
    setSelectedId(null);
    setOpenModal(true);
  };
  const openEditTask = (id: string) => {
    setMode("edit");
    setSelectedId(id);
    setOpenModal(true);
  };
  const closeModal = () => setOpenModal(false);

  const handleCreateTask = async (data: Omit<Task, "id">) => {
    await createTask.mutateAsync(data);
    closeModal();
  };

  const handleUpdateTask = async (data: Task) => {
    await updateTask.mutateAsync(data);
    closeModal();
  };

  const selectedTask = selectedId
    ? tasks?.find((t) => t.id === selectedId)
    : undefined;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Layout onAddTaskClick={openCreateTask}>
        <TaskListContainer tasks={tasks ?? []} onTaskClick={openEditTask} />
      </Layout>

      <Modal
        isOpen={openModal}
        onClose={closeModal}
        title={mode === "create" ? "Create Task" : "Edit Task"}
      >
        {mode === "create" ? (
          <TaskForm
            mode="create"
            onSubmit={handleCreateTask}
            onCancel={closeModal}
          />
        ) : selectedTask ? (
          <TaskForm
            mode="edit"
            initial={selectedTask}
            onSubmit={handleUpdateTask}
            onCancel={closeModal}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default App;
