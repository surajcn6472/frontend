/* =========================
   AUTH
========================= */
export const AUTH_LOGIN = "/auth/login";
export const AUTH_REGISTER = "/auth/register";

/* =========================
   USER
========================= */
export const USER_PROFILE = "/user/profile";

/* =========================
   USER PROJECTS
========================= */
export const USER_PROJECTS = "/user/projects";

export const USER_PROJECT_DETAIL = (projectId) => `/user/projects/${projectId}`;

export const USER_PROJECT_UPDATE = (projectId) => `/user/projects/${projectId}/update`;

export const USER_PROJECT_DELETE = (projectId) => `/user/projects/${projectId}/delete`;

/* =========================
   PUBLIC PROJECTS
========================= */
export const PROJECTS = "/projects";

/* =========================
   SYSTEM / TEST
========================= */
export const SETUP_TEST = "/";
