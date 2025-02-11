import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleTheme } from "../features/theme/ThemeSlice";
import { useEffect } from "react";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // ✅ Add dark mode class
    } else {
      document.documentElement.classList.remove("dark"); // ✅ Remove if light
    }
  }, [theme]); // Run effect whenever theme changes

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black transition"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
