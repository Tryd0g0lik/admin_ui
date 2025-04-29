/**
 * src/components/Router.tsx
 */
import React from "react";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavBarFC } from "src/components/NavBar";

const router_ = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBarFC />
      </div>
    )
  }
]);

const pagesProvider = (
  <RouterProvider router={router_} />
);

type RouterType = typeof pagesProvider;

export function PagesRouter(): RouterType {
  return pagesProvider;
}