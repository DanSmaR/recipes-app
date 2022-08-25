import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardRecomend({ recipes, index }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  function renderCard(id, img, name) {
    return (
      <ul className="recomend-ul" data-testid={ `${index}-recomendation-card` }>
        <li>
          <Link to={ `/foods/${id}` }>
            <img
              className="mealRecomend-img"
              src={ img }
              alt={ name }
            />
            <p
              className="mealRecomend-name"
              data-testid={ `${index}-recomendation-title` }
            >
              { name }
            </p>
          </Link>
        </li>
      </ul>
    );
  }
  if (pathname.includes('drinks')) {
    const { strMealThumb, strMeal } = recipes;
    return renderCard(index, strMealThumb, strMeal);
  }
  const { strDrinkThumb, strDrink } = recipes;
  return renderCard(index, strDrinkThumb, strDrink);
}
CardRecomend.propTypes = {
  index: PropTypes.number.isRequired,
};
