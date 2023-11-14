import { Router, Route, RootRoute } from "@tanstack/react-router";
import HomePage from "./pages/Home";
import Root from "./App";
import LoginPage from "../src/pages/Login"

const rootRoute = new RootRoute({
    component: Root,
  });

  const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
  });

  const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
  ]);

  export const router = new Router({ routeTree });

export default router;