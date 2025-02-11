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
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow-md">
      <h2 className="text-xl font-bold">{task.title}</h2>
      
      {/* Properly render HTML description */}
      <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: task.description }} />

      <p className="text-gray-800 font-semibold">Status: {task.status}</p>

      <Link
        to="/"
        className="block mt-4 text-blue-500 hover:underline text-center"
      >
        Back to Task List
      </Link>
    </div>
  );
};

export default TaskDetail;
