import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Task } from "../features/task/TaskType";

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const task = useSelector((state: RootState) =>
    state.task.tasks.find((t: Task) => t.id === id)
  );

  if (!task) {
    return <p className="text-red-500 text-center">Task not found</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent -my-20">
      <div className="max-w-xl w-full p-6 bg-white dark:bg-gray-700 rounded shadow-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
        
        <div
          className="mt-4 text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: task.description }}
        />
  
        <p className="mt-4 text-gray-800 dark:text-gray-400 font-semibold">
          Status: {task.status}
        </p>
  
        <Link
          to="/"
          className="block mt-6 text-blue-500 hover:underline text-center"
        >
          Back to Task List
        </Link>
      </div>
    </div>
  );
  
};

export default TaskDetail;
