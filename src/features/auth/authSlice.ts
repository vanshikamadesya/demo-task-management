import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
}

// Load data from localStorage
const storedUsers = localStorage.getItem("users");
const storedUser = localStorage.getItem("user");
const storedAuth = localStorage.getItem("isAuthenticated");

const initialState: AuthState = {
  isAuthenticated: storedAuth === "true",
  user: storedUser ? JSON.parse(storedUser) : null,
  users: storedUsers ? JSON.parse(storedUsers) : [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<Omit<User, "id">>) => {
      const newUser: User = { id: uuidv4(), ...action.payload };
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const existingUser = state.users.find(
        (user) => user.email === action.payload.email && user.password === action.payload.password
      );

      if (existingUser) {
        state.isAuthenticated = true;
        state.user = existingUser;
        localStorage.setItem("user", JSON.stringify(existingUser));
        localStorage.setItem("isAuthenticated", "true");
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

// Export actions and reducer
export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
