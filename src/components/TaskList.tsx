import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import TaskFilters from "./TaskFilter";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { setTasks } from "../features/task/TaskSlice";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
  }
}

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasksFromLocalStorage = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const storedTasks = localStorage.getItem("tasks");
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
        dispatch(setTasks(parsedTasks));
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasksFromLocalStorage();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const userTasks = tasks.filter((task) => task.userId === currentUser?.id);

  const filteredTasks = userTasks
    .filter(
      (task) =>
        (filteredStatus === "All" || task.status === filteredStatus) &&
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        return sortOrder === "asc"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
    });

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const exportToCSV = () => {
    const csvData = filteredTasks.map(({ id, title, description, status }) => ({
      ID: id,
      Title: title,
      Description: description,
      Status: status,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "tasks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Task List", 14, 10);
    const tableData = filteredTasks.map((task) => [
      task.id,
      task.title,
      task.description,
      task.status,
    ]);
    doc.autoTable({
      head: [["ID", "Title", "Description", "Status"]],
      body: tableData,
      startY: 20,
    });
    doc.save("tasks.pdf");
  };

  return (
    <div className="w-full space-y-6 px-4 sm:px-6 lg:px-8 mx-auto">
      {/* Task Filters (Always Visible) */}
      <TaskFilters
        onFilterChange={setFilteredStatus}
        onSearchChange={setSearchTerm}
        onSortChange={(sortField, order) => {
          setSortBy(sortField);
          setSortOrder(order);
        }}
        onExportCSV={exportToCSV}
        onExportPDF={exportToPDF}
      />
      <div className="py-12"></div>{" "}
      {/* Added space between TaskFilters and TaskItem */}
      <div className="py-1"></div>
      {/* Task Items Section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : paginatedTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {paginatedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => navigate(`/edit-task/${task.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 text-center text-lg py-6">
          No tasks available.
        </p>
      )}
      {/* Hide Pagination while loading */}
      {/* Pagination Section */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-8">
          <button
            disabled={currentPage <= 1} // Ensures the Previous button is disabled on first page
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base 
      ${
        currentPage <= 1
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white transition"
      }`}
          >
            Previous
          </button>

          <span className="text-gray-900 dark:text-white text-sm sm:text-base">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage >= totalPages} // Disables the Next button on last page
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base 
      ${
        currentPage >= totalPages
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white transition"
      }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
