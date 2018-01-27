const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytapp",
  {
    useMongoClient: true
  }
);

const articleSeed = [
  {
    title: "test1",
    date: "20180101",
    url: "google.com"
      
  },
  {
    title: "Test2",
    date: "20180127",
    url: "yahoo.com"
  },
  {
    title: "Test3",
    date: "20180127",
    url: "espn.com"
  }
  
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
