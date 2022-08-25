import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [state, setState] = useState([]);
  const [searchFood, setSearchFood] = useState({ init: 0 });
  const [favorites, setFavorites] = useState([]);

  const obj = {
    state,
    searchFood,
    setState,
    setSearchFood,
    searchFood,
    favorites,
    setFavorites,
  };

  return (
    <RecipesContext.Provider value={ obj }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };
