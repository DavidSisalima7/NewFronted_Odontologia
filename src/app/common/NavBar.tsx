
import React, { useContext, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import "../Styles/css/Navbar.css";

export const NavBar: React.FC = () => {
   //24-02-23

   const eliminarUser=()=>{
    sessionStorage.removeItem('user');
   }
   const [confirm, setConfirm] = useState(false);
  return (
    <>
       <div>
        <body className="body2">
        <nav>
        <div className="icon_diente"></div>
          <div id="logo">
          
            Odontología Integral SM</div>

          <label htmlFor="drop" className="toggle">
            Menu
          </label>
          <input type="checkbox" id="drop" />
          <ul className="menu">
            <li>
            <label htmlFor="drop" className="toggle">
                Home
              </label>
              <a href="/home"><div className='HomeM'></div></a>
            </li>
            <li>
              <label htmlFor="drop-1" className="toggle">
                Registrar
              </label>
              <a href="#">Registrar</a>
              <input type="checkbox" id="drop-1" />
              <ul style={{zIndex:999}}>
                <li >
                  <a href="/reg-person">■ Paciente</a>
                </li>
                <li>
                  <a href="/ficha">■ Ficha Odontológica</a>
                </li>
              </ul>
            </li>
            <li>
              <label htmlFor="drop-2" className="toggle">
              Consultar
              </label>
              <a href="#">Consultar</a>
              <input type="checkbox" id="drop-2" />
              <ul style={{zIndex:999}}>
                <li>
             
                  <a href="/list-person">■ Paciente</a>
                </li>
                <li>
                  <a href="/list-users">■ Usuarios</a>
                </li>
                <li>
                  <a href="/historialPiezas">■ Historial de Piezas</a>
                </li>
              </ul>
            </li>
            <li>
              <label htmlFor="drop-3" className="toggle">
               Historial
              </label>
              <a href="#">Historial</a>
              <input type="checkbox" id="drop-3" />
              <ul style={{zIndex:999}}>
                <li>
            
                  <a href="/list-person">■ Paciente</a>
                </li>
                <li>
                  <a href="/historial">■ Historial Clínico Dental</a>
                </li>
              </ul>
            </li>
            <li className='liExit'>
            <label htmlFor="drop" className="toggle">
            Cerrar Sesión
              </label>
              <a href="/inicio" onClick={eliminarUser}><div className='ExitM'></div></a>               
            </li>
          </ul>
        </nav>
      </body>
    </div>
     
    </>
  );
};
  {/* Dialogo Salir */}
//   <Dialog
//   header="Está seguro de cerrar sesión?"
//   visible={confirm}
//   style={{ width: "25vw" }}
//   onHide={() => setConfirm(false)}
// >
//   <div >

//     <Button
//       label="Cancelar"
//       icon="pi pi-times"

//       className="p-button-text"
//     />
//     <Button
//       label="Confirmar"
//       icon="pi pi-check"
//       ref={"/inicio"}
//       onClick={eliminarUser}
//       autoFocus
//     />
//   </div>
// </Dialog>