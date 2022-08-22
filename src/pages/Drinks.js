import React, { useContext } from 'react';
import FoodsCard from '../components/FoodsCard';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { searchFood } = useContext(RecipesContext);
  const limitRecipes = 12;

  return (
    <div>
      <Header title="Drinks" />
      { (searchFood.init === undefined && searchFood.drinks !== null) && searchFood.drinks
        .slice(0, limitRecipes)
        .map((e, i) => <FoodsCard index={ i } food={ e } key={ e.idDrink } />) }
    </div>
  );
}
