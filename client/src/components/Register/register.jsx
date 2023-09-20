import React from "react";
import { useState } from "react";
import { postRegister } from "../../functions/Auth";
import "./register.css";

export const Register = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFormInput({ ...formInput, [property]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRegister(formInput);
  };

  return (
    <div className="register-container">
      <form className="register-form" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Escribe un email"
          onChange={handleChange}
          value={formInput.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Escribe una contraseña"
          onChange={handleChange}
          value={formInput.password}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Escribe una teléfono"
          onChange={handleChange}
          value={formInput.phone}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
