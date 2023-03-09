import React, { useContext, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { PiezaContext } from "./PiezaContext";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";

import "../../Styles/css/Piezas.css";
import { useLocation } from "react-router-dom";
const PiezasForm = (props) => {
  //Props
  const { isVisible, setIsVisible, seleccion, toast, idondonto } = props;
  const [confirm, setConfirm] = useState(false);
  console.log(idondonto);

  useEffect(() => {
    setPiezaData({
      ...piezaData,
      ["numero_pieza"]: seleccion,
      ["odontograma"]:{id_odontograma:location.state.idF},
      // ["id_odontograma"]: Varible_Del_Odontograma enviada,
    });
  }, [seleccion, isVisible]);
  
  //Aqui llega el id de odontograma
  let location = useLocation();
  console.log(location.state.idF);
  const {
    createPieza,
    deletePieza,
    // findPieza,
    updatePieza,
    editPieza,
    setEditPieza,
  } = useContext(PiezaContext);
  const initialPiezaState = {
    numero_pieza: "",
    tratamiento: "Apiceptomía",
    cara_pieza: "Vestibular",
    odontograma: {
      id_odontograma: location.state.idF,
    },
  };
  const [piezaData, setPiezaData] = useState(initialPiezaState);

  useEffect(() => {
    if (editPieza) setPiezaData(editPieza);
  }, [editPieza]);

  const changeField = (data, field) => {
    setPiezaData({
      ...piezaData,
      [field]: data,
    });
    console.log(piezaData);
  };
  const guardarPieza = () => {
    console.log(piezaData);
    if (!editPieza) {
      console.log("si");
      createPieza(piezaData);
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Operacion Exitosa",
        life: 3000,
      });
    } else {
      updatePieza(piezaData);
    }
    setPiezaData(initialPiezaState);
    setIsVisible(false);
  };
  const _borrarPieza = () => {
    if (editPieza) {
      deletePieza(piezaData.id_pieza);
      setPiezaData(initialPiezaState);
      setIsVisible(false);
      setConfirm(false);
      toast.current.show({
        severity: "error",
        summary: "Eliminado",
        detail: "Datos eliminados",
      });
    }
  };

  //Valores para el combo box de tratamietno
  const tratamientos = [
    "Apiceptomía",
    "Carillas",
    "Cirugía",
    "Contanto Alimento",
    "Corona",
    "Curetaje",
    "Endodoncia",
    "Esquelético",
    "Estética",
    "Exploración",
    "Extrusión",
    "Furcas",
    "Girar",
    "Impacto Alimento",
    "Impresiones",
    "Inclinación",
    "Limpieza",
    "Movilidad",
    "Obturación",
    "Ortodoncia",
    "Perno",
    "Pilar Solo",
    "Pilar Transpitelial",
    "Placa Descarga",
    "Protesis Removible",
    "Puente",
    "Quitar",
    "Radiografía",
    "Reconstrucción",
    "Sangrado",
    "Sellador",
    "Sensibilidad",
    "Supurado",
    "Tornillo",
    "Tornillo Solo",
    "Tratamiento",
    "Otro",
  ];
  //Valores para el combo box de cara
  const caras = [
    "Vestibular",
    "Lingual",
    "Palatino",
    "Mesial",
    "Distal",
    "Oclusal",
  ];
  return (
    <>
      {/* Dialogo para la creacion de una pieza*/}
      {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
      <Dialog
        className="DialogoCentrado"
        header="AGREGAR PIEZA"
        modal={true}
        visible={isVisible}
        contentStyle={{ overflow: "visible" }}
        onHide={() => {
          setIsVisible(false);
          setEditPieza(null);
        }}
      >
        <Divider />
        <label className="form-label elementosDialog TextoMamalon">
          Pieza Seleccionada:{" "}
        </label>
        <div className="elementosDialog">
          <Avatar
            label={piezaData.numero_pieza}
            className="mr-2 elementosDialog"
            size="xlarge"
          />
        </div>
        <Divider />
        {/* Tratamiento */}
        <label className="form-label elementosDialog TextoMamalon">
          Tratamiento:
        </label>
        <div className="card flex justify-content-center elementosDialog">
          <Dropdown
            value={piezaData.tratamiento}
            onChange={(e) => changeField(e.target.value, "tratamiento")}
            options={tratamientos}
            optionLabel=""
            placeholder={piezaData.tratamiento}
            className="w-full md:w-20rem "
          />
        </div>
        <Divider />
        {/* Caras */}
        <label className="form-label elementosDialog TextoMamalon">Cara:</label>
        <div className="card flex justify-content-center elementosDialog">
          <Dropdown
            value={piezaData.cara_pieza}
            onChange={(e) => changeField(e.target.value, "cara_pieza")}
            options={caras}
            optionLabel=""
            placeholder="Seleccione un tratamiento"
            className="w-full md:w-14rem"
          />
        </div>
        <Divider />
        <div>
          <Button
            label="Aceptar"
            icon="pi pi-check"
            onClick={guardarPieza}
            autoFocus
          />
          <Button
            label="Borrar"
            icon="pi pi-times"
            onClick={() => setConfirm(true)}
            className="p-button-text"
          />
        </div>
      </Dialog>

      {/* Dialogo de eliminacion */}
      <Dialog
        header="Desea eliminar este registro?"
        visible={confirm}
        style={{ width: "25vw" }}
        onHide={() => setConfirm(false)}
      >
        <div>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => {
              setIsVisible(false);
              setEditPieza(false);
              setConfirm(false);
            }}
            className="p-button-text"
          />
          <Button
            label="Confirmar"
            icon="pi pi-check"
            onClick={_borrarPieza}
            autoFocus
          />
        </div>
      </Dialog>
    </>
  );
};
export default PiezasForm;
