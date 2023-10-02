import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {postlogin} from '../../functions/Auth';
import './login.css';
import Swal from 'sweetalert2';
import {resendConfirmationEmail} from '../../functions/fetchingUsers';

const Login = ({formPassword, setFormPassword}) => {
  const [status, setStatus] = useState ('');
  const [formInput, setFormInput] = useState ({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState ({
    email: '',
    password: '',
  });

  useEffect (
    () => {
      if (errors.email || errors.password) {
        setCanSubmit (false);
      } else {
        setCanSubmit (
          formInput.email.trim () !== '' && formInput.password.trim () !== ''
        );
      }
    },
    [errors, formInput]
  );

  const [canSubmit, setCanSubmit] = useState (false);

  const handleChange = event => {
    const property = event.target.name;
    const value = event.target.value;
    setFormInput ({...formInput, [property]: value});
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (formInput.email.trim () === '') {
      newErrors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test (formInput.email)) {
      newErrors.email = 'El email no es válido';
      isValid = false;
    }
    if (formInput.password.trim () === '') {
      newErrors.password = 'La contraseña es obligatoria';
      isValid = false;
    }
    setErrors (newErrors);
    return isValid;
  };

  const navigate = useNavigate ();

  const handleSubmit = async e => {
    e.preventDefault ();

    if (validateForm ()) {
      try {
        const credential = await postlogin (formInput);
        if (credential.error && credential.error === 'Email no verificado') {
          Swal.fire ({
            title: 'Cuenta no verificada',
            text: `Por favor, verifica tu cuenta a través del correo electrónico (${formInput.email}) antes de iniciar sesión. Debes confirmar la cuenta para poder acceder.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Reenviar confirmación',
          }).then (async result => {
            if (result.isConfirmed) {
              await resendConfirmationEmail (formInput.email);
              Swal.fire ('Deleted!', 'Your file has been deleted.', 'success');
            }
          });
        } else if (credential.status === 200) {
          navigate ('/');
        } else {
          Swal.fire ({
            title: 'Error',
            text: 'El email o la contraseña son incorrectos. Por favor, inténtalo nuevamente.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
        }
      } catch (error) {
        console.error ('Error al realizar la solicitud:', error);
        Swal.fire ({
          title: 'Error',
          text: 'El correo o la contraseña son incorrectos. Por favor, inténtalo nuevamente.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-hello">
          <h1>Hola!</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Escribe tu email"
            onChange={handleChange}
            value={formInput.email}
            required
          />
          {errors.email && <h3 className="error-message">{errors.email}</h3>}

          <input
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            onChange={handleChange}
            value={formInput.password}
            required
          />
          {errors.password &&
            <h3 className="error-message">{errors.password}</h3>}

          <button className="button-login" type="submit" disabled={!canSubmit}>
            Ingresar
          </button>
          <p>
            Si olvidaste tu contraseña{' '}
            <span onClick={() => setFormPassword (!formPassword)}>
              ház click aquí
            </span>
          </p>
        </form>
        <div className="text-register">
          <h3 className="text-register-h3">
            Si aún no tenés cuenta, completá el formulario con tus datos y
            registrate para continuar!{' '}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
