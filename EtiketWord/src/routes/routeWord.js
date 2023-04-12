const express = require("express");
const controllerWord = require("../controllers/controllerWord");
const wordRouter = express.Router();

wordRouter.get("/", controllerWord.getAllOpinions);

wordRouter.get("/:id", controllerWord.getOpinionById);

wordRouter.get("/user/:userName", controllerWord.getOpinionsByUser);

wordRouter.get("/tweet/:tweetId", controllerWord.getOpinionsByTweetId);

wordRouter.get("/word", controllerWord.getOpinionsByWord);

wordRouter.post("/", controllerWord.createOpinion);

wordRouter.put("/:id", controllerWord.updateOpinion);

wordRouter.delete("/:id", controllerWord.removeOpinion);

module.exports = wordRouter;
