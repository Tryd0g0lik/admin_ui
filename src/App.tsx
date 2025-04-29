/***
 * src/App.tsx
 */
import React from "react";
import { Provider } from 'react-redux';
import {createRoot} from "react-dom/client";
import { PagesRouter } from "src/components/Router";
import store from "src/reduxes/store";
const rootHTML = document.querySelector("#root");
// import "./App.css"

if  (!rootHTML) {
  throw new Error('[App]: Something what woong! It is the "#root" was not found ');
}
// https://react-redux.js.org/introduction/getting-started
createRoot(rootHTML).render(
  <Provider store={store}>
  <React.StrictMode>
    <PagesRouter />
  </React.StrictMode>
  </Provider>
);
