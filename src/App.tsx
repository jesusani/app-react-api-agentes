import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Agentes from "./Components/agentes.jsx";
import Agentbusqueda from "./Components/agentesbusqueda.jsx";
import react from "react";
import Layout from "./Components/layout.tsx";
import Home from "./Components/home.jsx";
import Formagentes from "./Components/formagentes.jsx";
import Formtecnicas from "./Components/formtecnicas.jsx";
import Tecnicas from "./Components/tecnicas.jsx";
import Tecnicabusqueda from "./Components/tecnicasbusqueda.jsx";
import { protectedloader } from "./Components/ProtectedLoader.tsx";



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
        loader: protectedloader,
        Component: Agentes,
      }, 
      {
        path: "protected/agentesbusqueda",
        loader: protectedloader,
        Component: Agentbusqueda,
      },
      {
        path: "protected/agentes/create", 
        loader: protectedloader, // ruta para crear un nuevo registro
        Component: () => <Formagentes apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/agentes" />,
      },

      {      
        path: "protected/tecnicas",
        loader: protectedloader,
        Component: () => <Tecnicas apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/tecnicas" />,
       }, 
       {
         path: "protected/tecnicasbusqueda",
         loader: protectedloader,
         Component: Tecnicabusqueda,
       },
       {
         path: "protected/tecnicas/create",  // ruta para crear un nuevo registro
          loader: protectedloader,
         Component: () => <Formtecnicas apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/tecnicas" />,
       },
       {
        path: "protected/agentes/edit/:id",  // ruta para editar un registro existente
        loader: protectedloader,
        Component: () => <Formagentes apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/agentes" />,
      },
      {
       path: "protected/tecnicas/edit/:id",  // ruta para editar un registro existente
        loader: protectedloader,
       Component: () => <Formtecnicas apiUrl="https://api-nodejs-agentes.onrender.com/api/v1/tecnicas" />,
     },
    ],
  },
  {
    path: "/logout",
    async action() {
      // we signout in a "resource route" that we can hit from a fetcher.form
      return redirect("/");
    },
  },
]);

export default function app() {
  return (
    <RouterProvider router={router} fallbackElement={<p>initial load...</p>} />
  );
}
