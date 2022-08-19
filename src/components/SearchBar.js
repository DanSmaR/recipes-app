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
    </form>
  );
}
