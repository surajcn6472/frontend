import { apiRequest } from "./apiRequest";

// Projects API
export const projectsAPI = {
  // Get all projects with filters
  getAll: async (endpoint) => {
    return apiRequest({
      url: endpoint,
    });
  },

  // Get single project
  getById: async (id) => {
    return apiRequest({
      url: `/projects/${id}`,
    });
  },

  // Create new project
  create: async (projectData) => {
    return apiRequest({
      url: `/projects`,
      method: "POST",
      body: JSON.stringify(projectData),
    });
  },

  // Update project
  update: async (id, projectData) => {
    return apiRequest(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    });
  },

  // Partial update project
  patch: async (id, projectData) => {
    return apiRequest(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(projectData),
    });
  },

  // Delete project
  delete: async (id) => {
    return apiRequest(`/projects/${id}`, {
      method: "DELETE",
    });
  },
};

// Export a general API client
export const api = {
  projects: projectsAPI,
  // Add other API endpoints here
};

export default api;
