import React from 'react'
import { useState, useEffect } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    
    const getData = () => {
        fetch("http://localhost:3001/api/v1/users")
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setUsers(data)
                        setError(null);
                    });
                } else {
                    setError("Hubo un error al obtener datos"); // ⬅️ hubo un problema HTTP 4XX o 5XX}
                }
            }).catch((error) => { // ⬅️ hubo un problema que no permitió hacer la solicitud
                setError("No pudimos hacer la solicitud para obtener datos");
              });

    };
  
    useEffect(() => getData(), []);
  
    const usersList = users.map((user, index) => {
        return <div key={index}>{user.name}</div>;
    });
    if (error) { // ⬅️ mostramos el error (si es que existe)
        return (
          <div className="App">
            <h1>{error}</h1>
              </div>
        );
      }
    return (
        <>
            <h1>Users</h1>
            {usersList}
        </>

    )
}

export default Users