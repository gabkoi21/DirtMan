import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // ✅ Correct import
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "../src/App";
import "@fontsource/roboto";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
