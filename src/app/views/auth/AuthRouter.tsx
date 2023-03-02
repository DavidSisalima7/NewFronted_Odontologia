import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './login/Login';
import Bienvenida from '../ventanaInicial/Bienvenida';


export function AuthRouter(){
   return (
      <Switch>
         <Route exact path="/auth/login">
            < Login/>
         </Route>
         <Redirect to="/auth/login" />
      </Switch>
   );
}