import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { Divider } from "primereact/divider";
import { Password } from 'primereact/password';
import { UserContext } from "../contexts/UserContext";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

export const UserForm = (props) => {

    const toast = useRef(null);

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

    const confirmSubmitUsr = () => {
        confirmDialog({
            message: 'Esta seguro de modificar la información?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };

    const reject = () => {

        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Continue con el registro', life: 3000 });
    }

    const [confPassword, setConfirmPassword] = useState("");

    const accept = () => {

        if (confirmSubmitUsr && confPassword != '') {
            saveUser();
        }
    }

    const { isVisible, setIsVisible } = props;

    const {
        createUser, editUser, updateUser, setEditUsers
    } = useContext(UserContext);

    const initialUserState = {

        id_usuario: null,
        username: "",
        password: "",
        enabled: null
    };

    const [userData, setUserData] = useState(initialUserState);

    const [label, setLab] = useState("Habilitar/Deshabilitar");

    useEffect(() => {
        if (editUser)
            setUserData(editUser);

    }, [editUser]);

    const updateField = (data, field) => {

        setUserData({ ...userData, [field]: data });

        console.log(userData);
    };

    const [valid, setValid] = useState(false);
    const [strength, setStrength] = useState(0);

    const handleChange = (event) => {
        updateField(event.target.value, "password");
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

    const ChangeEnabled = async () => {

        if (userData.enabled == true) {
            updateField(false, "enabled");
            //setLab('Habilitar');
            //showSuccess("OK", "Usuario Deshabilitado");
            showSuccess("OK", "Usuario Habilitado");
        } else if (userData.enabled == false) {
            updateField(true, "enabled");
            //setLab('Deshabilitar');
            showSuccess("OK", "Usuario Deshabilitado");
            //showSuccess("OK", "Usuario Habilitado");
        }
        updateUser(userData);
    };

    const actualizar = () => {
        updateUser(userData);
        setUserData(initialUserState);
        setIsVisible(false);
        setConfirmPassword('');
        showSuccess("OK", "Usuario Actualizado Correctamente");
    }

    const saveUser = () => {
        if (!editUser) {

            createUser(userData);
        } else {
            console.log("entro aca");
            if (userData.username != '' && userData.password != '') {

                if (valid && userData.password) {

                    if (userData.password == confPassword) {
                        actualizar();
                    } else {
                        showError("ERROR", 'Las Contraseñas no Coinciden')
                    }
                } else {
                    showError('ERROR', 'Tome en cuenta las sugerencias de contraseña')
                }

            } else {

                showError("ERROR", 'Llene Todos Los Campos')
            }
        }
    };

    const clearSelected = () => {
        setIsVisible(false);
        setEditUsers(false);
        /* setUserData(initialUserState); */
    };

    const dialogFooter = (

        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog />
            <Button label={label} icon="pi pi-times" onClick={ChangeEnabled} />
            <Button label="Guardar" icon="pi pi-check" onClick={confirmSubmitUsr} />
        </div>
    );

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

            <div >
                <Dialog
                    visible={isVisible}
                    modal={true}
                    style={{ width: "700px" }}
                    contentStyle={{ overflow: "visible" }}
                    header="Información User"
                    onHide={() => clearSelected()}
                    footer={dialogFooter}>

                    <div className="p-grid p-fluid">

                        <div className="row">

                            <div className="col">

                                <div className="campo p-col-12 p-md-4">
                                    <span className="p-float-label">
                                        <InputText id="float-input" name="username" type={"text"} disabled
                                            value={userData.username} onChange={(e) => updateField(e.target.value, "username")} />
                                        <label htmlFor="username">
                                            Username:
                                        </label>
                                    </span>
                                </div>

                                <div className="campo p-col-12 p-md-4">
                                    <span className="p-float-label">
                                        <Password
                                            id="password" name="password"
                                            value={userData.password} onChange={handleChange}
                                            toggleMask
                                            promptLabel="Ingrese una Contraseña" weakLabel="Debil" mediumLabel="Medio"
                                            strongLabel="Fuerte"
                                            footer={passwordFooter} />
                                        <label
                                            htmlFor="password">
                                            Contraseña:
                                        </label>
                                    </span>
                                </div>

                            </div>

                            <div className="col">

                                <div className="campo p-col-12 p-md-4">
                                    <span className="p-float-label">
                                        <Password
                                            id="password" name="password"
                                            value={confPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            toggleMask feedback={false} />
                                        <label
                                            htmlFor="password">
                                            Repetir Contraseña:
                                        </label>
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>

                </Dialog>
            </div>
        </>
    );
}

export default UserForm;