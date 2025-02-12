import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskFilters from "./TaskFilter";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;
  const navigate = useNavigate();

  // Filter & Sort tasks
  const filteredTasks = tasks
    .filter((task) =>
      (filteredStatus === "All" || task.status === filteredStatus) &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "title") {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else {
        return sortOrder === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  return (
    <div className="w-full space-y-4">
      {/* Filters (Now contains Search & Sort) */}
      <TaskFilters
        onFilterChange={setFilteredStatus}
        onSearchChange={setSearchTerm}
        onSortChange={setSortBy}
        onSortOrderChange={setSortOrder}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />

      {/* Task List */}
      {paginatedTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full py-7">
          {paginatedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={() => navigate(`/edit-task/${task.id}`)} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 text-center">No tasks available.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-5 py-12 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 text-black" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>

        <span className="p-2 text-gray-900 dark:text-white">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300 text-black" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
