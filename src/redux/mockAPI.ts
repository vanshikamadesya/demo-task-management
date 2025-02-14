import axios from "axios";

const TASKS_KEY = "tasks"; // LocalStorage Key

// ✅ Simulate API response delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ✅ Initialize Axios instance (not actually calling a backend)
const mockApi = axios.create({
  baseURL: "/mock-api",
});

// Task Interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "To-Do" | "In Progress" | "Done";
  userId: string;
  createdBy: string;
}

// ✅ Get tasks from localStorage
export const getTasks = async (): Promise<Task[]> => {
  await delay(500);
  const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
  return Array.isArray(tasks) ? tasks : [];
};

// ✅ Add a task to localStorage
export const addTaskToStorage = async (task: Task) => {
  try {
    await delay(500);
    const tasks = await getTasks();
    tasks.push(task);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    console.log("[mockAPI] Added task:", task);
    return task;
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      alert("Local storage is full! Clear some data.");
    }
    throw error;
  }
};

// ✅ Update task in localStorage
export const updateTaskInStorage = async (updatedTask: Task) => {
  await delay(500);
  let tasks = await getTasks();
  tasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return updatedTask;
};

// ✅ Delete task from localStorage
export const deleteTaskFromStorage = async (taskId: string) => {
  await delay(500);
  let tasks = await getTasks();
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return taskId;
};

export default mockApi;
