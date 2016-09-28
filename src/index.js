'use strict';

const db = require('./db');
const Twitter = require('./twitter');
const RequestTweet = require('./tweets/request');
const ReplyTweet = require('./tweets/reply');

let stream = Twitter.stream();

stream.on('tweet', (payload) => {
  let request_tweet = new RequestTweet(payload);

  if (request_tweet.shouldReply()) {
    db.getNickname(request_tweet.getText())
      .then(nickname => {
        if (!nickname) {
          return;
        }
        Twitter.reply(new ReplyTweet(request_tweet, nickname));
      })
      .catch(error => console.log(error));
  }
});

stream.on('error', (payload) => {
  console.error(payload);
});
