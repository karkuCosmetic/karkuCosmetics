import React, { useState } from "react";
import { postRegister } from "../../functions/Auth";
import "./register.css";

export const Register = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const handleKeyPress = (event) => {
    const validCharacters = /^[0-9]*$/;
    if (!validCharacters.test(event.key)) {
      event.preventDefault();
    }
  };

  const handlerChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (
      property === "email" ||
      property === "password" ||
      property === "phone"
    ) {
      setFormInput({ ...formInput, [property]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRegister(formInput);
  };

  return (
    <div className="register-container">
      <form className="register-form" action="" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Escribe un email"
          onChange={handlerChange}
          value={formInput.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Escribe una contraseña"
          onChange={handlerChange}
          value={formInput.password}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Escribe un teléfono"
          onKeyPress={handleKeyPress}
          onChange={handlerChange}
          value={formInput.phone}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
