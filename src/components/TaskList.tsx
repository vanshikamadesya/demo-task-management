import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskFilters from "./TaskFilter";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";

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

  // ✅ Filter tasks to show only the logged-in user's tasks
  const userTasks = tasks.filter((task) => task.userId === currentUser?.id);

  // ✅ Apply filters (status, search, sorting)
  const filteredTasks = userTasks
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
    <div className="w-full space-y-6 px-4 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full py-6">
          {paginatedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={() => navigate(`/edit-task/${task.id}`)} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 text-center text-lg py-6">No tasks available.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Previous
          </button>

          <span className="text-gray-900 dark:text-white text-sm sm:text-base">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
