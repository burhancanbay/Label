import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Opinion } from "../entity/Opinion";

const opinionRepository = AppDataSource.getRepository(Opinion);

const getOpinions = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const opinions = await opinionRepository.find();
  return response.send(opinions);
};

const getOpinionDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  const opinion = await opinionRepository.findOne({
    where: { id },
  });

  if (!opinion) {
    return response.send("unregistered opinion");
  }
  return response.send(opinion);
};

const createOpinion = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { opinionName } = request.body;

  const opinion = Object.assign(new Opinion(), {
    opinionName,
  });
  await opinionRepository.save(opinion);
  return response.send(opinion);
};

const updateOpinion = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let opinionToUpdate = await opinionRepository.findOneBy({ id });

  if (!opinionToUpdate) {
    return response.send("unregistered opinion");
  }

  opinionRepository.merge(opinionToUpdate, request.body);

  await opinionRepository.save(opinionToUpdate);

  return response.send(opinionToUpdate);
};

const removeOpinion = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let opinionToRemove = await opinionRepository.findOneBy({ id });

  if (!opinionToRemove) {
    return response.send("unregistered opinion");
  }

  await opinionRepository.remove(opinionToRemove);

  return response.send(opinionToRemove);
};

export default {
  opinionRepository,
  getOpinions,
  getOpinionDetails,
  createOpinion,
  updateOpinion,
  removeOpinion,
};
