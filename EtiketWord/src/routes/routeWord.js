const express = require("express");
const controllerWord = require("../controllers/controllerWord");
const wordRouter = express.Router();

wordRouter.get("/", controllerWord.getAllOpinions);

wordRouter.get("/tweets", controllerWord.getTweets);

wordRouter.get("/:id", controllerWord.getOpinionById);

wordRouter.get("/user/:userName", controllerWord.getOpinionsByUser);

wordRouter.get("/tweet/:tweetId", controllerWord.getOpinionsByTweetId);

wordRouter.get(
  "/user/:userName/tweet/:tweetId",
  controllerWord.getOpinionsDetails
);

wordRouter.post("/word", controllerWord.getOpinionsByWord);

wordRouter.post("/", controllerWord.createOpinion);

wordRouter.put("/json", controllerWord.updateJson);

wordRouter.put("/", controllerWord.updateOpinion);

wordRouter.delete("/:id", controllerWord.removeOpinion);

module.exports = wordRouter;
