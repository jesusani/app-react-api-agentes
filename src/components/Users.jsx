import React from 'react'
import { useState, useEffect } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const getData = () => {

        const token = sessionStorage.getItem('jwtToken'); // Asumimos que el JWT está almacenado en localStorage
        if (!token) {
            setError('Token no encontrado');
            return;
        }

        fetch("http://localhost:3001/api/v1/protected/users", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // JWT se envía en el encabezado de Authorization
            }
          })
            .then((response) => {
              if (!response.ok) {
                // Si la respuesta no es 2XX (4XX, 5XX), lanzar un error para el bloque catch
                throw new Error("Hubo un error al obtener datos: " + response.statusText);
              }
              return response.json(); // Continuar parseando el JSON
            })
            .then((data) => {
              setUsers(data); // Guardar los usuarios en el estado
              console.log(data); // Opcional: log para verificar la data recibida
              setError(null); // Asegurarse de que no haya error si la solicitud es exitosa
            })
            .catch((error) => {
              // Manejo de cualquier error (de red o respuesta no exitosa)
              console.error(error); // Registrar el error para más detalles
              setError("No pudimos obtener los datos: " + error.message); // Mens
            });
          

    };

    useEffect(() => getData(), []);


    /*      const usersList = users.map((user, index) => {
                return (
                    <div key={index}>
                        name: {user.name} -  email: {user.email} - rol: {user.rol} - token: {user.token}
                    </div>
                );

            }); */
 

    if (error) { // ⬅️ mostramos el error (si es que existe)
        return (
            <div className="App">
                <h1>{error}</h1>
            </div>
        );
    }
    return (
        <>
        
            {users &&  (    <div>    <h1>Users</h1>
                          {/*  {usersList} */}
                    </div> )}
        </>

    )
}

export default Users