import React, { useState } from "react";
import Layout from "./components/Layout";
import TaskListContainer from "./components/TaskListContainer";
import type { Task } from "./components/TaskCard";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);

  const handleCreateTask = (data: Task) => {
    setTasks((prev) => [data, ...prev]);
    setOpenModal(false);
  };

  return (
    <>
      <Layout onAddTaskClick={handleOpenModal}>
        <TaskListContainer
          tasks={tasks}
          onTaskClick={(id) => {
            console.log("Clicked task:", id);
          }}
        />
      </Layout>

      <Modal isOpen={openModal} onClose={closeModal} title="Create Task">
        <TaskForm onSubmit={handleCreateTask} onCancel={closeModal} />
      </Modal>
    </>
  );
};

export default App;
