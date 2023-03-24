import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "primeicons/primeicons.css";
import React, { useEffect, useState, useContext, useRef } from "react";
//Components
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { TabView, TabPanel } from "primereact/tabview";
import axios from "axios";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { PersonContext } from "./contexts/PersonContext";
import { RolContext } from "./contexts/RolContext";
import { Toast } from "primereact/toast";
import { claseValidaciones } from "../../Validaciones/ClaseValidaciones";

export const RegisterPerson = () => {

    const toast = useRef(null);

    const validate = new claseValidaciones();

    /* MENSAJES EMERGENTES */

    // Validates Persona
    const showError = (errorPrincipal, detalleError) => {
        toast.current?.show({
            severity: "error",
            summary: errorPrincipal,
            detail: detalleError,
            life: 3000,
        });
    };

    const showSuccess = (mensajePrincipal, detallePrincipal) => {
        toast.current?.show({
            severity: "success",
            summary: mensajePrincipal,
            detail: detallePrincipal,
            life: 3000,
        });
    };

    const confirmSubmit = () => {
        confirmDialog({
            message: 'Crear Registro.?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };

    const confirmCancel = () => {
        confirmDialog({
            message: 'Esta seguro de cancelar registro.?',
            header: 'Borrar Confirmación',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    const confirmSubmitUsr = () => {
        confirmDialog({
            message: 'Crear Usuario.?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };

    const confirmCancelUsr = () => {
        confirmDialog({
            message: 'Esta seguro de cancelar registro.?',
            header: 'Borrar Confirmación',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    const accept = () => {

        if (confirmCancel) {
            vaciarCampos();
        }
        if (confirmSubmit && person.cedula != '') {
            onSubmit();
        }
        if (confirmCancelUsr) {
            vaciarCamposUsr();
        }
        if (confirmSubmitUsr && username != '') {
            onSubmitUsr();
        }
    }

    const reject = () => {

        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Continue con el registro', life: 3000 });
    }

    /* MENSAJES EMERGENTES */

    const { persons, findPerson, setEditPersons } = useContext(PersonContext);

    const { roles } = useContext(RolContext);

    const [selectedRol, setSelectedRol] = useState(roles);

    const [selectedPersona, setSelectedPersona] = useState(persons);

    function onPersonaChange(persona) {

        const selectedPersona = persons.find(
            (item) => item.id_persona === persona.id
        );
        setSelectedPersona(selectedPersona || null);
    }

    function onRolChange(rol) {

        const selectedRol = roles.find((item) => item.rolId === rol.id);
        setSelectedRol(selectedRol || null);
    }

    //DATOS DE PERSONA

    const initialPersonState = {

        id_persona: "",
        cedula: "",
        nombre: "",
        apellido: "",
        email: "",
        fechaNac: "",
        genero: "",
        celular: '',
        telefono: '',
        direccion: "",
    };

    const vaciarCampos = () => {

        setPerson(initialPersonState);
    };

    /* const initialPersonState2 = {

        nombre: "",
        apellido: "",
        email: "",
        fechaNac: "",
        genero: "",
        celular: '',
        telefono: '',
        direccion: "",
    };

    const vaciarCampos2 = () => {

        setPerson(initialPersonState2);
    }; */

    const vaciarCamposUsr = () => {

        setUsername("");
        setPassword("");
        setRepPassword1("");
        setSelectedPersona(null);
        setSelectedRol(null);
    };

    const [person, setPerson] = useState({ initialPersonState });

    const onInputChange = (data, field) => {
        setPerson({ ...person, [field]: data });

        console.log(person);
    };

    const [cedul, setCedul] = useState("");

    useEffect(() => {

        const getCedul = async (cedula) => {

            if (person.cedula !== undefined) {

                const { data } = await axios.get(
                    `http://localhost:8080/api/persona/buscarcedul/${cedula}`
                );

                if (validarcedul(person.cedula) && data.id_persona != null) {

                    setCedul(data.cedula);
                    /* setPerson(data); */
                } else {

                    /* vaciarCampos2(); */

                }
            }
        };

        getCedul(person.cedula);

    }, [person.cedula])

    const [usern, setUsern] = useState();

    const onSubmit = async () => {

        if (tab == 0) {

            if (person.nombre != '' && person.cedula != '' && person.apellido != '' && person.email != ''
                && person.fechaNac != null && person.genero != '' && person.celular != '' && person.telefono != ''
                && person.direccion != '') {

                if (validate.validarCedulaTs(person.cedula)) {

                    if (cedul != person.cedula) {

                        if (validate.validarEmail(person.email)) {

                            await axios.post("http://localhost:8080/api/persona/crear", person);

                            handleInputClick();
                            vaciarCampos();
                            setEditPersons(null);
                            showSuccess("OK", "Registro Exitoso");

                            setTab(1);
                        } else {

                            handleInputClick();
                            showError("ERROR", "Correo Digitado Erróneo");
                        }
                    } else {

                        handleInputClick();
                        showError("ERROR", "Ya cuenta con un registro");
                    }
                } else {

                    handleInputClick();
                    showError("ERROR", "Cédula Digitada Errónea");
                }
            } else {

                handleInputClick();
                showError("ERROR", 'Llene Todos Los Campos')
            }
        }
    };

    const validarcedul = (cedula) => {
        if (cedula.length === 10) {
            return true;
        } else {
            // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
            return false;
        }
    }

    //Validacion de cedula useEfect
    useEffect(() => {

        if (person.cedula !== undefined) {
            if (validarcedul(person.cedula) && validate.validarCedulaTs(person.cedula) == false) {
                return showError('OK', 'Cédula Incorrecta')
            }
        }
    }, [person.cedula])

    const [tab, setTab] = useState(0);

    //DATOS DE USUARIO

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword1] = useState("");

    const [idper, setIdper] = useState();
    const [idperUsr, setIdperUsr] = useState();

    useEffect(() => {

        const getCedul = async (cedula) => {

            const { data } = await axios.get(
                `http://localhost:8080/api/persona/buscarcedul/${cedula}`
            );

            setIdper(data.id_persona);
        };

        const getUsername = async (user) => {

            const { data } = await axios.get(
                `http://localhost:8080/usuarios/search/${user}`
            );

            setIdperUsr(data.persona?.id_persona)

            setUsern(data.username);
        };

        getCedul(selectedPersona?.cedula);
        getUsername(username);

    }, [username, selectedPersona?.cedula])

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

    const onSubmitUsr = async () => {

        if (tab == 1) {

            if (username !== '' && password !== '' && repPassword !== '') {

                if (selectedPersona?.id_persona != null && selectedRol?.rolId != null) {

                    if (usern != username) {

                        if (idper != idperUsr) {

                            if (valid) {

                                if (password == repPassword) {

                                    await postUser();
                                    vaciarCamposUsr();
                                    setEditPersons(false);
                                    showSuccess("OK", "Usuario Creado Correctamente");

                                } else {
                                    showError("ERROR", 'Las Contraseñas no Coinciden')
                                }
                            } else {
                                showError('ERROR', 'Tome en cuenta las sugerencias de contraseña')
                            }
                        } else {
                            showError('ERROR', 'El registro ya cuenta con un usuario')
                        }
                    } else {
                        showError("ERROR", 'Nombre de usuario en uso')
                    }
                } else {
                    showError("ERROR", 'Otorgue un Rol o Identificador de Usuario')
                }
            } else {

                showError("ERROR", 'Llene Todos Los Campos')
            }
        }
    };

    //Datos Dropdown
    const generos = ["Masculino", "Femenino", "Otro"];

    const selectedPersonTemplate = (option, props) => {

        if (option) {
            return <div className="flex align-items-center">{option.label}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const personOptionTemplate = (option) => {
        console.log(option.cedula);
        return <>{option.label}</>;
    };

    const [isValid, setIsValid] = useState("p-valid");
    const [isValidP, setIsValidP] = useState("p-valid");
    const [isValidA, setIsValidA] = useState("p-valid");
    const [isValidE, setIsValidE] = useState("p-valid");
    /* const [isValidF, setIsValidF] = useState("p-valid"); */
    const [isValidC, setIsValidC] = useState("p-valid");
    const [isValidT, setIsValidT] = useState("p-valid");
    const [isValidD, setIsValidD] = useState("p-valid");
    const [isValidG, setIsValidG] = useState("p-valid");

    useEffect(() => {
        if (person.cedula?.trim() === '') {
            setIsValid("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValid("p-valid");
        }

        if (person.nombre?.trim() === '') {
            setIsValidP("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidP("p-valid");
        }

        if (person.apellido?.trim() === '') {
            setIsValidA("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidA("p-valid");
        }

        if (person.email?.trim() === '') {
            setIsValidE("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidE("p-valid");
        }

        if (person.genero?.trim() === '') {
            setIsValidG("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidG("p-valid");
        }

        if (person.celular?.trim() === '') {
            setIsValidC("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidC("p-valid");
        }

        if (person.telefono?.trim() === '') {
            setIsValidT("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidT("p-valid");
        }

        if (person.direccion?.trim() === '') {
            setIsValidD("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidD("p-valid");
        }

    }, [person.cedula, person.nombre, person.apellido, person.email,
    person.genero, person.celular, person.telefono, person.direccion]);

    const handleInputClick = () => {
        if (person.cedula?.trim() !== '') {

            setIsValid('p-invalid');
        }

        if (person.nombre?.trim() !== '') {

            setIsValidP('p-invalid');
        }

        if (person.nombre?.trim() === '') {
            setIsValidP("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidP("p-valid");
        }

        if (person.apellido?.trim() === '') {
            setIsValidA("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidA("p-valid");
        }

        if (person.email?.trim() === '') {
            setIsValidE("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidE("p-valid");
        }

        if (person.genero?.trim() === '') {
            setIsValidG("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidG("p-valid");
        }

        if (person.celular?.trim() === '') {
            setIsValidC("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidC("p-valid");
        }

        if (person.telefono?.trim() === '') {
            setIsValidT("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidT("p-valid");
        }

        if (person.direccion?.trim() === '') {
            setIsValidD("p-invalid"); // valida que el campo no esté vacío
        } else {
            setIsValidD("p-valid");
        }
    };

    // Reestringir campos
    const blockSpecial = RegExp(
        /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
    );

    //Registrar fechas maximo 3 años antes de la fecha actual
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 3);

    const [valid, setValid] = useState(false);
    const [strength, setStrength] = useState(0);

    const handleChange = (event) => {
        setPassword(event.target.value);
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        setValid(pattern.test(event.target.value));

        let newStrength = 0;
        if (pattern.test(event.target.value)) {
            newStrength = 100;
            if (event.target.value.length > 8) {
                newStrength += 50;
            }
            if (event.target.value.match(/[!@#$%^&*(),.?":{}|<>]/)) {
                newStrength += 50;
            }
        }
        setStrength(newStrength);
    };

    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Sugerencias</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
                <li>*Al menos una minúscula</li>
                <li>*Al menos una mayúscula</li>
                <li>*Al menos un número </li>
                <li>*Mínimo 8 carácteres</li>
            </ul>
        </React.Fragment>
    );

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="fichaP">
                <div className="container" id="container">
                    <TabView activeIndex={tab} onTabChange={(e) => setTab(e.index)}>
                        <TabPanel header="Registro Personas" leftIcon="pi pi-user">
                            <div className="form">
                                <Divider align="center" style={{ marginTop: "25px" }}>
                                    <h2 className="text-center" style={{ color: "black" }}>
                                        Registrar Persona
                                    </h2>
                                </Divider>
                                <form
                                    onSubmit={(e) => onSubmit(e)}
                                    className="p-fluid"
                                    style={{ marginTop: "-10px", marginBottom: 80 }}
                                >
                                    <div className="row">
                                        <div className="col">
                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText
                                                        id="float-input"
                                                        name="cedula"
                                                        type={"text"}
                                                        keyfilter="int" maxLength={'10'} minLength={'10'}
                                                        value={person.cedula}
                                                        onChange={(e) =>
                                                            onInputChange(e.target.value, "cedula")
                                                        }
                                                        className={isValid}
                                                    />
                                                    <label htmlFor="name">Cédula:</label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText
                                                        id="float-input"
                                                        name="nombre"
                                                        value={person.nombre}
                                                        onChange={(e) =>
                                                            onInputChange(e.target.value, "nombre")
                                                        }
                                                        className={isValidP}
                                                        type="text"
                                                        keyfilter={blockSpecial}
                                                    />
                                                    <label htmlFor="name">Nombres:</label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <Dropdown
                                                        id="float-input"
                                                        name="genero"
                                                        onChange={(e) =>
                                                            onInputChange(e.target.value, "genero")
                                                        }
                                                        className={isValidG}
                                                        value={person.genero}
                                                        options={generos}
                                                        placeholder="Seleccione Género"
                                                    />
                                                    <label htmlFor="genero">Género:</label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputMask
                                                        id="float-input"
                                                        name="celular"
                                                        value={person.celular}
                                                        onChange={(e) =>
                                                            onInputChange(e.target.value, "celular")
                                                        }
                                                        className={isValidC}
                                                        mask="9999999999"
                                                        placeholder="9999999999"
                                                    />
                                                    <label htmlFor="celular">Número Celular:</label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText
                                                        id="float-input"
                                                        type="text"
                                                        name="direccion"
                                                        value={person.direccion}
                                                        onChange={(e) =>
                                                            onInputChange(e.target.value, "direccion")
                                                        }
                                                        className={isValidD}
                                                    />
                                                    <label htmlFor="direccion">Dirección:</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText
                                                        id="float-input"
                                                        type="text"
                                                        name="email"
                                                        value={person.email}
                                                        onChange={(e) =>
                                                            onInputChange(e.target.value, "email")
                                                        }
                                                        className={isValidE}
                                                    />
                                                    <label htmlFor="email">Correo Electrónico:</label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputText
                                                        id="float-input"
                                                        type="text"
                                                        name="apellido"
                                                        value={person.apellido}
                                                        onChange={(e) =>
                                                            onInputChange(e.target.value, "apellido")
                                                        }
                                                        className={isValidA}
                                                        keyfilter={blockSpecial}
                                                    />
                                                    <label htmlFor="apellido">Apellidos:</label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <Calendar
                                                        value={person.fechaNac && new Date(person.fechaNac + " ")}
                                                        onChange={(e) =>
                                                            onInputChange(
                                                                e.target.value.toISOString().substring(0, 10),
                                                                "fechaNac"
                                                            )
                                                        } maxDate={maxDate} showIcon readOnlyInput
                                                        /* className={isValidF} */
                                                        dateFormat="yy-mm-dd"
                                                    />
                                                    <label htmlFor="fechaNac">
                                                        Fecha de Nacimiento:
                                                    </label>
                                                </span>
                                            </div>

                                            <div className="campo p-col-12 p-md-4">
                                                <span className="p-float-label">
                                                    <InputMask
                                                        id="float-input"
                                                        name="telefono"
                                                        value={person.telefono}
                                                        onChange={(e) =>
                                                            onInputChange(e.target.value, "telefono")
                                                        }
                                                        className={isValidT}
                                                        mask="99-9999999"
                                                        placeholder="99-9999999"
                                                    />
                                                    <label htmlFor="Telefónico">
                                                        Número Telefónico:
                                                    </label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <Divider
                                        align="center"
                                        style={{ marginTop: "-25px", marginBottom: "35px" }}
                                    ></Divider>
                                    <div className="row text-center">
                                        <div className="col">
                                            <div style={{ justifyContent: "center", alignItems: "center", }}>

                                                <Button
                                                    type="button"
                                                    label="Guardar"
                                                    className="mt-2"
                                                    id="boton1"
                                                    style={{
                                                        background: "#ffff",
                                                        width: "150px",
                                                        height: "40px",
                                                        textAlign: "center",
                                                        color: "#292929",
                                                    }}
                                                    onClick={confirmSubmit}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div style={{ justifyContent: "center" }}>
                                                <Button
                                                    type="reset"
                                                    label="Cancelar"
                                                    className="mt-2"
                                                    style={{
                                                        background: "#ffff",
                                                        width: "150px",
                                                        height: "40px",
                                                        textAlign: "center",
                                                        color: "#292929",
                                                    }}
                                                    onClick={confirmCancel}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </TabPanel>

                        <TabPanel header="Crear Usuario" rightIcon="pi pi-user">
                            <div className="form">
                                <Divider align="center" style={{ marginTop: "20px", marginBottom: "50px" }}>
                                    <h2 className="text-center" style={{ color: "black" }}>
                                        Crear Usuarios
                                    </h2>
                                </Divider>

                                <form
                                    onSubmit={(e) => onSubmitUsr(e)}
                                    className="p-fluid"
                                    style={{ marginTop: "-14px", marginBottom: "80px" }}
                                >
                                    <div className="p-grid p-fluid">
                                        <div className="campo p-col-12 p-md-4">
                                            <span className="p-float-label">
                                                <Dropdown
                                                    filter
                                                    valueTemplate={selectedPersonTemplate}
                                                    itemTemplate={personOptionTemplate}
                                                    onChange={(e) => {
                                                        onPersonaChange(e.value);
                                                    }}
                                                    id="dropP"
                                                    value={{
                                                        id: selectedPersona?.id_persona,
                                                        label: `${selectedPersona?.cedula}`,
                                                    }}
                                                    options={persons.map((item) => ({
                                                        id: item.id_persona,
                                                        label: `${item.cedula}`,
                                                    }))}
                                                    placeholder="Paciente"
                                                    className="w-full md:w-14rem"
                                                />
                                                <label htmlFor="numCedula">Número de Cédula:</label>
                                            </span>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <InputText
                                                            id="float-input"
                                                            name="username2"
                                                            type={"text"}
                                                            value={username}
                                                            onChange={(e) => setUsername(e.target.value)}
                                                        />
                                                        <label htmlFor="username">Username:</label>
                                                    </span>
                                                </div>

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <Password
                                                            id="password"
                                                            name="password2"
                                                            value={password}
                                                            onChange={handleChange}
                                                            toggleMask strength={strength}
                                                            promptLabel="Ingrese una Contraseña" weakLabel="Debil" mediumLabel="Medio"
                                                            strongLabel="Fuerte"
                                                            footer={passwordFooter}
                                                        />
                                                        <label htmlFor="password">Contraseña:</label>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <Dropdown
                                                            id="password"
                                                            value={{
                                                                id: selectedRol?.rolId,
                                                                label: `${selectedRol?.rolNombre}`,
                                                            }}
                                                            onChange={(e) => {
                                                                onRolChange(e.value);
                                                            }}
                                                            options={roles.map((item) => ({
                                                                id: item.rolId,
                                                                label: `${item.rolNombre}`,
                                                            }))}
                                                            placeholder="Rol"
                                                            className="w-full md:w-14rem"
                                                        />
                                                        <label htmlFor="rolNombre">Rol:</label>
                                                    </span>
                                                </div>

                                                <div className="campo p-col-12 p-md-4">
                                                    <span className="p-float-label">
                                                        <Password
                                                            id="password"
                                                            name="password"
                                                            value={repPassword}
                                                            onChange={(e) => setRepPassword1(e.target.value)}
                                                            toggleMask feedback={false} />
                                                        <label htmlFor="password">
                                                            Repetir Contraseña
                                                        </label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <Divider
                                    align="center"
                                    style={{ marginTop: "-55px", marginBottom: 40 }}
                                ></Divider>

                                <div className="row text-center">
                                    <div className="col">
                                        <div
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Button
                                                type="button"
                                                onClick={confirmSubmitUsr}
                                                label="Guardar"
                                                id="boton2"
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
                                                type="reset"
                                                label="Cancelar"
                                                className="mt-2"
                                                style={{
                                                    background: "#ffff",
                                                    width: "150px",
                                                    height: "40px",
                                                    textAlign: "center",
                                                    color: "#292929",
                                                }}
                                                onClick={confirmCancelUsr}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </>
    );
};

export default RegisterPerson;
