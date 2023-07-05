import { Link } from 'react-router-dom';
import React from 'react';

const omdbKey = process.env.OMDB_KEY;
console.log(omdbKey);
const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=`;

const Header = () => {
  const handleSearch = (event) => {
    event.preventDefault();
    console.log('search');
  };


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
          <form className="form-inline ml-3">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search Movies"
              aria-label="Search"
            />
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit" onClick={handleSearch}>
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
