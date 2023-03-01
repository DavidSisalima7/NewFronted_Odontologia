import React, { useContext, useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from "primereact/inputmask";
import { Calendar } from 'primereact/calendar'
import { PersonContext } from "../contexts/PersonContext";

export const PersonForm = (props) => {

    const { isVisible, setIsVisible } = props;

    const {
        createPerson, deletePerson, editPerson, updatePerson
    } = useContext(PersonContext);

    const blockSpecial = new RegExp(/^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/);

    const generos = [
        'Masculino', 'Femenino', 'Otro'
    ];

    const initialPersonState = {
        id_persona: null,
        cedula: "",
        nombre: "",
        apellido: "",
        email: "",
        fecha_nacimiento: null,
        genero: "",
        celular: "",
        direccion: "",
        telefono: ""
    };

    const [personData, setPersonData] = useState(initialPersonState);

    useEffect(() => {
        if (editPerson)
            setPersonData(editPerson);
    }, [editPerson]);

    const updateField = (data, field) => {

        setPersonData({ ...personData, [field]: data });

        console.log(personData);
    };

    const _deletePerson = () => {
        if (editPerson) {
            deletePerson(personData.id_persona);
            setPersonData(initialPersonState);
        }
        setIsVisible(false);
    };

    const savePerson = () => {
        if (!editPerson) {
            createPerson(personData);
        } else {
            updatePerson(personData);
        }
        setPersonData(initialPersonState);
        setIsVisible(false);
    };

    const clearSelected = () => {
        setIsVisible(false);
        setPersonData(initialPersonState);
    };

    const dialogFooter = (

        <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Eliminar" icon="pi pi-times" onClick={_deletePerson} />
            <Button label="Guardar" icon="pi pi-check" onClick={savePerson} />
        </div>
    );

    return (
        <div >
            <Dialog
                visible={isVisible}
                modal={true}
                style={{ width: "700px" }}
                contentStyle={{ overflow: "visible" }}
                header="Información Persona"
                onHide={() => clearSelected()}
                footer={dialogFooter}>

                <div className="p-grid p-fluid" >

                    <div className="row">
                        <div className="col">

                            <br />
                            <br />
                            <div className="p-float-label">
                                <span className="p-float-label">
                                    <InputText id="float-input" name="cedula" value={personData.cedula}
                                        onChange={(e) => updateField(e.target.value, "cedula")} type={"text"} keyfilter="int" />
                                    <label htmlFor="cedula">
                                        Cédula:
                                    </label>
                                </span>
                            </div>

                            <br />
                            <br />
                            <div className="p-float-label">
                                <span className="p-float-label">
                                    <InputText id="float-input" type="text" name="apellido" value={personData.apellido}
                                        onChange={(e) => updateField(e.target.value, "apellido")} keyfilter={blockSpecial} />
                                    <label htmlFor="nombre" >
                                        Apellidos:
                                    </label>
                                </span>
                            </div>

                            <br />
                            <br />
                            <div className="p-float-label">
                                <span className="p-float-label">
                                    <InputText id="float-input" type="text" value={personData.email}
                                        onChange={(e) => updateField(e.target.value, "email")} name="email" />
                                    <label htmlFor="email" >
                                        Correo Electrónico:
                                    </label>
                                </span>
                            </div>

                            <br />
                            <br />
                            <div className="p-float-label">
                                <span className="p-float-label">
                                    <InputMask id="float-input" name="celular" value={personData.celular}
                                        onChange={(e) => updateField(e.target.value, "celular")}
                                        mask="9999999999" placeholder="9999999999" />
                                    <label htmlFor="celular">
                                        Número Celular:
                                    </label>
                                </span>
                            </div>

                            <br />
                            <br />
                            <div className="p-float-label">
                                <span className="p-float-label">
                                    <InputText id="float-input" type="text" name="direccion" value={personData.direccion}
                                        onChange={(e) => updateField(e.target.value, "direccion")} />
                                    <label htmlFor="direccion">
                                        Dirección:
                                    </label>
                                </span>
                            </div>
                        </div>

                        <div className="col">

                            <br />
                            <br />
                            <span className="p-float-label">
                                <InputText id="float-input" name="nombre" value={personData.nombre}
                                    onChange={(e) => updateField(e.target.value, "nombre")} type="text" keyfilter={blockSpecial} />
                                <label htmlFor="name">
                                    Nombres:
                                </label>
                            </span>

                            <br />
                            <br />
                            <div className="p-float-label">
                                <Calendar
                                    value={personData. fecha_nacimiento&& new Date(personData.fecha_nacimiento + " ")}
                                    onChange={(e) => updateField(e.target.value.toISOString().substring(0, 10), "fecha_nacimiento")}
                                    dateFormat="yy-mm-dd" />
                                <label>Fecha de Nacimiento: </label>
                            </div>

                            <br />
                            <br />
                            <div className="p-float-label">
                                <span className="p-float-label">
                                    <Dropdown id="float-input" name="genero" value={personData.genero}
                                        onChange={(e) => updateField(e.target.value, "genero")} options={generos}
                                        placeholder="Género" className="w-full md:w-14rem" />
                                    <label htmlFor="float-input">Género:</label>
                                </span>
                            </div>

                            <br />
                            <br />
                            <div className="p-float-label">
                                <span className="p-float-label">
                                    <InputMask id="float-input" name="telefono" value={personData.telefono}
                                        onChange={(e) => updateField(e.target.value, "telefono")} mask="99-9999999"
                                        placeholder="99-9999999" />
                                    <label htmlFor="telefono">
                                        Número Telefónico:
                                    </label>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </Dialog>
        </div>
    );
}

export default PersonForm;