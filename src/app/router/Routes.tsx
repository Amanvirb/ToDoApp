import { RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import TaskDetailCard from "../../features/task/cards/TaskDetailCard";
import EditTaskForm from "../../features/task/forms/EditTaskForm";
import AddTaskForm from "../../features/task/forms/AddTaskForm";


export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      // { path: "/addtask", element: <AddTaskForm /> },
      { path: "/edittask/:id", element: <EditTaskForm /> },
      { path: "/taskdetail/:id", element: <TaskDetailCard /> },
      { path: "/addtask", element: <AddTaskForm /> },
      { path: "/addsubtask/:id", element: <AddTaskForm /> },


    ],
  },
];

export const router = createBrowserRouter(routes);
