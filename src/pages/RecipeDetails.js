import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading';

const MINMEALS = 9;
const MAXMEALS = 28;
const MINDRINKS = 17;
const MAXDRINKS = 31;
const MINMEASU = 29;
const MAXMEASU = 48;
const MINMEASUD = 32;
const MAXMEASUD = 47;

export default function RecipeDetails(props) {
  const { match: { params: { idRecipe } } } = props;
  const history = useHistory();
  const { location: { pathname } } = history;
  const [dataRecipe, setDataRecipe] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recomendation, setRecomendetion] = useState([]);

  useEffect(() => {
    const urlFetch = async (id) => {
      if (pathname.includes('foods')) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const urlRecomendation = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const dataRecomendation = await fetch(urlRecomendation)
          .then((response) => response.json());
        const data = await fetch(url).then((response) => response.json());
        setRecomendetion(dataRecomendation.drinks.filter((_, i) => i >= 0 && i <= 5));
        setDataRecipe(data.meals);
        const dataMap = Object.keys(data.meals[0])
          .map((key) => data.meals[0][key])
          .filter((e, i) => (i >= MINMEALS && i <= MAXMEALS && e !== ''));
        const measures = Object.keys(data.meals[0])
          .map((key) => data.meals[0][key])
          .filter((e, i) => (i >= MINMEASU && i <= MAXMEASU && e !== ''));
        setMeasure(measures);
        setAllIngredients(dataMap);
      } else {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const urlRecomendation = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const dataRecomendation = await fetch(urlRecomendation)
          .then((response) => response.json());
        setRecomendetion(dataRecomendation.meals.filter((_, i) => i >= 0 && i <= 5));
        const data = await fetch(url).then((response) => response.json());
        const dataMap = Object.keys(data.drinks[0])
          .map((key) => data.drinks[0][key])
          .filter((e, i) => (i >= MINDRINKS && i <= MAXDRINKS && e !== null));
        const measures = Object.keys(data.drinks[0])
          .map((key) => data.drinks[0][key])
          .filter((e, i) => (i >= MINMEASUD && i <= MAXMEASUD && e !== null));
        setMeasure(measures);
        setAllIngredients(dataMap);
        setDataRecipe(data.drinks);
      }
    };

    urlFetch(idRecipe);
  }, []);
  // img
  // French Onion Soup
  // comida ingrediente 20 - bebida 15 (strIngredient1)
  // Kir Royale

  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  const renderDetails = (obj) => (
    <div>
      <img
        src={ obj.image }
        data-testid="recipe-photo"
        alt={ obj.name }
      />

      <h1 data-testid="recipe-title">{obj.name}</h1>
      <h2 data-testid="recipe-category">{obj.category}</h2>

      { allIngredients.map((e, i) => (
        <label htmlFor={ e } key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
          { e }
          { measure[i] }
          <input
            type="checkbox"
            id={ obj.name }
            name={ obj.name }
            value={ e }
          />
        </label>
      )) }

      <p data-testid="instructions">{obj.instrucao}</p>

      { obj.video !== null && <iframe
        data-testid="video"
        title={ `Video Fazendo ${obj.name}` }
        width="420"
        height="315"
        src={ `//www.youtube.com/embed/${obj.video}` }
      /> }

      <p data-testid="0-recomendation-card">oi</p>

    </div>
  );
  let renderizacao = '';
  if (pathname.includes('foods') && dataRecipe.length !== 0) {
    console.log(recomendation);
    renderizacao = {
      image: dataRecipe[0].strMealThumb,
      name: dataRecipe[0].strMeal,
      category: dataRecipe[0].strCategory,
      video: getId(dataRecipe[0].strYoutube),
      instrucao: dataRecipe[0].strInstructions,
    };
  } else if (pathname.includes('drinks') && dataRecipe.length !== 0) {
    console.log(recomendation);
    renderizacao = {
      image: dataRecipe[0].strDrinkThumb,
      name: dataRecipe[0].strDrink,
      category: dataRecipe[0].strAlcoholic,
      video: null,
      instrucao: dataRecipe[0].strInstructions,
    };
  }
  return (
    <div>
      { dataRecipe.length === 0 ? <Loading /> : renderDetails(renderizacao) }
    </div>
  );
}
