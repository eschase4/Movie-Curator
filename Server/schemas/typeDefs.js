import { gql } from 'apollo-server-express';  

const typeDefs = gql`
  type Profile {
    _id: ID
    username: String
    email: String
    password: String
    likedMovies: [String]
    dislikedMovies: [String]
  }

  type Movie {
    _id: ID
    title: String
    poster: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }


  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    movies: [Movie]
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    likeMovie(imdbID: String!, title: String!, poster: String!): Movie
    match(profileId: ID!, matchedProfileId: ID!): Profile
    addSwipe(profileId: ID!, swipedProfileId: ID!): Profile

    removeProfile: Profile
  }
  `;
  
export default typeDefs;
