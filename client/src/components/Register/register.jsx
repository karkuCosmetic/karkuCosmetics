import React, { useState } from "react";
import { postRegister } from "../../functions/Auth";
import "./register.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const Register = () => {
  const initialFormInput = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formInput, setFormInput] = useState(initialFormInput);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlerChange = (event) => {
    const { name, value } = event.target;

    if (name === "email" || name === "password" || name === "confirmPassword") {
      setFormInput({ ...formInput, [name]: value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formInput.password !== formInput.confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden. Por favor, verifica.",
        icon: "error",
        confirmButtonColor: "#7b60c8",
      });
      return;
    }

    postRegister(formInput).then((data) => {
      data === "Usuario ya existente"
        ? Swal.fire({
            title: "Error",
            text: "El correo electrónico ingresado ya está registrado. Para ingresar, debes iniciar sesión.",
            icon: "warning",
            confirmButtonColor: "#7b60c8",
          })
        : Swal.fire({
            title: "Genial",
            text: "Ahora puede iniciar sesión con tu cuenta.",
            icon: "success",
            iconColor: "#7b60c8",
            background: "white",
            confirmButtonColor: "#7b60c8",
            customClass: {
              title: "custom-title",
            },
          });
      setFormInput(initialFormInput);
    });
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
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Escribe una contraseña"
            onChange={handlerChange}
            value={formInput.password}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className="password-input-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirma tu contraseña"
            onChange={handlerChange}
            value={formInput.confirmPassword}
            required
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            className="password-toggle-icon"
            onClick={toggleConfirmPasswordVisibility}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
