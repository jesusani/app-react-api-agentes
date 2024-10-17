// TecnicasList.js
import React from 'react';

const TecnicasList = ({ tecnicas, tableStyle, cellStyle }) => {
  return (
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
        {tecnicas.map((agente, index) => (
          <tr key={index}>
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
  );
};

export default TecnicasList;
