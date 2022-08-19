import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  const { location: { pathname } } = useHistory();
  const [toggleSearch, setToggleSearch] = useState(false);
  const validation = pathname !== '/profile'
  && pathname !== '/done-recipes' && pathname !== '/favorite-recipes';

  return (
    <div>
      <header
        style={ { display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start' } }
      >
        <Link
          to="/profile"
        >
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {validation && (
          <button
            style={ { border: 'none', background: 'none' } }
            type="button"
            onClick={ () => setToggleSearch(!toggleSearch) }
          >
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        )}
      </header>
      { toggleSearch && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
