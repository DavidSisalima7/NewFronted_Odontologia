import "../../Styles/css/Odontogram.css";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";
export const HistorialPieza = () => {

  const [piezas, setPiezas] = useState([]);
  const [tablaPiezas, setTablaPiezas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  useEffect(() => {
    peticionGet();
  }, [])
  const peticionGet = async () => {
    await axios.get("http://localhost:8080/api/pieza/listar")
      .then(response => {
        setPiezas(response.data);
        setTablaPiezas(response.data)
      }).catch(error => {
        console.log(error);
      })
  }
  const handleChange = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaPiezas.filter((elemento) => {
      if (elemento.tratamiento.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setPiezas(resultadosBusqueda);
  }
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Historial de Piezas</span>

    </div>
  );
  //HTML
  return (
    <>
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Nombre"
          onChange={handleChange}
        />
      </div>
      <div className="card">
        {/* Card de el odontograma y la tabla de piezas */}
        <div className="linea">
          <Card className="table" header={header}>
            {/* Tabla de piezas */}
            <DataTable
              value={piezas
                //Filtro para piezas con el id del odontograma
                // .filter((p) => p.odontograma.id_odontograma === idondonto)
              }
              responsiveLayout="scroll"
              style={{ textAlign: "center" }}
              selectionMode="single"

              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="id_pieza" header="ID"></Column>
              <Column
                field="fecha_creacion"
                header="Fecha"
                body={(rowData) => {
                  const fecha = new Date(rowData.fecha_creacion);
                  return fecha.toLocaleDateString();
                }}
              />
              <Column field="numero_pieza" header="PIEZA"></Column>
              <Column field="tratamiento" header="TRATAMIENTO"></Column>
              <Column field="cara_pieza" header="CARA"></Column>
            </DataTable>

            <br />
          </Card>
        </div>
      </div>
    </>
  );
};
