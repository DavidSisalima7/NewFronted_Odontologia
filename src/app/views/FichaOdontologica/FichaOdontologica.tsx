import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { IFicha, IPaciente } from "./interface/FichaDto";
import { Button } from "primereact/button";
import "../../Styles/css/FichaOdontologica.css";
import OdontoTable from "../../views/FichaOdontologica/odontoTable";
import { Card } from "@mui/material";

export default function FichaOdontologica() {
  //El estado paciento el cual puede ser IPaciente o nulo, va a ser nulo al inicio del renderizado.
  const [selectedPaciente, setSelectedPaciente] = useState<IPaciente | null>(
    null
  );
  const [antecedentes, setAntecedente] = useState("");

  const [motivo, setMotivo] = useState("");

  const [observaciones, setObservaciones] = useState("");
  //<Interface> tipado al estado creado
  const [pacientes, setPacientes] = useState<IPaciente[]>([]);

  const [ficha, setFicha] = useState<IFicha | null>(null);

  const [show, setShowTable]=useState(false);
  console.log(show)
  // console.log(pacientes.map((item) => ({ value: item.nombre })));
  // console.log(selectedPaciente);
  const date = new Date();

  const getFicha = async (id_persona:number) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/ficha/buscarF/${id_persona}`
    );
    setObservaciones((data as IFicha).observaciones || '' );
    setAntecedente((data as IFicha).diagnostico || '');
    setMotivo((data as IFicha).motivo_consulta || '');
    setFicha(data as IFicha);
  };

  const getPaciente = async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/persona/listar"
    );
    setPacientes(data as IPaciente[]);
  };
  // Antes de renderizar
  useEffect(() => {
    getPaciente();
  }, []);

const save= async() =>{
  if(ficha){
    await putFicha();
  }else{
    await postFicha();
  }
  
}

  const postFicha = async () => {
    const url = "http://localhost:8080/api/ficha/crear";
    const data = {
      diagnostico: antecedentes,
      fecha_consulta: date,
      motivo_consulta: motivo,
      observaciones: observaciones,
      persona: {
        id_persona: selectedPaciente?.id_persona,
      },
    };
    const response = await axios.post(url, data);
  };
  const putFicha = async () => {
    const url = `http://localhost:8080/api/ficha/actualizar/${ficha?.id_ficha}`;
    const data = {
      diagnostico: antecedentes,
      fecha_consulta: date,
      motivo_consulta: motivo,
      observaciones: observaciones
    };
    const response = await axios.put(url, data);
  };

  function onPacienteChange(paciente: any) {
    const selectedPaciente = pacientes.find(
      (item) => item.id_persona === paciente.id
    );
    //recive un atributo ya definido
    //Si existe envia el objeto si no envia null
    setSelectedPaciente(selectedPaciente || null);
    getFicha(paciente.id);
  }

  // const handleShow = () => {

  // }

  function handleShow() {
    if (show) {
      setShowTable(false)
    } else {
      setShowTable(true)
    }
    // setShowTable(show? false :  true)
    // setShowTable(!show)
    // setShowTable(prevState => !prevState)
  }
  return (
    <div
      style={{
        display: "flex",
        paddingTop: "4rem",
        alignItems: "center",
        flexDirection: "column",
        background:"white"
      }}
    >
      <label
        style={{
          color: "#05313A",
          fontFamily: "Poppins",
          fontSize: "35px",
          fontStyle: "oblique",
        }}
      >
        Ficha Odontológica
      </label>
      <Card>
      <div
        id="container"
        style={{
          padding: "8px",
        }}
      >
        <h5
          style={{
            color: "#05313A",
            fontFamily: "Poppins",
            marginLeft: "15px",
            marginTop: "5px",
            fontSize: "23px",
            textAlign: "center",
          }}
        >
          Datos del Cliente
        </h5>

        <Dropdown
          //El componente no le importa la lista de objetos siempre y cuando seleccione lo que quiero mostrar
          value={{
            id: selectedPaciente?.id_persona,
            label: `${selectedPaciente?.nombre} ${selectedPaciente?.apellido}`,
          }}
          //cambios el estado por lo q esta en el dropdown
          onChange={(e) => onPacienteChange(e.value)}
          //map devuelve una array con la misma cantidad de elementos
          //=> retorna de una sola llamada
          // options={pacientes.map((item) => ({ label: item.nombre, dir: item.apellido}))}
          options={pacientes.map((item) => ({
            //objeto
            id: item.id_persona,
            //concatenacion de variables
            label: `${item.nombre} ${item.apellido}`,
          }))}
          optionLabel="label"
          placeholder="Seleccione un Paciente"
          style={{ marginBottom: "25px", fontFamily: "Poppins",marginTop:"20px" }}
        />
          <Button onClick={handleShow} label="Save" icon="pi pi-check"  style={{ marginBottom: "25px", fontFamily: "Poppins" ,marginLeft:"45%",marginTop:"20px"}} />
          {/* <Button onClick={()=>setShowTable(!show)} label="Save" icon="pi pi-check"  style={{ marginBottom: "25px", fontFamily: "Poppins" ,marginLeft:"300px",marginTop:"20px"}} /> */}
          {show && 
          <div style={{
            position: "absolute",
            top: "60px",
            right: "30px"
        }}><OdontoTable id_ficha={ficha?.id_ficha} /></div> }
        <table>
          <td>
            <span className="p-float-label">
              <InputText
                id="cedula"
                value={selectedPaciente?.cedula}
                disabled
                placeholder="Disabled"
                style={{ margin: "5px" }}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label
                htmlFor="Cedula"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                Cédula
              </label>
            </span>
            <span className="p-float-label" style={{ marginTop: "20px" }}>
              <InputText
                id="genero"
                value={selectedPaciente?.genero}
                disabled
                placeholder="Disabled"
                style={{ margin: "5px" }}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label
                htmlFor="Género"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                Género
              </label>
            </span>
          </td>
          <td>
            <span className="p-float-label">
              <InputText
                id="nombres"
                value={selectedPaciente?.nombre}
                disabled
                placeholder="Disabled"
                style={{ margin: "5px" }}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label
                htmlFor="Nombres"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                Nombres
              </label>
            </span>
            <span className="p-float-label" style={{ marginTop: "20px" }}>
              <InputText
                id="fechaNac"
                value={selectedPaciente?.fechaNac}
                disabled
                placeholder="Disabled"
                style={{ margin: "5px" }}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label
                htmlFor="Fecha Nacimiento"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                Fecha Nacimiento
              </label>
            </span>
          </td>
          <td>
            <span className="p-float-label">
              <InputText
                id="apellidos"
                value={selectedPaciente?.apellido}
                disabled
                placeholder="Disabled"
                style={{ margin: "5px" }}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label
                htmlFor="Apellidos"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                Apellidos
              </label>
            </span>
            <span className="p-float-label" style={{ marginTop: "20px" }}>
              <InputText
                id="direccion"
                value={selectedPaciente?.direccion}
                disabled
                placeholder="Disabled"
                style={{ margin: "5px" }}
                // onChange={(e) => setValue(e.target.value)}
              />
              <label
                htmlFor="Dirección"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                Dirección
              </label>
            </span>
          </td>
        </table>

        <div>
          <h5
            style={{
              color: "#05313A",
              fontFamily: "Poppins",
              marginLeft: "15px",
              marginTop: "5px",
              fontSize: "20px",
            }}
          >
            Antecedentes
          </h5>
          <textarea
            value={antecedentes}
            onChange={(e) => setAntecedente(e.target.value)}
            rows={3}
            cols={30}
            className="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable"
            style={{
              overflow: "hidden",
              height: "80px",
              width: "98%",
              margin: "5px",
            }}
          ></textarea>
          <h5
            style={{
              color: "#05313A",
              fontFamily: "Poppins",
              marginLeft: "15px",
              marginTop: "5px",
              fontSize: "20px",
            }}
          >
            Motivo de Consulta
          </h5>
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows={3}
            cols={30}
            className="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable"
            style={{
              overflow: "hidden",
              height: "80px",
              width: "98%",
              margin: "5px",
            }}
          ></textarea>
          <h5
            style={{
              color: "#05313A",
              fontFamily: "Poppins",
              marginLeft: "15px",
              marginTop: "5px",
              fontSize: "20px",
            }}
          >
            Observaciones
          </h5>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            rows={3}
            cols={30}
            className="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable"
            style={{
              overflow: "hidden",
              height: "80px",
              width: "98%",
              margin: "5px",
            }}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={save}
            label="Guardar"
            className="p-button-success p-button-rounded"
            style={{ marginRight: "10px" }}
          />

          <Button
            label="Cancelar"
            type="reset"
            className="p-button-danger p-button-rounded"
          />
        </div>
      </div>
      </Card>
    </div>
  );
}
