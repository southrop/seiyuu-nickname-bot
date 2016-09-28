'use strict';

const assert = require('assert');

const RequestTweet = require('../../src/tweets/request');

describe('RequestTweet', () => {

  describe('#getText()', () => {
    let payload = { text: 'some text' };

    it('should return the text', () => {
      let tweet = new RequestTweet(payload);
      let text = tweet.getText();

      assert.equal(text, 'some text');
    });
  });

  describe('#getStatusID()', () => {
    let payload = { id_str: '123' };

    it('should return the status ID', () => {
      let tweet = new RequestTweet(payload);
      let statusID = tweet.getStatusID();

      assert.equal(statusID, '123');
    });
  });

  describe('#getScreenName()', () => {
    let payload = { user: { screen_name: 'some_screen_name' } };

    it('should return the screen name', () => {
      let tweet = new RequestTweet(payload);
      let screen_name = tweet.getScreenName();

      assert.equal(screen_name, 'some_screen_name');
    });
  });

  describe('#isMentioned()', () => {
    let payload = {
      entities: {
        user_mentions: [{ screen_name: 'some_screen_name' }]
      }
    };

    it('should return true if screen_name is mentioned', () => {
      let tweet = new RequestTweet(payload);
      let result = tweet.isMentioned('some_screen_name');

      assert.equal(result, true);
    });

    it('should return false if screen_name is not mentioned', () => {
      let tweet = new RequestTweet(payload);
      let result = tweet.isMentioned('another_screen_name');

      assert.equal(result, false);
    });
  });

  describe('#isRetweet()', () => {
    it('should return true if retweeted_status is set', () => {
      let payload = { retweeted_status: 'value' };
      let tweet = new RequestTweet(payload);
      let result = tweet.isRetweet();

      assert.equal(result, true);
    });

    it('should return false if retweeted_status is not set', () => {
      let payload = { };
      let tweet = new RequestTweet(payload);
      let result = tweet.isRetweet();

      assert.equal(result, false);
    });
  });
});
