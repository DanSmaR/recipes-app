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
import drinkCategories from '../../cypress/mocks/drinkCategories';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import { URLMealsArr, URLDrinksArr } from '../utils/constants';
import Drinks from '../pages/Drinks';
import { act } from 'react-dom/test-utils';

describe('Testa o componente RECIPES na url /foods', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(beefMeals),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }))
    global.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renderiza todos os elementos corretamente', async() => {

    const { history } = renderWithRouter(<RecipesProvider><Foods /></RecipesProvider>, ['/foods']);
    expect(history.location.pathname).toBe('/foods');

    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const firstFilterBtn = screen.getByTestId('Beef-category-filter');
    expect(firstFilterBtn).toBeInTheDocument();
    
    userEvent.click(firstFilterBtn);
    
    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
      expect(global.fetch).toHaveBeenCalledTimes(3)
    });
    expect(screen.getByText(/beef and mustard pie/i)).toBeInTheDocument();
    
    userEvent.click(firstFilterBtn)
    
    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      expect(global.fetch).toHaveBeenCalledTimes(4)
    });
    expect(screen.getByText(/corba/i)).toBeInTheDocument();
  });
});

describe('Testa o componente RECIPES na url /drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkCategories),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(ordinaryDrinks),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }))
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renderiza todos os elementos corretamente', async() => {
    
    const { history } = renderWithRouter(<RecipesProvider><Drinks /></RecipesProvider>, ['/drinks']);
    expect(history.location.pathname).toBe('/drinks');

    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      expect(global.fetch).toHaveBeenCalledTimes(2)
    });

    const firstFilterBtn = screen.getByTestId('Ordinary Drink-category-filter');
    expect(firstFilterBtn).toBeInTheDocument();
    
    userEvent.click(firstFilterBtn);
    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink")
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });
    expect(screen.getByText(/3\-mile long island iced tea/i)).toBeInTheDocument();
    
    userEvent.click(firstFilterBtn)
    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      expect(global.fetch).toHaveBeenCalledTimes(4)
    })
    expect(screen.getByText(/gg/i)).toBeInTheDocument();    
  });
});

describe('Testa o botão All do  componente RECIPES na url /drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkCategories),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(ordinaryDrinks),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renderiza todos os elementos corretamente', async() => {

    const { history } = renderWithRouter(<RecipesProvider><Drinks /></RecipesProvider>, ['/drinks']);    
    expect(history.location.pathname).toBe('/drinks');

    await  waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
        expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const firstFilterBtn = screen.getByTestId('Ordinary Drink-category-filter');
    
    userEvent.click(firstFilterBtn);
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink");
        expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    userEvent.click(screen.getByRole('button', { name: /all/i}));
    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
      expect(global.fetch).toHaveBeenCalledTimes(4);
    }); 
  });
});
