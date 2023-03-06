import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { Divider } from "primereact/divider";
import { Password } from 'primereact/password';
import { UserContext } from "../contexts/UserContext";
import { Toast } from "primereact/toast";

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

    const { isVisible, setIsVisible } = props;

    const {
        createUser, editUser, deleteUser, updateUser
    } = useContext(UserContext);

    const initialUserState = {
        id_usuario: null,
        username: "",
        password: "",
        enabled: true
    };

    const [confPassword, setConfirmPassword] = useState("");

    const [userData, setUserData] = useState(initialUserState);

    useEffect(() => {
        if (editUser)
            setUserData(editUser);
    }, [editUser]);

    const updateField = (data, field) => {

        setUserData({ ...userData, [field]: data });

        console.log(userData);
    };

    const ChangeEnabled = () => {
        if (userData.enabled == true) {
            updateField(userData.enabled == false, "enabled");
        } else {
            updateField(userData.enabled == true, "enabled");
        }
    };

    const saveUser = () => {
        if (!editUser) {
            createUser(userData);
        } else {

            if (userData.password == confPassword) {
                updateUser(userData);
                setUserData(initialUserState);
                setIsVisible(false);
                setConfirmPassword('');
                showSuccess("OK", "Usuario Actualizado Correctamente");
            } else {
                showError("ERROR", 'Las Contraseñas no Coinciden')
            }
        }
    };

    const clearSelected = () => {
        setIsVisible(false);
        setUserData(initialUserState);
    };

    const dialogFooter = (

        <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Eliminar" icon="pi pi-times" onClick={ChangeEnabled} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveUser} />
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
                    header="Información Usera"
                    onHide={() => clearSelected()}
                    footer={dialogFooter}>

                    <div className="p-grid p-fluid">

                        <div className="row">

                            <div className="col">

                                <div className="campo p-col-12 p-md-4">
                                    <span className="p-float-label">
                                        <InputText id="float-input" name="username" type={"text"}
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
                                            value={userData.password} onChange={(e) => updateField(e.target.value, "password")}
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