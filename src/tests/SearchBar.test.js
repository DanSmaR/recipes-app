import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals'
import drinks from '../../cypress/mocks/drinks'


describe('Testa o componente SEARCHBAR', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }))
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Testa se todos os inputs estão na tela, /foods', async () => {
    
    const {history} = renderWithRouter(<App />);

    await waitFor(async () => {
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

  });
  });
});