import React from 'react';

export default function SearchBar() {
  return (
    <form>
      <p>
        <label htmlFor="searchBar">
          <input
            type="text"
            placeholder="Pesquise uma comida ou bebida"
            data-testid="search-input"
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
          />
          Ingredientes
        </label>
        <label htmlFor="nameRadio">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="nameRadio"
            name="radios"
          />
          Nome
        </label>

        <label htmlFor="firstLetterRadio">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="firstLetterRadio"
            name="radios"
          />
          Primeira Letra
        </label>
      </p>

      <p>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Submit

        </button>
      </p>
    </form>
  );
}
