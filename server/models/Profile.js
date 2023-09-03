import { Schema, model, mongo } from 'mongoose';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const profileSchema = new Schema({
  _id: { 
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  likedMovies:[{
      title: String,
      poster: String, 
      genre: String,
      rating: Number,
      imdbID: String,
  }],

  dislikedMovies:[{
      type: String,
  }],

});

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

export default Profile;