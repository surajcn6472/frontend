import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import projectsReducer from "./slices/projectsSlice";
import userProjectsReducer from "./slices/userProjectsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    userProjects: userProjectsReducer,
  },
});
