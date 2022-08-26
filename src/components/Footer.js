import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="navFooter">
      <Link
        to="/drinks"
      >
        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="drink_icon"
        />
      </Link>
      <Link
        to="/foods"
      >
        <img
          src={ mealIcon }
          data-testid="food-bottom-btn"
          alt="meal_icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
