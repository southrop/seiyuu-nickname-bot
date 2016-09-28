'use strict';

const db = require('./db');
const Twitter = require('./twitter');
const RequestTweet = require('./tweets/request');
const ReplyTweet = require('./tweets/reply');

let stream = Twitter.stream();

stream.on('tweet', (payload) => {
  let request_tweet = new RequestTweet(payload);
  console.log(payload);

  if (request_tweet.shouldReply()) {
    let nickname = db.getNickname(request_tweet.getText());
    if (!nickname) {
      return;
    }
    if (nickname.constructor === Array) {
      nickname = nickname.join(', ')
    }
    Twitter.reply(new ReplyTweet(request_tweet, nickname));
  }
});

stream.on('error', (payload) => {
  console.error(payload);
});
