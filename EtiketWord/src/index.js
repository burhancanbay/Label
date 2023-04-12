const express = require("express");
require("dotenv/config");

const wordRouter = require("./routes/routeWord");

const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.use("/opinions", wordRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.LISTEN_PORT | 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
