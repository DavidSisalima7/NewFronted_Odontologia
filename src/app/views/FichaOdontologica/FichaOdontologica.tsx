import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { IFicha, IPaciente } from "./interface/FichaDto";
import { Button } from "primereact/button";
import "../../Styles/css/FichaOdontologica.css";
import OdontoTable from "../../views/FichaOdontologica/odontoTable";
import { Card } from "@mui/material";
import { Divider } from "primereact/divider";

export default function FichaOdontologica() {
  const toast = useRef<Toast>(null);

  const [selectedPaciente, setSelectedPaciente] = useState<IPaciente | null>(
    null
  );

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
      "http://localhost:8080/api/persona/listarP"
    );
    setPacientes(data as IPaciente[]);
  };

  useEffect(() => {
    getPaciente();
  }, []);

  const showError = (errorPrincipal: any, detalleError: any) => {
    toast.current?.show({
      severity: "error",
      summary: errorPrincipal,
      detail: detalleError,
      life: 3000,
    });
  };

  const showSuccess = (mensajePrincipal: any, detallePrincipal: any) => {
    toast.current?.show({
      severity: "success",
      summary: mensajePrincipal,
      detail: detallePrincipal,
      life: 3000,
    });
  };

  const save = async () => {
    if (antecedentes !== "" && motivo !== "" && observaciones !== "") {
      if (ficha) {
        await putFicha();
        showSuccess("OK", "Ficha Registrada Correctamente");
      } else {
        await postFicha();
        showSuccess("OK", "Ficha Registrada Modificada");
      }
    } else {
      showError("Error!", "Revizar que todos los campos esten llenos");
    }
  };

  const postFicha = async () => {
    const url = "http://localhost:8080/api/ficha/crear";
    const data = {
      diagnostico: antecedentes,
      fecha_consulta: date,
      motivo_consulta: motivo,
      observaciones: observaciones,
      habilitado: 1,
      persona: {
        id_persona: selectedPaciente?.id_persona,
      },
    };
    const response = await axios.post(url, data);
    handleCancelar();
  };

  const deleteFicha = async () => {
    const url = `http://localhost:8080/api/ficha/eliminar/${ficha?.id_ficha}`;
    const data = {
      habilitado: 0,
    };
    const response = await axios.put(url, data);
    handleCancelar();
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
    handleCancelar();
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

  function handleCancelar() {
    setAntecedente("");
    setMotivo("");
    setObservaciones("");
    setSelectedPaciente(null);
    setShowTable(false);
  }

  const selectedPacientTemplate = (option: any, props: any) => {
    if (option) {
      return <div className="flex align-items-center">{option.label}</div>;
    }

    return <span>{props.placeholder}</span>;
  };

  const pacientOptionTemplate = (option: any) => {
    return <>{option.label}</>;
  };
  return (
    <div className="fichaP">
      <label className="labelFicha">Ficha Odontológica</label>
      <Toast ref={toast} />

      <Card id="card1">
        <div className="container" id="container">
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>Seleccione el paciente</b>
            </div>
          </Divider>
          <Dropdown
            filter
            valueTemplate={selectedPacientTemplate}
            itemTemplate={pacientOptionTemplate}
            value={{
              id: selectedPaciente?.id_persona,
              label: `${selectedPaciente?.nombre} ${selectedPaciente?.apellido}`,
            }}
            onChange={(e) => {
              onPacienteChange(e.value);
              setShowTable(true);
            }}
            options={pacientes.map((item) => ({
              id: item.id_persona,
              label: `${item.nombre} ${item.apellido}`,
            }))}
            optionLabel="label"
            placeholder="Seleccione un Paciente"
          />

          <div>
            {show && (
              <div id="botonDiv">
                <Button
                  id="botonEliminar"
                  label="Terminar Tratamiento"
                  icon="pi pi-times"
                  onClick={deleteFicha}
                  outlined
                ></Button>
              </div>
            )}
          </div>
          <div>
            {show && (
              <div className="tableO">
                <OdontoTable id_ficha={ficha?.id_ficha} />
              </div>
            )}
          </div>
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>Datos del paciente</b>
            </div>
          </Divider>
          <table id="tb12">
            <td>
              <span className="p-float-label">
                <InputText
                  id="txtInput"
                  value={selectedPaciente?.cedula || ""}
                  disabled
                  placeholder="Disabled"
                />
                <label className="InputS" htmlFor="Cedula">
                  Cédula
                </label>
              </span>
              <span className="p-float-label" style={{ marginTop: "20px" }}>
                <InputText
                  id="txtInput"
                  value={selectedPaciente?.genero || ""}
                  disabled
                  placeholder="Disabled"
                />
                <label className="InputS" htmlFor="Género">
                  Género
                </label>
              </span>
            </td>
            <td>
              <span className="p-float-label">
                <InputText
                  id="txtInput"
                  value={selectedPaciente?.nombre || ""}
                  disabled
                  placeholder="Disabled"
                />
                <label className="InputS" htmlFor="Nombres">
                  Nombres
                </label>
              </span>
              <span id="span1" className="p-float-label">
                <InputText
                  id="txtInput"
                  value={selectedPaciente?.fechaNac || ""}
                  disabled
                  placeholder="Disabled"
                />
                <label className="InputS" htmlFor="Fecha Nacimiento">
                  Fecha Nacimiento
                </label>
              </span>
            </td>
            <td>
              <span className="p-float-label">
                <InputText
                  id="txtInput"
                  value={selectedPaciente?.apellido || ""}
                  disabled
                  placeholder="Disabled"
                />
                <label className="InputS" htmlFor="Apellidos">
                  Apellidos
                </label>
              </span>
              <span id="span1" className="p-float-label">
                <InputText
                  id="txtInput"
                  value={selectedPaciente?.direccion || ""}
                  disabled
                  placeholder="Disabled"
                />
                <label className="InputS" htmlFor="Dirección">
                  Dirección
                </label>
              </span>
            </td>
          </table>
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>Datos de la ficha</b>
            </div>
          </Divider>
          <div>
            <h5 className="textI">Antecedentes</h5>
            <textarea
              id="textA"
              value={antecedentes}
              onChange={(e) => setAntecedente(e.target.value)}
              rows={3}
              cols={30}
              className="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable "
            ></textarea>
            <h5 className="textI">Motivo de Consulta</h5>
            <textarea
              id="textA"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={3}
              cols={30}
              className="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable"
            ></textarea>
            <h5 className="textI">Observaciones</h5>
            <textarea
              id="textA"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={3}
              cols={30}
              className="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable"
            ></textarea>
          </div>
          <div className="botones">
            <Button
              onClick={save}
              label="Guardar"
              className="p-button-success"
              style={{ marginRight: "10px" }}
            />
            <Button
              onClick={handleCancelar}
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
