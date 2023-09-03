import { gql } from 'apollo-server-express';  

const typeDefs = gql`
  type Profile {
    _id: ID
    username: String
    email: String
    password: String
    likedMovies: [Movie]
    dislikedMovies: [Movie]
  }

  type Movie {
    imdbID: String
    title: String
    poster: String
    rating: Float
    genre: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }


  type Query {
    profiles: [Profile]!
    profile(_id: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    movies: [Movie]
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    likeMovie(imdbID: String!, title: String!, poster: String!, rating: Float!, genre: String!): Movie


    removeProfile: Profile
  }
  `;
  
export default typeDefs;
