import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Task } from "../features/task/TaskSlice";
import "react-quill/dist/quill.snow.css"; 

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const task = useSelector((state: RootState) =>
    state.task.tasks.find((t: Task) => t.id === id)
  );

  if (!task) {
    return <p className="text-red-500 text-center">Task not found</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-md mt-[-140px]">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {task.title}
        </h2>

        {/* Ensure correct rendering of sublists */}
        <div
          className="mt-1 prose dark:prose-invert leading-snug ql-editor"
          dangerouslySetInnerHTML={{ __html: task.description }}
        />


        <p className="text-gray-800 dark:text-gray-300 font-semibold mt-2">
          Status: {task.status}
        </p>

        <div className="mt-4 flex justify-center">
          <Link
            to="/"
            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
          >
            Back to Task List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
