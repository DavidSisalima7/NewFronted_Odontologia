import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './login/Login';
import Bienvenida from '../ventanaInicial/Bienvenida';


export function AuthRouter(){
   return (
      <Switch>
         <Route exact path="/auth/inicio">
            < Bienvenida/>
         </Route>

         <Redirect to="/auth/inicio" />
      </Switch>
   );
}