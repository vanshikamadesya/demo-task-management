import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Task} from './TaskType'

// Load tasks from local storage
const loadTasks = () => {
  const data = localStorage.getItem("tasks");
  // ts infer return type as any[]
  return data ? JSON.parse(data) : [];
};

// Save task to local storage
// tasks: Task[] → This ensures that only an array of Task objects can be passed.
const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Defines the shape of the Redux state
interface TaskState {
  tasks: Task[];
}

// initialState.tasks = loadTasks(); → Ensures tasks persist even after refresh.
const initialState: TaskState = {
  tasks: loadTasks(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
   // PayloadAction<Task> Enforces that actions receive correctly typed payloads.
   // action: PayloadAction<Task> → Ensures action.payload is a valid Task object.
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
      saveTasks(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
  },
});

// make action available to component
export const { addTask, updateTask, deleteTask } = taskSlice.actions;
// export reducer fun to added to the redux store
export default taskSlice.reducer;
