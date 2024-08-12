import React, { useEffect, useState } from 'react';

const Cervezas = () => {

    const [cervezas, setCervezas] = useState([]);
    const [error, setError] = useState(null);
    const getData = () => {
        fetch("http://localhost:3001/api/v1/cervezas")
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setCervezas(data)
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
  
    const cervezasList = cervezas.map((cerveza, index) => {
        return <div key={index}>{cerveza.name}</div>;
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
            <h1>cervezas</h1>
            {cervezasList}
        </>

    )
}

export default Cervezas