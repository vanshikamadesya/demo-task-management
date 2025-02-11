import { useDispatch } from "react-redux";
import * as Dialog from "@radix-ui/react-dialog";
import { deleteTask } from "../features/task/TaskSlice";
import { Task } from "../features/task/TaskType";
import { Link } from "react-router-dom";

// componenet prop
interface TaskItemProps {
  task: Task;
  onEdit: () => void; // fun to trigger edit form when button is click
}

const TaskItem = ({ task, onEdit }: TaskItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-full max-w-sm border border-gray-300 dark:border-gray-700">
      {/* Task Title & Status */}
      <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
        {task.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{task.status}</p>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        {/* View Details Button */}
        <Link
          to={`/task/${task.id}`}
          className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md text-sm hover:bg-blue-500 hover:text-white transition"
        >
          View Details
        </Link>

        {/* Update Button */}
        <button
          onClick={onEdit} // Use the onEdit function
          className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 transition"
        >
          Update
        </button>

        {/* Delete Confirmation Dialog */}
        <Dialog.Root>
          <Dialog.Trigger className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition">
            Delete
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
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

                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default TaskItem;
