import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeCard(props) {
  const { recipe, index } = props;
  const [displayMessage, setDisplayMessage] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  function toggleMessageLinkCopied(id, type) {
    copy(`http://localhost:3000/${type}s/${id}`);
    setDisplayMessage(true);
  }

  function handleUnfavorite(recipe) {
    const storage = localStorage.getItem('favoriteRecipes');
    const newStorage = storage.filter((e) => e !== recipe);
    localStorage.setItem('favoriteRecipes', newStorage);
  }

  useEffect(() => {
    const TIMEOUT = 2000;
    let timerId = '';
    if (displayMessage) {
      timerId = setTimeout(setDisplayMessage, TIMEOUT, false);
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
          {console.log(pathname)}
          {pathname !== '/favorite-recipes' ? (
            <p>
              Done in:
              {' '}
              <time
                dateTime={ doneDate.split('/').reverse().join('-') }
                data-testid={ `${index}-horizontal-done-date` }
              >
                { doneDate }
              </time>
            </p>)
            : (
              <button
                type="button"
              >
                <img src={ blackHeartIcon } alt="blackHeartIcon" />
              </button>
            )}
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
