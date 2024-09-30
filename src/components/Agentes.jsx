import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Agentes = () => {
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    margin: "20px",
    FontSize: "60%",
  };

  const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const [agentes, setAgentes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = () => {
    setIsLoaded(false); // Mostrar loader
    setError(null); // Limpiar errores previos

    fetch("https://api-nodejs-agentes.onrender.com/api/v1/agentes")
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setAgentes(data);
            setError(null);
          });
        } else {
          setError("Hubo un error al obtener datos"); // ⬅️ hubo un problema HTTP 4XX o 5XX}
        }
      })
      .catch((error) => {
        // ⬅️ hubo un problema que no permitió hacer la solicitud
        setError("No pudimos hacer la solicitud para obtener datos");
      })
      .finally(() => {
        setIsLoaded(true); // Ocultar loader al terminar
      });
  };

  useEffect(() => getData(), []);

  // Función para eliminar un agente
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      try {
        const response = await fetch(
          `${"https://api-nodejs-agentes.onrender.com/api/v1/agentes"}/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Actualizamos el estado eliminando el agente localmente
          setAgentes((prevAgentes) =>
            prevAgentes.filter((agente) => agente.id !== id)
          );
          alert("Registro eliminado con éxito");
        } else {
          alert("Error al eliminar el registro");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud de eliminación:", error);
        alert("Error al eliminar el registro");
      }
    }
  };

  const agentesList = agentes.map((agente, index) => {
    return (
      <tr key={index}>
        <td style={cellStyle}>
          <Link
            className="nav-link active"
            to={`/protected/agentes/edit/${agente.id}`}
            aria-current="page"
          >
            {agente.codigo}
          </Link>
        </td>
        <td style={cellStyle}>{agente.campo}</td>
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
          {agente.patologias}
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
          {agente.tendencia}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {agente.legal}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {agente.consentimiento}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {agente.indicaciones}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {agente.contraindicaciones}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {agente.equipos}
          <span className="visually-hidden">(current)</span>
        </td>
        <td>
          {/* Enlace para editar el registro */}
          <Link
            className="nav-link active"
            to={`/protected/agentes/edit/${agente.id}`}
            aria-current="page"
          >
            Editar
          </Link>
          {/* Botón para eliminar el registro */}
          <button onClick={() => handleEliminar(agente.id)}>Eliminar</button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {error && <p>Error: {error}</p>} {/* Mostrar errores si los hay */}
      {!isLoaded ? (
        <p>Cargando...</p>
      ) : (
        agentes && (
          <div>
            {" "}
            <h1>Agentes</h1>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>CÓDIGO</th> <th>CAMPO</th> <th>ENERGÍA</th>
                  <th>FRECUENCIA</th> <th>CORRIENTE</th> <th>AGENTE</th>{" "}
                  <th>TÉCNICA</th>
                  <th>PATOLOGÍA</th> <th>PROTOCOLOS</th> <th>EVIDENCIA</th>
                  <th>TENDENCIA</th> <th>LEGAL</th> <th>CONSENTIMIENTOS</th>
                  <th>INDICACIONES</th>
                  <th>CONTRAINDICACIONES</th>
                  <th>EQUIPOS</th>
                </tr>
              </thead>
              <tbody>{agentesList}</tbody>
            </table>
          </div>
        )
      )}{" "}
      {/* Mostrar loader */}
    </>
  );
};

export default Agentes;
