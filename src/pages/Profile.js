import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../utils/css/Profile.css';

export default function Profile() {
  function handleLogout() {
    localStorage.clear();
  }
  const usrEmail = JSON.parse(localStorage.getItem('user')) || '';
  return (
    <div>
      <Header title="Profile" />
      <p
        style={ { fontSize: '1.3em' } }
        className="text"
        data-testid="profile-email"
      >
        {usrEmail.email}

      </p>
      <ul className="profile-nav">
        <li>
          <Link className="nav-link" to="/done-recipes">
            <button
              className="nav-btn"
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes
            </button>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/favorite-recipes">
            <button
              className="nav-btn"
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes
            </button>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/" replace>
            <button
              className="nav-btn"
              data-testid="profile-logout-btn"
              type="button"
              onClick={ handleLogout }
            >
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
