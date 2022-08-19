import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const validateEmail = () => {
    const emailRegex = /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
    return user.email.match(emailRegex);
  };

  const minLength = 7;

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div>
      <form>
        <h1>Login</h1>
        <p>
          <label htmlFor="Email">
            Email
            <input
              type="email"
              name="email"
              value={ user.email }
              placeholder="alguem@email.com"
              onChange={ handleChange }
              className="login-input"
              data-testid="email-input"
            />
          </label>
        </p>
        <p>
          <label htmlFor="password-input">
            Senha
            <input
              type="password"
              name="password"
              value={ user.password }
              placeholder="mínimo de 06 caracteres"
              onChange={ handleChange }
              className="login-input"
              data-testid="password-input"
            />
          </label>
        </p>
        <p>
          <button
            type="button"
            onClick={ handleSubmit }
            disabled={ user.password.length < minLength || !validateEmail() }
            className="btn-login"
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </p>
      </form>
    </div>
  );
}
