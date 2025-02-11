import { Link } from "react-router-dom";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="w-full min-h-screen px-8 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Link
          to="/add-task"
          className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
        >
          + Add New Task
        </Link>
      </div>
      <TaskList />
    </div>
  );
};

export default Home;
