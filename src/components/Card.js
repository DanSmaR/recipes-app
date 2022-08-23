import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function FoodsCard({ food, index }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  function renderCard(id, img, name) {
    return (
      <li>
        <Link data-testid={ `${index}-recipe-card` } to={ `/foods/${id}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ img }
            alt={ name }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { name }
          </p>
        </Link>
      </li>
    );
  }
  if (pathname === '/foods') {
    const { idMeal, strMealThumb, strMeal } = food;
    return renderCard(idMeal, strMealThumb, strMeal);
  }
  const { idDrink, strDrinkThumb, strDrink } = food;
  return renderCard(idDrink, strDrinkThumb, strDrink);
}
