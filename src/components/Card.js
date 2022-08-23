import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Card({ recipes, index }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  function renderCard(id, img, name) {
    return (
      <li>
        <Link data-testid={ `${id}-recipe-card` } to={ `/foods/${id}` }>
          <img
            data-testid={ `${id}-card-img` }
            src={ img }
            alt={ name }
          />
          <p
            data-testid={ `${id}-card-name` }
          >
            { name }
          </p>
        </Link>
      </li>);
  }
  if (pathname === '/foods') {
    const { strMealThumb, strMeal } = recipes;
    return renderCard(index, strMealThumb, strMeal);
  }
  const { strDrinkThumb, strDrink } = recipes;
  return renderCard(index, strDrinkThumb, strDrink);
}
Card.propTypes = {
  index: PropTypes.number.isRequired,
};
