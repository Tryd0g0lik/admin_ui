/**
 * src/components/Router.tsx
 */
import React from "react";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainFC } from "src/components/Main";

const router_ = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <MainFC />
      </div>
    )
  }
],
  {
    future: {
      v7_relativeSplatPath: true,
    }
  }
);

const pagesProvider = (
  <RouterProvider router={router_} future={{

    v7_startTransition: true,
  }} />
);

type RouterType = typeof pagesProvider;

export function PagesRouter(): RouterType {
  return pagesProvider;
}
