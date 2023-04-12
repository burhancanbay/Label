const getUserTweets = "SELECT * FROM user_tweet";
const getUserTweetById = "SELECT * FROM user_tweet WHERE id = $1";
const getUserTweetByTweetId = "SELECT * FROM user_tweet WHERE tweet_id = $1";
const getUserTweetByUser = "SELECT * FROM user_tweet WHERE user_name = $1";
const getWordsDetails =
  "SELECT user_tweet FROM user_tweet WHERE (user_name = $1 and tweet_id = $2);";
const createUserTweet =
  "INSERT INTO user_tweet (tweet_id,user_name,tweet_opinion,words) VALUES ($1,$2,$3,$4)";
const removeUserTweet = "DELETE FROM user_tweet WHERE id = $1";
const updateUserTweet =
  "UPDATE user_tweet SET tweet_opinion = $1, words = $2 WHERE id=$3";

module.exports = {
  getUserTweets,
  getUserTweetById,
  getUserTweetByTweetId,
  getUserTweetByUser,
  createUserTweet,
  removeUserTweet,
  updateUserTweet,
  getWordsDetails,
};

// ($4::json[])
