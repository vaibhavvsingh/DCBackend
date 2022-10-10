const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vaibhav:Q7yKA9tRbprBjQ8@cluster0.o8irc.mongodb.net/social?retryWrites=true&w=majority"
    );
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
