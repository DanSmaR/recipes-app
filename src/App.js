import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './context/RecipesProvider';
import Login from './pages/Login';

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          {/* <Route path="/questions" exact component={ Game } />
        <Route path="/settings" exact component={ Settings } />
        <Route path="/feedback" exact component={ Feedback } />
  <Route path="/ranking" exact component={ Ranking } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
