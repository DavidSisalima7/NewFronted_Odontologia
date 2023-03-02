import React, { createContext, useEffect, useState } from 'react';
import { PiezaService } from '../../services/PiezaService'

export const PiezaContext = createContext();

const PiezaContextProvider = (props) => {
    
    const piezaService = new PiezaService();

    const [piezas, setPiezas] = useState([]);

    const [editPieza, setEditPieza] = useState(null);

    useEffect(() => {
        piezaService.getAll().then(data=>{
            setPiezas(data)
          })  
    }, []);

    const createPieza = (pieza) => {
        piezaService.save(pieza).then(data=> {setPiezas([...piezas, data])});
    };

    const deletePieza = (id) => {
        piezaService.delete(id).
            then(() => setPiezas(piezas.filter((p) => p.id_pieza !== id)));
            setEditPieza(null);
    };
    
    const findPieza = (id) => {
        // const pieza = piezas.find((p) => p.id_pieza === id);
        const pieza = piezas.find((p) => p.id_pieza === id);
        console.log(pieza)
        setEditPieza(pieza);
    }
    const updatePieza=(pieza)=>{
        piezaService.update(pieza).then((data)=>setPiezas(
            piezas.map(e=>(e.id_pieza===pieza.id_pieza?data:e))
        ));

        setEditPieza(null)
    };

    return (
        <PiezaContext.Provider
            value={{
                createPieza,
                deletePieza,
                findPieza,
                updatePieza,
                editPieza,
                piezas,
                setEditPieza,
            }}
        >
            {props.children}
        </PiezaContext.Provider>
    );
}
export default PiezaContextProvider;