import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeCard(props) {
  const { recipe, index } = props;
  const [displayMessage, setDisplayMessage] = useState(false);

  function toggleMessageLinkCopied(id, type) {
    copy(`http://localhost:3000/${type}s/${id}`);
    setDisplayMessage(true);
  }

  useEffect(() => {
    const timeOut = 2000;
    let timerId = '';
    if (displayMessage) {
      timerId = setTimeout(() => {
        setDisplayMessage(false);
      }, timeOut);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [displayMessage]);

  function renderCardRecipe({
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  }) {
    return (
      <article className="card-recipe">
        <Link
          to={ `${type}s/${id}` }
        >
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
            width="150px"
          />
        </Link>
        <div>
          {alcoholicOrNot !== '' ? (
            <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</span>
          ) : (
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${nationality} - ${category}` }
            </span>
          )}
          <Link
            to={ `${type}s/${id}` }
          >
            <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
          </Link>
          <p>
            Done in:
            {' '}
            <time
              dateTime={ doneDate }
              data-testid={ `${index}-horizontal-done-date` }
            >
              { doneDate }
            </time>
          </p>
          <div>
            {
              tags && tags.map((tag) => (
                <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  { tag }
                  {' '}
                </span>
              ))
            }
          </div>
          <button
            type="button"
            onClick={ () => toggleMessageLinkCopied(id, type) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share icon"
            />
          </button>
          {displayMessage && <span>Link copied!</span>}
        </div>
      </article>
    );
  }
  return renderCardRecipe(recipe);
}

export default RecipeCard;
