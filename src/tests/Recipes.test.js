import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Profile from '../pages/Profile';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from './helpers/renderWithRouter';
import Foods from '../pages/Foods';
import Recipes from '../components/Recipes';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks'
import beefMeals from '../../cypress/mocks/beefMeals';
import mealCategories from '../../cypress/mocks/mealCategories';
import { URLMealsArr, URLDrinksArr } from '../utils/constants';

const dataMealsResponseArr = [meals, mealCategories];

describe('Testa o componente RECIPES', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(dataMealsResponseArr),
    }))
    global.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renderiza todos os elementos corretamente', async() => {
    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>, ['/foods'])
    console.log(history)
    await  waitFor(() => {
      // expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      // expect(fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      expect(global.fetch).toHaveBeenCalled()
      screen.logTestingPlaygroundURL()
    })
    // const firstFilterBtn = await screen.findByTestId('Beef-category-filter');
    // expect(firstFilterBtn).toBeInTheDocument()
    // userEvent.click(firstFilterBtn)
  });
});