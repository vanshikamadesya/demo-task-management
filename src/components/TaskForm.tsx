import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../features/task/TaskSlice";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../features/task/TaskType";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import TaskEditor from "./TaskEditor";
import { Link } from "react-router-dom";
import { useState } from "react";

const taskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.mixed<"To-Do" | "In Progress" | "Done">()
    .oneOf(["To-Do", "In Progress", "Done"])
    .required("Status is required"),
});

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <Formik<Task>
      initialValues={task || { title: "", description: "", status: "To-Do", id: "" }}
      validationSchema={taskSchema}
      onSubmit={(values: Task, { resetForm }: FormikHelpers<Task>) => {
        setLoading(true);

        new Promise<void>((resolve) => {
          setTimeout(() => {
            if (task) {
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
            onClose();
          })
          .finally(() => setLoading(false));
      }}
    >
      {(formik) => {
        const { setFieldValue, errors, touched, values } = formik;

        return (
          <>
            {/* Full-Screen Loader */}
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 animate-spin text-white" />
                  <p className="text-white mt-2 text-lg">Processing...</p>
                </div>
              </div>
            )}

            {/* Task Form */}
            <Form className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-900/30 space-y-5 border border-gray-200 dark:border-gray-700">

{/* Title Field */}
<div>
  <Field
    type="text"
    name="title"
    className="w-full p-3 border rounded-md bg-white dark:bg-white text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-600"
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
                  className="min-h-[150px] bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md"
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

{/* Status Dropdown */}
<div>
  <label className="block text-sm text-gray-900 dark:text-gray-200 mb-1">
    Status
  </label>
  <Select.Root value={values.status} onValueChange={(value) => setFieldValue("status", value)}>
    <Select.Trigger className="w-full p-3 border rounded-md flex items-center justify-between bg-white dark:bg-white text-black dark:text-black border-gray-300 dark:border-gray-600">
      <Select.Value placeholder="Select Status" />
      <ChevronDown className="w-4 h-4" />
    </Select.Trigger>
    <Select.Content className="border rounded shadow-md bg-white dark:bg-white dark:border-gray-700">
      {["To-Do", "In Progress", "Done"].map((status) => (
        <Select.Item
          key={status}
          value={status}
          className="p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-200 text-black dark:text-black"
        >
          <Select.ItemText>{status}</Select.ItemText>
          {values.status === status && <Check className="w-4 h-4 text-blue-500" />}
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Root>
  {errors.status && touched.status && <p className="text-red-500 text-sm">{errors.status}</p>}
</div>

              {/* Submit & Cancel Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : task ? (
                    "Update Task"
                  ) : (
                    "Add Task"
                  )}
                </button>

                <Link to="/" className="text-blue-500 hover:text-blue-600 transition-colors">
                  Back to List
                </Link>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default TaskForm;
