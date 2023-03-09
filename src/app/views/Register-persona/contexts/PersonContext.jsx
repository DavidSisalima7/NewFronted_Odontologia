import React, { createContext, useEffect, useState } from "react";
import { PersonService } from "../services/persona";

export const PersonContext = createContext();

const PersonContextProvider = (props) => {

    const personService = new PersonService();

    const [persons, setPersons] = useState([]);

    const [editPerson, setEditPersons] = useState(null);

    useEffect(() => {
        personService.readAll().then(data => { setPersons(data) });
    }, [personService, persons]);

    const createPerson = (person) => {
        personService.create(person).then(data => setPersons([...persons, data]))
    };

    const deletePerson = (id) => {
        personService.delete(id).then(() => setPersons(persons.filter((p) => p._id !== id)));
        setEditPersons(null);
    };

    const findPerson = (id) => {

        const person = persons.find((p) => p.cedula === id);

        setEditPersons(person);
    };

    const updatePerson = (person) => {
        personService.update(person).then((data) => setPersons(
            persons.map((p => p.id_persona === person.id_persona ? data : p))
        ));

        setEditPersons(null)
    };

    return (

        <PersonContext.Provider
            value={{
                createPerson, deletePerson, findPerson,
                updatePerson, editPerson, persons, setEditPersons
            }}>

            {props.children}
        </PersonContext.Provider>
    );
}

export default PersonContextProvider;