import { Router, Route, RootRoute } from "@tanstack/react-router";
import HomePage from "./pages/Home";
import Root from "./App";
import LoginPage from "../src/pages/Login";
import RegisterPage from "../src/pages/Register";
import ProfilePage from "./pages/Profile";
import ListingPage from "./pages/Listings";
import SinglePostPage from "./pages/Singel-Post";

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

  const registerRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: RegisterPage,
  });

  const profileRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/profile",
    component: ProfilePage,
  });

  const listingsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/listings",
    component: ListingPage,
  });

  const singlelistingsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/singlelistings/$id",
    component: SinglePostPage,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    registerRoute,
    profileRoute,
    listingsRoute,
    singlelistingsRoute,

  ]);

  export const router = new Router({ routeTree });

export default router;