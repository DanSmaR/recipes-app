import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './Card';

function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const MAX_LENGTH_RECIPES = 12;
  const MAX_LENGTH_CATEGORIES = 5;
  // data-testid=${categoryName}-category-filter
  // meal
  // https://www.themealdb.com/api/json/v1/1/list.php?c=list
  // drink
  // https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
  useEffect(() => {
    if (pathname === '/foods') {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((results) => {
          const filteredResults = results.meals
            .filter((_, index) => index < MAX_LENGTH_RECIPES);
          setRecipes(filteredResults);
        })
        .catch((err) => console.log(err.message))
        .finally(() => setIsLoadingRecipes(false));

      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((results) => {
          const filteredResults = results.meals
            .filter((_, index) => index < MAX_LENGTH_CATEGORIES);
          setCategories(filteredResults);
        })
        .catch((err) => console.log(err.message))
        .finally(() => setIsLoadingCategories(false));
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((results) => {
          const filteredResults = results.drinks
            .filter((_, index) => index < MAX_LENGTH_RECIPES);
          setRecipes(filteredResults);
        })
        .catch((err) => console.log(err.message))
        .finally(() => setIsLoadingRecipes(false));

      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((results) => {
          const filteredResults = results.drinks
            .filter((_, index) => index < MAX_LENGTH_CATEGORIES);
          setCategories(filteredResults);
        })
        .catch((err) => console.log(err.message))
        .finally(() => setIsLoadingCategories(false));
    }
  }, []);
  // data-testid=${categoryName}-category-filter
  return (
    <div>
      {
        !isLoadingCategories && <button type="button">All</button>
      }
      {
        !isLoadingCategories && categories.map((category, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }

          </button>
        ))
      }
      <ul>
        {
          !isLoadingRecipes && recipes.map((recipe, index) => (
            <Card
              key={ recipe.idMeal || recipe.idDrink }
              recipes={ recipe }
              index={ index }
            />
          ))
        }
      </ul>

    </div>
  );
}

// meals
// https://www.themealdb.com/api/json/v1/1/search.php?s=
// drinks
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=

export default Recipes;
