import { useState, type ReactNode } from "react";
import Modal from "./Modal";
import TaskForm from "./TaskForm";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const handleCreate = (data: any) => {
    console.log("Created task:", data);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold text-center flex items-center">
        <div className="flex-1">
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-400 active:translate-y-[1px]
  text-white font-bold
  py-2 px-4
  border-b-4 border-blue-700 hover:border-blue-500
  rounded
  cursor-pointer transition-all duration-150"
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

      <Modal isOpen={open} onClose={closeModal} title="Create a new task">
        <TaskForm mode="create" onSubmit={handleCreate} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default Layout;
