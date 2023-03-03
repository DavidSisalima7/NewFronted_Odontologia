import React, { useContext, useState } from "react";

import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../../../Styles/css/Register-person.css";
import { UserContext } from "../contexts/UserContext";
import UserForm from "./FormUser";

export const UserList = () => {

    const { users, findUser } = useContext(UserContext);

    const [isVisible, setIsVisible] = useState(false);

    const saveUser = (id) => {

        findUser(id);
        setIsVisible(true);
    };

    return (
        <div className="fichaP">
            <div className="container" id="container">

                <Panel header="LISTA DE USUARIOS" style={{ textAlign: "center" }}>
                    <DataTable
                        value={users}
                        selectionMode="single"
                        onSelectionChange={(e) => saveUser(e.value.username)}>

                        <Column field="username" header="Nombre de Usuario" />
                        <Column field="enabled" header="Habilitado" />
                    </DataTable>
                </Panel>

                <UserForm isVisible={isVisible} setIsVisible={setIsVisible} />

            </div>

        </div>
    );
}

export default UserList;