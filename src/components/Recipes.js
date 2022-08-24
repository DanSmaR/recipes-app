import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import { URLMealsArr, URLDrinksArr } from '../utils/constants';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { searchFood, setSearchFood } = useContext(RecipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [path, setPath] = useState('');
  const MAX_LENGTH_RECIPES = 12;
  const MAX_LENGTH_CATEGORIES = 5;

  function handleFetchAll(typeOfRecipe, UrlArr) {
    Promise.all(UrlArr.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((results) => {
        const filteredResults = [
          results[0][typeOfRecipe].filter((_, index) => index < MAX_LENGTH_RECIPES),
          results[1][typeOfRecipe].filter((_, index) => index < MAX_LENGTH_CATEGORIES),
        ];
        setSearchFood(filteredResults[0]);
        setCategories(filteredResults[1]);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (pathname === '/foods') {
      handleFetchAll('meals', URLMealsArr);
      setPath('meals');
    } else {
      handleFetchAll('drinks', URLDrinksArr);
      setPath('drinks');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCategoryFetch(category) {
    if (pathname === '/foods') {
      if (category === 'all' || category === selectedCategory) {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((res) => res.json())
          .then((res) => setSearchFood(res));
        setSelectedCategory('all');

        return;
      }
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => res.json())
        .then((res) => setSearchFood(res));
      setSelectedCategory(category);
    } else {
      if (category === 'all' || category === selectedCategory) {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
          .then((res) => res.json())
          .then((res) => setSearchFood(res));
        setSelectedCategory('all');

        return;
      }
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => res.json())
        .then((res) => setSearchFood(res));
      setSelectedCategory(category);
    }
  }

  return (
    <div>
      {
        !isLoading && (
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ () => handleCategoryFetch('all') }
          >
            All

          </button>)
      }
      {
        !isLoading && categories.map((category, index) => (
          <button
            key={ index }
            type="button"
            onClick={ () => handleCategoryFetch(category.strCategory) }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }

          </button>
        ))
      }
      <ul>
        {
          !isLoading && (Array.isArray(searchFood) ? searchFood : searchFood[path])
            .filter((_, index) => index < MAX_LENGTH_RECIPES)
            .map((recipe, index) => (
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
