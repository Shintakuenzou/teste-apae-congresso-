// src/main.tsx
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/auth-context";
import { App } from "./root";
import "./index.css";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  );
}
