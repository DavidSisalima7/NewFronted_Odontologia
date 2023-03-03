import React, { useContext, useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from "primereact/divider";
import { Password } from 'primereact/password';
import { UserContext } from "../contexts/UserContext";

export const UserForm = (props) => {

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

    const [userData, setUserData] = useState(initialUserState);

    useEffect(() => {
        if (editUser)
            setUserData(editUser);
    }, [editUser]);

    const updateField = (data, field) => {

        setUserData({ ...userData, [field]: data });

        console.log(userData);
    };

    const _deleteUser = () => {
        if (editUser) {
            deleteUser(userData.id_usuario);
            setUserData(initialUserState);
        }
        setIsVisible(false);
    };

    const saveUser = () => {
        if (!editUser) {
            createUser(userData);
        } else {
            updateUser(userData);
        }
        setUserData(initialUserState);
        setIsVisible(false);
    };

    const clearSelected = () => {
        setIsVisible(false);
        setUserData(initialUserState);
    };

    const dialogFooter = (

        <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Eliminar" icon="pi pi-times" onClick={_deleteUser} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveUser} />
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
                                        header={passwordHeader}
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
                                        value={userData.password} onChange={(e) => updateField(e.target.value, "password")}
                                        toggleMask
                                        header={passwordHeader}
                                        footer={passwordFooter} />
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
    );
}

export default UserForm;