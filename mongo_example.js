"use strict"

const {MongoClient} = require("mongodb");
const MONGO_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGO_URI, (err, db) => {
  if (err) {
    console.log(`\Failed to connect: ", ${MONGO_URI}`);
    throw err;  
    // 'throw' throws a user-defined exception.
    // Execution of current function will stop and control will be passed to first
    //  'catch' block of code.
    // If no catch block --> function terminates.
  }

  // ==> If no errors, we have connection to the Mongo Client and the
  //  'test-tweets' database, starting here,
  console.log(`Connected to mongodb: ${MONGO_URI}`);

  // ==> In typical node-callback style, any program logic that needs to 
  //  use the connection needs to be invoked from here.
  //
  // Another way to say: "This is an 'entry-point' for a database application!"

  function getTweets(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }

  getTweets((err, tweets) => {
    if (err) throw err; 

    console.log("Logging each tweet:\n");
    for (let tweet of tweets) {
      console.log(tweet);
    }
    db.close();
  });

});  