import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Agentes from "./components/Agentes.jsx";
import AgentBusqueda from "./components/AgentesBusqueda.jsx";
import React from "react";
import Layout from "./components/Layout.tsx";
import Home from "./components/Home.jsx";
import FormAgentes from "./components/FormAgentes.jsx";



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
      {
        path: "protected/agentesbusqueda",
       // loader: protectedLoader,
        Component: AgentBusqueda,
      },
      {
        path: "protected/agentes/create",  // Ruta para crear un nuevo registro
        Component: () => <FormAgentes apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/agentes" />,
      },
      {
        path: "protected/agentes/edit/:id",  // Ruta para editar un registro existente
        Component: () => <FormAgentes apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/agentes" />,
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
