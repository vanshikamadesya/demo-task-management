import { useDispatch } from "react-redux";
import * as Dialog from "@radix-ui/react-dialog";
import { deleteTask } from "../features/task/TaskSlice";
import { Task } from "../features/task/TaskType";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
}

const TaskItem = ({ task, onEdit }: TaskItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-3 sm:p-4 w-full hover:shadow-lg transition-shadow">
      {/* Task Title & Status */}
      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
        {task.title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{task.status}</p>

      {/* Action Icons */}
      <div className="flex flex-wrap justify-end gap-2 sm:gap-3 mt-3 sm:mt-4">
        {/* View Details Icon */}
        <Link to={`/task/${task.id}`} className="text-blue-500 hover:text-blue-600 transition">
          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>

        {/* Edit (Update) Icon */}
        <button
          onClick={onEdit}
          className="text-yellow-500 hover:text-yellow-600 transition"
          aria-label="Edit Task"
        >
          <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Delete Confirmation Dialog */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="text-red-500 hover:text-red-600 transition" aria-label="Delete Task">
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40 backdrop-blur-sm" />

            <Dialog.Content className="fixed bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-96">
              <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white">
                Confirm Delete
              </Dialog.Title>
              <Dialog.Description className="text-gray-700 dark:text-gray-300">
                Are you sure you want to delete this task?
              </Dialog.Description>

              <div className="mt-4 flex justify-end gap-4">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition">
                    Cancel
                  </button>
                </Dialog.Close>

                <Dialog.Close asChild>
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default TaskItem;
