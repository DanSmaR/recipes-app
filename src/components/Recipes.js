import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import { URLMealsArr, URLDrinksArr } from '../utils/constants';

function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const MAX_LENGTH_RECIPES = 12;
  const MAX_LENGTH_CATEGORIES = 5;

  function handleFetchAll(typeOfRecipe, UrlArr) {
    Promise.all(UrlArr.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((results) => {
        console.log(results);
        const filteredResults = [
          results[0][typeOfRecipe].filter((_, index) => index < MAX_LENGTH_RECIPES),
          results[1][typeOfRecipe].filter((_, index) => index < MAX_LENGTH_CATEGORIES),
        ];
        setRecipes(filteredResults[0]);
        setCategories(filteredResults[1]);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (pathname === '/foods') {
      handleFetchAll('meals', URLMealsArr);
    } else handleFetchAll('drinks', URLDrinksArr);
  }, []);

  return (
    <div>
      {
        !isLoading && <button type="button">All</button>
      }
      {
        !isLoading && categories.map((category, index) => (
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
          !isLoading && recipes.map((recipe, index) => (
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

export default Recipes;
