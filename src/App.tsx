import type { LoaderFunctionArgs } from "react-router-dom";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth/auth.ts";
import Agentes from "./components/Agentes.jsx";
import Users from "./components/Users.jsx";
import Login from "./components/Login.tsx";
import React from "react";
import Layout from "./components/Layout.tsx";
import Cervezas from "./components/Cervezas.jsx";
import Tasks from "./components/Tasks.jsx";
import Home from "./components/Home.jsx";



const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: Login,
      },
      {
        path: "protected/users",
        loader: protectedLoader,
        Component: Users,
      },
      {
        path: "protected/cervezas",
        loader: protectedLoader,
        Component: Cervezas,
      },
      {
        path: "protected/tasks",
        loader: protectedLoader,
        Component: Tasks,
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
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}



async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let username = formData.get("username") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}




function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!fakeAuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

