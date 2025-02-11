import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskFilters from "./TaskFilter";
import TaskItem from "./TaskItem";
// import { Task } from "../features/task/TaskType";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const navigate = useNavigate();

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) =>
    filteredStatus === "All" ? true : task.status === filteredStatus
  );

  return (
    <div className="w-full space-y-4">
      <TaskFilters onFilterChange={setFilteredStatus} />

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onEdit={() => navigate(`/edit-task/${task.id}`)} // Navigate to edit page
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 text-center">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
