/***
 * src/App.tsx
 */
import React from "react";
import {createRoot} from "react-dom/client";
import { PagesRouter } from "src/components/Router";
const rootHTML = document.querySelector("#root");

if  (!rootHTML) {
  throw new Error('[App]: Something what woong! It is the "#root" was not found ');
}

createRoot(rootHTML).render(
  <React.StrictMode>
    <PagesRouter />
  </React.StrictMode>
);
