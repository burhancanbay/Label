import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Word } from "../entity/Word";

const wordRepository = AppDataSource.getRepository(Word);

const getAllWords = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const allWords = await wordRepository.find({});
  return response.send(allWords);
};

const getWordById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  const word = await wordRepository.findOne({
    where: { id },
  });

  if (!word) {
    return response.send("unregistered word");
  }
  return response.send(word);
};

const getWordByUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userName = request.params.userName;

  const words = await wordRepository.find({
    where: { userName: userName },
  });

  if (!words) {
    return response.send("unregistered word");
  }
  return response.send(words);
};

const getWordByTweetId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const tweetId = request.params.tweetId;

  const words = await wordRepository.find({
    where: { tweetId: tweetId },
  });

  if (!words) {
    return response.send("unregistered word");
  }
  return response.send(words);
};

const getWordDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const tweetId = request.params.tweetId;
  const userName = request.params.userName;

  const words = await wordRepository.find({
    where: { tweetId: tweetId, userName: userName },
  });

  if (!words) {
    return response.send("unregistered word");
  }
  return response.send(words);
};

const createWord = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { tweetId, userName, startOf, endOf, wordName, opinion, isAll } =
    request.body;

  const word = Object.assign(new Word(), {
    tweetId,
    userName,
    startOf,
    endOf,
    wordName,
    opinion,
    isAll,
  });
  await wordRepository.save(word);
  return response.send(word);
};

const updateWord = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let wordToUpdate = await wordRepository.findOne({
    where: { id },
  });

  if (!wordToUpdate) {
    return response.send("unregistered word");
  }

  wordRepository.merge(wordToUpdate, request.body);

  await wordRepository.save(wordToUpdate);

  return response.send(wordToUpdate);
};

const removeWord = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let wordToRemove = await wordRepository.findOne({
    where: { id },
  });

  if (!wordToRemove) {
    return response.send("unregistered word");
  }

  await wordRepository.softRemove(wordToRemove);

  return response.send(wordToRemove);
};

const restoreWord = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  await wordRepository.restore(id);
  let wordToRestore = await wordRepository.findOne({ where: { id } });
  return response.send(wordToRestore);
};

export default {
  getAllWords,
  getWordById,
  getWordByTweetId,
  getWordByUser,
  getWordDetails,
  createWord,
  updateWord,
  removeWord,
  restoreWord,
};
