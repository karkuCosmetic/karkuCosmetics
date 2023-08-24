import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postlogin} from '../../redux/Controllers/Auth';
import {useNavigate} from 'react-router-dom';
import Navbar from '../../components/NavBar/navbar';

export const Login = () => {
  const {status} = useSelector (state => state.auth);
  const dispatch = useDispatch ();
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
    dispatch (postlogin (formInput));
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
