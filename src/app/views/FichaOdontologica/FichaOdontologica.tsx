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
  const [selectedPaciente, setSelectedPaciente] = useState<IPaciente | null>(null);

  const [antecedentes, setAntecedente] = useState("");

  const [motivo, setMotivo] = useState("");

  const [observaciones, setObservaciones] = useState("");

  const [pacientes, setPacientes] = useState<IPaciente[]>([]);

  const [ficha, setFicha] = useState<IFicha | null>(null);

  const [show, setShowTable] = useState(false);

  const date = new Date();

  const getFicha = async (id_persona: number) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/ficha/buscarF/${id_persona}`
    );
    setObservaciones((data as IFicha).observaciones || "");
    setAntecedente((data as IFicha).diagnostico || "");
    setMotivo((data as IFicha).motivo_consulta || "");
    setFicha(data as IFicha);
  };

  const getPaciente = async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/persona/listar"
    );
    setPacientes(data as IPaciente[]);
  };

  useEffect(() => {
    getPaciente();
  }, []);

  const save = async () => {
    if (ficha) {
      await putFicha();
    } else {
      await postFicha();
    }
  };

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
      observaciones: observaciones,
    };
    const response = await axios.put(url, data);
  };

  function onPacienteChange(paciente: any) {
    const selectedPaciente = pacientes.find(
      (item) => item.id_persona === paciente.id
    );

    setSelectedPaciente(selectedPaciente || null);
    getFicha(paciente.id);
  }

  function handleShow() {
    if (show) {
      setShowTable(false);
    } else {
      setShowTable(true);
    }
  }
  return (
    <div className="fichaP">
      <label className="labelFicha">Ficha Odontológica</label>
      <Card
        style={{
          marginBottom: "10px",
        }}
      >
        <div className="container" id="container">
          <h5 className="datos">Datos del Cliente</h5>

          <Dropdown
            value={{
              id: selectedPaciente?.id_persona,
              label: `${selectedPaciente?.nombre} ${selectedPaciente?.apellido}`,
            }}
            onChange={(e) => onPacienteChange(e.value)}
            options={pacientes.map((item) => ({
              id: item.id_persona,

              label: `${item.nombre} ${item.apellido}`,
            }))}
            optionLabel="label"
            placeholder="Seleccione un Paciente"
            style={{
              marginBottom: "25px",
              fontFamily: "Poppins",
              marginTop: "20px",
            }}
          />
          <Button
            onClick={handleShow}
            label="Save"
            icon="pi pi-check"
            style={{
              marginBottom: "25px",
              fontFamily: "Poppins",
              marginLeft: "45%",
              marginTop: "20px",
            }}
          />
          {show && (
            <div className="tableO">
              <OdontoTable id_ficha={ficha?.id_ficha} />
            </div>
          )}
          <table>
            <td>
              <span className="p-float-label">
                <InputText
                  id="cedula"
                  value={selectedPaciente?.cedula}
                  disabled
                  placeholder="Disabled"
                  style={{ margin: "5px" }}
                />
                <label className="InputS" htmlFor="Cedula">
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
                />
                <label className="InputS" htmlFor="Género">
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
                />
                <label className="InputS" htmlFor="Nombres">
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
                />
                <label className="InputS" htmlFor="Fecha Nacimiento">
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
                />
                <label className="InputS" htmlFor="Apellidos">
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
                />
                <label className="InputS" htmlFor="Dirección">
                  Dirección
                </label>
              </span>
            </td>
          </table>

          <div>
            <h5 className="textI">Antecedentes</h5>
            <textarea
              name="textA"
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
            <h5 className="textI">Motivo de Consulta</h5>
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
            <h5 className="textI">Observaciones</h5>
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
          <div className="botones">
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
