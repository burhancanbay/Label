import { Router } from "express";
import UserWordController from "../controller/UserWordController";

export const userWordRouter = Router();

userWordRouter.get("/", UserWordController.getUserWords);
userWordRouter.get("/:id", UserWordController.getUserWordDetails);
userWordRouter.post("/", UserWordController.createUserWord);
userWordRouter.put("/:id", UserWordController.updateUserWord);
userWordRouter.put("/restore/:id", UserWordController.restoreUserWord);
userWordRouter.delete("/:id", UserWordController.softRemoveUserWord);
