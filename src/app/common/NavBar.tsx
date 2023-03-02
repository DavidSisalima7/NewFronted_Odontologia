import React from 'react';
import "../Styles/css/Navbar.css";

export const NavBar: React.FC = () => {
   //24-02-23

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
              <a href="/home"><div className='Home'></div></a>
            </li>
            <li>
              <label htmlFor="drop-1" className="toggle">
                Registrar
              </label>
              <a href="#">Registrar</a>
              <input type="checkbox" id="drop-1" />
              <ul>
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
              <ul>
                <li>
             
                  <a href="/list-person">■ Paciente</a>
                </li>
                <li>
                  <a href="ficha">■ Ficha Odontológica</a>
                </li>
              </ul>
            </li>
            <li>
              <label htmlFor="drop-3" className="toggle">
               Historial
              </label>
              <a href="#">Historial</a>
              <input type="checkbox" id="drop-3" />
              <ul>
                <li>
            
                  <a href="/list-person">■ Paciente</a>
                </li>
                <li>
                  <a href="/historial">■ Historial Clínico Dental</a>
                </li>
              </ul>
            </li>
            <li>
            <label htmlFor="drop" className="toggle">
            Cerrar Sesión
              </label>
              <a href="/"><div className='Exit'></div></a>
            </li>
          </ul>
        </nav>
      </body>
    </div>
    </>
  );
};
