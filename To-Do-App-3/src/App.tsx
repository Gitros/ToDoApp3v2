import React, { useState } from "react";
import Layout from "./components/Layout";
import TaskListContainer from "./components/TaskListContainer";
import type { Task } from "./components/TaskCard";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";

type Mode = "create" | "edit";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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

  const handleCreateTask = (data: Task) => {
    setTasks((prev) => [data, ...prev]);
    closeModal();
  };

  const handleUpdateTask = (data: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === data.id ? data : t)));
    closeModal();
  };

  const selectedTask = selectedId
    ? tasks.find((t) => t.id === selectedId)
    : undefined;

  return (
    <>
      <Layout onAddTaskClick={openCreateTask}>
        <TaskListContainer tasks={tasks} onTaskClick={openEditTask} />
      </Layout>

      <Modal
        isOpen={openModal}
        onClose={closeModal}
        title={mode === "create" ? "Create Task" : "Edit Task"}
      >
        <TaskForm
          mode={mode}
          initial={selectedTask}
          onSubmit={mode === "create" ? handleCreateTask : handleUpdateTask}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default App;
