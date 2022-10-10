const express = require("express");
const User = require("../userSchema");
const db = require("./db.js");
const cors = require("cors");

const app = express();
const port = 3000;

db();

app.use(cors());
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//SIGNUP
authRouter.post("/signup", async (req, res) => {
  try {
    const user = await new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    user.save();
    res.json("New user created");
  } catch (err) {
    console.log(err);
  }
});

//LOGIN
authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("user not found");

    user.password != req.body.password &&
      res.status(400).json("wrong password");

    res.status(200).json("logged in successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
