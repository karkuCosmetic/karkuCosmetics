import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/navbar";
import { postlogin } from "../../functions/Auth";
import "./login.css";

export const Login = () => {
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
      setStatus(credential.status);
    }
  };

  const navigate = useNavigate();
  if (status === 200) {
    navigate("/");
  } // Si se logueó, ingresa

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-hello">
          <h2>HOLA!</h2>
          <p>Completa el formulario para ingresar</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Escribe tu email"
            onChange={handleChange}
            value={formInput.email}
          />
          {errors.email && <h3 className="error-message">{errors.email}</h3>}

          <input
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            onChange={handleChange}
            value={formInput.password}
          />
          {errors.password && (
            <h3 className="error-message">{errors.password}</h3>
          )}

          <button type="submit" disabled={!canSubmit}>
            Ingresar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
