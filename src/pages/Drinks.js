import React, { useContext } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { searchFood } = useContext(RecipesContext);
  const limitRecipes = 12;

  return (
    <div>
      <Header title="Drinks" />
      <ul>
        {
          (searchFood.init === undefined && searchFood.drinks !== null)
            && searchFood.drinks
              .slice(0, limitRecipes)
              .map((e, i) => <Card index={ i } food={ e } key={ e.idDrink } />)
        }
      </ul>
    </div>
  );
}
