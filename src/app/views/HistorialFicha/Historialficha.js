import './Historialficha.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx/xlsx.mjs';

function Historial_ficha() {

  //Capturar id_persona de session Storage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const id_persona = userObj.id;

  //Eliminar solo es un log para ver si recibe el id_persona
  useEffect((() => {
    console.log(id_persona);
  }))


  const [ficha, setFichas] = useState([]);
  const [tablaFichas, setTablaFichas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  var XLSX = require("xlsx");
  const generateExcel = () => {
    // Obtener la tabla
    const table = document.getElementById('my-table');

    // Convertir la tabla en un objeto de datos de Excel
    const workbook = XLSX.utils.table_to_book(table);

    // Descargar el archivo Excel
    XLSX.writeFile(workbook, 'HISTORIAL FICHA.xlsx');
  }

  const peticionGet = async () => {
    await axios.get("http://localhost:8080/api/ficha/listar")
      .then(response => {
        setFichas(response.data);
        setTablaFichas(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const handleChange = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaFichas.filter((elemento) => {
      if (elemento.id_ficha.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.persona.cedula.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.fecha_consulta.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.persona.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) + elemento.persona.apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setFichas(resultadosBusqueda);
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div className="App">

      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Id Ficha, Fecha, Cédula, Nombre"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="table-responsive">
        <DataTable
          id="my-table"
          responsiveLayout="scroll"
          style={{ textAlign: "center", }}
          selectionMode="single"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          value={ficha}>

          <Column field="id_ficha" header="ID FICHA" />
          <Column field="diagnostico" header="DIÁGNOSTICO" />
          <Column field="fecha_consulta" header="FECHA" />
          <Column field="motivo_consulta" header="MOTIVO" />
          <Column field="observaciones" header="OBSERVACIONES" />
          <Column field="persona.cedula" header="CÉDULA" />
          <Column
            field="persona.nombre"
            header="NOMBRE"
            body={(rowData) =>
              `${rowData.persona.nombre} ${rowData.persona.apellido}`
            }
          />
        </DataTable>
      </div>
      <button onClick={generateExcel} className="mi-boton">IMPRIMIR</button>
    </div>
  );
}

export default Historial_ficha;
