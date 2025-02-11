import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetail from "./pages/TaskDetail";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ThemeToggle from "./components/ThemeToggle";
import { useEffect } from "react";
import AddTask from "./pages/AddTask";
import { ToastContainer } from "react-toastify";

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <header className="p-4 flex justify-between items-center shadow bg-white dark:bg-gray-900 dark:text-white">
        <h1 className="text-xl md:text-2xl font-bold">Task Manager</h1>
        <ThemeToggle />
      </header>
      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/add-task" element={<AddTask />} />  
          </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
