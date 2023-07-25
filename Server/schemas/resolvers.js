import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Profile } from '../models/index.js';
import { signToken } from '../utils/auth.js';
// import { buildResolveInfo } from 'graphql/execution/execute';

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
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

    likeProfile: async (parent, { profileId, likedProfileId }, context) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { likedProfiles: likedProfileId }
        },
        {
          new: true,
          runValidators: true,
        }
      )
    },

    addSwipe: async (parent, { profileId, swipedProfileId }, context) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $addToSet: { swipedProfiles: swipedProfileId } },
        {
          new: true,
          runValidators: true,
        }
      )
    },


    addAbout: async (parent, { profileId, instrument, age, url, bio }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      // if (context.user) {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { instrument: instrument },
          $set: { age: age, url: url, bio: bio },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      // }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      // throw new AuthenticationError('You need to be logged in!');
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
