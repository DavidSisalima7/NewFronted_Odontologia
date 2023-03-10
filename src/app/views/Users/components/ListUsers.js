import React, { useContext, useEffect, useState } from "react";

import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../../Styles/css/Register-person.css";
import { UserContext } from "../contexts/UserContext";
import UserForm from "./FormUser";

export const UserList = () => {
  const { users, findUser } = useContext(UserContext);

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
            placeholder="Buscar por N° de Cédula o Nombre de Usuario"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  const saveUser = (id) => {
    findUser(id);
    setIsVisible(true);
  };

  return (
    <div className="fichaP">
      <div className="container" id="container">
        <Panel
          header="LISTA DE USUARIOS"
          style={{
            textAlign: "center",
            marginBottom: "200px",
            marginTop: "100px",
          }}
        >
          <DataTable
            paginator
            rows={10}
            dataKey="id"
            filters={filters}
            globalFilterFields={[
              "username",
              "persona.cedula", /* 'enabled' */,
            ]}
            filterDisplay="row"
            header={header}
            emptyMessage="Ningun Usuario Encontrado"
            value={users}
            selectionMode="single"
            rowsPerPageOptions={[5, 10, 25, 50]}
            responsiveLayout="scroll"
            style={{ textAlign: "center" }}
            onSelectionChange={(e) => saveUser(e.value.username)}
          >
            <Column
              field="username"
              header="Nombre de Usuario"
              filterField="users.username"
            />
            <Column field="persona.cedula" header="N° de Cédula" />
            <Column field="persona.nombre" header="Nombre" />
            <Column field="persona.apellido" header="Apellido" />
            <Column field="rol.rolNombre" header="Rol" />
            {/* <Column field="enabled" header="Habilitado" /> */}
          </DataTable>
        </Panel>

        <UserForm isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>
    </div>
  );
};

export default UserList;
