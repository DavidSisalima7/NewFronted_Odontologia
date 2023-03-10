import React, { useContext, useState } from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { PersonContext } from "../contexts/PersonContext";
import PersonForm from "./RegisterPerson";
import "../../../Styles/css/Register-person.css";
import moment from 'moment';

export const PersonList = () => {
  const { persons, findPerson } = useContext(PersonContext);

  const [isVisible, setIsVisible] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Buscar por N° Cédula o Nombre"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  const savePerson = (id) => {
    findPerson(id);
    setIsVisible(true);
  };

  return (
    <div className="fichaP">
      <div className="container" id="container">
        <Panel
          header="LISTA DE PERSONAS"
          style={{
            textAlign: "center",
            marginBottom: "200px",
            marginTop: "100px",
            marginLeft:"-200px",
            width: "1300px"
          }}
        >
          <DataTable
            paginator
            rows={10}
            dataKey="id"
            filters={filters}
            globalFilterFields={["cedula", "nombre", /* "enabled" */]}
            filterDisplay="row"
            header={header}
            emptyMessage="Cero Datos Encontrados"
            value={persons}
            selectionMode="single"
            onSelectionChange={(e) => savePerson(e.value.cedula)}
          >
            <Column field="cedula" header="N° Cédula" />
            <Column field="nombre" header="Nombres" />
            <Column field="apellido" header="Apellidos" />
            <Column field="email" header="Correo Electrónico" />
            <Column field="fechaNac" header="Fecha de Nacimiento" /* body={(rowData) => {
                  return moment(rowData.fechaNac).format('yyyy-MM-DD')
                }}  *//>
            <Column field="celular" header="N° Celular" />
            <Column field="direccion" header="Dirección" />
            <Column field="telefono" header="N° Teléfono" />
          </DataTable>
        </Panel>

        <PersonForm isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>
    </div>
  );
};

export default PersonList;
