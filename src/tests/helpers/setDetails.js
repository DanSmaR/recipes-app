const GETIDNUMBER = 11;
function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === GETIDNUMBER)
    ? match[2]
    : null;
}

export const setDetails = (pathname, dataRecipe, idRecipe) => {
  if (pathname.includes('foods') && dataRecipe.length !== 0) {
    return [{
      image: dataRecipe[0].strMealThumb,
      name: dataRecipe[0].strMeal,
      category: dataRecipe[0].strCategory,
      video: getId(dataRecipe[0].strYoutube),
      instrucao: dataRecipe[0].strInstructions,
    }, {
      name: dataRecipe[0].strMeal,
      category: dataRecipe[0].strCategory,
      image: dataRecipe[0].strMealThumb,
      alcoholicOrNot: '',
      nationality: dataRecipe[0].strArea,
      type: 'food',
      id: idRecipe,
    }]
  } else if (pathname.includes('drinks') && dataRecipe.length !== 0) {
    return [{
      image: dataRecipe[0].strDrinkThumb,
      name: dataRecipe[0].strDrink,
      category: dataRecipe[0].strAlcoholic,
      video: null,
      instrucao: dataRecipe[0].strInstructions,
    }, {
      name: dataRecipe[0].strDrink,
      category: dataRecipe[0].strCategory,
      image: dataRecipe[0].strDrinkThumb,
      alcoholicOrNot: dataRecipe[0].strAlcoholic,
      nationality: '',
      type: 'drink',
      id: idRecipe,
    }]
  }
}