import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Ensure theme preference is applied correctly after mounting
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Handle theme change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 sm:p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6 sm:w-7 sm:h-7">
        <Sun
          className={`absolute w-full h-full transform transition-all duration-300 ${
            darkMode ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          } text-amber-500`}
        />
        <Moon
          className={`absolute w-full h-full transform transition-all duration-300 ${
            darkMode ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
          } text-slate-400`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
