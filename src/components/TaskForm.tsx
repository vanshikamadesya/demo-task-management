import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/task/TaskSlice";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../features/task/TaskType";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import TaskEditor from "./TaskEditor";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

// Validation Schema using Yup
const taskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.mixed<"To-Do" | "In Progress" | "Done">()
    .oneOf(["To-Do", "In Progress", "Done"])
    .required("Status is required"),
});

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get task ID from URL
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [loading, setLoading] = useState(false);

  // Find the task to edit based on the ID
  const taskToEdit = id ? tasks.find((task) => task.id === id) : null;

  return (
    <div className="max-w-2xl mx-auto mt-2 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 ">
        {taskToEdit ? "Edit Task" : "Add Task"}
      </h2>

      <Formik<Task>
        initialValues={
          taskToEdit || { title: "", description: "", status: "To-Do", id: "" }
        }
        validationSchema={taskSchema}
        onSubmit={(values: Task, { resetForm }: FormikHelpers<Task>) => {
          setLoading(true);

          new Promise<void>((resolve) => {
            setTimeout(() => {
              if (taskToEdit) {
                dispatch(updateTask(values));
                toast.success("Task updated successfully!");
              } else {
                dispatch(addTask({ ...values, id: uuidv4() }));
                toast.success("Task added successfully!");
              }
              resolve();
            }, 1500);
          })
            .then(() => {
              resetForm();
              navigate("/"); // Redirect to task list page
            })
            .finally(() => setLoading(false));
        }}
      >
        {(formik) => {
          const { setFieldValue, errors, touched, values } = formik;

          return (
            <Form className="space-y-5 dark:border rounded-2xl p-5 ">
              {/* Title Field */}
              <div>
                <Field
                  type="text"
                  name="title"
                  className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-700"
                  placeholder="Enter task title"
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <TaskEditor
                  value={values.description}
                  onChange={(content) => setFieldValue("description", content)}
                  className="min-h-[150px] bg-white dark:bg-gray-700 border dark:border-gray-800 text-gray-900 dark:text-white rounded-md p-3"
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="block text-sm text-gray-900 dark:text-gray-200 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={values.status}
                  onChange={(e) => setFieldValue("status", e.target.value)}
                  className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                {errors.status && touched.status && (
                  <p className="text-red-500 text-sm">{errors.status}</p>
                )}
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" /> Processing...
                    </>
                  ) : taskToEdit ? (
                    "Update Task"
                  ) : (
                    "Add Task"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TaskForm;
