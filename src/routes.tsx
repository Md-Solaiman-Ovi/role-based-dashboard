import { RouteObject } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import ViewerPage from "./pages/StudentPage";
import NotAuthorized from "./pages/Unauthorized";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/viewer",
    element: <ViewerPage />,
  },
  {
    path: "/unauthorized",
    element: <NotAuthorized />,
  },
];
