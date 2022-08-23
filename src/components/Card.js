import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Card({ recipes, index }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  console.log(recipes);

  function renderCard({ recipeId, recipeIndex, img, name, path }) {
    return (
      <li>
        <Link data-testid={ `${recipeIndex}-recipe-card` } to={ `/${path}/${recipeId}` }>
          <img
            style={ { width: '80%' } }
            data-testid={ `${recipeIndex}-card-img` }
            src={ img }
            alt={ name }
          />
          <p
            data-testid={ `${recipeIndex}-card-name` }
          >
            { name }
          </p>
        </Link>
      </li>);
  }
  if (pathname === '/foods') {
    const { idMeal, strMealThumb, strMeal } = recipes;
    const foodObj = {
      recipeId: idMeal,
      img: strMealThumb,
      name: strMeal,
      recipeIndex: index,
      path: 'foods',
    };
    return renderCard(foodObj);
  }
  const { idDrink, strDrinkThumb, strDrink } = recipes;
  const drinkObj = {
    recipeId: idDrink,
    img: strDrinkThumb,
    name: strDrink,
    recipeIndex: index,
    path: 'drinks' };
  return renderCard(drinkObj);
}
Card.propTypes = {
  index: PropTypes.number.isRequired,
};
