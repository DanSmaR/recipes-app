import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/react'
import '@testing-library/jest-dom';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { favoriteRecipes } from "../utils/mocks/doneRecipesLocalStorage";
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipesProvider from '../context/RecipesProvider';


const singleElementArr = [{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
}]
const favoriteRecipesStringified = JSON.stringify(favoriteRecipes);
const removedOneRecipe = JSON.stringify(singleElementArr);

describe('Testa a página Done Recipes', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });
  
  afterEach(() => {
    Storage.prototype.getItem.mockClear();
    Storage.prototype.setItem.mockClear();
  })

  it('Renderiza todos os elementos corretamente', () => {
    localStorage.getItem.mockReturnValue(favoriteRecipesStringified);
    renderWithRouter(<RecipesProvider><FavoriteRecipes /></RecipesProvider>, ['/favorite-recipes']);
    const allFilterBtn = screen.getByRole('button', {  name: /all/i});
    const foodFilterBtn = screen.getByRole('button', {  name: /foods/i});
    const drinkFilterBtn = screen.getByRole('button', {  name: /drinks/i});

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
        

  it('Verifica se o botao de desfavoritar atualiza a lista de receitas', () => {
    localStorage.getItem.mockReturnValueOnce(favoriteRecipesStringified).mockReturnValueOnce(favoriteRecipesStringified).mockReturnValueOnce(removedOneRecipe).mockReturnValue(removedOneRecipe)
    
    renderWithRouter(<RecipesProvider><FavoriteRecipes /></RecipesProvider>, ['/favorite-recipes']);
 
    expect(screen.getByRole('img', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /aquamarine/i })).toBeInTheDocument();

    const unfavBtn = screen.getAllByRole('button', {  name: /blackhearticon/i})[0];
    userEvent.click(unfavBtn);

    expect(screen.queryByRole('img', { name: /spicy arrabiata penne/i })).not.toBeInTheDocument();
    
    expect(screen.getByRole('img', { name: /aquamarine/i })).toBeInTheDocument();
  });

  it('Não deve haver receitas na tela caso não há uma chave favoriteRecipes no localStorage', () => {
    localStorage.getItem.mockReturnValue(null);
    renderWithRouter(<RecipesProvider><FavoriteRecipes /></RecipesProvider>, ['/favorite-recipes']);
    screen.logTestingPlaygroundURL();
    expect(screen.queryByRole('img', { name: /aquamarine/i })).not.toBeInTheDocument();
  });
})