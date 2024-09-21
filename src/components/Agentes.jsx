import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Agentes = () => {

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        margin: '20px',
      };
    
      const cellStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
      };


    const [agentes, setAgentes] = useState([]);
    const [error, setError] = useState(null);

    const getData = () => {
        fetch("http://localhost:3001/api/v1/agentes")
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setAgentes(data)
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
            </tr>
  
        );
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
            <h1>Agentes</h1>
        <table  style={tableStyle}>
            <thead>
                
                <th >código</th> <th >campo</th> <th>energía</th>
                <th >frecuencia</th> <th >corriente</th> <th >agente</th> <th>tecnica</th>
                
            </thead>
            <tbody>
                   {agentesList}
            </tbody>
          
        </table>
           

           
        </>

    )
}

export default Agentes