import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// index.html ships prerendered markup for crawlers (see scripts/prerender.js).
// We render fresh instead of hydrating because event status and dates depend
// on the visitor's current time, which won't match the build-time HTML.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
