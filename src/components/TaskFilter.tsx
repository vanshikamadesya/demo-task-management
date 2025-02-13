import { useState, useEffect, useRef } from "react";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

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
  const [filter, setFilter] = useState("Status");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Sort");
  const [sortOrder, setSortOrder] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Refs to detect clicks outside the dropdown
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (status: string) => {
    setFilter(status);
    onFilterChange(status);
    setActiveDropdown(null);
  };

  const handleSortChange = (value: string) => {
    const [sortField, order] = value.split("-");
    setSortBy(sortField);
    setSortOrder(order);
    onSortChange(sortField, order);
    setActiveDropdown(null);
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-full mx-auto shadow-md transition-colors">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearchChange(e.target.value);
        }}
        className="p-2 border border-gray-500 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 w-full sm:w-64 md:w-72 focus:ring-2 focus:ring-blue-500"
      />

      {/* Filters & Export Buttons */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {/* Status Filter (Button + Dropdown) */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "filter" ? null : "filter")
            }
            className="p-2 border border-gray-500 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 flex items-center gap-2"
          >
            {filter} <ChevronDown size={16} />
          </button>
          {activeDropdown === "filter" && (
            <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-md rounded-md">
              {["All", "To-Do", "In Progress", "Done"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sorting (Button + Dropdown) */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "sort" ? null : "sort")
            }
            className="p-2 border border-gray-500 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 flex items-center gap-2"
          >
            {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            {sortBy !== "Sort" && (
              <span>({sortOrder === "asc" ? "⬆" : "⬇"})</span>
            )}
            <ChevronDown size={16} />
          </button>
          {activeDropdown === "sort" && (
            <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-md rounded-md">
              {[
                { label: "Title ⬆ (Asc)", value: "title-asc" },
                { label: "Title ⬇ (Desc)", value: "title-desc" },
                { label: "Status ⬆ (Asc)", value: "status-asc" },
                { label: "Status ⬇ (Desc)", value: "status-desc" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleSortChange(value)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

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
  