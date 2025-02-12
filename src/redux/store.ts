import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../features/task/TaskSlice'
import themeReducer from '../features/theme/ThemeSlice'
import authReducer from '../features/auth/authSlice'


 export const store = configureStore({
    reducer:{
        task : taskReducer,
        theme: themeReducer,
        auth :authReducer,
    }
});

// Infer RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
