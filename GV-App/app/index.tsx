import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Import the global CSS reset

const container = document.getElementById("root");
const root = createRoot(container!); // Create a root.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
