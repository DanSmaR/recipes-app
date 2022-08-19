import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Login from '../pages/Login';
import renderWithRouter from './helpers/utils';


describe('Testa a página de LOGIN', () => {
  it('Renderiza todos os elementos corretamente', () => {
    
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: /login/i, level: 1 });
    const email = screen.getByTestId('email-input')
    const password = screen.getByTestId('password-input')
    const button = screen.getByRole('button', { name: /entrar/i })

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('O botão ENTRAR funciona corretamente', () => {

    const { history } = renderWithRouter(<Login />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');  

    expect(button).toBeDisabled();
    
    userEvent.type(email, 'alguem');    
    expect(button).toBeDisabled();
    userEvent.clear(email);

    userEvent.type(email, 'alguem@email');    
    expect(button).toBeDisabled();
    userEvent.clear(email);

    userEvent.type(email, 'alguem@email.com');    
    expect(button).toBeDisabled();
    userEvent.clear(email);
    
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'qwert');
    expect(button).toBeDisabled();
    userEvent.clear(email);

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'qwertyu');
    expect(button).not.toBeDisabled();
        
    userEvent.click(button);
        
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');        
  });
});