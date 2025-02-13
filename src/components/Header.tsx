import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../features/auth/authSlice";
import { LogOut, User2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [isAuthenticated]);

  return (
    <header className="p-4 flex justify-between items-center shadow bg-white dark:bg-gray-700 dark:text-white">
      <h1 className="text-xl md:text-2xl font-bold">Task Manager</h1>

      <div className="flex items-center space-x-4 gap-4">
        {!isAuthenticated && location.pathname === "/login" && (
          <Link
            to="/register"
            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
          >
            Register
          </Link>
        )}

        {!isAuthenticated && location.pathname === "/register" && (
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
          >
            Login
          </Link>
        )}

        {!isAuthenticated &&
          (location.pathname === "/login" ||
            location.pathname === "/register") && <ThemeToggle />}

        {isAuthenticated && (
          <>
            <Link
              to="/add-task"
              className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
            >
              + Add New Task
            </Link>
            <ThemeToggle />

            {/* User Profile Section */}
            <div className="relative" ref={dropdownRef}>
              {/* User Icon */}
              <div
                className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User2 size={28} className="text-gray-800 dark:text-gray-200" />
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-md rounded-md">
                  <div className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                    {user?.name || "User"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400"
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
