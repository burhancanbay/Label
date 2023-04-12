const pool = require("../config/dbConnection");
const queries = require("../queries/queryUserTweet");

const getUserTweets = (req, res) => {
  pool.query(queries.getUserTweets, (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const getUserTweetById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserTweetById, [id], (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const getUserTweetByTweetId = (req, res) => {
  const tweet_id = req.params.tweetId;
  pool.query(queries.getUserTweetByTweetId, [tweet_id], (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const getUserTweetByUser = (req, res) => {
  const user = req.params.userName;
  pool.query(queries.getUserTweetByUser, [user], (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const getUserWordDetails = (req, res) => {
  const user = req.params.userName;
  const tweet_id = req.params.tweetId;
  pool.query(queries.getWordsDetails, [user, tweet_id], (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const createUserTweet = (req, res) => {
  const { tweet_id, user_name, tweet_opinion, words } = req.body;
  pool.query(
    queries.createUserTweet,
    [tweet_id, user_name, tweet_opinion, words],
    (error, results) => {
      if (error) {
        return res.send(error.detail);
      }
      return res.status(201).send("User-tweet created successfuly!");
    }
  );
};

const updateUserTweet = (req, res) => {
  const { tweet_opinion, words } = req.body;
  const id = parseInt(req.params.id);
  pool.query(queries.getUserTweetById, [id], (error, results) => {
    if (!results.rows.length) {
      return res.send("The user-tweet does not exist in database");
    }
    pool.query(
      queries.updateUserTweet,
      [tweet_opinion, words, id],
      (error, results) => {
        if (error) {
          return res.send(error.detail);
        }
        return res.status(200).send("User-tweet updated successfuly!");
      }
    );
  });
};

const removeUserTweet = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserTweetById, [id], (error, results) => {
    if (!results.rows.length) {
      return res.send("The user-tweet does not exist in database");
    }
    pool.query(queries.removeUserTweet, [id], (error, results) => {
      if (error) {
        return res.send(error.detail);
      }
      return res.status(200).send("User-tweet removed successfuly!");
    });
  });
};

module.exports = {
  getUserTweets,
  getUserTweetById,
  getUserTweetByTweetId,
  getUserTweetByUser,
  getUserWordDetails,
  createUserTweet,
  updateUserTweet,
  removeUserTweet,
};
