import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LIKE_MOVIE } from "../utils/mutations";
const omdbKey = process.env.REACT_APP_OMDB_KEY;
const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=`;

const HomePage = () => {
  const [formState, setFormState] = useState({ search: "" });
  const [movies, setMovies] = useState([]);

  const [likeMovie, { error, data }] = useMutation(LIKE_MOVIE);

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
      console.log(formState.search);
      const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbKey}&s=${formState.search}`);
      const data = await response.json();
      // console.log(data);
      setMovies(data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleLike = async (movie) => {
    console.log(movie);
    try {
      const { Title: title } = movie;
      // console.log(movie)
      const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbKey}&t=${title}`);
      const data = await response.json();
      // console.log(data);
      let { imdbID, imdbRating: rating, Poster: poster, Genre: genre } = data;
      rating = parseFloat(rating);
      await likeMovie({
        variables: { imdbID, title, poster, genre, rating },
      });

    } catch (error) {
      console.error("Error liking movie:", error);
    }
  }


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
      <div className="row mt-5">
        {movies && movies.length > 0 ? (
          movies.map((movie, key) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.imdbID}>
              <div className="card">
                <img
                  className="card-img-top"
                  src={movie.Poster}
                  alt={movie.Title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <button
                    type="button"
                    className="btn btn-danger"
                    // onClick={}
                  >
                    Dislike
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(event) => {handleLike(movies[key])}}
                  >
                    Like
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col">
            <h1>No Movies Found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
