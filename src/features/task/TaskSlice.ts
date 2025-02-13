import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "To-Do" | "In Progress" | "Done";
  userId: string; // ✅ Associate task with a user
}

// Load tasks from localStorage
const loadTasks = (): Task[] => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
};

// Save tasks to localStorage
const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Define initial state
interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: loadTasks(), // ✅ Load persisted tasks
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks:(state, action) =>{
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      // Get the logged-in user from localStorage (or Redux state)
      const storedUser = localStorage.getItem("user");
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
    
      if (!currentUser) return; // Prevent adding a task if no user is logged in
    
      const newTask: Task = {
        id: action.payload.id || uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status,
        userId: currentUser.id, // ✅ Assign the logged-in user's ID
      };
    
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // ✅ Save to localStorage
    },
    
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },
  },
});

// Export actions and reducer
export const { setTasks, addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
