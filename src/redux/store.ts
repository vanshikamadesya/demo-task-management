import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../features/task/TaskSlice'
import themeReducer from '../features/theme/ThemeSlice'

 export const store = configureStore({
    reducer:{
        task : taskReducer,
        theme: themeReducer,
    }
});

// Infer RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
