import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Footer from './Footer';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  const { location: { pathname } } = useHistory();
  const [toggleSearch, setToggleSearch] = useState(false);
  const headerValidation = pathname !== '/profile'
  && pathname !== '/done-recipes' && pathname !== '/favorite-recipes';
  const footerValidation = pathname !== '/done-recipes'
  && pathname !== '/favorite-recipes';

  return (
    <div className="header">
      <header
        style={ { display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center' } }
      >
        <Link
          to="/profile"
          className="header-icon"
        >
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </Link>
        <h1 style={ { textAlign: 'right' } } data-testid="page-title">{title}</h1>
        {headerValidation && (
          <button
            className="header-icon"
            style={ { border: 'none', background: 'none' } }
            type="button"
            onClick={ () => setToggleSearch(!toggleSearch) }
          >
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        )}
        {footerValidation && <Footer />}
      </header>
      { toggleSearch && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
