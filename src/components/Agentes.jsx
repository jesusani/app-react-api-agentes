import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Agentes = () => {

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        fontSize: '60%',
        margin: '20px',
      };
    
      const cellStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
      };



    const [agentes, setAgentes] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const getData = () => {
        setIsLoaded(false);  // Mostrar loader
        setError(null);    // Limpiar errores previos

        fetch("http://localhost:3001/api/v1/agentes")
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {

                        setAgentes(data);
                       
                        setError(null);
                    });
                } else {
                    setError("Hubo un error al obtener datos"); // ⬅️ hubo un problema HTTP 4XX o 5XX}
                }
            }).catch((error) => { // ⬅️ hubo un problema que no permitió hacer la solicitud
                setError("No pudimos hacer la solicitud para obtener datos");
            }).finally(() => {
                setIsLoaded(true);       // Ocultar loader al terminar
            });

    };

    useEffect(() => getData(), []);

     const agentesList = agentes.map((agente, index) => {
        return (
            <tr  key={index}  >
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.codigo} 
                          
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.campo} 
                          
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.energia} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.frecuencia} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.corriente} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.agente} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
                    <td style={cellStyle}>
                        <a className="nav-link active" href="#" aria-current="page">
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </td>
            </tr>
  
        );
    });

 
    return (

        <>

            {!isLoaded && <p>Cargando...</p>} {/* Mostrar loader */}

            {error && <p>Error: {error}</p>} {/* Mostrar errores si los hay */}

            {agentes && (
                <div>  <h1>Agentes</h1>
                <table  style={tableStyle}>
                    <thead>
                       <tr><th>CÓDIGO</th> <th>CAMPO</th> <th>ENERGÍA</th><th>FRECUENCIA</th> <th>CORRIENTE</th> <th>AGENTE</th> <th>TÉCNICA</th>                    
                    <th>PATOLOGÍA</th> <th>PROTOCOLOS</th> <th>EVIDENCIA</th><th>TENDENCIA</th> <th>LEGAL</th> <th>CONSENTIMIENTOS</th> <th>INDICACIONES</th>
                    <th>CONTRAINDICACIONES</th><th>EQUIPOS</th> 
                        </tr> 
                    </thead>
                    <tbody>
                           {agentesList}
                    </tbody>
                  
                </table> </div>
            )}


        </>

    )
}

export default Agentes