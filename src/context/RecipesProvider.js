
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

const INITIAL_STATE = { nome: 'Xablau', idade: 100 };

function RecipesProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  return (
    <RecipesContext.Provider value={ state }>
      {children}
    </RecipesContext.Provider>
  )
}

export default RecipesProvider;