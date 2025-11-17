// ./components/protectedloader.tsx
import { redirect } from "react-router-dom";

export async function protectedloader() {
  // 1. Obtener el token (ejemplo: guardado en localStorage)
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Si no hay token, redirigimos al login
    throw redirect("/login");
  }

  try {
    // 2. Validar el token contra tu API
    const response = await fetch("https://api-nodejs-agentes.onrender.com/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Si la API devuelve error (token inválido/expirado)
      throw redirect("/login");
    }

    // 3. Devolver los datos del usuario autenticado
    const user = await response.json();
    return { user };
  } catch (error) {
    console.error("Error en protectedLoader:", error);
    throw redirect("/login");
  }
}
