import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function SearchBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { setSearchFood } = useContext(RecipesContext);
  const [inputRadios, setInputRadios] = useState('');
  const [inputText, setInputText] = useState('');

  const ingredientURL = (ingrediente) => {
    if (pathname === '/drinks') {
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    }
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  };

  const nameURL = (name) => {
    if (pathname === '/drinks') {
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    }
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  };

  const firstLetter = (primeiraLetra) => {
    if (pathname === '/drinks') {
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
    }
    return `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  };

  const handleInput = ({ target: { value, type } }) => {
    if (type === 'text') {
      setInputText(value);
    } else {
      setInputRadios(value);
    }
  };

  const btnClick = async (e) => {
    e.preventDefault(e);
    if (!inputText || !inputRadios) return;
    let results = '';
    switch (inputRadios) {
    case 'Ingredient':
      results = await fetch(ingredientURL(inputText))
        .then((response) => response.json());
      break;
    case 'Name':
      results = await fetch(nameURL(inputText))
        .then((response) => response.json());
      break;
    default:
      if (inputText.length > 1) {
        results = [];
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      results = await fetch(firstLetter(inputText))
        .then((response) => response.json());
      break;
    }
    console.log(results);
    if (results.drinks === null || results.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      results = [];
    } else if (pathname === '/drinks' && results.drinks.length === 1) {
      history.push(`/drinks/${results.drinks[0].idDrink}`);
    } else if (pathname === '/foods' && results.meals.length === 1) {
      history.push(`/foods/${results.meals[0].idMeal}`);
    }
    setSearchFood(results);
  };

  return (
    <form onSubmit={ btnClick }>
      <p>
        <label htmlFor="searchBar">
          <input
            id="searchBar"
            type="text"
            placeholder="Pesquise uma comida ou bebida"
            data-testid="search-input"
            value={ inputText }
            onChange={ handleInput }
          />
        </label>
      </p>
      <ul>
        <li>
          <label htmlFor="ingredientRadio">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredientRadio"
              name="radios"
              value="Ingredient"
              onChange={ handleInput }
            />
            Ingredient
          </label>
        </li>
        <li>
          <label htmlFor="nameRadio">
            <input
              type="radio"
              data-testid="name-search-radio"
              id="nameRadio"
              name="radios"
              value="Name"
              onChange={ handleInput }
            />
            Name
          </label>
        </li>
        <li>
          <label htmlFor="firstLetterRadio">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="firstLetterRadio"
              name="radios"
              value="First letter"
              onChange={ handleInput }
            />
            First letter
          </label>
        </li>
      </ul>

      <p>
        <button
          type="submit"
          data-testid="exec-search-btn"
        >
          Submit

        </button>
      </p>
    </form>
  );
}
