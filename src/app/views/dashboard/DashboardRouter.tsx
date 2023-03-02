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

//import RegisterPerson from "../Register-persona/register-person";
import User from "../../interfaces/user/User";
import RegisterPerson from "../Register-persona/register-person";
import RolContextProvider from "../Register-persona/contexts/RolContext";

export const DashboardRouter = () => {
  //Datos del sessionStorage
  const dataT = sessionStorage.getItem("user");
  const objetoDatos: User = dataT ? JSON.parse(dataT || "{}") : null;
  const rol = objetoDatos?.username;

  return (
    <>
      <main>
        <div>
          <div>
            <Switch>
              <Route exact path="/dashboard/home">
                {rol === "admin" ? (
                  <NavBar />
                ) : (
                  <NavBar />
                )}
                <Home />
              </Route>

              <Route path="/ficha">
                {rol === "admin" ? (
                  <NavBar />
                ) : (
                  <NavBar />
                )}
                <FichaOdontologica />
              </Route>
              <Route path="/historial">
                {rol === "admin" ? (
                  <NavBar />
                ) : (
                  <NavBar />
                )}
                <Historial_ficha />
              </Route>
              <Route path="/list-person">
                {rol === "admin" ? (
                  <NavBar />
                ) : (
                  <NavBar />
                )}
                <PersonContextProvider>
                  <PersonList />
                </PersonContextProvider>
              </Route>

              <Route path="/reg-person">
                {rol === "admin" ? (
                  <NavBar />
                ) : (
                  <NavBar />
                )}
                <PersonContextProvider>
                  <RolContextProvider>
                    <RegisterPerson />
                  </RolContextProvider>
                </PersonContextProvider>
              </Route>
              <Route path="/login">
                {rol === "admin" ? (
                  <NavBar />
                ) : (
                  <NavBar />
                )}

              </Route>

              <Route path="/odontograma">
                {rol === "admin" ? (
                  <NavBar />
                ) : (
                  <NavBar />
                )}
                <PiezaContextProvider>
                  <OdontogramList />
                </PiezaContextProvider>
              </Route>
              <Route path="*">
                {rol === "admin" ? (
                  <NavBar />
                ) : (
                  <NavBar />
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
