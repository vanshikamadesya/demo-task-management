import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetail from "./pages/TaskDetail";
import { ToastContainer } from "react-toastify";
import TaskForm from "./components/TaskForm";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import Header from "./components/Header"; // ✅ Import Header
import Login from "./components/Login";
import Register from "./components/Register";
import { fetchTasks } from './features/task/TaskSlice';

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (!isAuthenticated && !['/login', '/register'].includes(location.pathname)) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  // Load tasks on initial render
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <div>
        {/* ✅ Use the Header component */}
        <Header />

        <main className="p-4 md:p-6 max-w-5xl mx-auto">
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/task/:id" element={<TaskDetail />} />
                <Route path="/add-task" element={<TaskForm />} />
                <Route path="/edit-task/:id" element={<TaskForm />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </Routes>
        </main>

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
}

export default App;
