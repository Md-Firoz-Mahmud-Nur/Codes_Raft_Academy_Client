import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Classes from "./Pages/Classes/Classes";
import Profile from "./Pages/Profile/Profile";
import EnrollPage from "./Pages/EnrollPage/EnrollPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: (
      <h1 className="flex items-center justify-center text-3xl">404</h1>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/enroll",
        element: (
          <PrivateRoute>
            <EnrollPage></EnrollPage>,
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
