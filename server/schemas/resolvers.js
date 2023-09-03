import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Profile, Movie } from '../models/index.js';
import { signToken } from '../utils/auth.js';
// import { buildResolveInfo } from 'graphql/execution/execute';

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { _id }) => {
      return Profile.findOne({ _id });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');

    },

  },

  Mutation: {
    addProfile: async (parent, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    likeMovie: async (parent, { imdbID, title, poster, genre, rating }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to save a book!');
      }
      
      const newMovie = await Movie.create({ imdbID, title, poster, genre, rating });
      console.log(newMovie)

      const updatedProfile = await Profile.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { likedMovies: newMovie } },
        { new: true }
      );
      return updatedProfile;
    },



    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },


  }
};

export default resolvers;
