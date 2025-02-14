import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  // getTasks,
  addTaskToStorage,
  updateTaskInStorage,
  deleteTaskFromStorage,
} from "../../redux/mockAPI";

// ✅ Task Type
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "To-Do" | "In Progress" | "Done";
  userId: string;
  createdBy: string;
}

// ✅ Define initial state
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const loadTasksFromStorage = () => {
  const storedTasks = localStorage.getItem("tasks");
  console.log("Loading from localStorage:", storedTasks); // ✅ Debugging log
  return storedTasks ? JSON.parse(storedTasks) : []; // ✅ Default to empty array
};

const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
  loading: false,
  error: null,
};

// ✅ Fetch tasks
export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : []; // ✅ Return stored tasks or an empty array
});

// ✅ Add task
export const addTask = createAsyncThunk("tasks/addTask", 
  async (taskData: Omit<Task, "id">, { rejectWithValue }) => {
    try {
      const storedUser = localStorage.getItem("user");
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      if (!currentUser) return rejectWithValue("User not logged in");

      const newTask: Task = {
        id: uuidv4(),
        ...taskData,
        userId: currentUser.id,
        createdBy: currentUser.id
      };

      await addTaskToStorage(newTask);
      return newTask;
    } catch (error) {
      console.error("Add task error:", error);
      return rejectWithValue(error instanceof Error ? error.message : "Failed to add task");
    }
  }
);

// ✅ Update task
export const updateTask = createAsyncThunk("tasks/updateTask", async (task: Task, { rejectWithValue }) => {
  try {
    const updatedTask = await updateTaskInStorage(task);
    return updatedTask;
  } catch  {
    return rejectWithValue("Failed to update task");
  }
});

// ✅ Delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId: string, { rejectWithValue }) => {
  try {
    await deleteTaskFromStorage(taskId);
    return taskId;
  } catch  {
    return rejectWithValue("Failed to delete task");
  }
});

// ✅ Task Slice
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // ✅ Ensure Redux updates `localStorage`
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload; // ✅ Store tasks from localStorage
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); // ✅ Persist Redux to localStorage
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); // ✅ Persist Redux to localStorage
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); // ✅ Persist Redux to localStorage
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// ✅ Export actions & reducer
export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
