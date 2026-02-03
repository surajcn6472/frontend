import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/Home";
import Login, {action as loginAction} from "./pages/Login";
import Signup, {action as signupAction} from "./pages/Signup";
import NotFound from "./pages/404";
import Project from "./pages/Project";
import ProjectList from "./pages/user/project/List";
import ProjectCreate from "./pages/user/project/Create";
import ProjectEdit from "./pages/user/project/Edit";
import ProjectShow from "./pages/user/project/Show";
import Profile from "./pages/user/Profile";
import ProfileEdit from "./pages/user/ProfileEdit";

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
              { index: true, Component: Profile },
              { path: "edit", Component: ProfileEdit },
            ],
          },
          {
            path: "projects",
            children: [
              { index: true, Component: ProjectList },
              { path: "create", Component: ProjectCreate },
              { path: ":projectId/show", Component: ProjectShow },
              { path: ":projectId/edit", Component: ProjectEdit },
            ],
          },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
