// src/components/app.tsx
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "@/routeTree.gen";
import { useAuth } from "./context/auth-context";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}
