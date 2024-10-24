import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Tecnicas =  ({ apiUrl }) => {
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

  const [Tecnicas, setTecnicas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = () => {
    setIsLoaded(false); // Mostrar loader
    setError(null); // Limpiar errores previos

    fetch(`${apiUrl}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setTecnicas(data);
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

  // Función para eliminar un Tecnica
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      try {
        const response = await fetch(
          `${"http://localhost:3001/api/v1/tecnicas"}/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Actualizamos el estado eliminando el Tecnica localmente
          setTecnicas((prevTecnicas) =>
            prevTecnicas.filter((Tecnica) => Tecnica.id !== id)
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

  const TecnicasList = Tecnicas.map((Tecnica, index) => {
    return (
      <tr key={index}>
        <td style={cellStyle}>
          <Link
            className="nav-link active"
            to={`/protected/Tecnicas/edit/${Tecnica.id}`}
            aria-current="page"
          >
            {Tecnica.codigo}
          </Link>
        </td>
        <td style={cellStyle}>{Tecnica.campo}</td>
        <td style={cellStyle}>
          {Tecnica.energia}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.frecuencia}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.corriente}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.agente}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.tecnica}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.patologia}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.protocolo}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.evidencia}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.tendencia}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.legal}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.consentimiento}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.indicacion}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.contraindicacion}
          <span className="visually-hidden">(current)</span>
        </td>
        <td style={cellStyle}>
          {Tecnica.equipo}
          <span className="visually-hidden">(current)</span>
        </td>
        <td>
          {/* Enlace para editar el registro */}
          <Link
            className="nav-link active"
            to={`/protected/Tecnicas/edit/${Tecnica.id}`}
            aria-current="page"
          >
            Editar
          </Link>
          {/* Botón para eliminar el registro */}
          <button onClick={() => handleEliminar(Tecnica.id)}>Eliminar</button>
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
        Tecnicas && (
          <div>
            {" "}
            <h1>Tecnicas</h1>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>CÓDIGO</th> <th>CAMPO</th> <th>ENERGÍA</th>
                  <th>FRECUENCIA</th> <th>CORRIENTE</th> <th>Agente</th>{" "}
                  <th>TÉCNICA</th>
                  <th>PATOLOGÍA</th> <th>PROTOCOLOS</th> <th>EVIDENCIA</th>
                  <th>TENDENCIA</th> <th>LEGAL</th> <th>CONSENTIMIENTOS</th>
                  <th>INDICACIONES</th>
                  <th>CONTRAINDICACIONES</th>
                  <th>EQUIPOS</th>
                </tr>
              </thead>
              <tbody>{TecnicasList}</tbody>
            </table>
          </div>
        )
      )}{" "}
      {/* Mostrar loader */}
    </>
  );
};

export default Tecnicas;
