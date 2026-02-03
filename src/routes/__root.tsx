// src/routes/__root.tsx
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthContextType } from "../context/auth-context";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
