import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/react'
import '@testing-library/jest-dom';
import React from 'react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './helpers/renderWithRouter';
import doneRecipes from "../utils/mocks/doneRecipesLocalStorage";
import RecipesProvider from '../context/RecipesProvider';

const copy = require('clipboard-copy');
const linkCopied = 'http://localhost:3000/foods/52771';

const doneRecipesStringified = JSON.stringify(doneRecipes);
const emptyArrStringified = JSON.stringify([]);

describe('Testa a página Done Recipes', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn();
  });
  
  afterEach(() => {
    Storage.prototype.getItem.mockClear();
  })

  it('Renderiza todos os elementos corretamente', () => {
    localStorage.getItem.mockReturnValue(doneRecipesStringified);
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
    const allFilterBtn = screen.getByRole('button', {  name: /all/i});
    const foodFilterBtn = screen.getByRole('button', {  name: /foods/i});
    const drinkFilterBtn = screen.getByRole('button', {  name: /drinks/i});
    const shareBtn = screen.getAllByRole('button', { name: /share icon/i });

    userEvent.click(allFilterBtn);

    expect(screen.getByRole('img', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /aquamarine/i })).toBeInTheDocument();

    userEvent.click(foodFilterBtn);

    expect(screen.getByRole('img', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /aquamarine/i })).not.toBeInTheDocument();

    userEvent.click(drinkFilterBtn);

    expect(screen.queryByRole('img', { name: /spicy arrabiata penne/i })).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: /aquamarine/i })).toBeInTheDocument();
  });
        

  it('Verifica se o botao de compartilhar copia o link da receita', () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation((linkCopied) => Promise.resolve(linkCopied)),
      },
    });
    localStorage.getItem.mockReturnValue(doneRecipesStringified);
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
    const shareBtn = screen.getAllByRole('button', { name: /share icon/i });

    userEvent.click(shareBtn[0]);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(linkCopied);
  });

  it('Verifica se o botao de compartilhar copia o link da receita', () => {
    localStorage.getItem.mockReturnValue(null);
    renderWithRouter(<RecipesProvider><DoneRecipes /></RecipesProvider>);
    screen.logTestingPlaygroundURL();
    expect(screen.queryByRole('img', { name: /aquamarine/i })).not.toBeInTheDocument();
  });
})