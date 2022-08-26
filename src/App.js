import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import './utils/css/Login.css';
import './index.css';
import Provider from './context/RecipesProvider';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route
            exact
            path="/foods/:idRecipe"
            render={ (props) => <RecipeDetails { ...props } /> }
          />
          <Route
            exact
            path="/drinks/:idRecipe"
            render={ (props) => <RecipeDetails { ...props } /> }
          />
          <Route
            exact
            path="/foods/:idRecipe/in-progress"
            render={ (props) => <RecipeInProgress { ...props } /> }
          />
          <Route
            exact
            path="/drinks/:idRecipe/in-progress"
            render={ (props) => <RecipeInProgress { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
