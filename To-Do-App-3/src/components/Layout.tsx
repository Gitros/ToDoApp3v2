import { useState, type ReactNode } from "react";
import Modal from "./Modal";
import TaskForm from "./TaskForm";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);

  const handleCreateTask = (data: any) => {
    console.log("Created task", data);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-xl font-semibold text-center flex items-center">
        <div className="flex-1">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-400 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded cursor-pointer"
          >
            Add Task
          </button>
        </div>

        <h1 className="flex-1 text-center font-bold">To Do App</h1>

        <div className="flex-1" />
      </header>
      <main className="flex-1 p-6 bg-gray-300">{children}</main>

      <footer className="bg-gray-200 text-center p-3 text-sm">
        &copy; 2025 ToDoApp v3
      </footer>
      <Modal isOpen={openModal} onClose={closeModal} title="Create Task">
        <TaskForm onSubmit={handleCreateTask} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default Layout;
