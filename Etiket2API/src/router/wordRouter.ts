import { Router } from "express";
import WordController from "../controller/WordController";

export const wordRouter = Router();

wordRouter.get("/", WordController.getAllWords);
wordRouter.get("/:id", WordController.getWordById);
wordRouter.get("/user/:userName", WordController.getWordByUser);
wordRouter.get("/tweet/:tweetId", WordController.getWordByTweetId);
wordRouter.get("/user/:userName/tweet/:tweetId", WordController.getWordDetails);
wordRouter.post("/", WordController.createWord);
wordRouter.put("/:id", WordController.updateWord);
wordRouter.put("/restore/:id", WordController.restoreWord);
wordRouter.delete("/:id", WordController.removeWord);
