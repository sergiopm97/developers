const mongoose = require("mongoose");
const database = require("../database");
const Developer = require("../models/Developer");

const developersData = [
  { name: "Roberto", email: "roberto@gmail.com", password: "pdbdSuiwoa6172X" },
  { name: "Pedro", email: "pedro@gmail.com", password: "hydewDDqv1w918C" },
  { name: "Laura", email: "laura@gmail.com", password: "bdbfbryregfr111" },
  { name: "Carlos", email: "carlos@gmail.com", password: "weygwDTeugr73177" },
  { name: "Candela", email: "candela@gmail.com", password: "lobygSaQ108" },
];

const seedDevelopers = developersData.map((developer) => new Developer(developer));

database
  .connectDatabase()
  .then(async () => {
    console.log("\n-> Connected to the database...");
    const developers = await Developer.find();
    if (developers.length > 0) {
      console.log("-> Eliminating existing data before inserting the seed in the database...");
      await Developer.collection.drop();
    }
  })
  .catch((err) => {
    console.log(`-> An error occurred while deleting the data of the database: ${err}\n`);
  })
  .then(async () => {
    await Developer.insertMany(seedDevelopers);
  })
  .catch((err) => {
    console.log(`-> An error occurred while inserting the data in the database: ${err}\n`);
  })
  .finally(() => {
    mongoose.disconnect();
    console.log("-> The seed with the film data has been created in the database!\n");
  });
