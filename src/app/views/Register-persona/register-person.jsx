import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import "primeicons/primeicons.css";
import React, { useEffect, useState } from "react";
import "../../Styles/css/Register-person.css"

//Components
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Calendar } from 'primereact/calendar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { TabView, TabPanel } from 'primereact/tabview';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function RegisterPerson() {

    let navigate = useHistory();

    const [person, setPerson] = useState({

        id_persona: "",
        cedula: "",
        nombre: "",
        apellido: "",
        email: "",
        fechaNac: "",
        genero: "",
        celular: "",
        direccion: "",
        telefono: "",
    });

    const {id_persona, cedula, nombre, apellido, email, fechaNac, genero, celular, direccion, telefono } = person;

    const onInputChange = (e) => {

        setPerson({ ...person, [e.target.name]: e.target.value })

    }

    const onSubmit = async (e) => {

        e.preventDefault();
        await axios.post("http://localhost:8080/api/persona/crear", person);
        setShowMessage(true);
        navigate.replace("/")
    };

    const [value, setValue] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    //Datos Dropdown
    const generos = [
        'Masculino', 'Femenino', 'Otro'
    ];

    const roles = [
        'Odontólogo', 'Paciente', 'Otro'
    ];

    // Reestringir campos
    const blockSpecial = RegExp(/^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/)

    const dialogFooter = (
        <div className="flex justify-content-center">
            <Button
                label="OK"
                className="p-button-text"
                autoFocus
                onClick={() => {
                    setShowMessage(false);
                }}
            />
        </div>
    );

    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
                <li>Al menos una minúscula</li>
                <li>Al menos una mayúscula</li>
                <li>Al menos un número </li>
                <li>Mínimo 8 carácteres</li>
            </ul>
        </React.Fragment>
    );

    return (

        <div className="container">

            <div className="box">

                <TabView>
                    <TabPanel header="Registro Personas" leftIcon="pi pi-user">

                        <div className="form">

                            <Divider align="center" style={{ marginTop: '-15px' }}>
                                <h2 className="text-center" style={{ color: "black" }}>Registrar Persona</h2>
                            </Divider>

                            <ScrollPanel style={{ width: '100%', height: '500px' }}>

                                <form onSubmit={(e) => onSubmit(e)} className="p-fluid" style={{ marginTop: '-18px', marginBottom: 80 }}>
                                    <div className="row">
                                        <div className="col">

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText id="float-input" name="cedula" type={"text"} keyfilter="int" value={cedula} onChange={(e) => onInputChange(e)} />
                                                    <label htmlFor="name" >
                                                        Cédula:
                                                    </label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText id="float-input" name="nombre" value={nombre} onChange={(e) => onInputChange(e)} type="text" keyfilter={blockSpecial} />
                                                    <label htmlFor="name" >
                                                        Nombres:
                                                    </label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <Dropdown id="float-input" name="genero" onChange={(e) => onInputChange(e)} value={genero} options={generos}
                                                        placeholder="Seleccione Género" className="w-full md:w-14rem" />
                                                    <label htmlFor="float-input">Género:</label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputMask id="float-input" name="celular" value={celular} onChange={(e) => onInputChange(e)}
                                                        mask="9999999999" placeholder="9999999999" />
                                                    <label htmlFor="name" >
                                                        Número Celular:
                                                    </label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText id="float-input" type="text" name="direccion" value={direccion} onChange={(e) => onInputChange(e)} />
                                                    <label htmlFor="name" >
                                                        Dirección:
                                                    </label>
                                                </span>
                                            </div>

                                        </div>
                                        <div className="col">

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText id="float-input" type="text" name="email" value={email} onChange={(e) => onInputChange(e)} />
                                                    <label htmlFor="name" >
                                                        Correo Electronico:
                                                    </label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText id="float-input" type="text" name="apellido" value={apellido} onChange={(e) => onInputChange(e)} keyfilter={blockSpecial} />
                                                    <label htmlFor="name">
                                                        Apellidos:
                                                    </label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText type={"date"} id="float-input" name="fechaNac" value={fechaNac} onChange={(e) => onInputChange(e)} />
                                                    {/* <Calendar
                                                    value={fechaNac && new Date(fechaNac + " ")}
                                                    onChange={(e) => onInputChange(e.target.value.toISOString().substring(0, 10), "fechaNac")}
                                                    dateFormat="yy-mm-dd" /> */}
                                                    <label htmlFor="name" >
                                                        Fecha de Nacimiento
                                                    </label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputMask id="float-input" name="telefono" value={telefono} onChange={(e) => onInputChange(e)} mask="99-9999999"
                                                        placeholder="99-9999999" />
                                                    <label htmlFor="name" >
                                                        Número Telefónico:
                                                    </label>
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <Divider align="center" style={{ marginTop: '-25px', marginBottom: '35px' }}>
                                    </Divider>
                                    <div className="row text-center">
                                        <div className="col">
                                            <div style={{ justifyContent: "center", alignItems: "center" }}>
                                                <Button type="submit" label="Guardar"
                                                    className="mt-2" style={{
                                                        background: "#ffff", width: "150px",
                                                        height: "40px", textAlign: "center",
                                                        color: "#292929",
                                                    }} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div style={{ justifyContent: "center" }}>
                                                <Button type="reset" label="Cancelar"
                                                    className="mt-2" style={{
                                                        background: "#ffff", width: "150px",
                                                        height: "40px", textAlign: "center",
                                                        color: "#292929",
                                                    }} />
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </ScrollPanel>

                        </div>

                    </TabPanel>

                    <TabPanel header="Crear Usuario" leftIcon="pi pi-user">

                        <Divider align="center" style={{ marginTop: '40px' }}>
                            <h2 className="text-center" style={{ color: "black" }}>Crear Usuarios</h2>
                        </Divider>

                        <form onSubmit={(e) => onSubmit(e)} className="p-fluid" style={{ marginTop: '-18px', marginBottom: 80 }}>

                            <div className="p-grid p-fluid">

                                {/* <Dropdown
                                    filter
                                    valueTemplate={selectedPacientTemplate}
                                    itemTemplate={pacientOptionTemplate}
                                    id="dropP"
                                    value={{
                                        id: selectedPaciente?.id_persona,
                                        label: `${selectedPaciente?.nombre} ${selectedPaciente?.apellido}`,
                                    }}
                                    onChange={(e) => { onPacienteChange(e.value); setShowTable(true) }}
                                    options={pacientes.map((item) => ({
                                        id: item.id_persona,
                                        label: `${item.nombre} ${item.apellido}`,
                                    }))}
                                    optionLabel="label"
                                    placeholder="Seleccione una Persona"
                                /> */}

                                <div className="row">

                                    <div className="col">

                                        <div className="campo p-col-12 p-md-4">
                                            <span className="p-float-label">
                                                <InputText id="float-input" name="cedula" keyfilter="int" />
                                                <label htmlFor="cedula">
                                                    Username:
                                                </label>
                                            </span>
                                        </div>

                                        <div className="campo p-col-12 p-md-4">
                                            <span className="p-float-label">
                                                <InputText id="float-input" type="text" name="apellido" />
                                                <label htmlFor="nombre" >
                                                    Password:
                                                </label>
                                            </span>
                                        </div>

                                    </div>

                                    <div className="col">

                                        <div className="campo p-col-12 p-md-4">
                                            <span className="p-float-label">
                                                <Dropdown id="float-input" name="rolNombre" options={roles}
                                                    placeholder="Rol" className="w-full md:w-14rem" />
                                                <label htmlFor="float-input">Rol:</label>
                                            </span>
                                        </div>

                                        <div className="campo p-col-12 p-md-4">
                                            <span className="p-float-label">
                                                <InputText id="float-input" name="descripcion" />
                                                <label htmlFor="name">
                                                    Descripción:
                                                </label>
                                            </span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </form>
                        <Divider align="center" style={{ marginTop: '-35px', marginBottom: 60 }}>
                        </Divider>

                        <div className="row text-center">
                            <div className="col">
                                <div style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Button type="submit" label="Guardar"
                                        className="mt-2" style={{
                                            background: "#ffff", width: "150px",
                                            height: "40px", textAlign: "center",
                                            color: "#292929",
                                        }} />
                                </div>
                            </div>
                            <div className="col">
                                <div style={{ justifyContent: "center" }}>
                                    <Button type="reset" label="Cancelar"
                                        className="mt-2" style={{
                                            background: "#ffff", width: "150px",
                                            height: "40px", textAlign: "center",
                                            color: "#292929",
                                        }} />
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                </TabView>

            </div>
        </div>
    );
}
