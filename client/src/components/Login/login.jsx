import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postlogin } from "../../functions/Auth";
import "./login.css";

const Login = ({ formPassword, setFormPassword }) => {
  const [status, setStatus] = useState("");
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (errors.email || errors.password) {
      setCanSubmit(false);
    } else {
      setCanSubmit(
        formInput.email.trim() !== "" && formInput.password.trim() !== ""
      );
    }
  }, [errors, formInput]);

  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFormInput({ ...formInput, [property]: value });
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };
    let isValid = true;

    if (formInput.email.trim() === "") {
      newErrors.email = "El email es obligatorio";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formInput.email)) {
      newErrors.email = "El email no es válido";
      isValid = false;
    }
    if (formInput.password.trim() === "") {
      newErrors.password = "La contraseña es obligatoria";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const credential = await postlogin(formInput);
      if (credential) {
        setStatus(credential.status);
      }
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (status === 200) {
      navigate("/");
    } else {
      console.log("error de session");
    }
  }, [status]);

  return (
    <div>
      <div className="login-container">
        <div className="login-hello">
          <h1>Hola!</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Escribe tu email"
            onChange={handleChange}
            value={formInput.email}
            required
          />
          {errors.email && <h3 className="error-message">{errors.email}</h3>}

          <input
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            onChange={handleChange}
            value={formInput.password}
            required
          />
          {errors.password && (
            <h3 className="error-message">{errors.password}</h3>
          )}

          <button className="button-login" type="submit" disabled={!canSubmit}>
            Ingresar
          </button>
          <p>
            Si olvidaste tu contraseña{" "}
            <span onClick={() => setFormPassword(!formPassword)}>
              ház click aquí
            </span>
          </p>
        </form>
        <div className="text-register">
          <h3 className="text-register-h3">
            Si aún no tenés cuenta, completá el formulario con tus datos y
            registrate para continuar!{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
