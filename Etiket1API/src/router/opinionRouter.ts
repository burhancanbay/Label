import { Router } from "express";
import OpinionController from "../controller/OpinionController";

export const opinionRouter = Router();

opinionRouter.get("/", OpinionController.getOpinions);
opinionRouter.get("/:id", OpinionController.getOpinionDetails);
opinionRouter.post("/", OpinionController.createOpinion);
opinionRouter.put("/:id", OpinionController.updateOpinion);
opinionRouter.delete("/:id", OpinionController.removeOpinion);
