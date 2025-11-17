import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import agentes from "./components/agentes.jsx";
import agentbusqueda from "./components/agentesbusqueda.jsx";
import react from "react";
import layout from "./components/layout.tsx";
import home from "./components/home.jsx";
import formagentes from "./components/formagentes.jsx";
import formtecnicas from "./components/formtecnicas.jsx";
import tecnicas from "./components/tecnicas.jsx";
import tecnicabusqueda from "./components/tecnicasbusqueda.jsx";
import { protectedloader } from "./components/ProtectedLoader.tsx";



const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    component: layout,
    children: [
      {
        index: true,
        component: home,
      },
      {
        path: "protected/agentes",
        loader: protectedloader,
        component: agentes,
      }, 
      {
        path: "protected/agentesbusqueda",
        loader: protectedloader,
        component: agentbusqueda,
      },
      {
        path: "protected/agentes/create", 
        loader: protectedloader, // ruta para crear un nuevo registro
        component: () => <formagentes apiurl="https://api-nodejs-agentes.onrender.com/api/v1/agentes" />,
      },

      {      
        path: "protected/tecnicas",
        loader: protectedloader,
        component: () => <tecnicas apiurl="https://api-nodejs-agentes.onrender.com/api/v1/tecnicas" />,
       }, 
       {
         path: "protected/tecnicasbusqueda",
         loader: protectedloader,
         component: tecnicabusqueda,
       },
       {
         path: "protected/tecnicas/create",  // ruta para crear un nuevo registro
          loader: protectedloader,
         component: () => <formtecnicas apiurl="https://api-nodejs-agentes.onrender.com/api/v1/tecnicas" />,
       },
       {
        path: "protected/agentes/edit/:id",  // ruta para editar un registro existente
        loader: protectedloader,
        component: () => <formagentes apiurl="https://api-nodejs-agentes.onrender.com/api/v1/agentes" />,
      },
      {
       path: "protected/tecnicas/edit/:id",  // ruta para editar un registro existente
        loader: protectedloader,
       component: () => <formtecnicas apiurl="https://api-nodejs-agentes.onrender.com/api/v1/tecnicas" />,
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
    <routerprovider router={router} fallbackelement={<p>initial load...</p>} />
  );
}
