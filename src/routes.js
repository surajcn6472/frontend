import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import Signup, { action as signupAction } from "./pages/Signup";
import NotFound from "./pages/404";
import Project from "./pages/Project";
import ProjectList from "./pages/user/project/List";
import ProjectCreate, {
  action as projectCreateAction,
} from "./pages/user/project/Create";
import ProjectEdit, {
  action as projectEditAction,
  loader as projectEditLoader,
} from "./pages/user/project/Edit";
import ProjectShow from "./pages/user/project/Show";
import Profile, { loader as profileLoader } from "./pages/user/Profile";
import ProfileEdit, {
  action as profileEditAction,
} from "./pages/user/ProfileEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login, action: loginAction },
      { path: "signup", Component: Signup, action: signupAction },
      { path: "projects", Component: Project },
      {
        path: "user",
        children: [
          {
            path: "profile",
            children: [
              { index: true, Component: Profile, loader: profileLoader },
              {
                path: "edit",
                Component: ProfileEdit,
                action: profileEditAction,
                loader: profileLoader,
              },
            ],
          },
          {
            path: "projects",
            children: [
              { index: true, Component: ProjectList },
              {
                path: "create",
                Component: ProjectCreate,
                action: projectCreateAction,
              },
              { path: ":projectId/show", Component: ProjectShow },
              {
                path: ":projectId/edit",
                Component: ProjectEdit,
                action: projectEditAction,
                loader: projectEditLoader,
              },
            ],
          },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
