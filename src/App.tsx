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
import FormTecnicas from "./components/Formtecnicas.jsx";
import Tecnicas from "./components/Tecnicas.jsx";
import TecnicaBusqueda from "./components/TecnicasBusqueda.jsx";



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
      {      path: "protected/tecnicas",
        // loader: protectedLoader,
         Component: Tecnicas,
       }, 
       {
         path: "protected/tecnicasbusqueda",
        // loader: protectedLoader,
         Component: TecnicaBusqueda,
       },
       {
         path: "protected/tecnicas/create",  // Ruta para crear un nuevo registro
         Component: () => <FormTecnicas apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/tecnicas" />,
       },
       {
        path: "protected/agentes/edit/:id",  // Ruta para editar un registro existente
        Component: () => <FormAgentes apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/agentes" />,
      },
      {
       path: "protected/tecnicas/edit/:id",  // Ruta para editar un registro existente
       Component: () => <FormTecnicas apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/tecnicas" />,
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
