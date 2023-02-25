import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React, { useEffect, useState } from "react";
import "../../Styles/css/Register-person.css"

//Components
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Divider } from "primereact/divider";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import Usuario from "../Register-usr/interfaces/Usuario";
import Persona from "./interfaces/persona";

import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useHistory } from "react-router-dom";

export const RegisterPerson = () => {

    let navigate = useHistory();

    const [user, setUser] = useState({

        username: "",
        password: ""
    });

    const { username, password } = user;

    const onInputChange = (e: any) => {

        setUser({ ...user, [e.target.name]: e.target.value })

    }

    const onSubmit = async (e: any) => {

        e.preventDefault();
        await axios.post("http://localhost:8080/usuarios/", user);
        setShowMessage(true);
        formikUsr.resetForm();
        navigate.replace("/")
    };

    /* useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        const result = axios.get("http://localhost:8080/usuarios/");
        console.log(result);
    } */



    const [value, setValue] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    //Datos Dropdown
    const [selectedGender, setSelectedGender] = useState(null);
    const genero = [
        { name: 'Masculino', code: 'MAS' },
        { name: 'Femenino', code: 'FEM' },
        { name: 'Otro', code: 'OTR' }
    ];

    // Reestringir campos
    const blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/

    // Uso de formik para formularios
    const formikPerson = useFormik<Persona>({
        // Inicializamos los valores de la interfaz importada LoginDto
        initialValues: {
            // Agregamos todos los atributos de la interfaz y los inicializamos con "" o 0
            cedula: "",
            nombre: "",
            apellido: "",
            email: "",
            fechaNac: "",
            genero: "",
            celular: "",
            direccion: "",
            telefono: "",
        },
        // validaciones
        validate: (data: { cedula: string; nombre: string; apellido: string; email: string; fechaNac: string; genero: string; celular: string; direccion: string; telefono: string }) => {
            // variable para controlar los errores
            const errors: any = {};
            // Aqui se validan que el campo es obligatorio y no este vacio
            if (!data.cedula) {
                errors.cedula = "Campo obligatorio";
            }
            if (!data.nombre) {
                errors.nombre = "Campo obligatorio";
            }
            if (!data.apellido) {
                errors.apellido = "Campo obligatorio";
            }
            if (!data.email) {
                errors.email = "Campo obligatorio";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }
            if (!data.fechaNac) {
                errors.fechaNac = "Campo obligatorio";
            }
            if (!data.genero) {
                errors.genero = "Campo obligatorio";
            }
            if (!data.celular) {
                errors.celular = "Campo obligatorio";
            }
            if (!data.direccion) {
                errors.direccion = "Campo obligatorio";
            }
            if (!data.telefono) {
                errors.telefono = "Campo obligatorio";
            }
            // retorna si da error
            return errors;
        },
        onSubmit: (data: Persona) => {
            // Esto manda la data de los campos en JSON para el sessionStorage del navegador /F12/Inspeccionar/Aplicacion/SessionStorage
            sessionStorage.setItem("Regperson", JSON.stringify(data));
            setFormData(data);
            setShowMessage(true);
            formikPerson.resetForm();
        },
    });

    // Uso de formik para formularios
    const formikUsr = useFormik<Usuario>({
        // Inicializamos los valores de la interfaz importada LoginDto
        initialValues: {
            // Agregamos todos los atributos de la interfaz y los inicializamos con "" o 0
            username: "",
            password: "",
        },
        // validaciones
        validate: (data: { username: string; password: string }) => {
            // variable para controlar los errores
            const errors: any = {};
            // Aqui se validan que el campo es obligatorio y no este vacio
            if (!data.username) {
                errors.username = "Campo obligatorio";
            }
            if (!data.password) {
                errors.password = "Campo obligatorio";
            }
            // retorna si da error
            return errors;
        },
        onSubmit: (data: Usuario) => {
            // Esto manda la data de los campos en JSON para el sessionStorage del navegador /F12/Inspeccionar/Aplicacion/SessionStorage
            sessionStorage.setItem("Reguser", JSON.stringify(data));
            setFormData(data);
            setShowMessage(true);
            formikUsr.resetForm();
        },
    });

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

    // Metodo para validaciones y mensajes en cuadro de texto Usuario
    const isFormFieldValid = (
        name: keyof {
            username: string;
            password: string;
        }
    ) => !!(formikUsr.touched[name] && formikUsr.errors[name]);

    const getFormErrorMessage = (
        name: keyof {
            username: string;
            password: string;
        }
    ) =>
        isFormFieldValid(name) && (
            <small className="p-error">{formikUsr.errors[name]}</small>
        );

    // Metodo para validaciones y mensajes en cuadro de texto Persona
    const isFormFieldValidP = (
        name: keyof {
            cedula: string;
            nombre: string,
            apellido: string,
            email: string,
            fechaNac: string,
            genero: string,
            celular: string,
            direccion: string,
            telefono: string,
        }
    ) => !!(formikPerson.touched[name] && formikPerson.errors[name]);

    const getFormErrorMessageP = (
        name: keyof {
            cedula: string;
            nombre: string,
            apellido: string,
            email: string,
            fechaNac: string,
            genero: string,
            celular: string,
            direccion: string,
            telefono: string,
        }
    ) =>
        isFormFieldValidP(name) && (
            <small className="p-error">{formikPerson.errors[name]}</small>
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

        <body className="body1">

            <div className="container">

                <div className="box" >
                    <Dialog
                        visible={showMessage}
                        onHide={() => {
                            setShowMessage(false);
                        }}
                        position="top"
                        footer={dialogFooter}
                        showHeader={false}
                        breakpoints={{ "960px": "80vw" }}
                        style={{ width: "30vw" }}
                    >
                        <div className="flex align-items-center flex-column pt-6 px-3">
                            <i
                                className="pi pi-check-circle"
                                style={{ fontSize: "5rem", color: "var(--green-500)" }}
                            ></i>
                            <h5>Registro Exitoso!</h5>
                            <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                                Bienvenido <b>{formikUsr.values.username}</b> ;
                            </p>
                        </div>
                    </Dialog>
                    <div className="form">
                        <h2 className="text-center" style={{ color: "black" }}>Registrar Persona</h2>
                        <form onSubmit={(e) => onSubmit(e)} className="p-fluid" style={{ marginTop: 20 }}>
                            <div className="row">
                                <div className="col" style={{ width: "auto" }}>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label p-input-icon-left">
                                            <i className="pi pi-id-card" />
                                            <InputText id="float-input" name="username" type={"text"} keyfilter="int" value={username} onChange={(e) => onInputChange(e)} />
                                            <label htmlFor="name" className={classNames({
                                                "p-error": isFormFieldValidP("cedula"),
                                            })}>
                                                Cédula
                                            </label>
                                        </span>
                                        {getFormErrorMessageP("cedula")}
                                    </div>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label">
                                            <Dropdown id="float-input" onChange={(e) => setSelectedGender(e.value)} value={selectedGender} options={genero} optionLabel="name"
                                                placeholder="Seleccione Género" className="w-full md:w-14rem" />
                                            <label htmlFor="float-input">Género</label>
                                        </span>
                                    </div>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label p-input-icon-left">
                                            <i className="pi pi-phone" />
                                            <InputMask id="float-input" onChange={(e) => setValue(e.target.value!)} mask="9999999999" placeholder="9999999999"
                                                className={classNames("inputBox", {
                                                    "p-invalid": isFormFieldValidP("celular"),
                                                })}
                                            />
                                            <label
                                                htmlFor="name"
                                                className={classNames({
                                                    "p-error": isFormFieldValidP("celular"),
                                                })}
                                            >
                                                Número Celular
                                            </label>
                                        </span>
                                        {getFormErrorMessageP("celular")}
                                    </div>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label p-input-icon-left">
                                            <i className="pi pi-id-card" />
                                            <Password
                                                id="password"
                                                name="password"
                                                value={formikUsr.values.password}
                                                onChange={formikUsr.handleChange}
                                                toggleMask
                                                className={classNames("inputBox", {
                                                    "p-invalid": isFormFieldValid("password"),
                                                })}
                                                header={passwordHeader}
                                                footer={passwordFooter}
                                            />
                                            <label
                                                htmlFor="password"
                                                className={classNames({
                                                    "p-error": isFormFieldValid("password"),
                                                })}
                                            >
                                                Contraseña
                                            </label>
                                        </span>
                                        {getFormErrorMessage("password")}
                                    </div>

                                </div>
                                <div className="col" style={{ width: "auto" }}>
                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label p-input-icon-left">
                                            <i className="pi pi-user" />
                                            <InputText id="float-input" type="text" keyfilter={blockSpecial}
                                                className={classNames("inputBox", {
                                                    "p-invalid": isFormFieldValidP("nombre"),
                                                })}
                                            />
                                            <label htmlFor="name" className={classNames({
                                                "p-error": isFormFieldValidP("nombre"),
                                            })}>
                                                Nombres
                                            </label>
                                        </span>
                                        {getFormErrorMessageP("nombre")}
                                    </div>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label">
                                            <InputText type={"date"} id="float-input"
                                                className={classNames("inputBox", {
                                                    "p-invalid": isFormFieldValidP("fechaNac"),
                                                })}
                                            />
                                            <label
                                                htmlFor="name"
                                                className={classNames({
                                                    "p-error": isFormFieldValidP("fechaNac"),
                                                })}
                                            >
                                                Fecha de Nacimiento
                                            </label>
                                        </span>
                                        {getFormErrorMessageP("fechaNac")}
                                    </div>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label p-input-icon-left">
                                            <i className="pi pi-phone" />
                                            <InputMask id="float-input" onChange={(e) => setValue(e.target.value!)} mask="99-9999999" placeholder="99-9999999"
                                                className={classNames("inputBox", {
                                                    "p-invalid": isFormFieldValidP("telefono"),
                                                })}
                                            />
                                            <label
                                                htmlFor="name"
                                                className={classNames({
                                                    "p-error": isFormFieldValidP("telefono"),
                                                })}
                                            >
                                                Número Telefónico
                                            </label>
                                        </span>
                                        {getFormErrorMessageP("telefono")}
                                    </div>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label p-input-icon-left">
                                            <i className="pi pi-id-card" />
                                            <Password
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => onInputChange(e)}
                                                toggleMask
                                                className={classNames("inputBox", {
                                                    "p-invalid": isFormFieldValid("password"),
                                                })}
                                                header={passwordHeader}
                                                footer={passwordFooter}
                                            />
                                            <label
                                                htmlFor="password"
                                                className={classNames({
                                                    "p-error": isFormFieldValid("password"),
                                                })}
                                            >
                                                Repetir Contraseña
                                            </label>
                                        </span>
                                        {getFormErrorMessage("password")}
                                    </div>

                                </div>
                                <div className="col" style={{ width: "auto" }}>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label p-input-icon-left">
                                            <i className="pi pi-user" />
                                            <InputText id="float-input" type="text" keyfilter={blockSpecial}
                                                className={classNames("inputBox", {
                                                    "p-invalid": isFormFieldValidP("apellido"),
                                                })}
                                            />
                                            <label
                                                htmlFor="name"
                                                className={classNames({
                                                    "p-error": isFormFieldValidP("apellido"),
                                                })}
                                            >
                                                Apellidos
                                            </label>
                                        </span>
                                        {getFormErrorMessageP("apellido")}
                                    </div>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label p-input-icon-left">
                                            <i className="pi pi-calendar" />
                                            <InputText id="float-input" type="text"
                                                className={classNames("inputBox", {
                                                    "p-invalid": isFormFieldValidP("direccion"),
                                                })}
                                            />
                                            <label
                                                htmlFor="name"
                                                className={classNames({
                                                    "p-error": isFormFieldValidP("direccion"),
                                                })}
                                            >
                                                Dirección
                                            </label>
                                        </span>
                                        {getFormErrorMessageP("direccion")}
                                    </div>

                                    <div className="campo p-col-12 p-md-4">
                                        <span className="p-float-label p-input-icon-left">
                                            <i className="pi pi-envelope" />
                                            <InputText id="float-input" type="text"
                                                className={classNames("inputBox", {
                                                    "p-invalid": isFormFieldValidP("email"),
                                                })}
                                            />
                                            <label
                                                htmlFor="name"
                                                className={classNames({
                                                    "p-error": isFormFieldValidP("email"),
                                                })}
                                            >
                                                Correo Electronico
                                            </label>
                                        </span>
                                        {getFormErrorMessageP("email")}
                                    </div>

                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="row text-center">
                                <div className="col">
                                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Button
                                            type="submit"
                                            label="Guardar"
                                            className="mt-2"
                                            style={{
                                                background: "#ffff",
                                                width: "150px",
                                                height: "40px",
                                                textAlign: "center",
                                                color: "#292929",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div style={{ justifyContent: "center" }}>
                                        <Button
                                            type="submit"
                                            label="Cancelar"
                                            className="mt-2"
                                            style={{
                                                background: "#ffff",
                                                width: "150px",
                                                height: "40px",
                                                textAlign: "center",
                                                color: "#292929",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </body >
    )

}