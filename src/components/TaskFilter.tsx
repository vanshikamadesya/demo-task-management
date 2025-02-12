import { useState } from "react";

interface TaskFiltersProps {
  onFilterChange: (status: string) => void;
  onSearchChange: (searchTerm: string) => void;
  onSortChange: (sortBy: string) => void;
  onSortOrderChange: (sortOrder: string) => void;
  sortBy: string;
  sortOrder: string;
}

const TaskFilters = ({
  onFilterChange,
  onSearchChange,
  onSortChange,
  onSortOrderChange,
  sortBy,
  sortOrder,
}: TaskFiltersProps) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const handleFilterChange = (status: string) => {
    setFilter(status);
    onFilterChange(status);
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 px-6 py-10 mt-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-[1100px] mx-auto">
      {/* Filter Buttons */}
      <div className="flex gap-2">
        {["All", "To-Do", "In Progress", "Done"].map((status) => (
          <button
            key={status}
            className={`px-3 py-2 rounded transition text-sm
              ${
                filter === status
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-gray-300 text-black dark:bg-gray-800 dark:text-white"
              }
              hover:bg-red-500 hover:text-white dark:hover:bg-red-500
            `}
            onClick={() => handleFilterChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearchChange(e.target.value);
        }}
        className="p-2 border rounded-md dark:bg-gray-800 dark:text-white w-28 sm:w-36"
      />

      {/* Sorting Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border rounded-md dark:bg-gray-800 dark:text-white w-32"
      >
        <option value="title">Sort by Title</option>
        <option value="status">Sort by Status</option>
      </select>

      {/* Sort Order Button */}
      <button
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        className="p-2 bg-blue-500 text-white rounded-md w-32"
      >
        {sortOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
      </button>
    </div>
  );
};

export default TaskFilters;
