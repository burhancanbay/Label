import { Router } from "express";
import UserTweetController from "../controller/UserTweetController";

export const userTweetRouter = Router();

userTweetRouter.get("/", UserTweetController.getUserTweets);
userTweetRouter.get("/:id", UserTweetController.getUserTweetDetails);
userTweetRouter.post("/", UserTweetController.createUserTweet);
userTweetRouter.put("/:id", UserTweetController.updateUserTweet);
userTweetRouter.delete("/:id", UserTweetController.removeUserTweet);
