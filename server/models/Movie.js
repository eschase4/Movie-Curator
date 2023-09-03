import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  imdbID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  poster: {
    type: String,
  },
});

const Movie = model("Movie", movieSchema);

export default Movie;
