import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const LIKE_MOVIE = gql`
  mutation likeMovie($imdbID: String!, $title: String!, $poster: String!, $genre: String!, $rating: Float!) {
    likeMovie(imdbID: $imdbID, title: $title, poster: $poster, genre: $genre, rating: $rating) {
      likedMovies {
        imdbID
        title
        poster
        genre
        rating
      }
    }
  }
`;