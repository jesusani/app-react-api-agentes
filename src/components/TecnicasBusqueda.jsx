import React, { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";
import TecnicasList from "./TecnicasList";

const TecnicaBusqueda = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para manejar el término de búsqueda
  const [filteredTecnicas, setFilteredTecnicas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Creamos una referencia para el campo de búsqueda
  const searchInputRef = useRef(null);
  // Estilos
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    margin: "20px",
    fontSize: "60%",
  };

  const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  // Manejador de entrada de búsqueda con useCallback para evitar recreación innecesaria
  const handleSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  useEffect(() => {
    const fetchTecnicas = () => {
      setIsLoaded(false);
      setError(null);

      // fetch(`https://api-nodejs-agentes.onrender.com/api/v1/tecnicas/search?q=${searchTerm}`)
      fetch(`http://localhost:3001/api/v1/tecnicas/search?q=${searchTerm}`)
        .then((response) =>
          response.ok
            ? response.json()
            : Promise.reject("Hubo un error al obtener datos")
        )
        .then((data) => {
          setFilteredTecnicas(data);
          setError(null);
        })
        .catch(() =>
          setError("No pudimos hacer la solicitud para obtener datos")
        )
        .finally(() => setIsLoaded(true));
    };

    fetchTecnicas();
  }, [searchTerm]);

  
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Mandamos el foco al input de búsqueda
    }
  }, [isLoaded]); // Solo al cargar el componente

  return (
    <>
      {error && <p>Error: {error}</p>}
      {!isLoaded ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h1>Tecnicas</h1>

          {/* Input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar por código o término..."
            defaultValue={searchTerm} // Usa defaultValue para evitar la pérdida de foco
            onChange={(e) => handleSearch(e.target.value)}
            ref={searchInputRef} // Conectamos el input a la referencia
          />

          {filteredTecnicas.length > 0 ? (
            <TecnicasList
              tecnicas={filteredTecnicas}
              tableStyle={tableStyle}
              cellStyle={cellStyle}
            />
          ) : (
            <p>No se encontraron Tecnicas</p>
          )}
        </div>
      )}
    </>
  );
};

export default TecnicaBusqueda;
