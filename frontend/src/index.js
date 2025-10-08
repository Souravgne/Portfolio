import React from "react";
import { createRoot } from "react-dom/client"; // ✅ new import for React 18
import App from "./App";
import "./index.css";
import { DataProvider } from "./context/context";

const container = document.getElementById("root"); // ✅ get the root element
const root = createRoot(container); // ✅ create a root
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
