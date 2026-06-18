import { createBrowserRouter, type RouteObject } from "react-router-dom";

import { bundleBuilderRoutes } from "../features/bundle-builder/routes";

const routes: RouteObject[] = [...bundleBuilderRoutes];

export const router = createBrowserRouter(routes);
