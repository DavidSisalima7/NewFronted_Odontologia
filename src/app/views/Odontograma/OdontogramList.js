import "../../Styles/css/Odontogram.css";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import PiezasForm from "./PiezasForm";
import { PiezaContext } from "./PiezaContext";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
export const OdontogramList = () => {
  // Codigo para llenar la tabla segun un array
  const { findPieza, piezas } = useContext(PiezaContext);
  const history = useHistory();

  const redireccion =()=>(
    history.push({
      pathname: "/ficha",
    })
  )
  //Aqui llega el id de odontograma
  let location = useLocation();
  console.log(location.state.idF);

  //Para el dialog de la creacion de pieza y el otro
  const [idondonto,setIdodonto]=useState(location.state.idF);
  const [isVisible, setIsVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const toast = useRef(null);
  
  const savePieza = (id) => { 
    findPieza(id);
    setIsVisible(true);
  };

  //Funciones
  //Seleccion del diente y aparece el dialog
  const nuevaPieza = (e) => {
    setSeleccion(e.target.id.slice(0, -1));
    setIsVisible(true);
  };
  //Fecha
  //HTML
  return (
    <>
      <div >
        <Toast ref={toast} />
        {/* Card de el odontograma y la tabla de piezas */}
        <div className="linea">
          <Card className="table">
            <Divider align="left">
              <div className="inline-flex align-items-center">
                <b>ODONTOGRAMA</b>
              </div>
            </Divider>
            {/* Tabla con los dientes del odontograma */}
            <table className="odontograma">
              <tbody>
                <tr>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/18A.png"
                      id="18a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/17A.png"
                      id="17a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/16A.png"
                      id="16a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/15A.png"
                      id="15a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/14A.png"
                      id="14a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/13A.png"
                      id="13a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/12A.png"
                      id="12a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/11A.png"
                      id="11a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td className="LineaIzquierda">
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/21A.png"
                      id="21a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/22A.png"
                      id="22a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/23A.png"
                      id="23a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/24A.png"
                      id="24a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/25A.png"
                      id="25a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/26A.png"
                      id="26a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/27A.png"
                      id="27a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/28A.png"
                      id="28a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "18" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "17" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "16" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "15" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "14" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "13" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "12" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "11" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias LineaIzquierda">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "21" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "22" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "23" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "24" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "25" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "26" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "27" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "28" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
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
                  <td className="LineaIzquierda">21</td>
                  <td>22</td>
                  <td>23</td>
                  <td>24</td>
                  <td>25</td>
                  <td>26</td>
                  <td>27</td>
                  <td>28</td>
                </tr>
                <tr>
                  <td className="LineaOdonto">48</td>
                  <td className="LineaOdonto">47</td>
                  <td className="LineaOdonto">46</td>
                  <td className="LineaOdonto">45</td>
                  <td className="LineaOdonto">44</td>
                  <td className="LineaOdonto">43</td>
                  <td className="LineaOdonto">42</td>
                  <td className="LineaOdonto">41</td>
                  <td className="LineaOdonto LineaIzquierda">31</td>
                  <td className="LineaOdonto">32</td>
                  <td className="LineaOdonto">33</td>
                  <td className="LineaOdonto">34</td>
                  <td className="LineaOdonto">35</td>
                  <td className="LineaOdonto">36</td>
                  <td className="LineaOdonto">37</td>
                  <td className="LineaOdonto">38</td>
                </tr>
                <tr>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "48" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "47" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "46" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "45" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "44" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "43" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "42" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "41" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias LineaIzquierda">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "31"  && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "32" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "33" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "34" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "35" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "36" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "37" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "38" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                </tr>
                <tr className="abajo">
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/48A.png"
                      id="48a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/47A.png"
                      id="47a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/46A.png"
                      id="46a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/45A.png"
                      id="45a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/44A.png"
                      id="44a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/43A.png"
                      id="43a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/42A.png"
                      id="42a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/41A.png"
                      id="41a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td className="LineaIzquierda">
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/31A.png"
                      id="31a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/32A.png"
                      id="32a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/33A.png"
                      id="33a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/34A.png"
                      id="34a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/35A.png"
                      id="35a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/36A.png"
                      id="36a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/37A.png"
                      id="37a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/38A.png"
                      id="38a"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Divider />
            {/* Tabla con los dientes del odontograma pequeño */}
            <table className="miniodontograma">
              <tbody>
                <tr className="filadown">
                  <td></td>
                  <td></td>

                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/48C.png"
                      id="55c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/47C.png"
                      id="54c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/45B.png"
                      id="53b"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/44B.png"
                      id="52b"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/37B.png"
                      id="51b"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>

                  <td className="LineaIzquierda">
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/34B.png"
                      id="61b"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/35B.png"
                      id="62b"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/36B.png"
                      id="63b"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/48C.png"
                      id="64c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/47C.png"
                      id="65c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>

                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "55" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "54" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "53" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "52" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "51" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias LineaIzquierda">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "61" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "62" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "63" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "64" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "65" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
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
                  <td className="LineaIzquierda">61</td>
                  <td>62</td>
                  <td>63</td>
                  <td>64</td>
                  <td>65</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="LineaOdonto"></td>
                  <td className="LineaOdonto"></td>
                  <td className="LineaOdonto">85</td>
                  <td className="LineaOdonto">84</td>
                  <td className="LineaOdonto">83</td>
                  <td className="LineaOdonto">82</td>
                  <td className="LineaOdonto">81</td>
                  <td className="LineaOdonto LineaIzquierda">71</td>
                  <td className="LineaOdonto">72</td>
                  <td className="LineaOdonto">73</td>
                  <td className="LineaOdonto">74</td>
                  <td className="LineaOdonto">75</td>
                  <td className="LineaOdonto"></td>
                  <td className="LineaOdonto"></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "85" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "84" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "83" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "82" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "81" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias LineaIzquierda">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "71" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "72" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "73" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "74" && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td className="CantidadIncidencias">
                    {"x".repeat(
                      piezas.filter((p) => p.numero_pieza === "75"  && p.odontograma.id_odontograma === idondonto).length
                    )}
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="filadown">
                  <td></td>
                  <td></td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/46C.png"
                      id="85c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/45C.png"
                      id="84c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/44C.png"
                      id="83c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/43C.png"
                      id="82c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/42C.png"
                      id="81c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td className="LineaIzquierda">
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/41C.png"
                      id="71c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/31C.png"
                      id="72c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/32C.png"
                      id="73c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/33C.png"
                      id="74c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
                  <td>
                    <input
                      type="image"
                      src="https://odontograma.net/images/dientes/34C.png"
                      id="75c"
                      data-bs-toggle="modal"
                      data-bs-target="#modalpieza"
                      alt="odontograma"
                      onClick={nuevaPieza}
                    />
                  </td>
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
            <DataTable
              value={piezas
                //Filtro para piezas con el id del odontograma
                .filter((p) => p.odontograma.id_odontograma === idondonto)}
              responsiveLayout="scroll"
              style={{ textAlign: "center" }}
              selectionMode="single"
              onSelectionChange={(e) => savePieza(e.value.id_pieza)}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="id_pieza" header="ID"></Column>
              <Column
                field="fecha_creacion"
                header="Fecha"
                body={(rowData) => {
                  const fecha = new Date(rowData.fecha_creacion);
                  return fecha.toLocaleDateString();
                }}
              />
              <Column field="numero_pieza" header="PIEZA"></Column>
              <Column field="tratamiento" header="TRATAMIENTO"></Column>
              <Column field="cara_pieza" header="CARA"></Column>
            </DataTable>

            <br />
            <Divider />
            {/* Boton para Confirmar los cambios */}
            <div style={{ paddingLeft: "40%", marginLeft:"50px"}}>
              <Button label="GUARDAR" style={{backgroundColor:"#22C55E",borderColor:"#22C55E"}} icon="pi pi-check" autoFocus onClick={redireccion}/>
            </div>
          </Card>
        </div>
      </div>
      <PiezasForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        seleccion={seleccion}
        setSeleccion={setSeleccion}
        toast={toast}
        idodonto={location.state.idF}
        
      />
    </>
  );
};
