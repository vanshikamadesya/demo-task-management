import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/task/TaskSlice";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import TaskEditor from "./TaskEditor";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { Task } from "../features/task/TaskSlice";

// ✅ Validation Schema
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
  const { id } = useParams();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const taskToEdit = id ? tasks.find((task) => task.id === id) : null;

  // ✅ Debugging logs
  console.log("Current User:", user);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-5 text-center">
        {taskToEdit ? "Edit Task" : "Add Task"}
      </h2>

      <Formik<Task>
        initialValues={{
          title: taskToEdit?.title || "",
          description: taskToEdit?.description || "",
          status: taskToEdit?.status || "To-Do",
          id: taskToEdit?.id || uuidv4(),  // ✅ Ensure id is always present
          userId: taskToEdit?.userId || user?.id || "", // ✅ Ensure userId is assigned correctly
        }}
        validationSchema={taskSchema}
        onSubmit={(values: Task, { resetForm }: FormikHelpers<Task>) => {
          if (!user?.id) {
            toast.error("You must be logged in to add or edit a task.");
            return;
          }

          setLoading(true);
          new Promise<void>((resolve) => {
            setTimeout(() => {
              if (taskToEdit) {
                dispatch(updateTask({ ...values, userId: user.id })); // ✅ Ensure userId persists on update
                toast.success("Task updated successfully!");
              } else {
                dispatch(addTask({ ...values, id: uuidv4(), userId: user.id })); // ✅ Correctly assigns id
                toast.success("Task added successfully!");
              }
              resolve();
            }, 1500);
          })
            .then(() => {
              resetForm();
              navigate("/");
            })
            .finally(() => setLoading(false));
        }}
      >
        {(formik) => {
          const { setFieldValue, errors, touched, values } = formik;

          return (
            <Form className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-gray-900 dark:text-gray-200 mb-2 font-semibold">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="w-full p-2 sm:p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-900 dark:text-gray-200 mb-2 font-semibold">
                  Description
                </label>
                <TaskEditor
                  value={values.description}
                  onChange={(content) => setFieldValue("description", content)}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="block text-gray-900 dark:text-gray-200 mb-2 font-semibold">
                  Status
                </label>
                <select
                  name="status"
                  value={values.status}
                  onChange={(e) => setFieldValue("status", e.target.value)}
                  className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                {errors.status && touched.status && (
                  <p className="text-red-500 text-sm">{errors.status}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
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
                  className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded px-4 py-2"
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
