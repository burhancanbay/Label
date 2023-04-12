const express = require("express");
const controller = require("../controllers/controllerUserTweet");
const userTweetRouter = express.Router();

userTweetRouter.get("/", controller.getUserTweets);

userTweetRouter.get("/:id", controller.getUserTweetById);

userTweetRouter.get("/user/:userName", controller.getUserTweetByUser);

userTweetRouter.get("/tweet/:tweetId", controller.getUserTweetByTweetId);

userTweetRouter.get(
  "/user/:userName/tweet/:tweetId",
  controller.getUserWordDetails
);
userTweetRouter.post("/", controller.createUserTweet);

userTweetRouter.put("/:id", controller.updateUserTweet);

userTweetRouter.delete("/:id", controller.removeUserTweet);

module.exports = userTweetRouter;
