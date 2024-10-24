import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FormTecnicas = ({ apiUrl }) => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    codigo: '',
    campo: '',
    energia: '',
    frecuencia: '',
    corriente: '',
    agent: '',
    tecnic: '',
    patologia: '',
    protocolo: '',
    evidencia: '',
    tendencia: '',
    legal: '',
    consentimiento: '',
    indicacion: '',
    contraindicacion: '',
    equipo: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contraindicaciones, setContraindicaciones] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [indicaciones, setIndicaciones] = useState([]);
  const [legales, setLegales] = useState([]);
  const [evidencias, setEvidencias] = useState([]);
  const [tendencias, setTendencias] = useState([]);
  const [corrientes, setCorrientes] = useState([]);
  const [frecuencias, setFrecuencias] = useState([]);
  const [tecnicasList, setTecnicasList] = useState([]);
  const [agentesList, setAgentesList] = useState([]);
  const [codigos, setCodigos] = useState([]);
  const [campos, setCampos] = useState([]);
  const [energias, setEnergias] = useState([]);
  const [patologias, setPatologias] = useState([]);
  const [protocolos, setProtocolos] = useState([]);
  const [consentimientos, setConsentimientos] = useState([]);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiUrl}/${id}`);
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error('Error al cargar los datos para edición:', error);
        }
      };
      fetchData();
    }
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditing) {
        response = await fetch(`${apiUrl}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        alert(isEditing ? 'Registro actualizado con éxito' : 'Registro creado con éxito');
      } else {
        alert('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('Datos que se enviarán:', formData);

  };

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/listados/")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        return response.json();
      })
      .then((data) => {
        setAgentesList(data.agenteslist);
        setTecnicasList(data.tecnicaslist);
        setPatologias(data.patologias);
        setCampos(data.campos);
        setCodigos(data.codigos);
        setContraindicaciones(data.contraindicaciones);
        setCorrientes(data.corrientes);
        setEnergias(data.energias);
        setFrecuencias(data.frecuencias);
        setEquipos(data.equipos);
        setEvidencias(data.evidencias);
        setIndicaciones(data.indicaciones);
        setLegales(data.legales);
        setConsentimientos(data.consentimientos);
        setProtocolos(data.protocolos);
        setTendencias(data.tendencias);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Hubo un problema con la solicitud Fetch:', error);
        setLoading(false);
      });
  }, []);

    // Diccionario para mapear cada campo con su respectiva lista
   
  const fieldMap = {
    codigo: codigos,
    campo: campos,
    energia: energias,
    frecuencia: frecuencias,
    corriente: corrientes,
    consentimiento: consentimientos,
    patologia: patologias,
    protocolo: protocolos,
    evidencia: evidencias,
    tendencia: tendencias,
    legal: legales,
    indicacion: indicaciones,
    contraindicacion: contraindicaciones,
    equipo: equipos,
  };


  const handleBlur = (e) => {
    const { name, value } = e.target;


    if (value && !fieldMap[name].includes(value)) {
      const setFunctionMap = {
        codigo: setCodigos,
        campo: setCampos,
        energia: setEnergias,
        frecuencia: setFrecuencias,
        corriente: setCorrientes,
        agent: setAgentesList,
        tecnic: setTecnicasList,
        patologia: setPatologias,
        protocolo: setProtocolos,
        evidencia: setEvidencias,
        tendencia: setTendencias,
        consentimiento: setConsentimientos,
        legal: setLegales,
        indicacion: setIndicaciones,
        contraindicacion: setContraindicaciones,
        equipo: setEquipos,
      };

      setFunctionMap[name]((prev) => [...prev, value]);
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Editar Registro' : 'Crear Registro'}</h1>
      <form onSubmit={handleSubmit}>
      <div key="tecnica">
            <label>TECNICA</label>
            <input
              list="tecnicasList-list"
              id="tecnica-select"
              name="tecnic"
              value={formData.tecnic}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
            />
            <datalist id="tecnicasList-list">
              {(tecnicasList || []).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </datalist>
          </div> 
          <div key="agente">
            <label>AGENTE</label>
            <input
              list="agentes-list"
              id="agentes"
              name="agent"
              value={formData.agent}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
            />
            <datalist id="agentes-list">
              {(agentesList|| []).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </datalist>
          </div>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label>{field.toUpperCase()}</label>
            <input
              list={`${field}-list`}
              id={`${field}-select`}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
            />
            <datalist id={`${field}-list`}>
              {(fieldMap[field] || []).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </datalist>
          </div>
        ))}

        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default FormTecnicas;
