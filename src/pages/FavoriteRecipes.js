import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';

export default function FavoriteRecipes() {
  const { favorites } = useContext(RecipesContext);
  let initialRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [activeRecipeType, setActiveRecipeType] = useState('all');

  useEffect(() => {
    initialRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(initialRecipes);
  }, [favorites]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <ul className="filter-container">
        <li>
          <button
            className="filterBtn"
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setActiveRecipeType('all') }
          >
            All
          </button>
        </li>
        <li>
          <button
            className="filterBtn"
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setActiveRecipeType('food') }
          >
            Foods
          </button>
        </li>
        <li>
          <button
            className="filterBtn"
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setActiveRecipeType('drink') }
          >
            Drinks
          </button>
        </li>
      </ul>
      {
        initialRecipes && initialRecipes.length !== 0
      && initialRecipes
        .filter((recipe) => activeRecipeType === 'all'
          || recipe.type === activeRecipeType)
        .map((recipe, index) => (
          <RecipeCard
            key={ index }
            type={ recipe.type }
            recipe={ recipe }
            index={ index }
          />))
      }
    </div>
  );
}
