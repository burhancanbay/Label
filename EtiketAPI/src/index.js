const express = require("express");
require("dotenv/config");

const userTweetRouter = require("./routes/routeUserTweet");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/opinions", userTweetRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.LISTEN_PORT | 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
