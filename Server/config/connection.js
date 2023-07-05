import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/movie-curator');

module.exports = mongoose.connection;
