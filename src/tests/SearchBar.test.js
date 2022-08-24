import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Foods from '../pages/Foods';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals'
import drinks from '../../cypress/mocks/drinks'
import mealCategories from '../../cypress/mocks/mealCategories';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import firstLetterMeal from '../../cypress/mocks/firstLetterMeal';
import firstLetterDrinks from '../../cypress/mocks/firstLetterDrinks';
import Provider from '../context/RecipesProvider';
import Drinks from '../pages/Drinks';
import fetch from '../../cypress/mocks/fetch';
import soupMeals from '../../cypress/mocks/soupMeals';
import oneMeal from '../../cypress/mocks/oneMeal';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testa o componente SEARCHBAR', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealsByIngredient),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(soupMeals),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(emptyMeals),
    }))
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Testando as respostas da API ao fazer as pesquisas no campo de buscas enquanto estiver na url /foods', async () => {
    const {history} = renderWithRouter(<Provider><Foods /></Provider>, ['/foods']);
    expect(history.location.pathname).toBe('/foods');
    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      expect(global.fetch).toHaveBeenCalledTimes(2)
    });

    const searchBtn = screen.getByRole('img', { name: /searchicon/i })
    userEvent.click(searchBtn);
    
    const textInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i })
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i })

    expect(textInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    
    userEvent.type(textInput, 'Chicken');
    expect(textInput).toHaveValue('Chicken')
    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked()

    userEvent.click(submitBtn);
    
    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken')
      expect(global.fetch).toHaveBeenCalledTimes(3)
    })    
    expect(screen.getByText(/brown stew chicken/i)).toBeInTheDocument();

    userEvent.clear(textInput);
    userEvent.type(textInput, 'soup');
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked()
    userEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup')
      expect(global.fetch).toHaveBeenCalledTimes(4)
    })

    expect(screen.getByText(/Leblebi Soup/i)).toBeInTheDocument();

    // Aguardando tela de uma receita ser desenvolvida
    userEvent.clear(textInput);
    userEvent.type(textInput, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
      expect(global.fetch).toHaveBeenCalledTimes(5)
    })
    expect(history.location.pathname).toBe('/foods/52771');
    // expect(screen.getByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();

    userEvent.type(textInput, 'o');
    userEvent.click(firstLetterRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    })

    userEvent.clear(textInput);
    userEvent.clear(firstLetterRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalledTimes(6);
    })

    userEvent.clear(textInput);
    userEvent.type(textInput, 'xablau');
    userEvent.click(nameRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=xablau')
      expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    })
  });
});

describe('Testa o componente SEARCHBAR', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkCategories),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinksByIngredient),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(ginDrinks),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Testando as respostas da API ao fazer as pesquisas no campo de buscas enquanto estiver na url /drinks', async () => {
    const {history} = renderWithRouter(<Provider><Drinks /></Provider>, ['/drinks']);
    expect(history.location.pathname).toBe('/drinks');
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
      expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
    
    const searchBtn = screen.getByRole('button', { name: /searchicon/i });
    userEvent.click(searchBtn);
    
    const textInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    
    userEvent.type(textInput, 'Light rum');
    userEvent.click(ingredientRadio);
    userEvent.click(submitBtn);
    
    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });
    expect(screen.getByText(/151 Florida Bushwacker/i)).toBeInTheDocument();

    userEvent.clear(textInput);
    userEvent.type(textInput, 'gin');
    userEvent.click(nameRadio);
    userEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
      expect(global.fetch).toHaveBeenCalledTimes(4);
    });
    expect(screen.getByText(/Gin Fizz/i)).toBeInTheDocument();

    // Aguardando tela de uma receita ser desenvolvida
    userEvent.clear(textInput);
    userEvent.type(textInput, 'Aquamarine');
    userEvent.click(nameRadio);
    userEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
      expect(global.fetch).toHaveBeenCalledTimes(5);
    })
    expect(history.location.pathname).toBe('/drinks/178319');
    // expect(screen.getByText(/Aquamarine/i)).toBeInTheDocument();
  });
})

describe('Testando componente SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(firstLetterMeal),
    }));
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('testando a busca de refeições com a opção de apenas a primeira letra selecionada no filtro estando na url /foods', async() => {
    const {history} = renderWithRouter(<Provider><Foods /></Provider>, ['/foods']);
    expect(history.location.pathname).toBe('/foods');
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const searchBtn = screen.getByRole('button', { name: /searchicon/i });
    userEvent.click(searchBtn);

    const textInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    userEvent.type(textInput, 'o');
    userEvent.click(firstLetterRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=o');
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });
    expect(screen.getByText(/Osso Buco alla Milanese/i)).toBeInTheDocument();
  });
});

describe('Testando componente SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkCategories),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(firstLetterDrinks),
    }));
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('testando a busca de refeições com a opção de apenas a primeira letra selecionada no filtro estando na url /drinks', async() => {
    const {history} = renderWithRouter(<Provider><Drinks /></Provider>, ['/drinks']);
    expect(history.location.pathname).toBe('/drinks');
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
      expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const searchBtn = screen.getByRole('button', { name: /searchicon/i });
    userEvent.click(searchBtn);

    const textInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });

    userEvent.type(textInput, 'o');
    userEvent.click(firstLetterRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=o');
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });
    expect(screen.getByText(/Orgasm/i)).toBeInTheDocument();
  });
});
