import React from "react";
import {
    Form,
    useActionData,
    useLocation,
    useNavigation,
  } from "react-router-dom";
  //import type { LoaderFunctionArgs } from "react-router-dom";

export  default function Login() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";
  
    let navigation = useNavigation();
    let isLoggingIn = navigation.formData?.get("username") != null;
  
    let actionData = useActionData() as { error: string } | undefined;
  
    return (
      <div>
        <p>You must log in to view the page at {from}</p>
  
        <Form method="post" replace>
          <input type="hidden" name="redirectTo" value={from} />
          <label>
            Username: <input name="username" />
          </label>{" "}
          <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
          {actionData && actionData.error ? (
            <p style={{ color: "red" }}>{actionData.error}</p>
          ) : null}
        </Form>
      </div>
    );
  }