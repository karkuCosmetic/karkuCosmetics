import React, {useState} from 'react';
import './newPassword.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {useNavigate, useParams} from 'react-router-dom';
import {UpdatePassword} from '../../functions/fetchingUsers';

export const NewPassword = () => {
  let {token} = useParams ();
  const navigate = useNavigate ();
  const [formInput, setFormInput] = useState ({
    password: '',
    confirmPassword: '',
  });

  const [passwordMatch, setPasswordMatch] = useState (true);
  const [showPassword, setShowPassword] = useState ({
    password: false,
    confirmPassword: false,
  });

  const handleChange = event => {
    const property = event.target.name;
    const value = event.target.value;
    setFormInput ({...formInput, [property]: value});
  };

  const togglePasswordVisibility = field => {
    setShowPassword ({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };
 
  const handleSubmit = e => {
    e.preventDefault ();

    if (
      formInput.password.length >= 8 &&
      formInput.password === formInput.confirmPassword
    ) {
      let value = {
        password: formInput.password,
        token,
      };
      UpdatePassword (value);
      navigate ('/login');
    } else {
      setPasswordMatch (false);
    }
  };

  return (
    <div className="newPassword-container">
      <h3>Crea tu nueva contraseña </h3>
      <form className="newPassword-form" onSubmit={handleSubmit}>
        <div className="password-input">
          <div className="password-field-container">
            <input
              type={showPassword.password ? 'text' : 'password'}
              name="password"
              placeholder={`Escribe una contraseña (mínimo 8 caracteres) ${showPassword.password ? '(visible)' : ''}`}
              onChange={handleChange}
              value={formInput.password}
              required
              className="password-field"
            />
            <span
              className="password-toggle-icon"
              onClick={() => togglePasswordVisibility ('password')}
            >
              <FontAwesomeIcon
                icon={showPassword.password ? faEyeSlash : faEye}
                className={`eye-icon ${showPassword.password ? 'slash' : ''}`}
              />
            </span>
          </div>
        </div>
        <div className="password-input">
          <div className="password-field-container">
            <input
              type={showPassword.confirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder={`Confirma la contraseña ${showPassword.confirmPassword ? '(visible)' : ''}`}
              onChange={handleChange}
              value={formInput.confirmPassword}
              required
              className="password-field"
            />
            <span
              className="password-toggle-icon"
              onClick={() => togglePasswordVisibility ('confirmPassword')}
            >
              <FontAwesomeIcon
                icon={showPassword.confirmPassword ? faEyeSlash : faEye}
                className={`eye-icon ${showPassword.confirmPassword ? 'slash' : ''}`}
              />
            </span>
          </div>
        </div>
        {!passwordMatch &&
          <p className="error-message-forgot">
            Las contraseñas no coinciden o no cumplen con el requisito mínimo de
            8 caracteres.
          </p>}
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};

export default NewPassword;
