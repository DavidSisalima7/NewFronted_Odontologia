import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IOdontograma } from "./interface/Odontograma";
import axios from "axios";

import { useEffect, useState } from "react";

 function OdontoTable({id_ficha}:{id_ficha:number|undefined}) {

  const [odontograma, setOdontograma] = useState<IOdontograma[]>([]);

  const getOdontograma = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/odontograma/buscar/${id_ficha}`
    );
    setOdontograma(data as IOdontograma[]);
  };

  useEffect(() => {
    getOdontograma();
  }, [id_ficha]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Odontogramas</span>
    </div>
  );
  return (
    <div className="card">
      <DataTable
        value={odontograma}
        header={header}
        tableStyle={{ minWidth: "20rem", borderRadius: "15px" }}
      >
        <Column
          field="fecha_Odontograma"
          header="Fecha"
          style={{
            textAlign:"center"
          }}
        ></Column>
      </DataTable>
    </div>
  );
}
export default OdontoTable