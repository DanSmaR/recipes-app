import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals'
import drinks from '../../cypress/mocks/drinks'
import Provider from '../context/RecipesProvider';
import { corbaMeal, emptyResult } from './helpers/constants';
import Drinks from '../pages/Drinks';



describe('Testa o componente SEARCHBAR', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }))
    global.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Testa se todos os inputs estão na tela, /foods', async () => {
    
    const {history} = renderWithRouter(<Provider><App /></Provider>);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn'); 

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'qwertyu');    
    userEvent.click(button);

    history.push('/foods');

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const textInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstRadio = screen.getByTestId('first-letter-search-radio');
    const submitBtn = screen.getByTestId('exec-search-btn');

    expect(textInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstRadio).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    userEvent.type(textInput, 'Onion');
    userEvent.click(ingredientRadio);
    userEvent.click(submitBtn);

    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Onion')
    })

    userEvent.click(nameRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Onion')
    })

    userEvent.clear(textInput);
    userEvent.type(textInput, 'o');
    userEvent.click(firstRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=o')
    })

    userEvent.type(textInput, 'o');
    userEvent.click(firstRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    })

    userEvent.clear(textInput);
    userEvent.clear(firstRadio);
    userEvent.click(submitBtn);
    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalledTimes(4);
    })
  });
});

describe('Name of the group', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(emptyResult),
    }))
    global.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('oi', async () => {
    const {history} = renderWithRouter(<Provider><App /></Provider>);

    const searchBtn = screen.getByTestId('search-top-btn');
    
    userEvent.click(searchBtn);
    const textInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const submitBtn = screen.getByTestId('exec-search-btn');

    userEvent.clear(textInput);
    userEvent.type(textInput, 'Xablau');
    userEvent.click(nameRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    })
  });
});

describe('Testa o componente SEARCHBAR', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }))
    global.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Testa se todos os inputs estão na tela, /drinks', async () => {

    const {history} = renderWithRouter(<Provider><Drinks /></Provider>);

    history.push('/drinks')

    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const textInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstRadio = screen.getByTestId('first-letter-search-radio');
    const submitBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(textInput, 'Ice');
    userEvent.click(ingredientRadio);
    userEvent.click(submitBtn);

    await  waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Ice')
    })

    userEvent.click(nameRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Ice')
    })

    userEvent.clear(textInput);
    userEvent.type(textInput, 'o');
    userEvent.click(firstRadio);
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=o')
    })
  });
});
