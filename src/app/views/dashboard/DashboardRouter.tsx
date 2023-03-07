import { Switch, Route, Redirect, Link } from "react-router-dom";
import { NavBar } from "../../common/NavBar";
import FichaOdontologica from "../FichaOdontologica/FichaOdontologica";
import Historial_ficha from "../HistorialFicha/Historialficha";
import { OdontogramList } from "../Odontograma/OdontogramList";
import Home from "./home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { PersonList } from "../Register-persona/components/ListPerson";
import PiezaContextProvider from "../Odontograma/PiezaContext";
import PersonContextProvider from "../Register-persona/contexts/PersonContext";
import User from "../../interfaces/user/User";
import RolContextProvider from "../Register-persona/contexts/RolContext";
import { HistorialPieza } from "../HistorialPieza/HistorialPieza";
import UserContextProvider from "../Users/contexts/UserContext";
import UserList from "../Users/components/ListUsers";
import RegisterPerson from "../Register-persona/register-person";
import { ApiResponse } from "../../interfaces/response/ApiResponse";
import { Toast } from "primereact/toast";
import React, {useRef } from "react";
import { NavBarPaciente } from "../../common/NavBarPaciente";
import { NavBarUserDisabled } from "../../common/NavBarUserDisabled";

export const DashboardRouter = () => {
  //Datos del sessionStorage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData|| "{}");
  const rol=userObj.rol;
  const enabled=userObj.enabled;
  const toast = useRef<Toast>(null);

  const showError = (errorPrincipal: string, detalleError: string) => {
    toast.current?.show({
      severity: "error",
      summary: errorPrincipal,
      detail: detalleError,
      life: 3000,
    });
  };
 
  return (
    <>
     <Toast ref={toast} />
      <main>
        <div>
          <div>
            <Switch>
              <Route exact path="/dashboard/home">
                {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
                <Home />
              </Route>

              <Route path="/ficha">
              {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
                <FichaOdontologica />
              </Route>
              <Route path="/historial">
              {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
                <Historial_ficha />
              </Route>
              <Route path="/list-person">
              {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
                <PersonContextProvider>
                  <PersonList />
                </PersonContextProvider>
              </Route>

              <Route path="/list-users">
              {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
                <UserContextProvider>
                  <UserList />
                </UserContextProvider>
              </Route>

              <Route path="/reg-person">
              {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
                <PersonContextProvider>
                  <RolContextProvider>
                    <RegisterPerson />
                  </RolContextProvider>
                </PersonContextProvider>
              </Route>
              <Route path="/historialPiezas">
              {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
                <HistorialPieza />
              </Route>
              <Route path="/login">
              {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
              </Route>

              <Route path="/odontograma">
              {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
                <PiezaContextProvider>
                  <OdontogramList />
                </PiezaContextProvider>
              </Route>
              <Route path="*">
              {rol === 1 && enabled===true?(
                <NavBarPaciente/>
                ):rol === 2 && enabled===true?(
                 <NavBar />
                 
                 ):(
                   <NavBarUserDisabled/>
                 )}
                <Redirect to="/dashboard/home" />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </>
  );
};
