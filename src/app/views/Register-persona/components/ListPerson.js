import React, { useContext, useState } from "react";
import { Panel } from 'primereact/panel'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { PersonContext } from "../contexts/PersonContext";
import PersonForm from "./RegisterPerson";
import axios from "axios";
import "../../../Styles/css/Register-person.css"

export const PersonList = () => {

    const { persons, findPerson } = useContext(PersonContext)

    const [isVisible, setIsVisible] = useState(false);

    const savePerson = (id) => {

        findPerson(id);
        setIsVisible(true);
    };

    const roles = [
        'Odontólogo', 'Paciente', 'Otro'
    ];

    const initialUserState = {
        id_usuario: null,
        username: "",
        password: "",
    };

    const [personData, setPersonData] = useState(initialUserState);

    const postUser = async () => {
        const url = "http://localhost:8080/usuarios/signup";
        /* const data = {
            diagnostico: antecedentes,
            fecha_consulta: date,
            motivo_consulta: motivo,
            observaciones: observaciones,
            persona: {
                id_persona: selectedPaciente?.id_persona,
            },
        }; */
        const response = await axios.post(url);
    };

    const clearSelected = () => {
        setIsVisible(false);
        setPersonData(initialUserState);
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
                    <TabView>
                        <TabPanel header="Listado Personas" leftIcon="pi pi-user">
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
                        </TabPanel>

                        <TabPanel header="Crear Usuario" leftIcon="pi pi-user">

                            <div className="p-grid p-fluid">

                                <div className="row">
                                    <div className="col">

                                        <br />
                                        <br />
                                        <div className="p-float-label">
                                            <span className="p-float-label">
                                                <InputText id="float-input" name="cedula" keyfilter="int" />
                                                <label htmlFor="cedula">
                                                    Username:
                                                </label>
                                            </span>
                                        </div>

                                        <br />
                                        <br />
                                        <div className="p-float-label">
                                            <span className="p-float-label">
                                                <InputText id="float-input" type="text" name="apellido" />
                                                <label htmlFor="nombre" >
                                                    Password:
                                                </label>
                                            </span>
                                        </div>

                                    </div>

                                    <div className="col">

                                        <br />
                                        <br />
                                        <div className="p-float-label">
                                            <span className="p-float-label">
                                                <Dropdown id="float-input" name="rolNombre" options={roles}
                                                    placeholder="Género" className="w-full md:w-14rem" />
                                                <label htmlFor="float-input">Rol:</label>
                                            </span>
                                        </div>

                                        <br />
                                        <br />
                                        <span className="p-float-label">
                                            <InputText id="float-input" name="descripcion" />
                                            <label htmlFor="name">
                                                Descripción:
                                            </label>
                                        </span>

                                    </div>
                                </div>

                            </div>

                        </TabPanel>

                    </TabView>

                </div>

            </div>
        </div>
    );
}

export default PersonList;