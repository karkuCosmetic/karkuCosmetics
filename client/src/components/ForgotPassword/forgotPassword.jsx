import React from 'react';
import {useState} from 'react';
import './forgotPassword.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {UpdatePassword} from '../../functions/fetchingUsers';

export const ForgotPassword = ({setFormPassword}) => {
  const [formInput, setFormInput] = useState ({
    email: '',
  });

  const handleSubmit = e => {
    e.preventDefault ();
    UpdatePassword (formInput);
  };

  return (
    <div>
      <div className="forgot-container">
        <div className="forgot-text">
          <h3>
            Ingresa el mail con el que te registraste para establecer tu nueva
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
            onChange={e => setFormInput ({email: e.target.value})}
          />

          <button type="submit">Enviar</button>
          <div className="go-back-login">
            <p onClick={() => setFormPassword (false)}>
              <FontAwesomeIcon icon={faArrowLeft} /> Atrás
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
