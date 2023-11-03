import React, {useState} from 'react';
import {postRegister} from '../../functions/Auth';
import './register.css';
import Swal from 'sweetalert2';

export const Register = () => {
  const initialFormInput = {
    email: '',
    password: '',
  };

  const [formInput, setFormInput] = useState (initialFormInput);

  const handlerChange = event => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === 'email' || property === 'password') {
      setFormInput ({...formInput, [property]: value});
    }
  };

  const handleSubmit = async e => {
    e.preventDefault ();

    postRegister (formInput).then (data => {
      data === 'Usuario ya existente'
        ? Swal.fire ({
            title: 'Error',
            text: 'El correo electrónico ingresado ya está registrado. Para ingresar, debes iniciar sesión.',
            icon: 'warning',
            confirmButtonColor: '#7b60c8',
          })
        : Swal.fire ({
            title: 'Genial',
            text: 'Ahora verifica tu cuenta a través del correo electrónico que hemos enviado al email que ingresaste.',
            icon: 'success',
            iconColor: '#7b60c8',
            background: 'white',
            confirmButtonColor: '#7b60c8',
            customClass: {
              title: 'custom-title',
            },
          });
      setFormInput (initialFormInput);
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
        <input
          type="password"
          name="password"
          placeholder="Escribe una contraseña"
          onChange={handlerChange}
          value={formInput.password}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
