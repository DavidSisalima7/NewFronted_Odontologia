
import './Odontogram.css';
import "./Odontogram"
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';
import { PiezaService } from './service/PiezaService'
export const Odontogram2 = () => {

  // Codigo para llenar la tabla segun un array
  const [pieza, setPieza] = useState([]);
  const [contador, setContador] = useState(0);

  //Para el dialog de la creacion de pieza y el otro
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);

  //Para los combo box
  const [seleccion, setSeleccion] = useState("");
  const [tratamiento, setTratamiento] = useState({ name: 'Apiceptomía' });
  const [cara, setCara] = useState({ name: 'Vestibular' });
  const toast = useRef(null);

  //Variable para el id a eliminar
  const [idEliminar,
    setIdEliminar] = useState(0);

  //Valores para el combo box de tratamietno
  const tratamientos = [
    { name: 'Apiceptomía' },
    { name: 'Carillas' },
    { name: 'Cirugía' },
    { name: 'Contanto Alimento' },
    { name: 'Cororona' },
    { name: 'Curetaje' },
    { name: 'Endodoncia' },
    { name: 'Esquelético' },
    { name: 'Estética' },
    { name: 'Exploración' },
    { name: 'Extrusión' },
    { name: 'Furcas' },
    { name: 'Girar' },
    { name: 'Impacto Alimento' },
    { name: 'Impresiones' },
    { name: 'Inclinación' },
    { name: 'Limpieza' },
    { name: 'Movilidad' },
    { name: 'Obturación' },
    { name: 'Ortodoncia' },
    { name: 'Perno' },
    { name: 'Pilar Solo' },
    { name: 'Pilar Transpitelial' },
    { name: 'Placa Descarga' },
    { name: 'Protesis Removible' },
    { name: 'Puente' },
    { name: 'Quitar' },
    { name: 'Radiografía' },
    { name: 'Reconstrucción' },
    { name: 'Sangrado' },
    { name: 'Sellador' },
    { name: 'Sensibilidad' },
    { name: 'Supurado' },
    { name: 'Tornillo' },
    { name: 'Tornillo Solo' },
    { name: 'Tratamiento' },
    { name: 'Otro' },
  ];
  //Valores para el combo box de cara
  const caras = [
    { name: 'Vestibular' },
    { name: 'Lingual' },
    { name: 'Palatino' },
    { name: 'Mesial' },
    { name: 'Distal' },
    { name: 'Oclusal' },
  ];
  //Funciones
  //Seleccion del diente y aparece el dialog
  const nuevaPieza = (e) => {
    setSeleccion(e.target.id.slice(0, -1))
    setVisible(true)
  }
  //Seleccion del combo de tratamiento
  const selTratamiento = (e) => {
    setTratamiento(e.target.value)
  }
  //Seleccion del combo de cara
  const selCara = (e) => {
    setCara(e.target.value)
  }
  //Metodo para guardar la pieza
  const guardar = () => {
    setContador(contador + 1);
    setPieza(pieza => [...pieza, {
      id_pieza: contador,
      fichaMedica: "",
      numero_pieza: seleccion,
      tratamiento: tratamiento.name,
      cara_pieza: cara.name,
    }]);
    setVisible(false)
  }

  //Metodos para borrar tuplas de la tabla
  const dateTemplate = (rowData, column) => {

    return <div style={{ alignContent: 'center' }}>
      <Button label="Eliminar" icon="pi pi-times" onClick={() => rowColumnClick(rowData)} className="p-button-text" />
    </div>;
  }

  const rowColumnClick = (rowData) => {
    setConfirm(true)
    setIdEliminar(rowData.id_pieza)
  }
  const eliminar = () => {
    setPieza((current) =>
      current.filter(
        (pieza) => !(pieza.id_pieza === idEliminar)
      )
    );
    toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
    setConfirm(false)
  }


  //Api
  const piService = new PiezaService();

  const save = () => {
    pieza.map((pi) =>
      piService.save({
        numero_pieza: pi.numero_pieza,
        cara_pieza: pi.cara_pieza,
        tratamiento: pi.tratamiento,
        odontograma: {
          id_odontograma: 2,
          fichaOdontologica: {
            id_ficha: 1,
            persona: {
              id_persona: 123,
            }
          }
        }
      }).then(data => {
        console.log(data);
      }),
    )
    toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
  }
  const cargartabla = () => {
    // piService.getAll().then(data=>setPieza({pieza:data}))
    piService.getAll().then(data=>{
      data.map((pi) =>
       setPieza(pieza => [...pieza, pi])
      )
    })
  }

  //HTML
  return (
    <div className="card">
      <Toast ref={toast} />
      {/* Card de el odontograma y la tabla de piezas */}
      <div className='linea'>
        <Card className="table">
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>ODONTOGRAMA</b>
            </div>
          </Divider>
          {/* Tabla con los dientes del odontograma */}
          <table className='odontograma'>
            <tbody>
              <tr>
                <td><input type="image" src="https://odontograma.net/images/dientes/18A.png" id="18a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/17A.png" id="17a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/16A.png" id="16a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/15A.png" id="15a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/14A.png" id="14a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/13A.png" id="13a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/12A.png" id="12a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/11A.png" id="11a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/21A.png" id="21a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/22A.png" id="22a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/23A.png" id="23a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/24A.png" id="24a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/25A.png" id="25a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/26A.png" id="26a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/27A.png" id="27a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/28A.png" id="28a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
              </tr>
              <tr>
                <td>18</td>
                <td>17</td>
                <td>16</td>
                <td>15</td>
                <td>14</td>
                <td>13</td>
                <td>12</td>
                <td>11</td>
                <td>21</td>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
                <td>27</td>
                <td>28</td>
              </tr>
              <tr>
                <td>48</td>
                <td>47</td>
                <td>46</td>
                <td>45</td>
                <td>44</td>
                <td>43</td>
                <td>42</td>
                <td>41</td>
                <td>31</td>
                <td>32</td>
                <td>33</td>
                <td>34</td>
                <td>35</td>
                <td>36</td>
                <td>37</td>
                <td>38</td>
              </tr>
              <tr className="abajo">
                <td><input type="image" src="https://odontograma.net/images/dientes/48A.png" id="48a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td ><input type="image" src="https://odontograma.net/images/dientes/47A.png" id="47a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/46A.png" id="46a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/45A.png" id="45a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/44A.png" id="44a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/43A.png" id="43a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/42A.png" id="42a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/41A.png" id="41a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/31A.png" id="31a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/32A.png" id="32a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/33A.png" id="33a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/34A.png" id="34a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/35A.png" id="35a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/36A.png" id="36a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/37A.png" id="37a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/38A.png" id="38a" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
              </tr>
            </tbody>
          </table>
          <Divider />
          {/* Tabla con los dientes del odontograma pequeño */}
          <table className='miniodontograma'>
            <tbody>
              <tr className="filadown">
                <td></td>
                <td></td>

                <td><input type="image" src="https://odontograma.net/images/dientes/48C.png" id="55c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/47C.png" id="54c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/45B.png" id="53b" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/44B.png" id="52b" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/37B.png" id="51b" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>

                <td><input type="image" src="https://odontograma.net/images/dientes/34B.png" id="61b" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/35B.png" id="62b" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/36B.png" id="63b" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/48C.png" id="64c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/47C.png" id="65c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>

                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>55</td>
                <td>54</td>
                <td>53</td>
                <td>52</td>
                <td>51</td>
                <td>61</td>
                <td>62</td>
                <td>63</td>
                <td>64</td>
                <td>65</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>85</td>
                <td>84</td>
                <td>83</td>
                <td>82</td>
                <td>81</td>
                <td>71</td>
                <td>72</td>
                <td>73</td>
                <td>74</td>
                <td>75</td>
                <td></td>
                <td></td>
              </tr>
              <tr className="filadown">
                <td></td>
                <td></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/46C.png" id="85c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/45C.png" id="84c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/44C.png" id="83c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/43C.png" id="82c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/42C.png" id="81c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/41C.png" id="71c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/31C.png" id="72c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/32C.png" id="73c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/33C.png" id="74c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td><input type="image" src="https://odontograma.net/images/dientes/34C.png" id="75c" data-bs-toggle="modal" data-bs-target="#modalpieza" alt="odontograma" onClick={nuevaPieza} /></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>RESUMEN DE PIEZAS</b>
            </div>
          </Divider>
          {/* Tabla de piezas */}
          <DataTable value={pieza} responsiveLayout="scroll" style={{ textAlign: "center" }}>
            <Column field="id_pieza" header="ID"></Column>
            <Column field="numero_pieza" header="PIEZA"></Column>
            <Column field="tratamiento" header="TRATAMINENTO"></Column>
            <Column field="cara_pieza" header="CARA"></Column>
            <Column field="" header="" body={dateTemplate} />
          </DataTable>
          {/* Dialogo de eliminacion */}
          <Dialog header="Desea eliminar este registro?" visible={confirm} style={{ width: '25vw' }} onHide={() => setConfirm(false)}>
            <div>
              <Button label="Cancelar" icon="pi pi-times" onClick={() => setConfirm(false)} className="p-button-text" />
              <Button label="Confirmar" icon="pi pi-check" onClick={eliminar} autoFocus />
            </div>
          </Dialog>
          <br />
          <Divider />
          {/* Boton para guardar toda la tabla en el api */}
          <div>
            <Button label="GUARDAR" icon="pi pi-check" onClick={save} autoFocus />
            <Button label="LISTAR" icon="pi pi-check" onClick={cargartabla} autoFocus />
          </div>
        </Card>
      </div>

      {/* Dialogo para la creacion de una pieza*/}
      {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
      <Dialog header="Agregar pieza" visible={visible} style={{ width: '22vw' }} onHide={() => setVisible(false)}>
        <label className="form-label">Pieza Seleccionada:</label><br />
        <div className="flex-auto">
          <Avatar label={seleccion} className="mr-2" size="xlarge" />
        </div>




        {/* Tratamiento */}
        <label className="form-label">Tratamiento:</label><br />
        <div className="card flex justify-content-center">
          <Dropdown value={tratamiento} onChange={selTratamiento} options={tratamientos} optionLabel="name"
            placeholder="Seleccione un tratamiento" className="w-full md:w-14rem" />
        </div>

        {/* Caras */}
        <label className="form-label">Caras:</label><br />
        <div className="card flex justify-content-center">
          <Dropdown value={cara} onChange={selCara} options={caras} optionLabel="name"
            placeholder="Seleccione un tratamiento" className="w-full md:w-14rem" />
        </div>
        <br />
        <div>
          <Button label="Aceptar" icon="pi pi-check" onClick={guardar} autoFocus />
          <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        </div>
      </Dialog>

    </div>
  );

};

