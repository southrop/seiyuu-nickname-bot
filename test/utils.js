'use strict';

const assert = require('assert');

const util = require('../src/utils.js');

describe('Utils', () => {
  describe('#matchString()', () => {
    it('should return null if no match is found', () => {
      let data = {
        'minase inori': ['inorin', 'inosuke'],
        inorin: 'minase inori',
        inosuke: 'minase inori'
      };
      let string = 'yamazaki haruka';
      let result = util.matchString(string, data);

      assert.equal(result, null);
    });

    it('should return the value if a key is matched', () => {
      let data = {
        'Minase Inori': ['Inorin', 'Inosuke'],
        Inorin: 'Minase Inori',
        Inosuke: 'Minase Inori'
      };
      let string = 'some random inorin string';
      let result = util.matchString(string, data);

      assert.equal(result, 'Minase Inori');
    });

    it('should return the original value regardless of search term case', () => {
      let data = {
        'Minase Inori': ['Inorin', 'Inosuke'],
        Inorin: 'Minase Inori',
        Inosuke: 'Minase Inori'
      };
      let string = 'somE mINasE InORi STrING';
      let result = util.matchString(string, data);

      assert.equal(result, 'Minase Inori');
    });

    it('should return the value of the first match if there are multiple keys', () => {
      let data = {
        'Minase Inori': ['Inorin', 'Inosuke'],
        Inorin: 'Minase Inori',
        Pyon: 'Yamazaki Haruka'
      };
      let string = 'some random inorin string pyon';
      let result = util.matchString(string, data);

      assert.equal(result, 'Minase Inori');
    });
  });
});
