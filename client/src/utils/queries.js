import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      likedMovies {
        imdbID
        title
        poster
        genre
        rating
      }
    }
  }
`