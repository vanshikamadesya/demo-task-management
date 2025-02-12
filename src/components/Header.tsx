import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../features/auth/authSlice";
import { ChevronDown, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Close dropdown when user logs out
  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate("/login");
  };

  // ✅ Close dropdown when authentication state changes
  useEffect(() => {
    setDropdownOpen(false);
  }, [isAuthenticated]);

  // Extract first letter of username (fallback to "?")
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <header className="p-4 flex justify-between items-center shadow bg-white dark:bg-gray-700 dark:text-white">
      <h1 className="text-xl md:text-2xl font-bold">Task Manager</h1>

      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <>
            <Link
              to="/add-task"
              className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
            >
              + Add New Task
            </Link>
            <ThemeToggle />

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2"
              >
                {/* Circular Avatar */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-semibold">
                  {userInitial}
                </div>
                <ChevronDown size={20} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-md rounded-md">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
