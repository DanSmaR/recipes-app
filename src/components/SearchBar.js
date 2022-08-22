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

  const btnClick = async () => {
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
        global.alert('Your search must have only 1 (one) character');
      }
      results = await fetch(firstLetter(inputText))
        .then((response) => response.json());
      break;
    }
    if (results.drinks === null || results.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (pathname === '/drinks' && results.drinks.length === 1) {
      history.push(`/drinks/${results.drinks[0].idDrink}`);
    } else if (pathname === '/foods' && results.meals.length === 1) {
      history.push(`/foods/${results.meals[0].idMeal}`);
    }
    setSearchFood(results);
  };

  return (
    <form>
      <p>
        <label htmlFor="searchBar">
          <input
            type="text"
            placeholder="Pesquise uma comida ou bebida"
            data-testid="search-input"
            value={ inputText }
            onChange={ handleInput }
          />
        </label>
      </p>
      <p>
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
      </p>

      <p>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ btnClick }
        >
          Submit

        </button>
      </p>
    </form>
  );
}
