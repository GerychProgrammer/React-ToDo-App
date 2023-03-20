import { Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Registration from "../pages/Registration.jsx";
import Login from "../pages/Login.jsx";
import History from "../pages/History.jsx";

export const publicRoutes = [
  { id: 1, path: "/registration", component: <Registration />, exact: true },
  { id: 2, path: "/login", component: <Login />, exact: true },
  { id: 3, path: "/home", component: <Navigate to="/login" replace={true} />, exact: true },
  { id: 4, path: "/history", component: <Login />, exact: true },
];

export const privateRoutes = [
  { id: 1, path: "/registration", component: <Navigate to="/home" replace={true} />, exact: true },
  { id: 2, path: "/login", component: <Navigate to="/home" replace={true} />, exact: true },
  { id: 3, path: "/home", component: <Home />, exact: true },
  { id: 4, path: "/history", component: <History />, exact: true },
  { id: 5, path: "/", component: <Navigate to="/home" replace={true} />, exact: true },
];
