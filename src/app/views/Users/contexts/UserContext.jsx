import React, { createContext, useEffect, useState } from "react";
import { UserService } from "../services/user";

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const userService = new UserService();

    const [users, setUsers] = useState([]);

    const [editUser, setEditUsers] = useState(null);

    useEffect(() => {
        userService.readAll().then(data => setUsers(data));
    }, [/* userService, users */]);

    const createUser = (user) => {
        userService.create(user).then(data => setUsers([...users, data]))
    };

    const findUser = (id) => {

        const user = users.find((p) => p.username === id);

        setEditUsers(user);
    };

    const updateUser = (user) => {
        userService.update(user).then((data) => setUsers(
            users.map((p => p.id_usuario === user.id_usuario ? data : p))
        ));

        setEditUsers(null)
    };

    const deleteUser = (id) => {
        userService.delete(id).then(() => setUsers(users.filter((p) => p.id_usuario !== id)));
        setEditUsers(null);
    };

    return (

        <UserContext.Provider
            value={{
                createUser, findUser, deleteUser,
                updateUser, editUser, users, setEditUsers
            }}>

            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;