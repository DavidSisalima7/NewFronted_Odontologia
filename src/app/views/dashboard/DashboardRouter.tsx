import { NOTFOUND } from "dns";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { NavBar } from "../../common/NavBar";
import { RouterLayout } from "../../common/RouterLayout";
import FichaOdontologica from "../FichaOdontologica/FichaOdontologica";
import { OdontogramList } from "../Odontograma/OdontogramList";
import Home from "./home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { RegisterPerson } from "../Register-persona/register-person";
import PiezaContextProvider from "../Odontograma/PiezaContext";

export function DashboardRouter() {
  return (
    <>
      <main>
        <div>
          <div>
            <Switch>
              <Route exact path="/dashboard/home">
                <NavBar />
                <Home />
              </Route>
              <Route path="/ficha">
                <NavBar />
                <FichaOdontologica />
              </Route>
              <Route path="/reg-person">
                <RegisterPerson />
              </Route>
              <Route path="/odontograma">
                <NavBar />
                {/*Poner ruta del odontograma aqui*/}
                <PiezaContextProvider>
                  <OdontogramList />
                </PiezaContextProvider>
              </Route>
              <Route path="*">
                <Redirect to="/dashboard/home" />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </>
  );
}
