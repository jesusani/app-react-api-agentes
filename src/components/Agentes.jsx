import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Agentes = () => {

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        margin: '20px',
        fontSize: '60%'
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
                    <a className="nav-link active" href="./agentes" aria-current="page">
                            {agente.codigo} 
                          
                            </a>
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.campo} 
                          
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.energia} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.frecuencia} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.corriente} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.agente} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.tecnica} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.patologia} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.protocolos} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.evidencia} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.tendecias} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.legal} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.consetimientos} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.indicaciones} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.contraindicacion} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
                    <td style={cellStyle}>
                         
                            {agente.equipos} 
                            <span className="visually-hidden">(current)</span>
                          
                    </td>
            </tr>
  
        )
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
                    <th>PATOLOGÍA</th> <th>PROTOCOLOS</th> <th>EVIDENCIA</th><th>TENDENCIA</th> <th>LEGAL</th> <th>CONSENTIMIENTOS</th> 
                    <th>INDICACIONES</th><th>CONTRAINDICACIONES</th><th>EQUIPOS</th> 
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