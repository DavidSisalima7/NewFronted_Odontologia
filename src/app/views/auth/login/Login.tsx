import { AuthCard } from "../components/authCard/AuthCard";
import logo from "../../../assets/img/smOdonto.png";
import accountIcon from "../../../assets/icons/account.svg";
import passwordIcon from "../../../assets/icons/password.svg";
import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/contexts/AuthContext";
import { AuthService } from "../../../services/auth/AuthService";
import { Toast } from "primereact/toast";

export function Login() {
  const toast = useRef<Toast>(null);

  const showError = (errorPrincipal: string, detalleError: string) => {
    toast.current?.show({
      severity: "error",
      summary: errorPrincipal,
      detail: detalleError,
      life: 3000,
    });
  };

  const { dispatchUser }: any = useContext(AuthContext);
  const [auth, setAuth] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const resp = await AuthService.login(auth);
      const rol = resp.rol.rolId;
      const enabled = resp.enabled;
      const id = resp.persona.id_persona;

      sessionStorage.setItem(
        "user",
        JSON.stringify({ id, rol, enabled, loggedIn: true })
      );
      dispatchUser({ type: "login", payload: resp.data });
      history.replace("/dashboard/home");
    } catch (error) {
      showError("ERROR", "Credenciales incorrectas");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <AuthCard>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="text-center mb-2">
            <img
              className="img-fluid"
              src={logo}
              style={{
                width: "110px",
                background: "#05313A",
                borderRadius: "20px",
              }}
            />
          </div>
          <br />
          <div className="mb-2 p-1 d-flex border rounded">
            <div className="mx-2 mt-1">
              <img className="img-fluid" src={accountIcon} alt="iconUser" />
            </div>
            <input
              autoFocus
              className="form-control border-0 txt-input"
              name="username"
              placeholder="Usuario"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mb-2 p-1 d-flex border rounded">
            <div className="mx-2 mt-1">
              <img className="img-fluid" src={passwordIcon} alt="iconUser" />
            </div>
            <input
              className="form-control border-0  txt-input"
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => handleChange(e)}
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
          </div>
        </form>
      </AuthCard>
    </>
  );
}
