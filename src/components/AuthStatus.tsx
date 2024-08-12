import React from "react";
import { useFetcher, useRouteLoaderData } from "react-router-dom";

export default function AuthStatus() {
    // Get our logged in user, if they exist, from the root route loader data
    let { user } = useRouteLoaderData("root") as { user: string | null };
    let fetcher = useFetcher();

    if (!user) {
        return (
            <div>
                <p>You are not logged in.</p>;
            </div>
            );
    }

    let isLoggingOut = fetcher.formData != null;

    return (
        <div >
            <p>Welcome {user}!</p>
            <fetcher.Form method="post" action="/logout">
                <button type="submit" disabled={isLoggingOut}>
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                </button>
            </fetcher.Form>
        </div>
    );
}