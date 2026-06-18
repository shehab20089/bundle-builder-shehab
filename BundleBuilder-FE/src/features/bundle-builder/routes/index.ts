import { createElement } from "react";
import type { RouteObject } from "react-router-dom";

import { BundleBuilderRoute } from "./BundleBuilderRoute";

export const bundleBuilderRoutes: RouteObject[] = [
  {
    path: "/",
    element: createElement(BundleBuilderRoute),
  },
];
