import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const omdbKey = process.env.REACT_APP_OMDB_KEY;
const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=`;

const HomePage = () => {
  const [formState, setFormState] = useState({ search: '' });
  const [movies, setMovies] = useState({movies: []});
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${url}/${formState.search}`);
      const data = await response.json();
      console.log(data);
      setMovies(data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <>
      <form className="form-inline ml-3">
        <input
          className="form-control mr-sm-2"
          type="text"
          name="search"
          placeholder="Search Movies"
          value={formState.search}
          onChange={handleChange}
        />
        <button className="btn" type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <h1 key={movie.imdbID}>{movie.Title}</h1>
        ))
      ) : (
        <div className='mt-5'>
          <h1>No Movies Found</h1>
        </div>
      )}
    </>
  );
};

export default HomePage;
