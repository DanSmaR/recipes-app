import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import '@testing-library/jest-dom';
import '@testing-library/react';
import RecipesProvider from '../context/RecipesProvider';
import RecipeDetails from '../pages/RecipeDetails';
import { URLAllDrinks, URLAllMeals, URLOneMeal, URLOneDrink } from '../utils/constants';
import doneRecipes, { favoriteRecipes, inProgressFoodRecipes, inProgressDrinkRecipes } from '../utils/mocks/doneRecipesLocalStorage';

const detailedFoodParams = { match: { params: { idRecipe: '52771' } } };
const detailedDrinkParams = { match: { params: { idRecipe: '178319' } } };

const copy = require('clipboard-copy');
const linkCopied = 'http://localhost:3000/foods/52771';

const doneRecipesStringified = JSON.stringify(doneRecipes);
const favoriteRecipesStringified = JSON.stringify(favoriteRecipes);
const inProgressFoodRecipesStringified = JSON.stringify(inProgressFoodRecipes);
const inProgressDrinkRecipesStringified = JSON.stringify(inProgressDrinkRecipes);
const emptyArrStringified = JSON.stringify([]);

describe('Testa a página Recipes Details', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });
  
  afterEach(() => {
    Storage.prototype.setItem.mockClear();
    Storage.prototype.getItem.mockClear();
    jest.resetAllMocks();
  })

  it('Renderiza todos os elementos da página /FOODS corretamente', async() => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation((linkCopied) => Promise.resolve(linkCopied)),
      },
    });

    localStorage.getItem
      .mockReturnValueOnce(null).mockReturnValueOnce(null).mockReturnValueOnce(null).mockReturnValueOnce(favoriteRecipesStringified).mockReturnValueOnce(doneRecipesStringified).mockReturnValueOnce(inProgressFoodRecipesStringified).mockReturnValue(favoriteRecipesStringified);


    const { history } = renderWithRouter(<RecipesProvider><RecipeDetails { ...detailedFoodParams } /></RecipesProvider>, ['/foods/52771']);
    expect(history.location.pathname).toBe('/foods/52771');

    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(URLOneMeal);
      expect(global.fetch).toHaveBeenCalledWith(URLAllDrinks);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const shareBtn = screen.getByRole('button', { name: /share/i });
    const favBtn = screen.getByRole('button', { name: /favoritado/i });
    const recipeImg = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const ingredientsAndMeasure = screen.getByTestId('0-ingredient-name-and-measure');
    const instructions = screen.getByTestId('instructions');
    const video = screen.getByTestId('video');
    const recomendationCarousel = screen.getByTestId('0-recomendation-title');
    // const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredientsAndMeasure).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(recomendationCarousel).toBeInTheDocument();
    // expect(startRecipeBtn).toBeInTheDocument();

    userEvent.click(shareBtn);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(linkCopied);
    
    userEvent.click(favBtn);
    expect(localStorage.getItem('favoriteRecipes')).not.toBeNull();
    
    // userEvent.click(startRecipeBtn);
    // expect(history.location.pathname).toBe('/foods/52771/in-progress');
    // expect(localStorage.getItem('inProgressRecipes')).not.toBeNull();
    
    // history.goBack();
    // expect(startRecipeBtn).toHaveTextContent(/continue recipe/i);
  });

  it('Renderiza todos os elementos da página /DRINKS corretamente', async() => {
    localStorage.getItem
      .mockReturnValueOnce(null).mockReturnValueOnce(null).mockReturnValueOnce(null).mockReturnValueOnce(favoriteRecipesStringified).mockReturnValueOnce(doneRecipesStringified).mockReturnValueOnce(inProgressFoodRecipesStringified).mockReturnValue(favoriteRecipesStringified);

    const { history } = renderWithRouter(<RecipesProvider><RecipeDetails { ...detailedDrinkParams } /></RecipesProvider>, ['/drinks/178319']);
    expect(history.location.pathname).toBe('/drinks/178319');

    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(URLOneDrink);
      expect(global.fetch).toHaveBeenCalledWith(URLAllMeals);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const shareBtn = screen.getByRole('button', { name: /share/i });
    const favBtn = screen.getByRole('img', { name: /favoritado/i });
    const recipeImg = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const ingredientsAndMeasure = screen.getByTestId('0-ingredient-name-and-measure');
    const instructions = screen.getByTestId('instructions');
    const recomendationCarousel = screen.getByTestId('0-recomendation-title');
    // const startRecipeBtn = screen.getByTestId('start-recipe-btn');

    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredientsAndMeasure).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(recomendationCarousel).toBeInTheDocument();
    // expect(startRecipeBtn).toBeInTheDocument();

    screen.logTestingPlaygroundURL();

    userEvent.click(favBtn);
    expect(localStorage.getItem('favoriteRecipes')).not.toBeNull();

    // userEvent.click(startRecipeBtn);
    // expect(history.location.pathname).toBe('/drinks/178319/in-progress');
    // expect(localStorage.getItem('inProgressRecipes')).not.toBeNull();
  });
});