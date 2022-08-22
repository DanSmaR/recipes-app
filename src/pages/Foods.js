import React, { useContext } from 'react';
import Header from '../components/Header';
import FoodsCard from '../components/FoodsCard';
import RecipesContext from '../context/RecipesContext';

export default function Foods() {
  const { searchFood } = useContext(RecipesContext);
  const limitRecipes = 12;

  return (
    <div>
      <Header title="Foods" />
      { (searchFood.init === undefined && searchFood.meals !== null) && searchFood.meals
        .slice(0, limitRecipes)
        .map((e, i) => <FoodsCard index={ i } food={ e } key={ e.idMeal } />) }
    </div>
  );
}
