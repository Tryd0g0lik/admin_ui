/**
 * src/components/Router.tsx
 */
import React from "react";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainFC } from "src/components/Main";
import { PostFC } from "src/components/Posts";
const router_ = createBrowserRouter([
  {
    path: "/admin_ui/",
    element: (
      <MainFC />
    ),
    loader: MainFC,
    children: [
      {
        path: "/posts/",
        element: <PostFC />,
        loader: PostFC
      },
    ],

  },
  {
    path: "/posts/",
    element: (
      <PostFC />
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
