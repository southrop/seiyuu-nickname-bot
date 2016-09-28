'use strict';

class ReplyTweet {
  constructor(request_tweet, result) {
    this.request_tweet = request_tweet;
    this.result = result;
  }

  getText() {
    return `@${this.request_tweet.getScreenName()} ${this.result}`;
  }

  getInReplyToStatusID() {
    return this.request_tweet.getStatusID();
  }
}

module.exports = ReplyTweet;
