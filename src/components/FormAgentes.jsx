import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el id si es edición

const FormAgentes = ({ apiUrl }) => {
  const { id } = useParams(); // Obtiene el ID de la URL (si existe)
  const [formData, setFormData] = useState({
    codigo: '',
    campo: '',
    energia: '',
    frecuencia: '',
    corriente: '',
    agente: '',
    tecnica: '',
    patologias: '',
    protocolos: '',
    evidencia: '',
    tendencia: '',
    legal: '',
    consentimiento: '',
    indicaciones: '',
    contraindicaciones: '',
    equipos: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Cargar los datos si estamos en modo de edición
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      // Llamada a la API para obtener los datos del registro que se va a editar
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

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario para crear o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditing) {
        // Si es edición, hacer PUT
        response = await fetch(`${apiUrl}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Si es creación, hacer POST
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
  };

  return (
    <div>
      <h1>{isEditing ? 'Editar Registro' : 'Crear Registro'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CÓDIGO</label>
          <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} />
        </div>
        <div>
          <label>CAMPO</label>
          <input type="text" name="campo" value={formData.campo} onChange={handleChange} />
        </div>
        <div>
          <label>ENERGÍA</label>
          <input type="text" name="energia" value={formData.energia} onChange={handleChange} />
        </div>
        <div>
          <label>FRECUENCIA</label>
          <input type="text" name="frecuencia" value={formData.frecuencia} onChange={handleChange} />
        </div>
        <div>
          <label>CORRIENTE</label>
          <input type="text" name="corriente" value={formData.corriente} onChange={handleChange} />
        </div>
        <div>
          <label>AGENTE</label>
          <input type="text" name="agente" value={formData.agente} onChange={handleChange} />
        </div>
        <div>
          <label>TÉCNICA</label>
          <input type="text" name="tecnica" value={formData.tecnica} onChange={handleChange} />
        </div>
        <div>
          <label>PATOLOGÍA</label>
          <input type="text" name="patologia" value={formData.patologia} onChange={handleChange} />
        </div>
        <div>
          <label>PROTOCOLOS</label>
          <input type="text" name="protocolos" value={formData.protocolos} onChange={handleChange} />
        </div>
        <div>
          <label>EVIDENCIA</label>
          <input type="text" name="evidencia" value={formData.evidencia} onChange={handleChange} />
        </div>
        <div>
          <label>TENDENCIA</label>
          <input type="text" name="tendencia" value={formData.tendencia} onChange={handleChange} />
        </div>
        <div>
          <label>LEGAL</label>
          <input type="text" name="legal" value={formData.legal} onChange={handleChange} />
        </div>
        <div>
          <label>CONSENTIMIENTOS</label>
          <input type="text" name="consentimientos" value={formData.consentimientos} onChange={handleChange} />
        </div>
        <div>
          <label>INDICACIONES</label>
          <input type="text" name="indicaciones" value={formData.indicaciones} onChange={handleChange} />
        </div>
        <div>
          <label>CONTRAINDICACIONES</label>
          <input type="text" name="contraindicaciones" value={formData.contraindicaciones} onChange={handleChange} />
        </div>
        <div>
          <label>EQUIPOS</label>
          <input type="text" name="equipos" value={formData.equipos} onChange={handleChange} />
        </div>
        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default FormAgentes;
