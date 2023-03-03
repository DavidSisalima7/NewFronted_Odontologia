import "../../Styles/css/Odontogram.css";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import PiezasForm from "./PiezasForm";
import { PiezaContext } from "./PiezaContext";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
export const HistorialPieza = () => {
  // Codigo para llenar la tabla segun un array
  const { findPieza, piezas } = useContext(PiezaContext);
  const history = useHistory();

  const redireccion =()=>(
    history.push({
      pathname: "/ficha",
    })
  )
  //Aqui llega el id de odontograma
  let location = useLocation();
  console.log(location.state.idF);

  //Para el dialog de la creacion de pieza y el otro
  const [idondonto,setIdodonto]=useState(location.state.idF);
  const toast = useRef(null);
  
  const savePieza = (id) => { 
    findPieza(id);
    setIsVisible(true);
  };

  //HTML
  return (
    <>
      <div className="card">
        <Toast ref={toast} />
        {/* Card de el odontograma y la tabla de piezas */}
        <div className="linea">
          <Card className="table">
            {/* Tabla de piezas */}
            <DataTable
              value={piezas
                //Filtro para piezas con el id del odontograma
                .filter((p) => p.odontograma.id_odontograma === idondonto)}
              responsiveLayout="scroll"
              style={{ textAlign: "center" }}
              selectionMode="single"
              onSelectionChange={(e) => savePieza(e.value.id_pieza)}
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
            <Divider />
            {/* Boton para Confirmar los cambios */}
            <div style={{ paddingLeft: "40%" }}>
              <Button label="GUARDAR" icon="pi pi-check" autoFocus onClick={redireccion}/>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
