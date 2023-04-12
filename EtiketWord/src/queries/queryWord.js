const getAllOpinions = "SELECT * FROM opinion";
const getOpinionById = "SELECT * FROM opinion WHERE id = $1";
const getOpinionsByTweetId = "SELECT * FROM opinion WHERE tweet_id = $1";
const getOpinionsByUser = "SELECT * FROM opinion WHERE user_name = $1";
const getOpinionsDetails =
  "SELECT * FROM opinion WHERE (tweet_id = $1 and user_name = $2)";
const getOpinionsByWord = "SELECT * FROM opinion WHERE json_field @> $1";
//   SELECT *
// FROM opinion
// WHERE json_field @> '[{"tkid": "R1_0","tk": "ali","aspect": true,"sentiment": "Pos"}]';
const createOpinion =
  "INSERT INTO opinion (user_name,tweet_id,  tweet_text, tweet_opinion,json_field) VALUES ($1,$2,$3,$4,$5)";

// const createWord =
//   "INSERT INTO opinion (user_name,tweet_id,  tweet_text, tweet_opinion,json_field) VALUES ($1,$2,$3,$4,$5::json[])";
const updateJson =
  "UPDATE opinion SET json_field = $1 WHERE (tweet_id = $2 and user_name = $3)";
const updateOpinion =
  "UPDATE opinion SET tweet_opinion = $1 WHERE (tweet_id = $2 and user_name = $3)";
// const updateWord = "UPDATE opinion SET opinion = $1 WHERE (user_name = $2 and tweet_id = $3 and start_of = $4 and end_of = $5)";
const removeOpinion = "DELETE FROM opinion WHERE id = $1";

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
};

// ($4::json[])
