import React, { useContext, useState } from "react";
import { Panel } from 'primereact/panel'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { PersonContext } from "../contexts/PersonContext";
import PersonForm from "./RegisterPerson";
import "../../../Styles/css/Register-person.css"

export const PersonList = () => {

    const { persons, findPerson } = useContext(PersonContext)

    const [isVisible, setIsVisible] = useState(false);

    const savePerson = (id) => {

        findPerson(id);
        setIsVisible(true);
    };

    const footer = (

        <div className="p-clearfix" style={{ width: "100%" }}>
            <Button style={{ float: "left" }} icon="pi pi-plus"
                label="Registrar Persona"
                onClick={() => setIsVisible(true)} />
        </div>
    );

    return (
        <div>
            <div className="container">

                <div className="box">
                    <Panel header="LISTA DE PERSONAS" style={{ textAlign: "center" }}>
                        <DataTable
                            value={persons}
                            selectionMode="single"
                            onSelectionChange={(e) => savePerson(e.value.id)}
                            footer={footer}>

                            <Column field="cedula" header="N° Cédula" />
                            <Column field="nombre" header="Nombres" />
                            <Column field="apellido" header="Apellidos" />
                            <Column field="email" header="Correo Electrónico" />
                            <Column field="fechaNac" header="Fecha de Nacimiento" />
                            <Column field="celular" header="N° Celular" />
                            <Column field="direccion" header="Dirección" />
                            <Column field="telefono" header="N° Teléfono" />
                        </DataTable>
                    </Panel>

                    <PersonForm isVisible={isVisible} setIsVisible={setIsVisible} />

                </div></div>
        </div>
    );
}

export default PersonList;