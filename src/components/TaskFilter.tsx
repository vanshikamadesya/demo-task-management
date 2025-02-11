import { useState } from "react";

// onFilterChange → A function passed as a prop to notify the parent component when the filter changes.
// onFilterChange: (status: string) => void ensures it only accepts a string parameter and returns nothing.
const TaskFilters = ({ onFilterChange }: { onFilterChange: (status: string) => void }) => {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (status: string) => {
    setFilter(status);
    onFilterChange(status);
  };

  return (
    <div className="mt-10 mb-20  flex gap-4">
      {["All", "To-Do", "In Progress", "Done"].map((status) => (
        <button
          key={status}
          className={`px-4 py-2 rounded transition 
            ${
              filter === status
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
            }
            hover:bg-red-500 hover:text-white
          `}
          onClick={() => handleFilterChange(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
