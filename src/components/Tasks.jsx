import React from 'react'
import { useState, useEffect } from "react";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const getData = () => {
        fetch("http://localhost:3001/api/v1/tasks")
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setTasks(data);
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
  
    const tasksList = tasks.map((task, index) => {
        return <div key={index}>{task.name}</div>;
    });
    if (error) { // mostramos el error (si es que existe)
        return (
          <div className="App">
            <h1>{error}</h1>
              </div>
        );
      }
    return (
        <>
            <h1>tasks</h1>
            {tasksList}
        </>

    )
}

export default Tasks