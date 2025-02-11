import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute transition-all duration-300 ${
            darkMode ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
          } text-amber-500`}
        />
        <Moon
          className={`absolute transition-all duration-300 ${
            darkMode ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
          } text-slate-400`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
