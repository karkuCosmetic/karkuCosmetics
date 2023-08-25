import React from 'react';
import {useState} from 'react';
import {postRegister} from '../../functions/Auth';

export const Register = () => {
  const [formInput, setFormInput] = useState ({
    email: '',
    password: '',
  });

  const handleChange = event => {
    const property = event.target.name;
    const value = event.target.value;
    setFormInput ({...formInput, [property]: value});
  };

  const handleSubmit = e => {
    e.preventDefault ();
    postRegister (formInput);
  };
  
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Escribe un email"
          onChange={handleChange}
          value={formInput.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Escribe una contraseña"
          onChange={handleChange}
          value={formInput.password}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Register;
