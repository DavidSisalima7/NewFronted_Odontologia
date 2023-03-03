import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import "primeicons/primeicons.css";
import React, { useEffect, useState, useContext } from "react";
import "../../Styles/css/Register-person.css"

//Components
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { ScrollPanel } from 'primereact/scrollpanel';
import { TabView, TabPanel } from 'primereact/tabview';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { PersonContext } from "./contexts/PersonContext";
import { RolContext } from "./contexts/RolContext";

export const RegisterPerson = () => {

    const { persons } = useContext(PersonContext);

    const { roles } = useContext(RolContext);

    const [selectedRol, setSelectedRol] = useState(roles);

    const [selectedPersona, setSelectedPersona] = useState(persons);

    function onPersonaChange(persona) {
        const selectedPersona = persons.find(
            (item) => item.id_persona === persona.id

        );
        console.log(selectedPersona.id_persona);
        setSelectedPersona(selectedPersona || null);
    }

    function onRolChange(rol) {
        const selectedRol = roles.find(
            (item) => item.rolId === rol.id

        );
        console.log(selectedRol.rolId);
        setSelectedRol(selectedRol || null);
    }

    //DATOS DE PERSONA

    const initialPersonState = {

        id_persona: '',
        cedula: '',
        nombre: '',
        apellido: '',
        email: '',
        fechaNac: '',
        genero: '',
        celular: '',
        telefono: '',
        direccion: ''
    };

    const [person, setPerson] = useState({ initialPersonState });

    const onInputChange = (data, field) => {

        setPerson({ ...person, [field]: data });

        console.log(person);
    };

    const onSubmit = async (e) => {

        e.preventDefault();
        await axios.post("http://localhost:8080/api/persona/crear", person);
        setTab(1)
    };

    //DATOS DE ROL

    const initialRolState = {

        rolId: "",
        rolNombre: "",
        descripcion: ""
    };

    const [role, setRol] = useState({ initialRolState });

    const onInputChangeRol = (data, field) => {

        setRol({ ...role, [field]: data });

        console.log(role);
    };

    //DATOS DE USUARIO

    const onSubmitUsr = async () => {

        await postUser();

    };

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const postUser = async () => {

        const url = "http://localhost:8080/usuarios/signup";

        const data = {
            username: username,
            password: password,
            enabled: true,
            persona: {
                id_persona: selectedPersona?.id_persona,
            },
            rol: {
                rolId: selectedRol?.rolId,
            },
        };

        const response = await axios.post(url, data);
    };

    const [tab, setTab] = useState(0);

    //Datos Dropdown
    const generos = [
        'Masculino', 'Femenino', 'Otro'
    ];

    const selectedPersonTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">{option.label}</div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const personOptionTemplate = (option) => {
        console.log(option.cedula);
        return <>{option.label}</>;
    };

    // Reestringir campos
    const blockSpecial = RegExp(/^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/);

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

        <>
            <div className="fichaP">
                <div className="container" id="container">

                    <TabView activeIndex={tab} onTabChange={(e) => setTab(e.index)}>
                        <TabPanel header="Registro Personas" leftIcon="pi pi-user">

                            <div className="form">

                                <Divider align="center" style={{ marginTop: '-25px' }}>
                                    <h2 className="text-center" style={{ color: "black" }}>Registrar Persona</h2>
                                </Divider>

                                <ScrollPanel style={{ width: '100%', height: '500px' }}>

                                    <form onSubmit={(e) => onSubmit(e)} className="p-fluid" style={{ marginTop: '-10px', marginBottom: 80 }}>
                                        <div className="row">
                                            <div className="col">

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <InputText id="float-input" name="cedula" type={"text"} keyfilter="int" value={person.cedula}
                                                            onChange={(e) => onInputChange(e.target.value, "cedula")} />
                                                        <label htmlFor="name" >
                                                            Cédula:
                                                        </label>
                                                    </span>
                                                </div>

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <InputText id="float-input" name="nombre" value={person.nombre}
                                                            onChange={(e) => onInputChange(e.target.value, "nombre")} type="text" keyfilter={blockSpecial} />
                                                        <label htmlFor="name" >
                                                            Nombres:
                                                        </label>
                                                    </span>
                                                </div>

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <Dropdown id="float-input" name="genero" onChange={(e) => onInputChange(e.target.value, "genero")}
                                                            value={person.genero} options={generos}
                                                            placeholder="Seleccione Género" className="w-full md:w-14rem" />
                                                        <label htmlFor="genero">Género:</label>
                                                    </span>
                                                </div>

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <InputMask id="float-input" name="celular" value={person.celular}
                                                            onChange={(e) => onInputChange(e.target.value, "celular")}
                                                            mask="9999999999" placeholder="9999999999" />
                                                        <label htmlFor="celular" >
                                                            Número Celular:
                                                        </label>
                                                    </span>
                                                </div>

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <InputText id="float-input" type="text" name="direccion" value={person.direccion}
                                                            onChange={(e) => onInputChange(e.target.value, "direccion")} />
                                                        <label htmlFor="direccion" >
                                                            Dirección:
                                                        </label>
                                                    </span>
                                                </div>

                                            </div>
                                            <div className="col">

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <InputText id="float-input" type="text" name="email" value={person.email}
                                                            onChange={(e) => onInputChange(e.target.value, "email")} />
                                                        <label htmlFor="email" >
                                                            Correo Electronico:
                                                        </label>
                                                    </span>
                                                </div>

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <InputText id="float-input" type="text" name="apellido"
                                                            value={person.apellido} onChange={(e) => onInputChange(e.target.value, "apellido")} keyfilter={blockSpecial} />
                                                        <label htmlFor="apellido">
                                                            Apellidos:
                                                        </label>
                                                    </span>
                                                </div>

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <Calendar
                                                            value={person.fechaNac && new Date(person.fechaNac + " ")}
                                                            onChange={(e) => onInputChange(e.target.value.toISOString().substring(0, 10), "fechaNac")}
                                                            dateFormat="yy-mm-dd" />
                                                        <label htmlFor="fechaNac" >
                                                            Fecha de Nacimiento:
                                                        </label>
                                                    </span>
                                                </div>

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <InputMask id="float-input" name="telefono" value={person.telefono}
                                                            onChange={(e) => onInputChange(e.target.value, "telefono")}
                                                            mask="99-9999999" placeholder="99-9999999" />
                                                        <label htmlFor="Telefónico" >
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
                                                    <Button type="submit" label="Guardar" onClick={(e) => onSubmit(e)}
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

                        <TabPanel header="Crear Usuario" rightIcon="pi pi-user">

                            <div className="form">

                                <Divider align="center" style={{ marginTop: '-25px' }}>
                                    <h2 className="text-center">Crear Usuarios</h2>

                                </Divider>

                                <ScrollPanel style={{ width: '100%', height: '400px' }}>

                                    <form onSubmit={(e) => onSubmitUsr(e)} className="p-fluid" style={{ marginTop: '-18px', marginBottom: 80 }}>

                                        <div className="p-grid p-fluid">

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <Dropdown
                                                        filter
                                                        valueTemplate={selectedPersonTemplate}
                                                        itemTemplate={personOptionTemplate} onChange={(e) => { onPersonaChange(e.value) }}
                                                        id="dropP" value={{
                                                            id: selectedPersona?.id_persona,
                                                            label: `${selectedPersona?.cedula}`,
                                                        }}
                                                        options={persons.map((item) => ({
                                                            id: item.id_persona,
                                                            label: `${item.cedula}`,
                                                        }))}
                                                        placeholder="Paciente" className="w-full md:w-14rem"
                                                    />
                                                    <label htmlFor="numCedula">Número de Cédula:</label>
                                                </span>
                                            </div>

                                            <div className="row">

                                                <div className="col">

                                                    <div className="campo p-col-12 p-md-4">
                                                        <span className="p-float-label">
                                                            <InputText id="float-input" name="username" type={"text"}
                                                                value={username} onChange={(e) => setUsername(e.target.value)} />
                                                            <label htmlFor="username">
                                                                Username:
                                                            </label>
                                                        </span>
                                                    </div>

                                                    <div className="campo p-col-12 p-md-4">
                                                        <span className="p-float-label">
                                                            <Password
                                                                id="password" name="password"
                                                                value={password} onChange={(e) => setPassword(e.target.value)}
                                                                toggleMask
                                                                header={passwordHeader}
                                                                footer={passwordFooter} />
                                                            <label
                                                                htmlFor="password">
                                                                Contraseña
                                                            </label>
                                                        </span>
                                                    </div>

                                                </div>

                                                <div className="col">

                                                    <div className="campo p-col-12 p-md-4">
                                                        <span className="p-float-label">
                                                            <Dropdown id="password"
                                                                value={{
                                                                    id: selectedRol?.rolId,
                                                                    label: `${selectedRol?.rolNombre}`,
                                                                }} onChange={(e) => { onRolChange(e.value) }}
                                                                options={roles.map((item) => ({
                                                                    id: item.rolId,
                                                                    label: `${item.rolNombre}`,
                                                                }))}
                                                                placeholder="Rol" className="w-full md:w-14rem" />
                                                            <label htmlFor="rolNombre">Rol:</label>
                                                        </span>
                                                    </div>

                                                    <div className="campo p-col-12 p-md-4">
                                                        <span className="p-float-label">
                                                            <Password
                                                                id="password" name="password"
                                                                value={password} onChange={(e) => setPassword(e.target.value)}
                                                                toggleMask
                                                                header={passwordHeader}
                                                                footer={passwordFooter} />
                                                            <label
                                                                htmlFor="password">
                                                                Repetir Contraseña
                                                            </label>
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </form>

                                    <Divider align="center" style={{ marginTop: '-55px', marginBottom: 40 }}>
                                    </Divider>

                                    <div className="row text-center">
                                        <div className="col">
                                            <div style={{ justifyContent: "center", alignItems: "center" }}>
                                                <Button type="submit" onClick={(e) => onSubmitUsr(e)} label="Guardar"
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
                                </ScrollPanel>
                            </div>
                        </TabPanel>

                    </TabView>

                </div>
            </div>
        </>
    );
}

export default RegisterPerson;
