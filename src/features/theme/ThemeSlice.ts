import { createSlice } from "@reduxjs/toolkit";

const loadTheme = () => {
  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
};

const initialState = {
  theme: loadTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
