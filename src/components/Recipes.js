import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FoodsCard from './Card';

function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const MAX_LENGTH = 12;

  useEffect(() => {
    if (pathname === '/foods') {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((results) => {
          const filteredResults = results.meals
            .filter((_, index) => index < MAX_LENGTH);
          setRecipes(filteredResults);
        })
        .catch((err) => console.log(err.message))
        .finally(() => setIsLoading(false));
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((results) => {
          const filteredResults = results.drinks
            .filter((_, index) => index < MAX_LENGTH);
          setRecipes(filteredResults);
        })
        .catch((err) => console.log(err.message))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <div>
      {
        !isLoading && recipes.map((recipe, index) => (
          <FoodsCard
            key={ recipe.idMeal || recipe.idDrink }
            recipes={ recipe }
            index={ index }
          />
        ))
      }
    </div>
  );
}

// meals
// https://www.themealdb.com/api/json/v1/1/search.php?s=
// drinks
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=

export default Recipes;
