import { useState } from "react";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";

interface TaskFiltersProps {
  onFilterChange: (status: string) => void;
  onSearchChange: (searchTerm: string) => void;
  onSortChange: (sortBy: string, sortOrder: string) => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
}

const TaskFilters = ({
  onFilterChange,
  onSearchChange,
  onSortChange,
  onExportCSV,
  onExportPDF,
}: TaskFiltersProps) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleFilterChange = (status: string) => {
    setFilter(status);
    onFilterChange(status);
  };

  const handleSortChange = (value: string) => {
    const [sortField, order] = value.split("-");
    setSortBy(sortField);
    setSortOrder(order);
    onSortChange(sortField, order);
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-full mx-auto shadow-md transition-colors ">
      {/* Search Input (Adaptive Width) */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearchChange(e.target.value);
        }}
        className="p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 w-full sm:w-64 md:w-72 focus:ring-2 focus:ring-blue-500"
      />

      {/* Filters & Export Buttons */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {/* Status Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 w-32 focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        {/* Sorting Dropdown */}
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => handleSortChange(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 w-32 focus:ring-2 focus:ring-blue-500"
        >
          <option value="title-asc">Title ⬆ (Asc)</option>
          <option value="title-desc">Title ⬇ (Desc)</option>
          <option value="status-asc">Status ⬆ (Asc)</option>
          <option value="status-desc">Status ⬇ (Desc)</option>
        </select>

        {/* Export Buttons */}
        <button
          onClick={onExportCSV}
          className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <FaFileCsv />
          CSV
        </button>
        <button
          onClick={onExportPDF}
          className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          <FaFilePdf />
          PDF
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;
