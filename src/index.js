import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "flowbite";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App tab="home" />);

serviceWorkerRegistration.register();
