import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import CardRecomend from '../components/CardRecomend';
import Loading from '../components/Loading';
import { setDetails } from '../tests/helpers/setDetails';

const NUMBER_RECOMENDATION = 5;
const copy = require('clipboard-copy');

export default function RecipeDetails(props) {
  const { match: { params: { idRecipe } } } = props;
  const history = useHistory();
  const { location: { pathname } } = history;
  const [dataRecipe, setDataRecipe] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recomendation, setRecomendetion] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [inProgressRecipes, setInProgress] = useState('Start Recipe');
  const [favoriteOk, setFavoriteOk] = useState(whiteHeartIcon);
  const [displayMessage, setDisplayMessage] = useState(false);

  if (localStorage.getItem('doneRecipes') === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify([]));
  }
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const urlFetch = async (id) => {
    let path = 'drinks';
    let url = '';
    if (pathname.includes('foods')) {
      path = 'meals';
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const dataRecomendation = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setRecomendetion(dataRecomendation.drinks
        .filter((_, i) => i >= 0 && i <= NUMBER_RECOMENDATION));
    } else {
      path = 'drinks';
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const dataRecomendation = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setRecomendetion(dataRecomendation.meals
        .filter((_, i) => i >= 0 && i <= NUMBER_RECOMENDATION));
    }
    const data = await fetch(url).then((response) => response.json());
    setDataRecipe(data[path]);
    setMeasure(Object.keys(data[path][0])
      .filter((key) => key.includes('Measure'))
      .map((key) => data[path][0][key])
      .filter((e) => (e !== ''))
      .filter((e) => e !== null));
    setAllIngredients(Object.keys(data[path][0])
      .filter((key) => key.includes('Ingredien'))
      .map((key) => data[path][0][key])
      .filter((e) => e !== '')
      .filter((e) => e !== null));
  };
  function toggleMessageLinkCopied() {
    copy(`http://localhost:3000${pathname}`);
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
    JSON.parse(localStorage.getItem('doneRecipes')).forEach((e) => {
      if (e.id === idRecipe) {
        setDoneRecipe(true);
      }
    });
    if (JSON.parse(localStorage.getItem('inProgressRecipes').includes(idRecipe))) {
      setInProgress('Continue Recipe');
    }
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
        { allIngredients.map((e, i) => (
          <p
            key={ i }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            -
            {' '}
            {e}
            {' '}
            -
            {' '}
            { measure[i] }
          </p>
        )) }
      </div>
      <p data-testid="instructions">{obj.instrucao}</p>
      { obj.video !== null && <iframe
        data-testid="video"
        title={ `Video Fazendo ${obj.name}` }
        width="420"
        height="315"
        src={ `//www.youtube.com/embed/${obj.video}` }
      /> }
      <div className="slider">
        <div className="slides">
          { recomendation.map((e, i) => (
            <div
              className="slides-cards"
              key={ i }
              id={ `slide-${i}` }
            >
              <CardRecomend
                path={ pathname }
                recipes={ e }
                index={ i }
              />
            </div>
          )) }
        </div>
      </div>
      { doneRecipe === false && (
        <button
          type="button"
          className="progress-btn"
          data-testid="start-recipe-btn"
          onClick={ () => {
            history.push(`${pathname}/in-progress`);
          } }
        >
          { inProgressRecipes }
        </button>
      )}
    </div>
  );
  const parametros = setDetails(pathname, dataRecipe, idRecipe);
  return (
    <div>
      { dataRecipe.length === 0 ? <Loading /> : renderDetails(
        parametros[0], parametros[1],
      ) }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idRecipe: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
