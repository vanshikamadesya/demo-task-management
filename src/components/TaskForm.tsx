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
  const [loading, setLoading] = useState(false); // Full-screen loader state

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
          }, 1500); // Simulated API delay (1.5s)
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
            {/* Full-Screen Loader Overlay */}
            {loading && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 animate-spin text-white" />
                  <p className="text-white mt-2 text-lg">Processing...</p>
                </div>
              </div>
            )}

            {/* Task Form */}
            <Form className="p-4 bg-white dark:bg-gray-800 rounded shadow-md space-y-4 w-full max-w-2xl mx-auto relative">
              {/* Title Field */}
              <div className="mb-4">
                <Field
                  type="text"
                  name="title"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="Enter task title"
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="mb-6">
                <TaskEditor
                  value={values.description}
                  onChange={(content) => setFieldValue("description", content)}
                  className="min-h-[150px] dark:border-gray-600"
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <label className="block text-sm">Status</label>
                <Select.Root value={values.status} onValueChange={(value) => setFieldValue("status", value)}>
                  <Select.Trigger className="w-full p-2 border rounded flex items-center justify-between dark:bg-gray-700 dark:text-white">
                    <Select.Value placeholder="Select Status" />
                    <ChevronDown className="w-4 h-4" />
                  </Select.Trigger>
                  <Select.Content className="border rounded shadow-md bg-white dark:bg-gray-800">
                    {["To-Do", "In Progress", "Done"].map((status) => (
                      <Select.Item key={status} value={status} className="p-2 flex justify-between items-center cursor-pointer">
                        <Select.ItemText>{status}</Select.ItemText>
                        {values.status === status && <Check className="w-4 h-4" />}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
                {errors.status && touched.status && <p className="text-red-500 text-sm">{errors.status}</p>}
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
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
