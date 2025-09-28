import { useRoutes } from "react-router-dom";
import HomePage from "../pages/home-page/HomePage";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <HomePage />
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;