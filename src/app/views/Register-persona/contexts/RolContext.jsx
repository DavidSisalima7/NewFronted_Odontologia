import React, { createContext, useEffect, useState } from "react";
import { RolService } from "../services/rol";

export const RolContext = createContext();

const RolContextProvider = (props) => {

    const rolService = new RolService();

    const [roles, setRoles] = useState([]);

    const [editRol, setEditRoles] = useState(null);

    useEffect(() => {
        rolService.readAll().then(data => setRoles(data));
    }, [/* rolService, roles */]);

    const createRol = (rol) => {
        rolService.create(rol).then(data => setRoles([...roles, data]))
    };

    const findRol = (id) => {

        const rol = roles.find((p) => p.rolId === id);

        setEditRoles(rol);
    };

    const updateRol = (rol) => {
        rolService.update(rol).then((data) => setRoles(
            roles.map((p => p.rolId === rol.rolId ? data : p))
            ));

        setEditRoles(null)
    };

    return (

        <RolContext.Provider
            value={{
                createRol, findRol, updateRol, editRol, roles
            }}>

            {props.children}
        </RolContext.Provider>
    );
}

export default RolContextProvider;