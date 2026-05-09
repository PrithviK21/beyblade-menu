import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BeybladeDataProvider } from "./context/beybladeDataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BeybladeDataProvider>
      <App />
    </BeybladeDataProvider>
  </StrictMode>,
);
