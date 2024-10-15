import React, { useState, useEffect, useCallback } from 'react'; 

const TecnicaBusqueda = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda
  const [filteredTecnicas, setFilteredTecnicas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Estilos
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '20px',
    fontSize: '60%',
  };

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  // Función para filtrar Tecnicas
  const filtradoTecnicas = useCallback(() => {
    setIsLoaded(false);
    setError(null);
 
    fetch(`https://api-nodejs-agentes.onrender.com/api/v1/tecnicas/search?q=${searchTerm}`)
      .then((response) => response.ok ? response.json() : Promise.reject('Hubo un error al obtener datos'))
      .then((data) => {
        setFilteredTecnicas(data);
        setError(null);
      })
      .catch(() => setError("No pudimos hacer la solicitud para obtener datos"))
      .finally(() => setIsLoaded(true));
  }, [searchTerm]);

  useEffect(() => {
    filtradoTecnicas();
  }, [filtradoTecnicas]);

  return (
    <>
      {error && <p>Error: {error}</p>} {/* Mostrar errores si los hay */}
      {!isLoaded ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h1>Tecnicas</h1>

          {/* Input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar por código o término..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredTecnicas.length > 0 ? (
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
                  <th>CONSENTIMIENTO</th>
                  <th>INDICACIONES</th>
                  <th>CONTRAINDICACIONES</th>
                  <th>EQUIPOS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTecnicas.map((agente) => (
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
          ) : (
            <p>No se encontraron Tecnicas</p>
          )}
        </div>
      )}
    </>
  );
};

export default TecnicaBusqueda;
