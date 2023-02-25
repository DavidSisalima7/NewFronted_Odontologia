import { NOTFOUND } from "dns";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { NavBar } from "../../common/NavBar";
import { RouterLayout } from "../../common/RouterLayout";
import FichaOdontologica from "../FichaOdontologica/FichaOdontologica";
import Home from "./home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Odontogram2 } from "../../Odontograma/Odontogram2";

export function DashboardRouter() {
  return (
   <>
        <main>
           <div>
             <div>
                <Switch>
                   <Route exact path="/dashboard/home">
                        <NavBar/>
                        <Home/>
                   </Route>
                   <Route  path="/ficha">
                   <NavBar/>
                     <FichaOdontologica/>
                   </Route>
                   <Route path="/odontograma">
                   <NavBar/>
                      <Odontogram2/>
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
