import { Switch, Route, Redirect } from "react-router-dom";
import { NavBar } from "../../common/NavBar";
import FichaOdontologica from "../FichaOdontologica/FichaOdontologica";
import Historial_ficha from "../HistorialFicha/Historialficha";
import Historial_fichaP from "../HistorialFichaP/Historialficha";
import { OdontogramList } from "../Odontograma/OdontogramList";
import Home from "./home/Home";
import { PersonList } from "../Register-persona/components/ListPerson";
import PiezaContextProvider from "../Odontograma/PiezaContext";
import PersonContextProvider from "../Register-persona/contexts/PersonContext";
import RolContextProvider from "../Register-persona/contexts/RolContext";
import { HistorialPieza } from "../HistorialPieza/HistorialPieza";
import { HistorialPiezaP } from "../HistorialPiezaP/HistorialPieza";
import UserContextProvider from "../Users/contexts/UserContext";
import UserList from "../Users/components/ListUsers";
import RegisterPerson from "../Register-persona/register-person";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { NavBarPaciente } from "../../common/NavBarPaciente";
import { NavBarUserDisabled } from "../../common/NavBarUserDisabled";

export const DashboardRouter = () => {
  //Datos del sessionStorage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const rol = userObj.rol;
  const enabled = userObj.enabled;
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
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarPaciente />
                    <Home />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <NavBar />
                    <Home />
                  </>
                ) : (
                  <>
                    <NavBarUserDisabled />
                  </>
                )}
              </Route>

              <Route path="/ficha">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarPaciente />
                    <FichaOdontologica />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <NavBar />
                    <FichaOdontologica />
                  </>
                ) : (
                  <>
                    <NavBarUserDisabled />
                  </>
                )}
              </Route>
              <Route path="/historial">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarPaciente />
                    <Historial_fichaP />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <NavBar />
                    <Historial_ficha />
                  </>
                ) : (
                  <>
                    <NavBarUserDisabled />
                  </>
                )}
              </Route>
              <Route path="/list-person">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarPaciente />
                    <PersonContextProvider>
                      <PersonList />
                    </PersonContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <NavBar />
                    <PersonContextProvider>
                      <PersonList />
                    </PersonContextProvider>
                  </>
                ) : (
                  <>
                    <NavBarUserDisabled />
                  </>
                )}
              </Route>

              <Route path="/list-users">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarPaciente />
                    <UserContextProvider>
                      <UserList />
                    </UserContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <NavBar />
                    <UserContextProvider>
                      <UserList />
                    </UserContextProvider>
                  </>
                ) : (
                  <>
                    <NavBarUserDisabled />
                  </>
                )}
              </Route>
              <Route path="/reg-person">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarPaciente />
                    <PersonContextProvider>
                      <RolContextProvider>
                        <RegisterPerson />
                      </RolContextProvider>
                    </PersonContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <NavBar />
                    <PersonContextProvider>
                      <RolContextProvider>
                        <RegisterPerson />
                      </RolContextProvider>
                    </PersonContextProvider>
                  </>
                ) : (
                  <>
                    <NavBarUserDisabled />
                  </>
                )}
              </Route>
              <Route path="/historialPiezas">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarPaciente />
                    <HistorialPiezaP />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <NavBar />
                    <HistorialPieza />
                  </>
                ) : (
                  <>
                    <NavBarUserDisabled />
                  </>
                )}
              </Route>
              <Route path="/login">
                {rol === 1 && enabled === true ? (
                  <NavBarPaciente />
                ) : rol === 2 && enabled === true ? (
                  <NavBar />
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/odontograma">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarPaciente />
                    <PiezaContextProvider>
                      <OdontogramList />
                    </PiezaContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <NavBar />
                    <PiezaContextProvider>
                      <OdontogramList />
                    </PiezaContextProvider>
                  </>
                ) : (
                  <>
                    <NavBarUserDisabled />
                  </>
                )}
              </Route>
              <Route path="*">
                {rol === 1 && enabled === true ? (
                  <NavBarPaciente />
                ) : rol === 2 && enabled === true ? (
                  <NavBar />
                ) : (
                  <NavBarUserDisabled />
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
