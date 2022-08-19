import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Foods from '../pages/Foods';
import renderWithRouter from './helpers/renderWithRouter';


describe('Testa o componente HEADER', () => {
  it('Renderiza todos os elementos corretamente', () => {
    
    renderWithRouter(<Foods />);

    const profileBtn = screen.getByTestId('profile-top-btn');
    const title = screen.getByTestId('page-title');
    const searchBtn = screen.getByTestId('search-top-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Testa o botão do PROFILE', () => {
    
    const { history } = renderWithRouter(<Foods />);

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
    
    const title = screen.getByTestId('page-title');

    expect(profileBtn).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('Testa botão de PESQUISA', () => {
    
    renderWithRouter(<Foods />);

    const searchBtn = screen.getByTestId('search-top-btn');
    
    userEvent.click(searchBtn);
    
    const searchImput = screen.getByTestId('search-input');
    expect(searchImput).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(searchImput).not.toBeInTheDocument();
  });
  
});