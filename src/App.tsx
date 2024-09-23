import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Agentes from "./components/Agentes.jsx";
import React from "react";
import Layout from "./components/Layout.tsx";
import Home from "./components/Home.jsx";



const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "protected/agentes",
       // loader: protectedLoader,
        Component: Agentes,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}
