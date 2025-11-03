import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-xl font-semibold">
        My App Header
      </header>
      <main className="flex-1 p-6">{children}</main>

      <footer className="bg-gray-200 text-center p-3 text-sm">
        &copy; 2025 ToDoApp v3
      </footer>
    </div>
  );
};

export default Layout;
