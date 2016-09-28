'use strict';

const assert = require('assert');

const ReplyTweet = require('../../src/tweets/reply');
const RequestTweet = require('../../src/tweets/request');

describe('ReplyTweet', () => {
  let result = 'Minase Inori';

  describe('#getText()', () => {
    let request_tweet = new RequestTweet({
      text: 'inosuke',
      user: { screen_name: 'some_screen_name' }
    });

    it('should return a reply tweet', () => {
      let reply_tweet = new ReplyTweet(request_tweet, result);

      assert.equal(reply_tweet.getText(), '@some_screen_name Minase Inori');
    });
  });

  describe('#getInReplyToStatusID()', () => {
    let request_tweet = new RequestTweet({ id_str: '123' });

    it('should return a status ID', () => {
      let reply_tweet = new ReplyTweet(request_tweet, result);

      assert.equal(reply_tweet.getInReplyToStatusID(), '123');
    });
  });
});
