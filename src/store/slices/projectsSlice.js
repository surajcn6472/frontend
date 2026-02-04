import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PROJECTS, USER_PROJECT_DELETE } from "../../constants/endpoints";
import { projectsAPI } from "../../lib/api";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await projectsAPI.getAll(`${PROJECTS}?${queryParams}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await fetch(PROJECTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${PROJECTS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async ({ id, params }, { dispatch, rejectWithValue }) => {
    try {
      const response = await projectsAPI.delete(USER_PROJECT_DELETE(id));

      if (response.statusCode !== 200) {
        throw new Error("Delete failed");
      }
      dispatch(fetchProjects(params));

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Initial state
const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  pagination: {
    total: 4,
    page: 1,
    perPage: 2,
    totalPages: 2,
    hasNextPage: true,
    hasPrevPage: false,
  },
};

// Slice
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects || action.payload.data || [];
        state.pagination = action.payload.meta;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch projects";
      })

      // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create project";
      })

      // Update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id,
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update project";
      })

      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete project";
      });
  },
});

export const { clearError, setCurrentProject, clearCurrentProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
