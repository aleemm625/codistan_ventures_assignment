const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;

    await mongoose.connect(connectionString);

    console.log('mongodb connected successfully!');
  } catch (error) {
    console.log('error connecting to mongodb!', error.message);
    throw new Error(error);
  }
};

module.exports = connectDB;
