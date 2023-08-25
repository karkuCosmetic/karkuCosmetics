import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../../components/NavBar/navbar';
import {postlogin} from '../../functions/Auth';

export const Login = () => {
  const [status, setStatus] = useState ('');
  const [formInput, setFormInput] = useState ({
    email: '',
    password: '',
  });

  const handleChange = event => {
    const property = event.target.name;
    const value = event.target.value;
    setFormInput ({...formInput, [property]: value});
  };

  const handleSubmit = async e => {
    e.preventDefault ();
    const credential = await postlogin (formInput);
    setStatus (credential.status);
  };

  const navigate = useNavigate ();
  if (status === 200) {
    navigate ('/');
  } //si se logueo ingresa

  return (
    <div>
      <Navbar />
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Escribe tu email"
          onChange={handleChange}
          value={formInput.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Escribe tu contraseña"
          onChange={handleChange}
          value={formInput.password}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
