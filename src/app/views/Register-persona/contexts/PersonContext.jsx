import React, { createContext, useEffect, useState } from "react";
import { PersonService } from "../services/persona";

export const PersonContext = createContext();

const PersonContextProvider = (props) => {

    const personService = new PersonService();

    const [persons, setPersons] = useState([]);

    const [editPerson, setEditPersons] = useState(null);

    useEffect(() => {
        personService.readAll().then(data => setPersons(data));
    }, []);

    const createPerson = (person) => {
        personService.create(person).then(data => setPersons([...persons, data]))
    };

    const deletePerson = (id) => {
        personService.delete(id).then(() => setPersons(persons.filter((p) => p._id !== id)))
    };

    const findPerson = (id) => {
        const person = persons.find((p) => p._id === id);

        setEditPersons(person);
    };

    const updatePerson = (person) => {
        personService.update(person).then((data) => setPersons(persons.map((p => p._id === person._id ? data : person))));

        setEditPersons(null)
    };

    return (

        <PersonContext.Provider
            value={{
                createPerson, deletePerson, findPerson,
                updatePerson, editPerson, persons
            }}>

            {props.children}
        </PersonContext.Provider>
    );
}

export default PersonContextProvider;