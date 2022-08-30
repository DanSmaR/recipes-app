import React, { Fragment, useState } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function DoneRecipes() {
  const initialRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [activeRecipeType, setActiveRecipeType] = useState('all');
  return (
    <div>
      <Header title="Done Recipes" />
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
        initialRecipes.length !== 0
      && initialRecipes
        .filter((recipe) => activeRecipeType === 'all'
          || recipe.type === activeRecipeType)
        .map((recipe, index) => (
          <Fragment key={ index }>
            <RecipeCard
              type={ recipe.type }
              recipe={ recipe }
              index={ index }
            />
            <hr />
          </Fragment>
        ))
      }
    </div>
  );
}
