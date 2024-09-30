import React, { useState, useEffect } from 'react';

const AgentBusqueda=() => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '20px',
    FontSize: '60%',
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
    
    fetch("https://api-nodejs-agentes.onrender.com/api/v1/agentes")
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
          }).finally(() => {
            setIsLoaded(true);       // Ocultar loader al terminar
        });

};

useEffect(() => getData(), []);




  // Función para filtrar la lista de agentes basada en el término de búsqueda
  const filteredAgentes = agentes.filter((agente) => {
    // Si el término de búsqueda está vacío, devolver todos los agentes
    if (!searchTerm) return true;

    // Convertimos todo a minúsculas para una búsqueda sin distinción de mayúsculas
    const lowercasedSearchTerm = String(searchTerm).toLowerCase();

    // Verificamos si alguno de los campos contiene el término de búsqueda
    return (
        String(agente.codigo).toLowerCase().includes(lowercasedSearchTerm) & // Búsqueda por código
        String(agente.campo).toLowerCase().includes(lowercasedSearchTerm) &  // Búsqueda en todos los demás campos
        String(agente.energia).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.frecuencia).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.corriente).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.agente).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.tecnica).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.patologias).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.protocolos).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.evidencia).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.tendencia).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.legal).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.consentimiento).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.indicaciones).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.contraindicaciones).toLowerCase().includes(lowercasedSearchTerm) ||
        String(agente.equipos).toLowerCase().includes(lowercasedSearchTerm)
      );
  });

  return (
    <>
       {error && <p>Error: {error}</p>} {/* Mostrar errores si los hay */}
      {!isLoaded ? (
        <p>Cargando...</p>
      ) : (
        <div>
        
        <h1>Agentes</h1>
  
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por código o término..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el término de búsqueda
        />
  
        {agentes && (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>CAMPO</th>
                <th>ENERGÍA</th>
                <th>FRECUENCIA</th>
                <th>CORRIENTE</th>
                <th>AGENTE</th>
                <th>TÉCNICA</th>
                <th>PATOLOGÍA</th>
                <th>PROTOCOLOS</th>
                <th>EVIDENCIA</th>
                <th>TENDENCIA</th>
                <th>LEGAL</th>
                <th>consentimiento</th>
                <th>INDICACIONES</th>
                <th>CONTRAINDICACIONES</th>
                <th>EQUIPOS</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamos la lista filtrada */}
              {filteredAgentes.map((agente) => (
                <tr key={agente.codigo}>
                    <td style={cellStyle}>{agente.codigo}</td>
                    <td style={cellStyle}>{agente.campo}</td>
                    <td style={cellStyle}>{agente.energia}</td>
                    <td style={cellStyle}>{agente.frecuencia}</td>
                    <td style={cellStyle}>{agente.corriente}</td>
                    <td style={cellStyle}>{agente.agente}</td>
                    <td style={cellStyle}>{agente.tecnica}</td>
                    <td style={cellStyle}>{agente.patologias}</td>
                    <td style={cellStyle}>{agente.protocolos}</td>
                    <td style={cellStyle}>{agente.evidencia}</td>
                    <td style={cellStyle}>{agente.tendencia}</td>
                    <td style={cellStyle}>{agente.legal}</td>
                    <td style={cellStyle}>{agente.consentimiento}</td>
                    <td style={cellStyle}>{agente.indicaciones}</td>
                    <td style={cellStyle}>{agente.contraindicaciones}</td>
                    <td style={cellStyle}>{agente.equipos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      )}
    
    
    </>
   
  );
}

export default AgentBusqueda;
