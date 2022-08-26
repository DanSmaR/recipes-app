import React from 'react';

function RecipeInProgress() {
  return (
    <div>RecipeInProgress</div>
  );
}

export default RecipeInProgress;

/* import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setDetails } from '../tests/helpers/setDetails';

const copy = require('clipboard-copy');

export default function RecipeInProgress(props) {
  const { match: { params: { idRecipe } } } = props;
  const history = useHistory();
  const { location: { pathname } } = history;

  const [allIngredients, setAllIngredients] = useState([]);
  const [dataRecipe, setDataRecipe] = useState([]);
  const [favoriteOk, setFavoriteOk] = useState(whiteHeartIcon);
  const [checked, setChecked] = useState({});
  const [displayMessage, setDisplayMessage] = useState(false);
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }

  const urlFetch = async (id) => {
    let path = '';
    let url = '';
    if (pathname.includes('foods')) {
      path = 'meals';
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      path = 'drinks';
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const data = await fetch(url).then((response) => response.json());
    const ingredientes = Object.keys(data[path][0])
      .filter((key) => key.includes('Ingredien'))
      .map((key) => data[path][0][key])
      .filter((e) => e !== '')
      .filter((e) => e !== null);
    setAllIngredients(ingredientes);
    const allFalse = ingredientes.reduce((acc, e) => ({ ...acc, [e]: false }), {});
    setChecked(allFalse);
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress === null || !inProgress.some((e) => e.id === idRecipe)) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify([{ id: idRecipe, checked: allFalse }]));
      setChecked(allFalse);
    } else {
      const receita = inProgress.find((e) => e.id === idRecipe);
      setChecked(receita.checked);
    }
    setDataRecipe(data[path]);
  };

  function toggleMessageLinkCopied() {
    copy(`http://localhost:3000${pathname.replace(/\/in-progress/g, '')}`);
    setDisplayMessage(true);
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

  useEffect(() => {
    JSON.parse(localStorage.getItem('favoriteRecipes')).forEach((e) => {
      if (e.id === idRecipe) {
        setFavoriteOk(blackHeartIcon);
      }
    });
    urlFetch(idRecipe);
  }, []);

  const favoritar = (favorito) => {
    const listaDeFavoritos = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteOk === whiteHeartIcon) {
      localStorage
        .setItem('favoriteRecipes',
          JSON.stringify([...listaDeFavoritos, favorito]));
      setFavoriteOk(blackHeartIcon);
    } else {
      const newFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'))
        .filter((e) => e.id !== idRecipe);
      localStorage
        .setItem('favoriteRecipes',
          JSON.stringify(newFavorites));
      setFavoriteOk(whiteHeartIcon);
    }
  };

  const handleCheck = ({ target: { name } }) => {
    setChecked({ ...checked, [name]: !checked[name] });
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const receita = inProgress.filter((e) => e.id !== idRecipe);
    receita.push({ id: idRecipe, checked: { ...checked, [name]: !checked[name] } });
    localStorage.setItem('inProgressRecipes', JSON
      .stringify(receita));
  };

  const renderDetails = (obj, favorito) => (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => toggleMessageLinkCopied() }
      >
        Share
      </button>
      {displayMessage && <span>Link copied!</span>}

      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ () => favoritar(favorito) }
        src={ favoriteOk }
      >
        <img
          src={ favoriteOk }
          alt="favoritado"
        />
      </button>
      <img
        className="meal-img"
        src={ obj.image }
        data-testid="recipe-photo"
        alt={ obj.name }
      />

      <h1 data-testid="recipe-title">{obj.name}</h1>
      <h2 data-testid="recipe-category">{obj.category}</h2>

      <div>
        { allIngredients.map((e, i) => {
          const checkbox = checked[e];
          return (
            <p key={ e }>
              <label htmlFor={ `ingredient-${i}` } data-testid={ `${i}-ingredient-step` }>
                <input
                  checked={ checkbox }
                  name={ e }
                  value={ e }
                  id={ `ingredient-${i}` }
                  type="checkbox"
                  onChange={ handleCheck }
                />
                { e }
              </label>
            </p>
          );
        }) }
      </div>

      <p data-testid="instructions">{obj.instrucao}</p>

      <button
        type="button"
        onClick={ () => {
          const dones = JSON.parse(localStorage.getItem('doneRecipes'));
          localStorage.setItem('doneRecipes', JSON
            .stringify([...dones, idRecipe]));
          history.push('/done-recipes');
        } }
        data-testid="finish-recipe-btn"
      >
        Finish Recipes

      </button>
    </div>
  );
  const parametros = setDetails(pathname, dataRecipe, idRecipe);
  return (
    <div>
      {dataRecipe
        .length === 0 ? <Loading /> : renderDetails(parametros[0], parametros[1])}
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idRecipe: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
 */