import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { IPaciente } from "./interface/FichaDto";
import { Button } from "primereact/button";
import '../../Styles/css/FichaOdontologica.css'

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
  // console.log(pacientes.map((item) => ({ value: item.nombre })));
  // console.log(selectedPaciente);
  const date = new Date();

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

  function onPacienteChange(paciente: any) {
    const selectedPaciente = pacientes.find(
      (item) => item.id_persona === paciente.id
    );
    //recive un atributo ya definido
    //Si existe envia el objeto si no envia null
    setSelectedPaciente(selectedPaciente || null);
  }

  return (
    <div
      style={{
        display: "flex",
        paddingTop: "4rem",
        alignItems: "center",
        flexDirection: "column",
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
          style={{ marginBottom: "25px", fontFamily: "Poppins" }}
        />
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
            <span
              className="p-float-label"
            >
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
                  fontFamily: "Poppins"
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
            onClick={postFicha}
            label="Guardar"
            className="p-button-success p-button-rounded"
            style={{marginRight:"10px"}}
          />

          <Button 
            label="Cancelar"
            type="reset"
            className="p-button-danger p-button-rounded"
          />
        </div>
      </div>
    </div>
  );
}
