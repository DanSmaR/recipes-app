import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [state, setState] = useState([]);

  const obj = {
    state,
    setState,
  };

  return (
    <RecipesContext.Provider value={ obj }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };
