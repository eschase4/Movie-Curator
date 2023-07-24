import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import path from 'path'

require('dotenv').config({ path: path.resolve(__dirname, './../../.env') })

const omdbKey = process.env.REACT_APP_OMDB_KEY;
const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=`;
console.log(omdbKey, url);

const Header = () => {

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <nav className="container">
        <Link to="/" className="navbar-brand">
          <h1>Movie Curator</h1>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/movies" className="nav-link">
                My Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/suggestions" className="nav-link">
                Movie Suggestions
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
