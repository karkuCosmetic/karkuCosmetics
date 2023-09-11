import React from "react";
import { useState } from "react";
import { postRegister } from "../../functions/Auth";
import Navbar from "../../components/NavBar/navbar";
import "./forgotPassword.css";

export const Register = () => {
  const [formInput, setFormInput] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postRegister(formInput);
  };

  return (
    <>
      <Navbar />
      <div className="forgot-container">
        <div className="forgot-text">
          <h3>
            Ingresa el mail con el que te registraste para generar tu nueva
            contraseña
          </h3>
        </div>
        <form className="register-form" action="" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Escribe tu email"
            value={formInput.email}
            required
            onChange={(e) => setFormInput({ email: e.target.value })}
          />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

export default Register;
