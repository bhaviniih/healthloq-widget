import { ThemeProvider } from "@mui/material";
import React from "react";
import App from "./App";
import { theme } from "./theme";
import { createRoot } from "react-dom/client";
import OtherComponentRender from "./otherComponent";

// get id from element
const container = document.getElementById("healthloq-widget-blockchain-proof");
const otherComponentContainer = document.getElementById(
  "healthloq-widget-blockchain-proof-component"
);

// set root as per component recieve
const root = container
  ? createRoot(container)
  : createRoot(otherComponentContainer);

const RenderContent = ({ domElementId }) => {
  if (domElementId === "healthloq-widget-blockchain-proof") {
    return (
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App domElement={container} />
        </ThemeProvider>
      </React.StrictMode>
    );
  } else if (domElementId === "healthloq-widget-blockchain-proof-component") {
    return (
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <OtherComponentRender domElement={otherComponentContainer} />
        </ThemeProvider>
      </React.StrictMode>
    );
  } else {
    return <div>Unknown ID</div>;
  }
};

root.render(
  <RenderContent
    domElementId={container ? container?.id : otherComponentContainer?.id}
  />
);
