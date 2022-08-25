import React, { useState } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function FavoriteRecipes() {
  // const initialRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const initialRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];
  const [activeRecipeType, setActiveRecipeType] = useState('all');
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
        initialRecipes.length !== 0
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
    </div>);
}
