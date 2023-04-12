import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserWord } from "../entity/UserWord";

const userWordRepository = AppDataSource.getRepository(UserWord);

const getUserWords = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userWords = await userWordRepository.find();
  return response.send(userWords);
};

const getUserWordDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  const userWord = await userWordRepository.findOne({
    where: { id },
  });

  if (!userWord) {
    return response.send("unregistered word");
  }
  return response.send(userWord);
};

const createUserWord = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { wordName, startOfEndOf, tweetId, user, opinion } = request.body;

  const userWord = Object.assign(new UserWord(), {
    wordName,
    startOfEndOf,
    tweetId,
    user,
    opinion,
  });
  await userWordRepository.save(userWord);
  return response.send(userWord);
};

const updateUserWord = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userWordToUpdate = await userWordRepository.findOneBy({ id });

  if (!userWordToUpdate) {
    return response.send("unregistered word");
  }

  userWordRepository.merge(userWordToUpdate, request.body);

  await userWordRepository.save(userWordToUpdate);

  return response.send(userWordToUpdate);
};

const restoreUserWord = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userWordToRestore = await userWordRepository.restore({ id });

  return response.send(userWordToRestore);
};

const softRemoveUserWord = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userWordToRemove = await userWordRepository.findOneBy({ id });

  if (!userWordToRemove) {
    return response.send("unregistered word");
  }

  await userWordRepository.remove(userWordToRemove);

  return response.send(userWordToRemove);
};

export default {
  userWordRepository,
  getUserWords,
  getUserWordDetails,
  createUserWord,
  updateUserWord,
  restoreUserWord,
  softRemoveUserWord,
};
