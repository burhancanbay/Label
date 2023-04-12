import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserTweet } from "../entity/UserTweet";

const userTweetRepository = AppDataSource.getRepository(UserTweet);

const getUserTweets = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userTweets = await userTweetRepository.find({
    relations: { user: true, opinion: true },
  });
  return response.send(userTweets);
};

const getUserTweetDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  const userTweet = await userTweetRepository.findOne({
    where: { id },
    relations: { user: true, opinion: true },
  });

  if (!userTweet) {
    return response.send("unregistered tweet");
  }
  return response.send(userTweet);
};

const createUserTweet = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { tweetId, user, opinion } = request.body;

  const userTweet = Object.assign(new UserTweet(), {
    tweetId,
    user,
    opinion,
  });
  await userTweetRepository.save(userTweet);
  return response.send(userTweet);
};

const updateUserTweet = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userTweetToUpdate = await userTweetRepository.findOne({
    where: { id },
    relations: { user: true, opinion: true },
  });

  if (!userTweetToUpdate) {
    return response.send("unregistered tweet");
  }

  userTweetRepository.merge(userTweetToUpdate, request.body);

  await userTweetRepository.save(userTweetToUpdate);

  return response.send(userTweetToUpdate);
};

const removeUserTweet = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userTweetToRemove = await userTweetRepository.findOne({
    where: { id },
    relations: { user: true, opinion: true },
  });

  if (!userTweetToRemove) {
    return response.send("unregistered tweet");
  }

  await userTweetRepository.remove(userTweetToRemove);

  return response.send(userTweetToRemove);
};

export default {
  userTweetRepository,
  getUserTweets,
  getUserTweetDetails,
  createUserTweet,
  updateUserTweet,
  removeUserTweet,
};
