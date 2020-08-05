import {
  getTweetsStart,
  getTopicTweetsStart,
  getTweetsSuccess,
  getTweetsFailure,
} from "./tweetActions";

import {
  getTopic,
  getTopicStart,
  getTopicSuccess,
  getTopicFailure,
} from "./topicActions";

import { BASE_URL } from "../../apiConstants";
const tweets_url = "https://thegoodgood.herokuapp.com/tweets";
const get_tweets_url = "https://thegoodgood.herokuapp.com/get_";
const url = "https://thegoodgood.herokuapp.com/";

//--------------------------------------FETCH ALL TWEETS
export const getTweetsAction = () => (dispatch) => {
  dispatch(getTweetsStart());
  return fetch(tweets_url)
    .then((res) => res.json())
    .then((tweets) => {
      dispatch(getTweetsSuccess(tweets));
    })
    .catch((error) => {
      dispatch(getTweetsFailure(error));
    });
};

//-----------------------FETCH BY TOPIC TWEETS
export const getTopicTweetsAction = (topic) => (dispatch) => {
  let new_topic = topic.toLowerCase().split(" ").join("");
  dispatch(getTopicTweetsStart(new_topic));
  return fetch(`${get_tweets_url}${new_topic}`)
    .then((res) => res.json())
    .then((tweets) => {
      dispatch(getTweetsSuccess(tweets));
    })
    .catch((error) => {
      dispatch(getTweetsFailure(error));
    });
};

//-------------FETCH NEWS
export const getNewsAction = () => (dispatch) => {
  dispatch(getTopicTweetsStart());
  return fetch(tweets_url`/news`)
    .then((res) => res.json())
    .then((tweets) => {
      dispatch(getTweetsSuccess(tweets));
    })
    .catch((error) => {
      dispatch(getTweetsFailure(error));
    });
};

//-------------FETCH EMBEDDED TWEET

// export const embedTweetAction = () => dispatch => {
//   fetch("https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2FInterior%2Fstatus%2F507185938620219395'", {
//      mode: 'no-cors',
//      "X-Frame-Options": "allow-from"
//    })
//   .then(res => res.json())
//   .then(data => {
//     return data
//   })
//   .catch(error => {
//     return error
//     })
// }

//-----------------------UPDATE TOPIC IN THE STORE
export const getTopicAction = (topic) => (dispatch) => {
  dispatch(getTopic(topic));
};

// -----------------------------------GET THE CURRENT TWEET
export const getCurrentTweetAction = (id) => (dispatch) => {
  dispatch({ type: "GET_CURRENT_TWEET_START" });

  return fetch(`${tweets_url}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .then((res) => res.json())
    .then((tweet) => {
      dispatch({ type: "GET_CURRENT_TWEET_SUCCESS", tweet: tweet });
    })
    .catch((error) => {
      dispatch({ type: "GET_CURRENT_TWEET_FAILURE", error: error });
    });
};

// ----------------------------------------DELETE THE CURRENT TWEET

export const deleteTweetAction = (tweet) => (dispatch) => {
  let id = tweet.id;
  fetch(`${tweets_url}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .then((res) => res.json())
    .then((tweet) => {
      dispatch({ type: "DELETE_TWEET", tweet: tweet });
    })
    .catch((error) => {
      dispatch({ type: "GET_CURRENT_TWEET_FAILURE", error: error });
    });
};

// --------------------------------------------------UPVOTE A TWEET

export const upvoteTweetAction = (id) => (dispatch) => {
  dispatch({ type: "GET_CURRENT_TWEET_START" });
  fetch(`${tweets_url}/${id}/upvote`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .then((res) => res.json())
    .then((tweet) => {
      dispatch({ type: "GET_CURRENT_TWEET_SUCCESS", tweet: tweet });
      dispatch({ type: "ADD_TO_UPVOTED_TWEETS", tweet: tweet });
    })
    .catch((error) => {
      dispatch({ type: "GET_CURRENT_TWEET_FAILURE", error: error });
    });
};

export const downvoteTweetAction = (id) => (dispatch) => {
  dispatch({ type: "GET_CURRENT_TWEET_START" });

  return fetch(`${tweets_url}/${id}/downvote`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .then((res) => res.json())
    .then((tweet) => {
      dispatch({ type: "REMOVE_FROM_UPVOTED_TWEETS", tweet: tweet });
    });
};
