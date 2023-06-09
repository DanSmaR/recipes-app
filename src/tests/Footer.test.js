import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Foods from '../pages/Foods';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';


describe('Testa o componente FOOTER', () => {
  it('Renderiza todos os elementos corretamente', () => {

    renderWithRouter(<RecipesProvider><Foods /></RecipesProvider>);

    const foodBtn = screen.getByTestId('food-bottom-btn');
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');

    expect(drinkBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    
    userEvent.click(foodBtn);
    userEvent.click(drinkBtn);
  });
  
});