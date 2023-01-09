import { ThemeProvider } from "@mui/material";
import React from "react";
import App from "./App";
import { theme } from "./theme";

import { createRoot } from "react-dom/client";
const container = document.getElementById("healthloq-widget-blockchain-proof");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App domElement={container} />
    </ThemeProvider>
  </React.StrictMode>
);
