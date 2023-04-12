const pool = require("../config/dbConnection");
const queries = require("../queries/queryWord");

const getAllOpinions = (req, res) => {
  pool.query(queries.getAllOpinions, (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const getOpinionById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getOpinionById, [id], (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const getOpinionsByTweetId = (req, res) => {
  const tweet_id = req.params.tweetId;
  pool.query(queries.getOpinionsByTweetId, [tweet_id], (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const getOpinionsByUser = (req, res) => {
  const user = req.params.userName;
  pool.query(queries.getOpinionsByUser, [user], (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const getOpinionsByWord = (req, res) => {
  const { json_field } = req.body;
  pool.query(queries.getOpinionsByWord, [json_field], (error, results) => {
    if (error) {
      return res.send(error.detail);
    }
    return res.status(200).json(results.rows);
  });
};

const createOpinion = (req, res) => {
  const { user_name, tweet_id, tweet_text, tweet_opinion, json_field } =
    req.body;

  const jsonStr = JSON.stringify(json_field);
  pool.query(
    queries.createOpinion,
    [user_name, tweet_id, tweet_text, tweet_opinion, jsonStr],
    (error, results) => {
      if (error) {
        return res.send(error.detail);
      }
      return res.status(201).send("The record created successfuly!");
    }
  );
};

const updateOpinion = (req, res) => {
  const { tweet_opinion, json_field } = req.body;
  const id = parseInt(req.params.id);
  const jsonStr = JSON.stringify(json_field);
  pool.query(queries.getOpinionById, [id], (error, results) => {
    if (!results.rows.length) {
      return res.send("The record does not exist in database");
    }
    pool.query(
      queries.updateOpinion,
      [tweet_opinion, jsonStr, id],
      (error, results) => {
        if (error) {
          return res.send(error.detail);
        }
        return res.status(200).send("The record updated successfuly!");
      }
    );
  });
};

const removeOpinion = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getOpinionById, [id], (error, results) => {
    if (!results.rows.length) {
      return res.send("The record does not exist in database");
    }
    pool.query(queries.removeOpinion, [id], (error, results) => {
      if (error) {
        return res.send(error.detail);
      }
      return res.status(200).send("The record removed successfuly!");
    });
  });
};

module.exports = {
  getAllOpinions,
  getOpinionById,
  getOpinionsByTweetId,
  getOpinionsByUser,
  getOpinionsByWord,
  createOpinion,
  updateOpinion,
  removeOpinion,
};
