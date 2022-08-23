import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';


describe('Testa o componente FOOTER', () => {
  it('Renderiza todos os elementos corretamente', () => {
    renderWithRouter(<Profile />)
    localStorage.setItem('user', {email: 'email@email.com'})
    screen.logTestingPlaygroundURL()
    const email = screen.getByTestId('profile-email')
    const doneRecipes = screen.getByRole('button', {
        name: /done recipes/i
      })
    const favoriteRecipes = screen.getByRole('button', {
        name: /favorite recipes/i
      })
    const logout = screen.getByRole('button', {
        name: /logout/i
      })

    expect(email).toBeInTheDocument()
    expect(doneRecipes).toBeInTheDocument()
    expect(favoriteRecipes).toBeInTheDocument()
    expect(logout).toBeInTheDocument()
    userEvent.click(logout)

    expect(localStorage.getItem('user')).toBeNull()

  });
  
});