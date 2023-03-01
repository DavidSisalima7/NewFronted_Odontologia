import { Switch, Route, Redirect, Link } from "react-router-dom";
import { NavBar } from "../../common/NavBar";
import FichaOdontologica from "../FichaOdontologica/FichaOdontologica";
import { OdontogramList } from "../Odontograma/OdontogramList";
import Home from "./home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { PersonList } from "../Register-persona/components/ListPerson";
import PiezaContextProvider from "../Odontograma/PiezaContext";
import PersonContextProvider from "../Register-persona/contexts/PersonContext";
import { NavBarAdmin } from "../../commonAdmin/NavBarAdmin";
import RegisterPerson from "../Register-persona/register-person";
import User from "../../interfaces/user/User";

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
                {rol==="admin" ? (
                  <NavBarAdmin/>
                ) : (
                  <NavBar/>
                )}
                <Home />
              </Route>

              <Route path="/ficha">
              {rol==="admin" ? (
                  <NavBarAdmin/>
                ) : (
                  <NavBar/>
                )}
                <FichaOdontologica />
              </Route>
              <Route path="/list-person">
              {rol==="admin" ? (
                  <NavBarAdmin/>
                ) : (
                  <NavBar/>
                )}
                <PersonContextProvider>
                  <PersonList />
                </PersonContextProvider>
              </Route>

              <Route path="/reg-person">
              {rol==="admin" ? (
                  <NavBarAdmin/>
                ) : (
                  <NavBar/>
                )}
                <RegisterPerson />
              </Route>

              <Route path="/odontograma">
              {rol==="admin" ? (
                  <NavBarAdmin/>
                ) : (
                  <NavBar/>
                )}
                <PiezaContextProvider>
                  <OdontogramList />
                </PiezaContextProvider>
              </Route>
              <Route path="*">
              {rol==="admin" ? (
                  <NavBarAdmin/>
                ) : (
                  <NavBar/>
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
