const pool = require("../config/dbConnection");
const queries = require("../queries/queryWord");

const https = require("https");
const axios = require("axios");

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

const getOpinionsDetails = (req, res) => {
  const user_name = req.params.userName;
  const tweet_id = req.params.tweetId;
  pool.query(
    queries.getOpinionsDetails,
    [tweet_id, user_name],
    (error, results) => {
      if (error) {
        return res.send(error.detail);
      }
      return res.status(200).json(results.rows);
    }
  );
};

const getOpinionsByWord = (req, res) => {
  const { json_field } = req.body;
  const jsonStr = JSON.stringify(json_field);
  // console.log(jsonField);
  // console.log(jsonStr);
  pool.query(queries.getOpinionsByWord, [jsonStr], (error, results) => {
    if (error) {
      console.log(error.detail);
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

const updateJson = (req, res) => {
  const { user_name, tweet_id, json_field } = req.body;
  const jsonStr = JSON.stringify(json_field);
  pool.query(
    queries.getOpinionsDetails,
    [tweet_id, user_name],
    (error, results) => {
      if (!results.rows.length) {
        createOpinion(req, res);
        return;
      }
      pool.query(
        queries.updateJson,
        [jsonStr, tweet_id, user_name],
        (error, results) => {
          if (error) {
            return res.send(error.detail);
          }
          return res.status(200).send("The record updated successfuly!");
        }
      );
    }
  );
};

const updateOpinion = (req, res) => {
  const { tweet_opinion, user_name, tweet_id } = req.body;

  pool.query(
    queries.getOpinionsDetails,
    [tweet_id, user_name],
    (error, results) => {
      if (!results.rows.length) {
        createOpinion(req, res);
        return;
        // return res.send("The record does not exist in database");
      }
      pool.query(
        queries.updateOpinion,
        [tweet_opinion, tweet_id, user_name],
        (error, results) => {
          if (error) {
            return res.send(error.detail);
          }
          return res.status(200).send("The record updated successfuly!");
        }
      );
    }
  );
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

const getTweets = async (req, res) => {
  try {
    const url = `http://bcanbay:YoS74KYIOSVdTWvG@192.168.1.131:9208/twitter-train-test0/_search?_source_includes=tweet_text,tweet_id&size=10000`;

    const header = {
      "Content-Type": "application/json",
    };

    let result = await getRequest(url, "GET", header);
    res.send(result?.hits?.hits || []);
  } catch (err) {
    res.send(err);
  }
};

const axiosRe = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const getRequest = async (url, method, headers, data) => {
  return new Promise((resolve, reject) => {
    var config = {
      method: method,
      url: url,
      headers: headers,
      data: data,
    };

    try {
      axiosRe(config)
        .then(function (response) {
          return resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);

          return reject(error);
        });
    } catch (error) {
      console.log(error);

      return reject(error);
    }
  });
};

module.exports = {
  getAllOpinions,
  getOpinionById,
  getOpinionsByTweetId,
  getOpinionsByUser,
  getOpinionsDetails,
  getOpinionsByWord,
  createOpinion,
  updateJson,
  updateOpinion,
  removeOpinion,
  getTweets,
};
