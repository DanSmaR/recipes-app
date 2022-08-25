import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

export default function RecipeInProgress(props) {
  const { match: { params: { idRecipe } } } = props;
  const [allIngredients, setAllIngredients] = useState([]);
  const [dataRecipe, setDataRecipe] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;
  const [checked, setChecked] = useState({});
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
    setDataRecipe(data[path]);
    setAllIngredients(ingredientes);
    const allFalse = ingredientes.reduce((acc, e) => ({ ...acc, [e]: false }), {});
    setChecked(allFalse);
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify([{ id: idRecipe, checked: allFalse }]));
    } else if (!inProgress.some((e) => e.id === idRecipe)) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([
        ...inProgress,
        { id: idRecipe, checked: allFalse },
      ]));
    }
  };
  useEffect(() => {
    urlFetch(idRecipe);
  }, []);

  const handleCheck = ({ target: { value } }) => {
    setChecked({ ...checked, [value]: !checked[value] });
  };

  const renderDetails = (obj) => (
    <div>
      <button
        data-testid="share-btn"
        type="button"
      >
        Share
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favorito
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
          <p key={ i }>
            <label htmlFor={ `ingredient-${i}` } data-testid={ `${i}-ingredient-step` }>
              <input
                checked={ checked[e] }
                value={ e }
                type="checkbox"
                onChange={ handleCheck }
              />
              { e }
            </label>
          </p>
        )) }
      </div>

      <p data-testid="instructions">{obj.instrucao}</p>

      <button
        type="button"
        onClick={ () => {
          const dones = JSON.parse(localStorage.getItem('doneRecipes'));
          localStorage.setItem('doneRecipes', JSON
            .stringify([...dones, idRecipe]));
        } }
        data-testid="finish-recipe-btn"
      >
        Finish Recipes

      </button>
    </div>
  );
  let renderizacao = '';
  if (pathname.includes('foods') && dataRecipe.length !== 0) {
    renderizacao = {
      image: dataRecipe[0].strMealThumb,
      name: dataRecipe[0].strMeal,
      category: dataRecipe[0].strCategory,
      instrucao: dataRecipe[0].strInstructions,
    };
  } else if (pathname.includes('drinks') && dataRecipe.length !== 0) {
    renderizacao = {
      image: dataRecipe[0].strDrinkThumb,
      name: dataRecipe[0].strDrink,
      category: dataRecipe[0].strAlcoholic,
      instrucao: dataRecipe[0].strInstructions,
    };
  }
  return (
    <div>
      {dataRecipe.length === 0 ? <Loading /> : renderDetails(renderizacao)}
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
