const mongoose = require("mongoose");

databaseUrl =
  "mongodb+srv://sergio:mSuGWNNMEU6P37KM@cluster0.leys7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDatabase = () => {
  return mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = { connectDatabase };
