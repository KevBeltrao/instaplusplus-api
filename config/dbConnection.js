const mongoose = require('mongoose');

module.exports = () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );

    const { connection } = mongoose;

    connection.once('open', () => {
      console.log('Connected to database');
    });
  } catch (error) {
    console.log(`Couldn't connect to database: ${error}`);
  }
};
