import { AuthCard } from "../components/authCard/AuthCard";
import logo from '../../../assets/img/smOdonto.png';
import accountIcon from '../../../assets/icons/account.svg';
import passwordIcon from '../../../assets/icons/password.svg';
import React, { useContext, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from "../../store/contexts/AuthContext";
import { AuthService } from "../../../services/auth/AuthService";


export function Login(){
  
  const { dispatchUser }:any = useContext(AuthContext);
  const [ auth, setAuth ] = useState({username:'', password:''})
  const history = useHistory();

  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
      
          e.preventDefault();
          const resp = await AuthService.login(auth);
          console.log(resp)
          
            sessionStorage.setItem('user', JSON.stringify({...resp.data, loggedIn:true}));  
            dispatchUser({type:'login', payload:resp.data }); 
            console.log(history);
            
            history.replace('/dashboard/home');
         
   }

   const handleChange = (e:React.ChangeEvent<HTMLFormElement | HTMLInputElement>) => {
    setAuth({
      ...auth,
      [e.target.name]:e.target.value
    })
}

  return(
    
    <AuthCard>
       <form onSubmit={handleSubmit} autoComplete="off">
       <div className="text-center mb-2">
         <img
           className="img-fluid"
           src={logo}
           style={{width:"110px", background:"#05313A", borderRadius:"20px"}}
         />
       </div>
       <br />
       <div className="mb-2 p-1 d-flex border rounded">
         <div className="mx-2 mt-1"> 
           <img 
             className="img-fluid"
             src={accountIcon}
             alt="iconUser" />
         </div>
         <input
           autoFocus
           className="form-control border-0 txt-input"
           name="username"
           placeholder="Usuario"
           onChange={ e => handleChange(e) }
         />
       </div>

       <div className="mb-2 p-1 d-flex border rounded">
         <div className="mx-2 mt-1"> 
           <img 
             className="img-fluid"
             src={passwordIcon}
             alt="iconUser" />
         </div>
         <input
          className="form-control border-0  txt-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={ e => handleChange(e) }
        />
       </div>
       
       <div className="row d-flex justify-content-between mt-3 mb-2">
         <div className="mb-3">
           <div className="form-check ms-1">
             <input
               type="checkbox"
               className="form-check-input"
               id="mycheckbox"
             />
             <label className="form-check-label" htmlFor="mycheckbox">
               Recordar
             </label>
           </div>
         </div>
       </div>
       <div className="d-grid gap-2">
       <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        {/*<button  type="submit" style={{background:"#05313A", color:"white", borderRadius:"45px" , height:"40px"}} >
           Iniciar Sesión
         </button> */} 
       </div>

     </form>
    </AuthCard>
   
  );
}