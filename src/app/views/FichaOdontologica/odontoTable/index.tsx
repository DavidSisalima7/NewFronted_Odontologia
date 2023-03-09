import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IOdontograma } from "./interface/Odontograma";
import "../../../Styles/css/FichaOdontologica.css";
import axios from "axios";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { useHistory } from "react-router-dom";
import { PiezaService } from "../../../services/PiezaService";

function OdontoTable({ id_ficha }: { id_ficha: number | undefined }) {
  const [odontogramas, setOdontograma] = useState<IOdontograma[]>([]);
  const history = useHistory();

  const piezaService = new PiezaService();


  function handleClick() {

    history.push({
      pathname: "/odontograma",
      state: { idF: odontogramas[0].id_odontograma },
    });
  }
 

  console.log("fuera", odontogramas);

  const getOdontograma = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/odontograma/buscar/${id_ficha}`
    );
    setOdontograma((prevState) => [...(data as IOdontograma[])]);
  };

  const date = new Date();

  const postOdontograma = async () => {
    const url = "http://localhost:8080/api/odontograma/crear";
    const odonto = {
      fecha_Odontograma: date,
      fichaOdontologica: {
        id_ficha: id_ficha,
      },
    };
    const { data } = await axios.post(url, odonto);

    history.push({
      pathname: "/odontograma",
      state: { idF: (data as IOdontograma)?.id_odontograma },
    });
  };

  useEffect(() => {
    if (id_ficha) {
      getOdontograma();
    }
  }, [id_ficha]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Odontogramas</span>
    </div>
  );
  return (
    <Card id="cardTable">
      <div
        className="card"
        style={{
          marginTop: "10px",
          marginRight: "10px",
          marginBottom: "10px",
          marginLeft: "10px",
        }}
      >
        <DataTable
          value={odontogramas}
          header={header}
          tableStyle={{ minWidth: "20rem", borderRadius: "15px" }}
        >
          <Column
            field="fecha_Odontograma"
            header="Fecha"
            style={{
              textAlign: "center",
            }}
          ></Column>
        </DataTable>
        <div className="btnOdonto">
          <Button id="btnCrear" onClick={postOdontograma}></Button>
          <Button id="btnEditar" onClick={handleClick}></Button>
        </div>
      </div>
    </Card>
  );
}
export default OdontoTable;
