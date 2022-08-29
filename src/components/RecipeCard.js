import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const END_SLICE = 10;

function RecipeCard(props) {
  const { setFavorites } = useContext(RecipesContext);
  const { recipe, index } = props;
  const [displayMessage, setDisplayMessage] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  function toggleMessageLinkCopied(id, type) {
    copy(`http://localhost:3000/${type}s/${id}`);
    setDisplayMessage(true);
  }

  function handleUnfavorite(id) {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newStorage = storage.filter((e) => e.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    setFavorites(newStorage);
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
          {pathname !== '/favorite-recipes' ? (
            <p>
              Done in:
              {' '}
              <time
                dateTime={ doneDate.slice(0, END_SLICE) }
                data-testid={ `${index}-horizontal-done-date` }
              >
                { doneDate.slice(0, END_SLICE).split('-').reverse().join('/') }
              </time>
            </p>)
            : (
              <button
                type="button"
                className="someButtons"
                onClick={ () => handleUnfavorite(id) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="blackHeartIcon"
                  className="someButtons"
                />
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
            className="someButtons"
            onClick={ () => toggleMessageLinkCopied(id, type) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share icon"
              className="someButtons"
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
