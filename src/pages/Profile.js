import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  function handleLogout() {
    localStorage.clear();
  }
  const usrEmail = JSON.parse(localStorage.getItem('user')) || '';
  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{usrEmail.email}</p>
      <Link to="/done-recipes">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes

        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes

        </button>

      </Link>

      <Link to="/" replace>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogout }
        >
          Logout

        </button>

      </Link>
    </div>
  );
}
